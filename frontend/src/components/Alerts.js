import React, { useState, useEffect } from 'react';
import { getAlerts } from '../api';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Restocking Alerts</Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.product_id}>
            <ListItemText primary={`${alert.name} - ${alert.stock_level} (Threshold: ${alert.threshold})`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Alerts;
