import express from 'express';
const ticket_router = express.Router();
import data from '../data/ticket_psql';

ticket_router.get('/', async (req, res)=>{
    const users = await data.getAll();
    res.send(users)
});
ticket_router.get('/:id', async (req, res)=>{
    const user = await data.get(+req.params.id);
    res.send(user)
});

ticket_router.post('/', async (req, res)=>{
    res.send(await data.Add(req.body))
})
ticket_router.put('/:id', async (req, res)=>{
    res.send(await data.set(+req.params.id, req.body));
})
ticket_router.delete('/:id', async (req, res)=>{
    res.send(await data.Delete(+req.params.id));
})

module.exports = ticket_router;