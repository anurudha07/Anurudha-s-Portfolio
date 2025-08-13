import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Container = styled.section`max-width:800px;margin:80px auto;padding:0 1rem;`;
const Title = styled.h2`font-size:1.6rem;margin-bottom:1rem;text-align:center;`;
const Grid = styled(motion.div)`display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;`;
const SkillCard = styled(motion.div)`background:${(props:any) => props.theme.colors.cardBg};backdrop-filter:blur(5px);padding:1rem;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,0.1);text-align:center;position:relative;overflow:hidden;cursor:default;&:before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at center,${(props:any) => props.theme.colors.accent} 0%,transparent 70%);transform:scale(0);transition:transform 0.5s;}&:hover:before{transform:scale(1);}`;

const LogoWrapper = styled(motion.div)`width:84px;height:84px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;color:${(props:any)=>props.theme?.colors?.accent || '#6C5CE7'};`;

const skills = ['React.js','Node','Next','MongoDB','Redux','TypeScript','TailwindCSS','MySQL','HTML5','Git','REST APIs','Postman'];
const containerVariants = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } };
const itemVariants = { hidden:{ opacity:0,y:20,scale:0.9 }, visible:{ opacity:1,y:0,scale:1,transition:{ type:'spring',stiffness:300,damping:20 } } };

const LogoSVG: React.FC = () => (
  <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="currentColor" stopOpacity="0.95"/>
        <stop offset="1" stopColor="currentColor" stopOpacity="0.6"/>
      </linearGradient>
    </defs>
    {/* box + tag icon representing rental/marketplace */}
    <rect x="6" y="18" width="44" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M10 18 L22 6 L54 6 L54 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="40" cy="14" r="3" fill="url(#g)"/>
    <rect x="12" y="28" width="10" height="8" rx="1" fill="currentColor" opacity="0.06"/>
  </svg>
);

const Skills: React.FC = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container>
      <LogoWrapper
        initial={reduce ? {} : { opacity: 0, y: -8, scale: 0.95 }}
        animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        aria-hidden
      >
        <LogoSVG />
      </LogoWrapper>

      <Title>Skills</Title>

      <Grid variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }}>
        {skills.map((skill, idx) => (
          <SkillCard key={idx} variants={itemVariants} whileHover={reduce?{}:{ scale:1.05 }}>
            {skill}
          </SkillCard>
        ))}
      </Grid>
    </Container>
  );
};

export default Skills;


