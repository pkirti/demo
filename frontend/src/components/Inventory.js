import React, { useState, useEffect } from 'react';
import { getInventory, updateInventory } from '../api';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [productId, setProductId] = useState('');
  const [stockLevel, setStockLevel] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateInventory({ product_id: productId, stock_level: parseInt(stockLevel) });
      fetchInventory();
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Inventory</Typography>
      <List>
        {inventory.map((item) => (
          <ListItem key={item.product_id}>
            <ListItemText primary={`${item.name} - ${item.stock_level}`} />
          </ListItem>
        ))}
      </List>
      <TextField label="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <TextField label="Stock Level" value={stockLevel} onChange={(e) => setStockLevel(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleUpdate}>Update Inventory</Button>
    </Container>
  );
};

export default Inventory;
