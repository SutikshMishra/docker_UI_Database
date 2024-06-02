const { Pool } = require('pg');
const pool = new Pool({
  connectionString: `postgres://postgres:${encodeURIComponent("samsung@1109")}@localhost:5432/gkc_authorization`
});
module.exports = pool;
