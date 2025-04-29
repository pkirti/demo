import React, { useState, useEffect } from 'react';
import { getInventory } from '../api';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <Typography variant="h4">Inventory</Typography>
      <List>
        {inventory.map((item) => (
          <ListItem key={item.product_id}>
            <ListItemText primary={`Product ID: ${item.product_id}, Stock Level: ${item.stock_level}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Inventory;
