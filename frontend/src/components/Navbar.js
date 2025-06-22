import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${props => props.theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  transition: background 0.5s;
`;
const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;
const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;
const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;
const DesktopMenu = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;
const DesktopLink = styled(Link)`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  position: relative;
`;
const DesktopHire = styled.a`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  z-index: 999;
`;
const Panel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 80vw;
  max-width: 320px;
  background: ${props => props.theme.colors.cardBg};
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  box-shadow: -2px 0 10px rgba(0,0,0,0.2);
  z-index: 1000;
`;
const CloseIconWrapper = styled.div`
  align-self: flex-end;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;
const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
`;
const NavLinkStyled = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;
const HireButton = styled.a`
  margin-bottom: 2rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const Navbar = ({ themeMode, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [hireText, setHireText] = useState('Hire Me');
  const { pathname } = useLocation();

  const toggle = () => setOpen(prev => !prev);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleHireClick = () => {
    // Change text briefly
    setHireText('Opening Mail...');
    setTimeout(() => {
      setHireText('Hire Me');
    }, 3000);
    // No preventDefault: default mailto opens
  };

  // Construct mailto link to your address
  const mailto = `mailto:anurudhs567@gmail.com?subject=${encodeURIComponent('Hiring You as Full-Stack Developer')}&body=${encodeURIComponent('Hello YourName,\n\nI would like to discuss hiring you. Please let me know your availability.\n\nBest regards,\n[Your Name]')}`;

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo to="/">{'{code .}'}</Logo>
          <DesktopMenu>
            <DesktopLink to="/">Home</DesktopLink>
            <DesktopLink to="/about">About</DesktopLink>
            <DesktopLink to="/skills">Skills</DesktopLink>
            <DesktopLink to="/projects">Projects</DesktopLink>
            <DesktopLink to="/contact">Contact</DesktopLink>
            <DesktopHire
              href={mailto}
              onClick={handleHireClick}
            >
              {hireText}
            </DesktopHire>
            <ThemeToggle theme={themeMode} toggleTheme={toggleTheme} />
          </DesktopMenu>
          <MenuIcon onClick={toggle} aria-label="Open menu">
            <FaBars />
          </MenuIcon>
        </NavContainer>
      </Nav>
      <AnimatePresence>
        {open && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggle}
            />
            <Panel
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <CloseIconWrapper onClick={toggle}>&times;</CloseIconWrapper>
              <NavMenu>
                <li><NavLinkStyled to="/">Home</NavLinkStyled></li>
                <li><NavLinkStyled to="/about">About</NavLinkStyled></li>
                <li><NavLinkStyled to="/skills">Skills</NavLinkStyled></li>
                <li><NavLinkStyled to="/projects">Projects</NavLinkStyled></li>
                <li><NavLinkStyled to="/contact">Contact</NavLinkStyled></li>
              </NavMenu>
              <ThemeToggle theme={themeMode} toggleTheme={toggleTheme} />
              <HireButton
                href={mailto}
                onClick={handleHireClick}
              >
                {hireText}
              </HireButton>
            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
