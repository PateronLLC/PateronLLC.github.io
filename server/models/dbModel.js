import pg from 'pg';

const { Pool } = pg;

const PG_URI = process.env.PG_URI;

console.log('Got PG_URI');

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (qry, params, callback) => {
    console.log('Executing query:', qry);
    console.log('query params:', params);
    return pool.query(qry, params, callback);
  },
};

export default db;
