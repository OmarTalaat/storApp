import * as dotenv from 'dotenv';
import {Pool} from 'pg';




dotenv.config();

const {
POSTGRES_host,
POSTGRES_USER,
POSTGRES_PASSWORD,
POSTGRES_DATABASE,
POSTGRES_DATABASE_TEST,
NODE_ENV ,
RDS_CONNECTION_URL
}= process.env;


const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_host}:5432/${POSTGRES_DATABASE}`


let client = new Pool();

    /*  if(Env  === 'test') {
       
        client = new Pool({
          host: POSTGRES_host,
          database: POSTGRES_DATABASE_TEST,
          user: POSTGRES_USER,
          password: POSTGRES_PASSWORD,
        })
      } */
      if(NODE_ENV  ==='dev') {
        client = new Pool({
          host: POSTGRES_host,
          database: POSTGRES_DATABASE,
          user: POSTGRES_USER,
          password: POSTGRES_PASSWORD
        })
      }
  /*     if(Env  ==='dev') {
        client = new Pool({
          host: POSTGRES_host,
          database: POSTGRES_DATABASE,
          user: POSTGRES_USER,
          password: POSTGRES_PASSWORD
        })
      } */



   
client.connect();



export default client;