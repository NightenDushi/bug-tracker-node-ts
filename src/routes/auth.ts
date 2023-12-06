import express from 'express';
const auth_router = express.Router();
import {DBData as data, Like} from '../data/comment_psql';

auth_router.get('/github', async (req, res)=>{
    //https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
    const TemporaryCode = req.query.code;
    const GithubUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.OAUTH_GITHUB_CLIENT}&client_secret=${process.env.OAUTH_GITHUB_SECRET}&code=${TemporaryCode}`;


    console.log(GithubUrl);
    const users = await fetch(GithubUrl, {method: "POST", headers: {
        "Accept": "application/json",
      },});
    const users_data = await users.json()
    console.log(users_data);
    res.send(users_data)
});

module.exports = auth_router;