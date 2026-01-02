import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';

const app = express()
app.use(bodyParser.json());
app.use(cors());


app.use('/chat', chatRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})
