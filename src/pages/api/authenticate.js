// api/authenticate.js
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { MONGODB_URI, MONGODB_DB, JWT_SECRET } = process.env;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB_DB);

    // Fetch the user from the database
    const user = await db.collection('users').findOne({ username });

    // Check if the user exists and compare passwords
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ username: user.username, userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      // Close the MongoDB connection
      await client.close();

      // Return the token
      return res.status(200).json({ token });
    } else {
      // Close the MongoDB connection
      await client.close();

      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
