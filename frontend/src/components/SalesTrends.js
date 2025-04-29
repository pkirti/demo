import React, { useState } from 'react';
import { getSalesTrends } from '../api';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const SalesTrends = () => {
  const [trends, setTrends] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchTrends = async () => {
    try {
      const data = await getSalesTrends({ start_date: startDate, end_date: endDate });
      setTrends(data);
    } catch (error) {
      console.error('Error fetching sales trends:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Sales Trends</Typography>
      <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      <Button variant="contained" color="primary" onClick={fetchTrends}>Fetch Trends</Button>
      <List>
        {trends.map((trend) => (
          <ListItem key={trend.date}>
            <ListItemText primary={`${trend.date} - ${trend.sales}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SalesTrends;
