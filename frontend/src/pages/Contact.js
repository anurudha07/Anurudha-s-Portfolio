import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Container = styled.section`
  max-width: 600px;
  margin: 80px auto;
  padding: 0 1rem;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.colors.cardBg};
  backdrop-filter: blur(5px);
  box-shadow: inset 2px 2px 5px rgba(0,0,0,0.1);
  color: ${props => props.theme.colors.text};
  transition: box-shadow 0.3s;
  &:focus {
    outline: none;
    box-shadow: inset 2px 2px 10px rgba(0,0,0,0.2);
  }
`;
const Textarea = styled.textarea`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.colors.cardBg};
  backdrop-filter: blur(5px);
  box-shadow: inset 2px 2px 5px rgba(0,0,0,0.1);
  color: ${props => props.theme.colors.text};
  resize: vertical;
  transition: box-shadow 0.3s;
  &:focus {
    outline: none;
    box-shadow: inset 2px 2px 10px rgba(0,0,0,0.2);
  }
`;
const Button = styled.button`
  padding: 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  transition: transform 0.2s, background 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.theme.colors.accent};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
const Message = styled.p`
  /* transient prop $success to avoid DOM prop warning */
  color: ${props => (props.$success ? '#2ecc71' : '#e74c3c')};
  text-align: center;
  margin-top: 1rem;
`;

const Contact = () => {
  const reduce = usePrefersReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // { success: bool, msg: string }
  const [sending, setSending] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = e => {
    e.preventDefault();
    setStatus(null);

    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ success: false, msg: 'Please fill in all fields.' });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ success: false, msg: 'Please enter a valid email address.' });
      return;
    }

    // Build mailto link
    const to = 'anurudhs567@gmail.com';
    const subject = encodeURIComponent(`Portfolio Contact from ${name.trim()}`);
    // Body: include name, email, message
    const bodyLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      '',
      'Message:',
      message.trim()
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;

    // Trigger mail client
    setSending(true);
    // Small delay to re-enable form after mail client opens
    window.location.href = mailtoLink;
    // After redirecting to mail client, we reset state (though user stays in mail client)
    setTimeout(() => {
      setSending(false);
      setFormData({ name: '', email: '', message: '' });
      setStatus({ success: true, msg: 'Mail client opened. Please send the email.' });
    }, 1000);
  };

  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : { opacity: 0 }}
      animate={reduce ? {} : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Title>Contact</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          disabled={sending}
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          disabled={sending}
        />
        <Textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          disabled={sending}
        />
        <Button type="submit" disabled={sending}>
          {sending ? 'Opening mail client...' : 'Send Message'}
        </Button>
      </Form>
      {status && <Message $success={status.success}>{status.msg}</Message>}
    </Container>
  );
};

export default Contact;
