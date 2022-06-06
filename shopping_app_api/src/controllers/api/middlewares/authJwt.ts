import UserRepo from "../../../database/repository/user.repo";
import RoleRepo from '../../../database/repository/role.repo';
import confg from '../../../config/config';
import jwt from 'jsonwebtoken';
import { NextFunction, Response , Request } from "express";



const roleRepo = new RoleRepo();



const token_secret = confg.serve.tOKEN_SECRET as string;

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader?.split(' ')[1]
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, token_secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.body.decoded = decoded;
      req.params.userId =req.body. decoded.id;
      req.body.userId = req.body.decoded.id;
      next();
    });
  };
  


 const isAdmin = (req:Request, res:Response, next:NextFunction) => {
  roleRepo.GetuserwithRoles(req.body.userId).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'Admin') {
        next();
        return;
      }
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
    return;
  });
  };

 const isModerator = (req:Request, res:Response, next:NextFunction) => {
  roleRepo.GetuserwithRoles(req.body.userId).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'Moderator') {
        next();
        return;
      }
    }
    res.status(403).send({
      message: "Require Moderator Role!"
    });
  });
  };


 const isModeratorOrAdmin = (req:Request, res:Response, next:NextFunction) => {
  roleRepo.GetuserwithRoles(req.body.userId).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'Moderator') {
        next();
        return;
      }
      if (roles[i].name === 'Admin') {
        next();
        return;
      }
    }
    res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  });
  };
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
  };
  export default authJwt;
