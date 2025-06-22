import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Foot = styled.footer`
  text-align: center;
  padding: 2rem 1rem;
  background: ${props => props.theme.colors.glassBg};
  backdrop-filter: blur(10px);
  margin-top: 2rem;
`;
const IconLink = styled(motion.a)`
  margin: 0 0.5rem;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
`;
const icons = [
  { comp: FaGithub, url: 'https://github.com/anurudha07?tab=repositories' },
  { comp: FaLinkedin, url: 'https://www.linkedin.com/in/anurudha-sarkar-3b77ab228/' },
  { comp: FaInstagram, url: 'https://www.instagram.com/_anurudha_/' }
];

const Footer = () => (
  <Foot>
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      © {new Date().getFullYear()} @Anurudha. All rights reserved.
    </motion.p>
    <div>
      {icons.map((icon, idx) => {
        const IconComp = icon.comp;
        return (
          <IconLink
            key={idx}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconComp />
          </IconLink>
        );
      })}
    </div>
  </Foot>
);

export default Footer;
