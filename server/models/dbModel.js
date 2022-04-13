import pg from 'pg';

const { Pool } = pg;

const PG_URI = process.env.PG_URI;

if (typeof PG_URI === 'string') console.log('Got PG_URI');

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (qry, params, callback) => {
    console.log('Executing query:', qry);
    console.log('query params:', params);
    return pool.query(qry, params, callback);
  },
  connect: () => {
    console.log('Creating connection with DB');
    return pool.connect();
  },
};

export default db;
