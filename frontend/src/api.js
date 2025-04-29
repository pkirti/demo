import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getInventory = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/inventory`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const updateInventory = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/inventory`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
};

export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const getSalesTrends = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/sales/trends`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales trends:', error);
    throw error;
  }
};

export const sendNotification = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/notifications`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
