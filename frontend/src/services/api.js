import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Backend URL

export const analyzeSeo = async (url) => {
  const response = await axios.post(`${API_URL}/analyze-seo`, { url });
  return response.data;
};

export const analyzeImages = async (url) => {
  const response = await axios.post(`${API_URL}/analyze-images`, { url });
  return response.data;
};
