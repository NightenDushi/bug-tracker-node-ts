import express from 'express';
import 'dotenv/config'
const user_router = require('./routes/user');
const ticket_router = require('./routes/ticket');
const tag_router = require('./routes/tag');
const app = express();
var cors = require('cors');
const port = 3000;

app.use(express.json({limit: '1mb'}));
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use('/user',user_router);
app.use('/ticket',ticket_router);
app.use('/tag',tag_router);

app.get('/', (req, res) => {
  res.send('Hello World! :)');
});
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});