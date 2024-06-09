import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://mely020202:ESdHwtmAEVQGR3HD@test.gft6jhz.mongodb.net/', { // usar IPv4
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 segundos
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Rutas
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
