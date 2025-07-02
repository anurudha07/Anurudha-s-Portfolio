import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Container = styled.section`max-width:800px;margin:80px auto;padding:0 1rem;`;
const Title = styled.h2`font-size:1.6rem;margin-bottom:1rem;text-align:center;`;
const Grid = styled(motion.div)`display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;`;
const SkillCard = styled(motion.div)`background:${props => props.theme.colors.cardBg};backdrop-filter:blur(5px);padding:1rem;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,0.1);text-align:center;position:relative;overflow:hidden;cursor:default;&:before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at center,${props => props.theme.colors.accent} 0%,transparent 70%);transform:scale(0);transition:transform 0.5s;}&:hover:before{transform:scale(1);}`;
const skills = ['JavaScript','React','Node.js','Express','MongoDB','Vue.js','HTML5','CSS3','Git','REST APIs','Redux','Java','Springboot','MySQL'];
const containerVariants = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } };
const itemVariants = { hidden:{ opacity:0,y:20,scale:0.9 }, visible:{ opacity:1,y:0,scale:1,transition:{ type:'spring',stiffness:300,damping:20 } } };

const Skills = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container>
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
