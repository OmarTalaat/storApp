import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  username:string

  constructor( private authservice:AuthService) { }

  ngOnInit() {
    this.username = this.authservice.decodedToken.username
  }

}
