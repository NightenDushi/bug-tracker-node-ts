import express from 'express';
const user_router = express.Router();
import data from '../data/user_psql';

user_router.get('/', async (req, res)=>{
    const users = await data.getAll();
    res.send(users)
});
user_router.get('/:id', async (req, res)=>{
    const user = await data.get(+req.params.id);
    res.send(user)
});

user_router.post('/', async (req, res)=>{
    res.send(await data.Add(req.body))
})
user_router.put('/:id', async (req, res)=>{
    res.send(await data.set(+req.params.id, req.body));
})
user_router.delete('/:id', async (req, res)=>{
    res.send(await data.Delete(+req.params.id));
})

module.exports = user_router;