import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import coderAnimation from '../assets/coder.json'; // Lottie JSON animation file

// Full-screen wrapper
const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  cursor: none;
`;

// Canvas for particle network
const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

// Wrapper for Lottie animation
const AnimationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  max-width: 500px;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    max-width: none;
    right: 50%;
    bottom: 8%;
    transform: translateX(50%);
  }
`;

// Content overlay for text and CTA
const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  pointer-events: none;
  /* Shift text higher on desktop */
  transform: translateY(-25%);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    top: -15%;           /* Align around upper center on mobile */
    left: 0%;
    transform: translate(-50%, -50%);
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 1rem;
  }
`;


// Gradient text animation
const gradientAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(270deg, #FF4D4D, #1ABC9C, #FF8787);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnim} 8s ease infinite;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.subtext};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

// Custom cursor dot
const CursorDot = styled.div`
  position: fixed;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 5;
  transition: transform 0.08s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Button = styled(motion.a)`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  pointer-events: auto;
  cursor: pointer;

  &:hover { background: ${({ theme }) => theme.colors.accent}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.6rem 1rem;
    margin-top: 1.5rem;
  }
`;

const Home = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });
  const [cursorPos, setCursorPos] = useState({ x: -50, y: -50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const onResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const onTouchMove = e => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseout', () => { mouseRef.current.x = null; mouseRef.current.y = null; });
    window.addEventListener('touchend', () => { mouseRef.current.x = null; mouseRef.current.y = null; });

    class Particle {
      constructor(x, y, dx, dy, size) { Object.assign(this, { x, y, dx, dy, size, baseSize: size }); }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill(); }
      update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > width) this.dx *= -1;
        if (this.y < 0 || this.y > height) this.dy *= -1;
        if (mouseRef.current.x !== null) {
          const dist = Math.hypot(mouseRef.current.x - this.x, mouseRef.current.y - this.y);
          if (dist < mouseRef.current.radius) this.size = Math.min(this.baseSize * 4, this.size + 1);
          else if (this.size > this.baseSize) this.size -= 0.3;
        }
        this.draw();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.floor((width * height) / 10000);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (width - size * 2) + size;
        const y = Math.random() * (height - size * 2) + size;
        const dx = (Math.random() - 0.5) * 1.2;
        const dy = (Math.random() - 0.5) * 1.2;
        particlesRef.current.push(new Particle(x, y, dx, dy, size));
      }
    };

    const connectParticles = () => {
      particlesRef.current.forEach((pA, i) => {
        particlesRef.current.slice(i + 1).forEach(pB => {
          const dist = Math.hypot(pA.x - pB.x, pA.y - pB.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach(p => p.update());
      connectParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseout', () => {});
      window.removeEventListener('touchend', () => {});
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const mailto = `mailto:anurudhs567@gmail.com?subject=Hiring You as Full-Stack Developer&body=Hi Anurudha,%0A%0ALet's connect!`;

  return (
    <Section>
      <Canvas ref={canvasRef} />
      <AnimationWrapper>
        <Lottie animationData={coderAnimation} loop />
      </AnimationWrapper>
      <ContentWrapper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Welcome, I’m Anurudha</Title>
        <Subtitle>Elite Full-Stack Developer</Subtitle>
        <Button href={mailto} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          Hire Me
        </Button>
      </ContentWrapper>
      <CursorDot style={{ top: `${cursorPos.y}px`, left: `${cursorPos.x}px` }} />
    </Section>
  );
};

export default Home;
