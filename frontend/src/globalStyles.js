import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0; padding: 0;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: 'Inter', sans-serif;
    transition: background 0.5s, color 0.5s;
    /* custom cursor as a colored circle */
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="5" fill="${encodeURIComponent(props => props.theme.colors.primary)}"/></svg>') 12 12, auto;
  }
  a {
    text-decoration: none; color: inherit; position: relative;
    &:after {
      content: '';
      position: absolute; left: 0; bottom: -2px;
      width: 100%; height: 2px;
      background: ${props => props.theme.colors.primary};
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.3s;
    }
    &:hover:after { transform: scaleX(1); }
  }
  ul, ol { margin: 0; padding: 0; list-style: none; }
  img { display: block; max-width: 100%; }
  button { font-family: inherit; }
  /* custom scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;
