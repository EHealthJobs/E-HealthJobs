import { Pool } from 'pg';

const pool = new Pool({
      user: process.env.NEXT_PUBLIC_DB_USER,
      host: process.env.NEXT_PUBLIC_DB_HOST,
      database: process.env.NEXT_PUBLIC_DB_DATABASE ,
      password:  process.env.NEXT_PUBLIC_DB_PASSWORD,
      port: process.env.NEXT_PUBLIC_DB_PORT,
      ssl: {
        rejectUnauthorized: false
      },
    }
);

export default pool;

// import { Pool } from 'pg';

// const pool = new Pool({
//       user: process.env.NEXT_PUBLIC_DB_USER,
//       host:'database-2.c5ieme620zbh.us-east-2.rds.amazonaws.com',
//       database: 'dev' ,
//       password:  'Ehjibirds01!',
//       port:5432,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     }
// );
//
// export default pool;