import express from 'express';
import twitterRoutes from './routes/twitterRoute';

const app = express();
const PORT = 5001;

app.use(express.json());

app.use('/api', twitterRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
