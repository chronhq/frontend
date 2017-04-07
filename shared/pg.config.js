const dev = {
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'chronist'
};

const prod = {
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'postgres', // this field must be assigned via NODE_ENV
  database: 'chronist'
};

export default process.env.NODE_ENV === 'production' ? prod : dev;
