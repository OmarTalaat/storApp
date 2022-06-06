import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../member/model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()

export class AuthService {

  baseUrl =  environment.apiUrl + 'auth/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: User;

constructor(private http: HttpClient) { }

 login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        user.user = JSON.parse(localStorage.getItem('user') || 'null');
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;

      }
    })
  );
}


isUserExist(username:string){
  return this.http.get(this.baseUrl + 'isUerNameExist?username=' + username);
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
const token = localStorage.getItem('token');
// return !this.jwtHelper.isTokenExpired(token) ;
return token != null && !this.jwtHelper.isTokenExpired(token);

}

roleMatch(allowedRoles: any[]): boolean {
  let isMatch = false;
  const userRoles = this.decodedToken.role as Array<string>;
  allowedRoles.forEach(element => {
    if (userRoles.includes(element)) {
      isMatch = true;
      return;
    }
  });
  return isMatch;
}


}
