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
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;
const Item = styled(motion.li)`
  background: ${props => props.theme.colors.cardBg};
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  cursor: default;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0,0,0,0.16);
  }
`;
const School = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
`;
const Degree = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`;
const Period = styled.p`
  margin: 0.25rem 0 0;
  color: ${props => props.theme.colors.subtext};
  font-size: 0.85rem;
`;
const Details = styled.p`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.subtext};
`;

const educations = [
  {
    school: 'MAKAUT University',
    degree: 'B.Tech. in Computer Science',
    period: 'Sep 2021 – June 2025',
    details: 'Graduated with 8.1 CGPA'
  },
  {
    school: "The St. Xavier's School",
    degree: 'Higher Secondary',
    period: 'Jun 2019 – July 2021',
    details: 'Science stream, passed out with 91% in ISC'
  },
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Education = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : 'hidden'}
      animate={reduce ? {} : 'visible'}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 0.8 }}
    >
      <Title>Education</Title>
      <List>
        {educations.map((edu, idx) => (
          <Item
            key={idx}
            initial={reduce ? {} : 'hidden'}
            animate={reduce ? {} : 'visible'}
            variants={variants}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={reduce ? {} : { scale: 1.02 }}
          >
            <School>{edu.school}</School>
            <Degree>{edu.degree}</Degree>
            <Period>{edu.period}</Period>
            {edu.details && <Details>{edu.details}</Details>}
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Education;
