import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getInventory = async (locationId) => {
  try {
    const response = await axios.get(`${API_URL}/inventory`, {
      params: { location_id: locationId },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const createRestockingAlert = async (alertData) => {
  try {
    const response = await axios.post(`${API_URL}/alerts/restocking`, alertData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating restocking alert:', error);
    throw error;
  }
};

export const getSalesTrends = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/sales/trends`, {
      params: { start_date: startDate, end_date: endDate },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales trends:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const pushInventoryToERP = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/integration/erp`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error pushing inventory to ERP:', error);
    throw error;
  }
};
