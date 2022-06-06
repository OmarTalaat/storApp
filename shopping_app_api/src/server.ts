import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  config  from './config/config';
import routes from './routes';
import errorHandler  from './controllers/api/middlewares/error-handler'
import categories_controller from './controllers/api/category.controller';




    const app = express();
    
   /*  app.use(cors({
        "allowedHeaders": [
          'Origin', 'X-Requested-With',
          'Content-Type', 'Accept',
          'X-Access-Token', 'Authorization', 'Access-Control-Allow-Origin',
          'Access-Control-Allow-Headers',
          'Access-Control-Allow-Methods'
        ],
        "methods": 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        "preflightContinue": true,
        "origin": '*',
      })); */

      app.use(cors());
    app.use(bodyParser.urlencoded({extended: true }));
    app.use(bodyParser.json());
    
    app.use(express.urlencoded({ extended: true }))
   
    

   app.use('/api',routes);

   app.get("/", async (req, res) => {
    res.send("/api");
  });
   
/*   const port = process.env.port || 3000;
 */
   app.use(errorHandler);
    app.listen(config.serve.port, () => {
        console.log(`listening to  ${config.serve.hostname}: ${config.serve.port}`);
    })
  

export default app