import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const { MONGODB_URI, MONGODB_DB } = process.env;

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

    // Check if the username already exists
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user document
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Insert the new user into the database
    await db.collection('users').insertOne(newUser);

    // Close the MongoDB connection
    await client.close();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
