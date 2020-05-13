module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'koadb',
      user: 'postgres',
      password: 'Anvesh1122',
    },
    seeds: { directory: './seeds' },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'koa_testdb',
      user: 'postgres',
      password: 'Anvesh1122',
    }

  }
};
