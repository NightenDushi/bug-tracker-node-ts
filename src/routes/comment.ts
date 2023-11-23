import express from 'express';
const comment_router = express.Router();
import {DBData as data, Like} from '../data/comment_psql';

comment_router.get('/', async (req, res)=>{
    const users = await data.getAll(req.query.ticket_id?+req.query.ticket_id:-1);
    res.send(users)
});
comment_router.get('/:id', async (req, res)=>{
    const user = await data.get(+req.params.id);
    res.send(user)
});

comment_router.post('/', async (req, res)=>{
    res.send(await data.Add(req.body))
})
comment_router.put('/:id', async (req, res)=>{
    res.send(await data.set(+req.params.id, req.body));
})
comment_router.delete('/:id', async (req, res)=>{
    res.send(await data.Delete(+req.params.id, req.query.ticket_id?+req.query.ticket_id:-1));
})
comment_router.put('/like/:id', async (req, res)=>{
    res.send(await Like(+req.params.id, req.body.userId));
})

module.exports = comment_router;