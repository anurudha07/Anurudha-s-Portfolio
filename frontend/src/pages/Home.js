import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const blobAnim = keyframes`
  0% { border-radius: 42% 58% 63% 37% / 40% 49% 51% 60%; }
  50% { border-radius: 58% 42% 36% 64% / 59% 40% 60% 41%; }
  100% { border-radius: 42% 58% 63% 37% / 40% 49% 51% 60%; }
`;

const Section = styled.section`
  position: relative;
  display: flex; justify-content: center; align-items: center;
  text-align: center;
  height: calc(100vh - 60px);
  padding-top: 60px;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
`;
const Blob = styled.div`
  position: absolute;
  width: 120%; height: 120%;
  top: -10%; left: -10%;
  background: ${props => props.theme.colors.primary};
  opacity: 0.2;
  animation: ${blobAnim} 20s infinite ease-in-out;
`;
const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  z-index: 1;
  mix-blend-mode: difference;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 4rem;
  }
`;
const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.subtext};
  margin-top: 1rem;
  z-index: 1;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;
const Button = styled(motion.a)`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
`;

const Home = () => {
  const email = 'anurudhs567@gmail.com';
  const subject = encodeURIComponent('Hiring You as Full-Stack Developer');
  const body = encodeURIComponent(`Hello Anurudha,\n\nI would like to discuss hiring you. Please let me know your availability.\n\nBest regards,\n[Your Name]`);
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <Section>
      <Blob />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Welcome, I’m Anurudha...</Title>
        <Subtitle>Elite Full-Stack Developer</Subtitle>
        <Button
          href={mailto}
          whileHover={{ scale: 1.05 }}
        >
          Hire Me
        </Button>
      </motion.div>
    </Section>
  );
};

export default Home;
