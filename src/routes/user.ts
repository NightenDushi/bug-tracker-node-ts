import express from 'express';
const user_router = express.Router();
import data from '../data/user_memory';

user_router.get('/', (req, res)=>{
    res.send(data.getAll())
});
user_router.get('/:id', (req, res)=>{
    res.send(data.get(+req.params.id))
});

user_router.post('/', (req, res)=>{
    res.send(data.Add(req.body))
})
user_router.put('/:id', (req, res)=>{
    res.send(data.set(+req.params.id, req.body));
})
user_router.delete('/:id', (req, res)=>{
    res.send(data.Delete(+req.params.id));
})

module.exports = user_router;