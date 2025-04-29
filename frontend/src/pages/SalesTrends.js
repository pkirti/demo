import React, { useState, useEffect } from 'react';
import { getSalesTrends } from '../api';
import { Typography, List, ListItem, ListItemText, TextField, Button } from '@material-ui/core';

const SalesTrends = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesTrends, setSalesTrends] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await getSalesTrends(startDate, endDate);
      setSalesTrends(data);
    } catch (error) {
      console.error('Error fetching sales trends:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Sales Trends</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <TextField
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">Get Trends</Button>
      </form>
      <List>
        {salesTrends.map((trend) => (
          <ListItem key={trend.product_id}>
            <ListItemText primary={`Product ID: ${trend.product_id}, Sales Volume: ${trend.sales_volume}, Time Period: ${trend.time_period}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SalesTrends;
