const axios = require('axios');
require('dotenv').config();
const refreshIdToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      'https://securetoken.googleapis.com/v1/token?key=AIzaSyBz4zjjt9aIp5pVk-Z5M9t88OtCT4Z39sk',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }
    );
    console.log("response.data from new token generator",response.data);
console.log("new IdToken",response.data.id_token);
    return response.data.id_token; 
  } catch (error) {
    console.error('Error refreshing ID token:', error.response?.data || error.message);
    throw new Error('Unable to refresh ID token');
  }
};

module.exports = { refreshIdToken };
