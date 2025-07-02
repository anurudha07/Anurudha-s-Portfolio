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
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;
const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;
const Card = styled(motion.li)`
  background: ${props => props.theme.colors.cardBg};
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  display: flex;
  align-items: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0,0,0,0.16);
  }
`;
const Bullet = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  margin-right: 0.75rem;
  margin-top: 0.3rem;
  flex-shrink: 0;
`;
const Text = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const achievements = [
  'Awarded < Certification of Merit > by Techno India Group for the Toppers of Malda in the Board Results 2021',
  'Participated in < Smart India Hackathon > in 2024 where I led a team and presented our innovative solutions to the organizer',
  'Ranked 2nd in Surtech < Codehub > Powered by HackerEarch in 2023'
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Achievements = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : 'hidden'}
      animate={reduce ? {} : 'visible'}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 0.8 }}
    >
      <Title>Achievements</Title>
      <Grid>
        {achievements.map((text, idx) => (
          <Card
            key={idx}
            initial={reduce ? {} : 'hidden'}
            animate={reduce ? {} : 'visible'}
            variants={variants}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <Bullet />
            <Text>{text}</Text>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Achievements;
