import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import img1 from '../images/image1.jpg';
import img2 from '../images/image2.jpeg';
import img3 from '../images/image3.png';
import img4 from '../images/image4.jpg';
import img5 from '../images/image5.jpg';
import img6 from '../images/image6.jpg';

const Container = styled.section`
  max-width: 1000px;
  margin: 80px auto;
  padding: 0 1rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.6rem;
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
  box-shadow: 0 108px 20px rgba(0,0,0,0.1);
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
  padding: 1.5rem;
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
  font-size: 0.8rem;
  text-align: center;
  transition: background 0.3s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const projectList = [
  {
    title: 'BookShelf | Turning Pages into Next Possibility',
    description: '"BookShelf | Turning Pages into Next Possibility

A full-stack bookstore application for browsing and purchasing books online.
Key Features:

JWT-based authentication & Role-Based Access Control (RBAC).

PayPal-powered secure payment gateway with order verification.

Real-time cart management & intuitive admin dashboard.

Mobile-responsive design for seamless cross-device experience.
Tech: React, Node.js, Express, MongoDB, JWT, PayPal API"',
    image: img2,
    github: 'https://github.com/anurudha07/BookShelf/tree/master',
    live: 'https://bookshelf-server-k188.onrender.com/'
  },
  {
    title: 'ExpenX | Your Expense Tracking Partner',
    description: '"A mobile‑responsive, full stack personal finance dashboard featuring JWT‑based secureed authentication, summary cards for balance, income, and expenses, plus full CRUD for income and expense entries with update alerts. It includes interactive Bar, Pie, and Line charts, recent‑transaction previews, Excel exports, and an intuitive sidebar for seamless navigation."',
    image: img1,
    github: 'https://github.com/anurudha07/ExpenX',
    live: 'https://expenx-client.onrender.com'
  },
  {
    title: 'Kanban | Your Personal Productivity Hub',
    description: 'Kanban is a Full Stack Application- is minimal yet modern and mobile responsive design helps user access at easy across all devices. Leveraging React, Redux, Node, and MongoDB. Featuring responsive UI, smooth drag-and-drop task cards functionality, favourite section and ability to perform CRUD operations in dynamic sections with added font styling and updation in real time.',
    image: img3,
    github: 'https://github.com/anurudha07/Kanban',
    live: 'https://kanban-client-b8bj.onrender.com/'
  },
  
  
  {
    title: 'Multi-Disease Predictive Analytics Platform | A way to better lifestyle',
    description: 'Advanced predictive system build using Python and Streamlit, harnessing supervised learning algorithms to forecast the likelihood of four major disseases- Heart, Diabetes, Breast Cancer, and Parkinson’s Disease.',
    image: img4,
    github: 'https://github.com/anurudha07/Multi-Disease-Predictive-Analytics-Platform',
    live: ''
  },
  {
    title: 'Hand Gesture-Based Volume Control',
    description: 'Implemented a cutting-edge Hand Gesture-Based Volume Control system utilizing computer vision leveraging OpenCv, MediaPipe, PyAutoGUI libraries to control and maintain volume control at your finger tips.',
    image: img5,
    github: 'https://github.com/anurudha07/Hand-Gesture-Based-Volume-Control/tree/main',
    live: 'https://anurudha07.github.io/Hand-Gesture-Based-Volume-Control/'
  },
  {
    title: 'Quantum Bank | Bank Management System',
    description: 'Contributed to a group prject- Bank Management System project build using Spring Boot, incorporating user authentication and secure transaction processing & proper frontend development where i contributed in building the frontend.',
    image: img6,
    github: 'https://github.com/anurudha07/Bank-Management-System',
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


