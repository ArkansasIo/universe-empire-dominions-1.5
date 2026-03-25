import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Xenoberage API routes
import xenoberageRoutes from '../../backend/xenoberage/xenoberage.routes';
app.use('/api/xenoberage', xenoberageRoutes);

app.get('/', (req, res) => {
  res.send('XenobeRage API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
