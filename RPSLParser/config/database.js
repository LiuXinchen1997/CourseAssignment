module.exports = {
    database: {
        host: 'localhost',
        database: 'rpsl',
        username: 'root',
        password: '0604',
        dialect: 'mysql'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};