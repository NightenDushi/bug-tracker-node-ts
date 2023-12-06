import express from 'express';
const fs = require('fs');
const path = require('path');
import 'dotenv/config'

const user_router = require('./routes/user');
const ticket_router = require('./routes/ticket');
const tag_router = require('./routes/tag');
const comment_router = require('./routes/comment');
const auth_router = require('./routes/auth');
const app = express();
var cors = require('cors');
const port = process.env.BUGTRACKER_PORT;

app.use(express.json({limit: '1mb'}));
const whitelist = ['http://localhost:'+process.env.BUGTRACKER_PORT, 'http://localhost:5174', 'https://bug-mine.nathan-guilhot.com']

app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use('/user',user_router);
app.use('/ticket',ticket_router);
app.use('/tag',tag_router);
app.use('/comment',comment_router);
app.use('/auth',auth_router);

const static_path = 'bug-tracker-front-end/dist';
app.use(express.static(static_path))

app.use((req, res, next)=>{
    fs.readFile(path.join(static_path, '/index.html'), 'utf-8', (err, content) => {
        if (err) {
        console.log('We cannot open "index.html" file.')
        }
        console.log("Serve index.html")

        res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        })

        res.end(content)
    })
});
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});