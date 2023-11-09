import express from 'express';
const user_router = express.Router();
import data from '../data/user_memory';

user_router.get('/', (req, res)=>{
    res.send(data.getAll())
});
user_router.get('/:id', (req, res)=>{
    res.send(data.get(+req.params.id))
});

module.exports = user_router;