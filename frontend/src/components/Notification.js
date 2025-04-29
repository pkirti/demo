import React, { useState } from 'react';
import { sendNotification } from '../api';
import { Container, Typography, TextField, Button } from '@mui/material';

const Notification = () => {
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      await sendNotification({ product_id: productId, message });
      alert('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Send Notification</Typography>
      <TextField label="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSend}>Send Notification</Button>
    </Container>
  );
};

export default Notification;
