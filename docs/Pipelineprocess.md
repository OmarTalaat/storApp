
# Pipeline Processing

## Database
      RDS AWS postgrase  with security group 
        I create Database and connect this dadbase with vpc 
         and make the dadbase public
 ## Backend

 in package.json in the project add  "engines" : { 
                                        "npm" : ">=8.5.0",
                                        "node" : ">=16.14.2"
                                        }
               to helpe elasticbeanstalk to install npm and nodjs

 create user from Iam in the aws console and make group admin group and give the privileges and dowenload the creadinials

 and go to terminal and  ` aws configure --profile admin` and add Access key ID and Secret access key and region and data type json
 
In the terminal add this command `eb init --profile admin`
   add app name shopping  and type of app (node js) 
Create  EB environment: ` eb create`
    Environment name: shopping-prod
create Environment properties:
    create file in root folder options.json and add  all environmentalist
      and add this command to 
       `aws elasticbeanstalk update-environment --environment-name shopping-prod --option-settings file://options.json` this command will pass all environments to elasticbeanstalk 

Add PostgreSQL connection to inbound rules of RDS security group 
   and i  Choose 5432 as port, allowing connections from the EC2 security group

and i make action restart the app to take all congiguration 

and make this command `yarn run build` and then `eb deploy` to enshour everything work 

and copy url for Backend from elasticbeanstalk 

and i tested in postman it all work fine

and add this command to main  package.json file  `backend:deploy": "cd shopping_app_api && npm run deploy`
and add this command in config.yml  to be exicuted throw pipline 
                                   ` - run:
                                        name: Back-End deploy
                                        command: |
                                        npm run backend:deploy`


## Frontend 
   - i create S3 bucket in the console and make it public and copy name of bucket
   - make build for the project `ng build`
     and create folder bin and inside this folder create file deploy.sh and add this command 
      `aws s3 cp --recursive  ./dist/shopping-app-clinet s3://nameofbucket`
      in package.json for the project add this`"deploy": "chmod +x ./bin/deploy.sh && ./bin/deploy.sh"`

 and in the main package.json add this command `frontend:deploy":"cd shoppingApp-Clinet && npm run deploy`

 create account in circleci using GitHub and connect this with project
  and add Access key ID and Secret access key and region to environments 
  and in config.yml add this command       - run:
                                               name: Front-End deploy
                                                command: |
                                                 npm run frontend:deploy
    in the environment production file add url for elasticbeanstalk 
   if you make commit to your work it will be connect to pipline and deploy any change