const axios = require('axios');

const createAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      username: 'admin123',
      email: 'admin123@gmail.com',
      password: 'admin123',
      role: 'admin',
      cart: []
    });
    
    console.log('Admin created successfully:', response.data);
  } catch (error) {
    console.log('Error creating admin:', error.response?.data || error.message);
  }
};

createAdmin();