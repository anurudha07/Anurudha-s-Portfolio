import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import img1 from '../images/image1.jpg';
import img2 from '../images/image2.jpeg';
import img3 from '../images/image3.png';
import img4 from '../images/image4.jpg';
import img5 from '../images/image5.jpg';
import img6 from '../images/image6.jpg';

const Note = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.subtext};
  margin-bottom: 1rem;
  font-style: italic;
`;


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
  /* kept for optional single-line descriptions */
  color: ${props => props.theme.colors.subtext};
  margin-bottom: 0.6rem;
`;
const BulletList = styled.ul`
  margin: 0.4rem 0 1rem 1rem;
  padding: 0;
  color: ${props => props.theme.colors.subtext};
  list-style: disc;
`;
const BulletItem = styled.li`
  margin-bottom: 0.4rem;
  line-height: 1.3;
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
    bullets: [
      'Full-stack E-store featuring product listings, cart, and checkout flows ',
      'Implemented JWT-based authentication and Role-Based Access Control.',
      'Cart & checkout flow with PayPal integration and secured client - server payment verification.',
      'Admin dashboard for product, user & order -CRUD; faceted search and pagination.'
    ],
    image: img2,
    github: 'https://github.com/anurudha07/BookShelf/tree/master',
    live: 'https://bookshelf-server-k188.onrender.com/'
  },
  {
    title: 'ExpenX | Your Expense Tracking Partner',
    bullets: [
      'Mobile-responsive finance management with secure JWT authentication.',
      'Full CRUD for incomes & expenses; summary cards for balance, income, and expenses.',
      'Interactive charts (Bar, Pie, Line) using Recharts and Excel export via SheetJS.',
      'Recent-transaction previews, update alerts, and ease of use for effective insights.'
    ],
    image: img1,
    github: 'https://github.com/anurudha07/ExpenX',
    live: 'https://expenx-client.onrender.com',
    // if you later add a local video: video: '/videos/expenx-demo.mp4'
  },
  {
    title: 'Kanban | Your Personal Productivity Hub',
    bullets: [
      'Full-stack Kanban board featuring dynamic board, section, and task management.',
      'Drag-and-drop task & section management, inline editing, favorites 🖤, and rich descriptions.',
      'Responsive UI with Material-UI and optimized API endpoints for low-latency interactions.',
      'Implemented security with JWT based authentcation.'
    ],
    image: img3,
    github: 'https://github.com/anurudha07/Kanban',
    live: 'https://kanban-client-b8bj.onrender.com/'
  },
  {
    title: 'Healthify | Multi-Disease Predictive Analytics Platform',
    bullets: [
      'ML-based predictive system for Heart, Diabetes, Breast Cancer, and Parkinson’s disease.',
      'Built supervised learning models and deployed a Streamlit UI for interactive predictions.',
      'Focus on data preprocessing, model evaluation, and clear result presentation.',
      'Implemented accuracy benchmarking to 80-85% accuracy for best performance.'
    ],
    image: img4,
    github: 'https://github.com/anurudha07/Multi-Disease-Predictive-Analytics-Platform',
    live: ''
  },
  {
    title: 'VolumeStd | Hand Gesture-Based Volume Control',
    bullets: [
      'Computer-vision system build using OpenCV and MediaPipe for real-time hand gesture detection.',
      'Implemented real-time hand landmark detection to identify thumb and index fingertips.',
      'Mapped fingertip distance to volume levels for intuitive user interaction.',
      'Prototype demonstrates reliable detection and smooth control on test systems.'
    ],
    image: img5,
    github: 'https://github.com/anurudha07/Hand-Gesture-Based-Volume-Control/tree/main',
    live: 'https://anurudha07.github.io/Hand-Gesture-Based-Volume-Control/'
  },
  {
    title: 'Quantum Bank | Bank Management System',
    bullets: [
      'Group project built with Spring Boot featuring user authentication and secure transactions.',
      'Contributed primarily to frontend implementation and UI flows for management system.',
      'Focused on secure transaction processing and clean and modern UI for consumer ease.',
      'Implemented MySQL database with optimized queries for high-performance data handling.'
    ],
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
      <Note>
        #Note: Projects are hosted on Render free tier, which may take up to 50 seconds
        to load initially due to server cold start.
      </Note>
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

                {/* Render bullets if available, otherwise fallback to paragraph */}
                {proj.bullets && proj.bullets.length > 0 ? (
                  <BulletList>
                    {proj.bullets.map((b, i) => (
                      <BulletItem key={i}>{b}</BulletItem>
                    ))}
                  </BulletList>
                ) : (
                  <Description>{proj.description}</Description>
                )}

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
