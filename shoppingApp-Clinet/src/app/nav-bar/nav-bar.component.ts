import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../member/model/user';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User | undefined;
  registerdMode = false;
  values: any;
  model: any = {};
  isLoggedin: boolean | undefined;
  currentUser: User | undefined;
  refresh_token: any;
  isLoading: boolean | undefined;
  subscription: Subscription | undefined;
  username!:string;
  password!:string;
  @Input() quantity: number = 0;

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router , private message:MessageService) { }

  ngOnInit() {
    /* this.message.setCount.subscribe((msg: number) => {
      this.quantity = (this.quantity + (msg)) < 1 ? 0 : this.quantity + (msg);
    }) */

  }

  registerToggel() {
    this.registerdMode = true;
  }

  cancelRegisterMode(registerdMode: boolean) {

    this.registerdMode = registerdMode;
     }

     login() {
      this.authService.login(this.model).subscribe(next => {
       this.alertify.success('logged in successfully');
       }, error => {
         this.alertify.error(error);

       } , () => {this.router.navigate(['categorylist']); }
       );
     }
      loggedIn() {
        return this.authService.loggedIn();
     }





     logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authService.decodedToken = null;
      this.alertify.message('logged out');
      this.router.navigate(['/home']);

   }




}


