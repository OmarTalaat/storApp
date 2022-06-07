# Infrastructure 

 ## Database
      RDS AWS postgrase  with security group  in vpc public 

 ## Backend
      using elasticbeanstalk it will create 
       - loadbalncer to organize the ports in the app
       - EC2 to act as virsual machine that will hold the app and install all dependency and run the app
       - 2 security group one for the app and the other for loadbalncer
       - s3 bucket hold the zip file of app  
 

## Frontend 
     using s3 bucket and it well be public that hold the dist file 
 