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
// process.env.PGUSER
const pgClient = new Pool({
    user: 'myappuser',
    password: 'MXFhejJ3c3g=',
    database: 'myappdb',
    host: 'mypostgres-clusterip',
    port: 5432
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
});

pgClient.query('CREATE TABLE IF NOT EXISTS przepisy (id UUID UNIQUE, nazwa VARCHAR, skladniki VARCHAR, opis VARCHAR, data TIMESTAMP, PRIMARY KEY (id))')
        .catch((err) => {
            console.log(err);
        });

//---------------------------------------


// Backend ------------------------------
// Konfiguracja własnego kontenera 'mybackend'

// curl --request GET localhost:8090
app.get("/", (req, res) => {
    pgClient.query('SELECT * FROM przepisy;', (err, respg) => {
        if (err) {
            console.log(err.stack);
        } else {
            const dane = respg.rows;
            console.log('Postgres: Odczytano listę przepisów');
            res.send(dane)
        }
    });
});

// curl --request GET localhost:8090/przepisy/fe8c0642-92e4-497c-9e5f-0f4c31545351
app.get("/przepisy/:id", (req, res) => {
    const id = req.params.id;

    redisClient.exists(id, (err, resexist) => { 
        if (resexist == 1) {

            redisClient.hgetall(id, (err, resredis) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    const dane = resredis
                    console.log(`REDIS: Odczytano przepis - ${dane.nazwa}`);
                    res.send(resredis);
                }
            });

        } else {

            pgClient.query(`SELECT * FROM przepisy WHERE id='${id}';`, (err, respg) => {
                if (err) {
                    // console.log(err.stack)
                    console.log("Postgres: Brak w bazie")
                    res.send("Brak w bazie")
                } else {
                    const dane = respg.rows[0]
                    console.log(`Postgres: Odczytano przepis - ${dane.nazwa}`)
                    res.send(respg.rows[0]);
                }
            });

        }
    })
    
});


app.put("/przepisy/edytuj/:id", (req, res) => {
    const id = req.params.id;
    const dane = req.body;

    redisClient.exists(id, (err, resexist) => {
        if (resexist == 1) {
            redisClient.hmset(`${id}`, {'nazwa': `${dane.nazwa}`, 'skladniki': `${dane.skladniki}`, 'opis': `${dane.opis}`});
            console.log(`REDIS: Zaktualizowano przepis - ${dane.nazwa}`);
        }
    });

    pgClient.query(`UPDATE przepisy SET nazwa = '${dane.nazwa}', skladniki = '${dane.skladniki}', opis = '${dane.opis}' WHERE id = '${id}';`);
    console.log(`Postgres: Zaktualizowano przepis - ${dane.nazwa}`);

    res.end();
});

// curl -d "{\"nazwa\":\"Ciasto truskawkowe\", \"skladniki\":\"maka, jajka, truskawki\", \"opis\":\"wymieszac i upiec\"}" -H "Content-Type: application/json" -X POST localhost:8090/przepisy
app.post('/przepisy/dodaj', function (req, res) {
    const dane = req.body;
    const newId = uuidv4();
    const data = new Date().toISOString();
    redisClient.hmset(`${newId}`, {'nazwa': `${dane.nazwa}`, 'skladniki': `${dane.skladniki}`, 'opis': `${dane.opis}`, 'data': `${data}`});
    pgClient.query(`INSERT INTO przepisy (id, nazwa, skladniki, opis, data) VALUES ('${newId}', '${dane.nazwa}', '${dane.skladniki}', '${dane.opis}', '${data}');`);
    res.send("Dodano przepis")
    console.log(`Dodano przepis - ${dane.nazwa}`);
    res.end();
});

app.delete('/przepisy/usun/:id', function (req, res) {
    const id = req.params.id;

    redisClient.exists(id, (err, resexist) => {
        if (resexist == 1) {
            redisClient.del(`${id}`);
            console.log(`REDIS: Usunięto przepis o id - ${id}`);
        }
    });

    pgClient.query(`DELETE FROM przepisy WHERE id = '${id}';`);
    console.log(`Postgres: Usunięto przepis o id - ${id}`);

    res.end();
});

const appId = uuidv4();
const testhost = process.env.PGHOST;
app.get('/api', (req, res) => {
    res.send(`[${appId}] Hello from mybackend server ${testhost}`);
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API nasłuchuje na porcie ${PORT}`);
});

//---------------------------------------
