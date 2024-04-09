import jwt from 'jsonwebtoken';
require('dotenv').config();
console.log(process.env.MY_SECRET_TOKEN);

const registeredUsername = process.env.REGISTERED_USERNAME;
const registeredPassword = process.env.REGISTERED_PASSWORD;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const jwtSecret = process.env.MY_SECRET_TOKEN;

    if (username === registeredUsername && password === registeredPassword) {
      console.log(username, password, registeredUsername, registeredPassword)
      console.log("Login was successful!")

      const token = jwt.sign({ username }, jwtSecret);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid username or password' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
  }
}