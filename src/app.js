"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs = require('fs');
var path = require('path');
require("dotenv/config");
var user_router = require('./routes/user');
var ticket_router = require('./routes/ticket');
var tag_router = require('./routes/tag');
var comment_router = require('./routes/comment');
var auth_router = require('./routes/auth');
var project_router = require('./routes/project');
var app = (0, express_1.default)();
var cors = require('cors');
var port = process.env.BUGTRACKER_PORT;
app.use(express_1.default.json({ limit: '1mb' }));
var whitelist = ['http://localhost:' + process.env.BUGTRACKER_PORT, 'http://localhost:5174', 'https://bug-mine.nathan-guilhot.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use('/user', user_router);
app.use('/ticket', ticket_router);
app.use('/tag', tag_router);
app.use('/comment', comment_router);
app.use('/auth', auth_router);
app.use('/project', project_router);
var static_path = 'bug-tracker-front-end/dist';
app.use(express_1.default.static(static_path));
app.use(function (req, res, next) {
    fs.readFile(path.join(static_path, '/index.html'), 'utf-8', function (err, content) {
        if (err) {
            console.log('We cannot open "index.html" file.');
        }
        console.log("Serve index.html");
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });
        res.end(content);
    });
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
