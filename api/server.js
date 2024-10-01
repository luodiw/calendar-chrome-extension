import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import linkEndpoint from './link.js';

const app = express()

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  })
);
app.use(cors());

app.get('/', (req, res) => {
  res.send('"Welcome to your personal AI calendar assistant!🤖"')
})

app.get('/link', linkEndpoint);

app.listen(10000, '0.0.0.0', () => {
  console.log(`Server running http://0.0.0.0:10000`);
})