const axios = require('axios');

async function testChatbot() {
  try {
    // First, test login to get a token
    console.log('Testing chatbot...');
    
    // Create a test user first
    const registerRes = await axios.post('http://localhost:5000/api/register', {
      email: 'test@test.com',
      password: 'Test123!@#'
    }).catch(e => ({ data: { message: 'Already exists' } }));
    
    console.log('Register/Login test');
    
    // Now login
    const loginRes = await axios.post('http://localhost:5000/api/login', {
      email: 'test@test.com',
      password: 'Test123!@#'
    }, { withCredentials: true });
    
    console.log('Login successful, token:', loginRes.data.token);
    
    // Test the chatbot with the token
    const chatRes = await axios.post('http://localhost:5000/api/chatbot',
      { message: 'What is a savings account?' },
      { 
        headers: { 'Authorization': `Bearer ${loginRes.data.token}` },
        withCredentials: true
      }
    );
    
    console.log('Chatbot response:', chatRes.data.reply);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testChatbot();
