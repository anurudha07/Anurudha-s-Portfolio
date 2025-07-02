import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Container = styled.section`
  max-width: 500px;
  margin: 80px auto;
  padding: 0 0.75rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
  letter-spacing: 0.5px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const Input = styled.input`
  padding: 0.65rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  background: ${props => props.theme.colors.cardBg};
  box-shadow: inset 1px 1px 3px rgba(0,0,0,0.08);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: inset 1px 1px 5px rgba(0,0,0,0.1);
  }
`;
const Textarea = styled.textarea`
  padding: 0.65rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  background: ${props => props.theme.colors.cardBg};
  box-shadow: inset 1px 1px 3px rgba(0,0,0,0.08);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: inset 1px 1px 5px rgba(0,0,0,0.1);
  }
`;
const Button = styled.button`
  padding: 0.65rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: transform 0.15s ease, background 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.colors.accent};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;
const Message = styled.p`
  color: ${props => (props.$success ? '#27ae60' : '#c0392b')};
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.9rem;
`;

const Contact = () => {
  const reduce = usePrefersReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = e => {
    e.preventDefault();
    setStatus(null);
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ success: false, msg: 'All fields are required.' });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ success: false, msg: 'Invalid email address.' });
      return;
    }

    const to = 'anurudhs567@gmail.com';
    const subject = encodeURIComponent(`Contact from ${name.trim()}`);
    const body = encodeURIComponent([`Name: ${name.trim()}`, `Email: ${email.trim()}`, '', message.trim()].join('\n'));

    setSending(true);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setFormData({ name: '', email: '', message: '' });
      setStatus({ success: true, msg: 'Mail client opened. Please send.' });
    }, 1000);
  };

  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : { opacity: 0, y: 20 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Get in Touch</Title>
      <Form onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} disabled={sending} />
        <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={sending} />
        <Textarea name="message" rows="4" placeholder="Message" value={formData.message} onChange={handleChange} disabled={sending} />
        <Button type="submit" disabled={sending}>{sending ? 'Opening...' : 'Send Message'}</Button>
      </Form>
      {status && <Message $success={status.success}>{status.msg}</Message>}
    </Container>
  );
};

export default Contact;
