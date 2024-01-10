import express from 'express';
const tag_router = express.Router();
import data from '../data/tag_psql';

tag_router.get('/', async (req, res)=>{
    const users = await data.getAll(+req.query.project_id);
    res.send(users)
});
tag_router.get('/:id', async (req, res)=>{
    const user = await data.get(+req.params.id);
    res.send(user)
});

tag_router.post('/', async (req, res)=>{
    res.send(await data.Add(req.body))
})
tag_router.put('/:id', async (req, res)=>{
    res.send(await data.set(+req.params.id, req.body));
})
tag_router.delete('/:id', async (req, res)=>{
    res.send(await data.Delete(+req.params.id, +req.query.project_id));
})

module.exports = tag_router;