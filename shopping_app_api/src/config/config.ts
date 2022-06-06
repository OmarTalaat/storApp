import dotenv from 'dotenv';



    dotenv.config();

    const {
        APP_SECRET,
        PORT,
        SALTROUNDS,
        TOKEN_SECRET,
        ENV
        }= process.env;

const SERVER = {
    hostname: 'localhost',
    port: PORT || 3000,
    saltRounds: SALTROUNDS,
    tOKEN_SECRET:TOKEN_SECRET ,
    APP_SECRET: APP_SECRET,
    Env:ENV,
    origin: process.env.ORIGIN || `http://localhost:${PORT}`
}

const config = { serve : SERVER}


export default config;