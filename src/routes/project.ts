import express from 'express';
const project_router = express.Router();
import data from '../data/project_psql';

project_router.get('/', async (req, res)=>{
    const users = await data.getAll(+req.query.user_id);
    res.send(users)
});
project_router.get('/:id', async (req, res)=>{
    const user = await data.get(+req.params.id);
    res.send(user)
});

project_router.post('/', async (req, res)=>{
    res.send(await data.Add(req.body))
})
project_router.put('/:id', async (req, res)=>{
    res.send(await data.set(+req.params.id, req.body));
})
project_router.delete('/:id', async (req, res)=>{
    res.send(await data.Delete(+req.params.id, +req.query.user_id));
})

module.exports = project_router;