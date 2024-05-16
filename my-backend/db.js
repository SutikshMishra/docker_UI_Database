const { Pool } = require('pg');
const pool = new Pool({
  connectionString: `postgres://postgres:${encodeURIComponent("admin@9999")}@localhost:5432/gkc_auth`
});
module.exports = pool;
