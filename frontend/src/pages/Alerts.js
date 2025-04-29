import React, { useState } from 'react';
import { createRestockingAlert } from '../api';
import { Typography, TextField, Button } from '@material-ui/core';

const Alerts = () => {
  const [productId, setProductId] = useState('');
  const [currentStockLevel, setCurrentStockLevel] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createRestockingAlert({ product_id: productId, current_stock_level: currentStockLevel });
      alert('Alert sent successfully');
    } catch (error) {
      console.error('Error creating restocking alert:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Restocking Alerts</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <TextField
          label="Current Stock Level"
          value={currentStockLevel}
          onChange={(e) => setCurrentStockLevel(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">Send Alert</Button>
      </form>
    </div>
  );
};

export default Alerts;
