const express = require('express');
const cors = require('cors');
const {v4 : uuidv4} = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Redis --------------------------------
// Konfiguracja połączenia do kontenera 'myredis'

const redis = require('redis');

const redisClient = redis.createClient({
    host: 'redis-clusterip',
    port: 6379
});

//---------------------------------------


// Postgres -----------------------------
// Konfiguracja połączenia do kontenera 'mypostgres'

const { Pool } = require('pg');

const pgClient = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
});

pgClient.query('CREATE TABLE IF NOT EXISTS nowatabela (id UUID UNIQUE, nazwa VARCHAR, PRIMARY KEY (id))')
        .catch((err) => {
            console.log(err);
        });

//---------------------------------------


// Backend ------------------------------
// Konfiguracja własnego kontenera 'mybackend'

// curl --request GET localhost:8090
app.get("/app", (req, res) => {
    pgClient.query('SELECT * FROM nowatabela;', (err, respg) => {
        if (err) {
            console.log(err.stack);
        } else {
            const dane = respg.rows;
            console.log('Postgres: Odczytano dane z nowej tabeli');
            res.send(dane)
        }
    });
});

app.post('/app/dodaj', function (req, res) {
    const dane = req.body;
    const newId = uuidv4();
    const data = new Date().toISOString();
    redisClient.hmset(`${newId}`, {'nazwa': `${dane.nazwa}`});
    pgClient.query(`INSERT INTO nowatabela (id, nazwa) VALUES ('${newId}', '${dane.nazwa}');`);
    res.send("Dodano dane")
    console.log(`Dodano dane - ${dane.nazwa}`);
    res.end();
});

const appId = uuidv4();
app.get('/test', (req, res) => {
    res.send(`[${appId}] Hello from mybackend2 server`);
});


const PORT = 5001;

app.listen(PORT, () => {
    console.log(`API nasłuchuje na porcie ${PORT}`);
});

//---------------------------------------
