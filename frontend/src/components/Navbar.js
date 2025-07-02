import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaHome, FaUser, FaBook, FaAward, FaCode, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

// Styled Components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${props => props.theme.colors.glassBg};
  backdrop-filter: blur(8px);
  border-bottom: 0.1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  transition: background 0.8s;
`;
const NavContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0.5rem;
`;
const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;
const MenuIcon = styled.div`
  display: none;
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

// Desktop Menu
const DesktopMenu = styled.div`
  display: flex;
  gap: 3.2rem; /* increased gap */
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;
const DesktopLink = styled(Link)`
  font-weight: 500;
  font-size: 0.98rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  text-decoration: none;
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.2s;
  }
  &:hover:after {
    width: 100%;
  }
  &:focus {
    outline: none;
  }
  &:focus:after {
    width: 0;
  }
`;
const DesktopHire = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

// Mobile Sidebar
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 99;
`;
const Panel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 75vw;
  max-width: 280px;
  height: 100vh;
  background: ${props => props.theme.colors.cardBg};
  display: flex;
  flex-direction: column;
  padding: 1.1rem;
  box-shadow: -3px 0 20px rgba(0,0,0,0.2);
  border-radius: 0 0 0 6px;
  z-index: 1000;
`;
const CloseIconWrapper = styled.div`
  align-self: flex-end;
  font-size: 1.85rem;
  cursor: pointer;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;
const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
`;
const NavItem = styled.li`
  list-style: none;
`;
const NavLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.75rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${props => props.theme.colors.hoverBg};
    color: ${props => props.theme.colors.primary};
  }
  &:focus {
    text-decoration: none;
    outline: none;
  }
`;
const HireButton = styled.a`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.6rem 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;
const BottomActions = styled.div`
  margin-top: 1.5rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Navbar = ({ themeMode, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [hireText, setHireText] = useState('Hire Me');
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const toggle = () => setOpen(prev => !prev);
  const handleHireClick = () => {
    setHireText('Opening Mail...');
    setTimeout(() => setHireText('Hire Me'), 2000);
  };
  const mailto = `mailto:anurudhs567@gmail.com?subject=${encodeURIComponent(
    'Hiring You as Full-Stack Developer'
  )}&body=${encodeURIComponent(
    'Hello YourName,\n\nI would like to discuss hiring you. Please let me know your availability.\n\nBest regards,\n[Your Name]'
  )}`;

  const links = [
    { to: '/', label: 'Home', icon: <FaHome size={18} /> },
    { to: '/about', label: 'About', icon: <FaUser size={18} /> },
    { to: '/education', label: 'Education', icon: <FaBook size={18} /> },
    { to: '/achievements', label: 'Achievements', icon: <FaAward size={18} /> },
    { to: '/skills', label: 'Skills', icon: <FaCode size={18} /> },
    { to: '/projects', label: 'Projects', icon: <FaCode size={18} /> },
    { to: '/contact', label: 'Contact', icon: <FaEnvelope size={18} /> },
  ];

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo to='/'>{'{code .}'}</Logo>
          <DesktopMenu>
            {links.map(({ to, label }) => (
              <DesktopLink key={to} to={to}>{label}</DesktopLink>
            ))}
            <DesktopHire href={mailto} onClick={handleHireClick}>
              <FaEnvelope size={14} /> {hireText}
            </DesktopHire>
            <ThemeToggle theme={themeMode} toggleTheme={toggleTheme} />
          </DesktopMenu>
          <MenuIcon onClick={toggle} aria-label='Open menu'>
            <FaBars />
          </MenuIcon>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {open && (
          <>
            <Overlay onClick={toggle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/> 
            <Panel initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <CloseIconWrapper onClick={toggle}>&times;</CloseIconWrapper>
              <NavMenu>
                {links.map(({ to, label, icon }) => (
                  <NavItem key={to}>
                    <NavLinkStyled to={to} onClick={toggle}>{icon} {label}</NavLinkStyled>
                  </NavItem>
                ))}
              </NavMenu>
              <BottomActions>
                <ThemeToggle theme={themeMode} toggleTheme={toggleTheme} />
                <HireButton href={mailto} onClick={handleHireClick}>
                   <FaEnvelope size={16} /> {hireText}
                </HireButton>
              </BottomActions>

            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
