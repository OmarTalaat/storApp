import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/cart/models/order';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';
import {default as countryList} from '../../../../../assets/countryName.json';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
 @Input() order!:Order

@ViewChild('editForm', {static: true}) editForm: NgForm;
username: string
status: string = 'Complete';
public countryList: {countryName: string , code: string} [] = countryList;



  constructor(private authservice:AuthService ,private cartservice:CartService ,
    private alertify:AlertifyService , private router: Router) { }

  ngOnInit() {
    this.username = this.authservice.decodedToken.username

  }

  changeCountry(e: { target: { value: string; }; }) {
    this.countryName!.setValue(e.target.value, {
      onlySelf: true
    });
  }
  get countryName() {
    return this.editForm.value.countryName;
  }

  submitForm() {
    console.log('form edit', this.editForm.valid);
    let value = this.editForm.value;
    let updatedOrder:Order = {  id: this.order.id,
                                status: this.status,
                                total:this.order.total,
                                adress: value.adress ,
                                countryName:value.countryName,
                                zip: value.zip,
                                nameoncard:value.nameoncard ,
                                creditcardNumber:value.creditcardNumber ,
                                exirationDate: value.exirationDate ,
                                cvv:value.cvv }

   // console.log(updatedOrder)
   this.cartservice.orderUpdate(this.order.id , updatedOrder).subscribe(next => {
     this.alertify.success('your order is complete thanks to be with us')
     this.router.navigate(['/cart',this.order.id]);
   })

  }




}
