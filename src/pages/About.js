import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Container = styled.section`
  max-width: 800px;
  margin: 80px auto;
  padding: 0 1rem;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const Content = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.subtext};
`;
const DownloadButton = styled(motion.a)`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: #fff;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
const About = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : { opacity: 0 }}
      animate={reduce ? {} : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Title>About Me</Title>
      <Content>
        I am a efffective Full-Stack Developer specializing in the MERN stack with passion for performance oriented scalable systems.
        I build full stack applications with clean architecture, advanced animations, leveraging both frontend and backend.
        As a detail-oriented and analytical individual, I excel in problem-solving and critical thinking and my excellent communication skills enable me to effectively collaborate with teams and communicate complex ideas to diverse audiences.
      </Content>
      {/* Download CV button: place CV.pdf in public folder */}
      <ButtonContainer>
        <DownloadButton
          href="/Anurudha_Sarkar_resume.pdf"
          download
          whileHover={reduce ? {} : { scale: 1.05 }}
          whileTap={reduce ? {} : { scale: 0.95 }}
        >
          Download CV
        </DownloadButton>
      </ButtonContainer>
    </Container>
  );
};

export default About;