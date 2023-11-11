//PostgreSQL Pool

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.BUGTRACKER_DB_USERNAME,
    host: 'localhost',
    database: 'bugtracker',
    password: process.env.BUGTRACKER_DB_PASSWORD,
    port: process.env.BUGTRACKER_DB_PORT,
})

export default pool;