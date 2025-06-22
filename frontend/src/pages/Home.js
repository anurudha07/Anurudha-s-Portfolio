import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Styled-components

// Section container
const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  cursor: none; /* hide default cursor for custom one */
`;

// Canvas covers full area
const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// Overlay for content
const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  pointer-events: none; /* let pointer events pass to canvas if needed */
  text-align: center;
  padding: 0 1rem;
`;

// Animated gradient text
const gradientAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(270deg, #FF4D4D, #1ABC9C, #FF8787);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnim} 8s ease infinite;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: ${props => props.theme.colors.subtext};
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

// Custom cursor
const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 5;
  transition: transform 0.1s ease-out;
`;

// Button styled
const Button = styled(motion.a)`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  pointer-events: auto; /* allow clicking */
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

// Particle background logic
const Home = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Handle resize
    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // Track mouse
    const handleMouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Particle class
    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.baseSize = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        // Move
        this.x += this.dx;
        this.y += this.dy;
        // Bounce off edges
        if (this.x + this.size > width || this.x - this.size < 0) this.dx = -this.dx;
        if (this.y + this.size > height || this.y - this.size < 0) this.dy = -this.dy;

        // Interactivity: grow when near mouse
        if (mouseRef.current.x && mouseRef.current.y) {
          const distX = mouseRef.current.x - this.x;
          const distY = mouseRef.current.y - this.y;
          const dist = Math.hypot(distX, distY);
          if (dist < mouseRef.current.radius) {
            // grow
            this.size = Math.min(this.baseSize * 4, this.size + 1);
          } else {
            // shrink back
            if (this.size > this.baseSize) this.size -= 0.5;
            if (this.size < this.baseSize) this.size = this.baseSize;
          }
        }
        this.draw();
      }
    }

    // Initialize particles
    const initParticles = () => {
      const particles = [];
      const count = Math.floor((width * height) / 8000); // density
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (width - size * 2) + size;
        const y = Math.random() * (height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 1.5;
        let dy = (Math.random() - 0.5) * 1.5;
        const color = `rgba(255, 255, 255, 0.7)`;
        particles.push(new Particle(x, y, dx, dy, size, color));
      }
      particlesRef.current = particles;
    };

    // Draw lines between close particles
    const connectParticles = () => {
      const particles = particlesRef.current;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const pA = particles[a];
          const pB = particles[b];
          const dist = Math.hypot(pA.x - pB.x, pA.y - pB.y);
          if (dist < 100) {
            const opacity = 1 - dist / 100;
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach(p => p.update());
      connectParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start
    initParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Mailto link
  const email = 'anurudhs567@gmail.com';
  const subject = encodeURIComponent('Hiring You as Full-Stack Developer');
  const body = encodeURIComponent(
    `Hello Anurudha,\n\nI came across your portfolio and would like to discuss an opportunity. Please let me know your availability.\n\nBest regards,\n[Your Name]`
  );
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  // Content animation props
 

  return (
    <Section>
      <Canvas ref={canvasRef} />
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Welcome, I’m Anurudha...</Title>
        <Subtitle>Elite Full-Stack Developer</Subtitle>
        <Button href={mailto} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Hire Me
        </Button>
      </ContentWrapper>
      <CursorDot style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
    </Section>
  );
};

export default Home;
