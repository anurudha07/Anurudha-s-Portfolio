import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.section`
  max-width: 1000px;
  margin: 80px auto;
  padding: 0 1rem;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;
const Card = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-5px); }
`;
const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
`;
const ImgWrapper = styled.div`
  height: 160px;
  overflow: hidden;
`;
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
`;
const CardContent = styled.div`
  padding: 1rem;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
`;
const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.primary};
`;
const Description = styled.p`
  flex-grow: 1;
  color: ${props => props.theme.colors.subtext};
  margin-bottom: 1rem;
`;
const Links = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const LinkButton = styled.a`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  transition: background 0.3s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const projectList = [
  {
    title: 'M-Cart | Full-Stack E-Commerce Web Application',
    description: 'Developed a full-stack e-commerce web application with dynamic catalog management, secure payment processing, and responsive design, leveraging Node.js, React.js, and MongoDB to deliver a seamless user experience.',
    image: '',
    github: 'https://github.com/anurudha07/ecommerce',
    live: ''
  },
  {
    title: 'Kanban-Board-Application',
    description: 'Built a modern, minimal Kanban board application with Vue.js 3, Express, and MongoDB. Features responsive UI, smooth drag-and-drop task cards, and ability to create, edit & delete tasks.',
    image: '',
    github: 'https://github.com/anurudha07/Kanban-Board-Application',
    live: ''
  },
  {
    title: 'Book-Store-Web-Application',
    description: 'Developed a full-stack Book Store application leveraging the MERN stack, enabling users to perform CRUD operations with a user-friendly UI.',
    image: '',
    github: '',
    live: ''
  },
  {
    title: 'Multi-Disease Predictive Analytics Platform',
    description: 'Designed a predictive analytics web application using Python and Streamlit, harnessing supervised learning techniques to forecast the likelihood of Heart, Diabetes, Breast Cancer, and Parkinson’s Disease.',
    image: '',
    github: 'https://github.com/anurudha07/Multi-Disease-Predictive-Analytics-Platform',
    live: ''
  },
  {
    title: 'Hand Gesture-Based Volume Control',
    description: 'Implemented a cutting-edge Hand Gesture-Based Volume Control system leveraging computer vision and machine learning techniques.',
    image: '',
    github: 'https://github.com/anurudha07/Hand-Gesture-Based-Volume-Control/tree/main',
    live: 'https://anurudha07.github.io/Hand-Gesture-Based-Volume-Control/'
  },
  {
    title: 'Bank Management System',
    description: 'Contributed to a group Bank Management System project using Spring Boot, incorporating user authentication and secure transaction processing.',
    image: '',
    github: 'https://github.com/anurudha07/Bank-Management-System',
    live: ''
  },
  {
    title: 'Expense Tracking System',
    description: '"A full-stack MERN app enabling users to record, view, and manage expenses with real-time updates and calculations. Features include expense listing, total calculation, and deletion, showcasing CRUD operations and state management."',
    image: '',
    github: '',
    live: ''
  },
];

const Projects = () => {
  // Refs for outer cards and inner elements
  const cardRefs = useRef([]);
  const innerRefs = useRef([]);

  const handleMouseMove = (e, idx) => {
    const card = cardRefs.current[idx];
    const inner = innerRefs.current[idx];
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = idx => {
    const inner = innerRefs.current[idx];
    if (!inner) return;
    inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <Container>
      <Title>Projects</Title>
      <Grid>
        {projectList.map((proj, idx) => (
          <Card
            key={idx}
            ref={el => (cardRefs.current[idx] = el)}
            onMouseMove={e => handleMouseMove(e, idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <CardInner ref={el => (innerRefs.current[idx] = el)}>
              {proj.image && (
                <ImgWrapper>
                  <CardImage src={proj.image} alt={proj.title} />
                </ImgWrapper>
              )}
              <CardContent>
                <ProjectTitle>{proj.title}</ProjectTitle>
                <Description>{proj.description}</Description>
                <Links>
                  {proj.github && (
                    <LinkButton href={proj.github} target="_blank" rel="noopener noreferrer">
                      Code
                    </LinkButton>
                  )}
                  {proj.live && (
                    <LinkButton href={proj.live} target="_blank" rel="noopener noreferrer">
                      Live
                    </LinkButton>
                  )}
                </Links>
              </CardContent>
            </CardInner>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
