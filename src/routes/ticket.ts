import express from 'express';
const ticket_router = express.Router();
import data from '../data/ticket_memory';

ticket_router.get('/', (req, res)=>{
    res.send(data.getAll())
});
ticket_router.get('/:id', (req, res)=>{
    res.send(data.get(+req.params.id))
});

ticket_router.post('/', (req, res)=>{
    res.send(data.Add(req.body))
})
ticket_router.put('/:id', (req, res)=>{
    res.send(data.set(+req.params.id, req.body));
})
ticket_router.delete('/:id', (req, res)=>{
    res.send(data.Delete(+req.params.id));
})

module.exports = ticket_router;