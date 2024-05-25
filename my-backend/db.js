const { Pool } = require('pg');
const pool = new Pool({
  connectionString: `postgres://postgres:${encodeURIComponent("Sutiksh@17")}@localhost:5432/gkc_auth`
});
module.exports = pool;
