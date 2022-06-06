import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../app/member/model/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: '../app/app.component.html',
  styleUrls: ['../app/app.component.css']
})
export class AppComponent {
  jwtHelper = new JwtHelperService();

  title:string ='shoppingApp'


  constructor(private authService: AuthService ){}



  ngOnInit() {

const token = localStorage.getItem('token');
const user: User = JSON.parse(localStorage.getItem('user') || '{}');

if (token) {
this.authService.decodedToken = this.jwtHelper.decodeToken(token);
}
if (user) {
this.authService.currentUser = user;
}}


}
