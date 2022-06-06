import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { CartService } from 'src/app/cart/services/cart.service';
import { Location } from '@angular/common'
import { MessageService } from 'src/app/services/message.service';
import { Order } from 'src/app/cart/models/order';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
 @Input()  product!:Product
 @Output('update') change: EventEmitter<number> = new EventEmitter<number>();
 itemcount: number = 0;
  constructor(private cartService:CartService ,private location: Location ,
     private message:MessageService , private alertify:AlertifyService) { }

  ngOnInit() {
  }


  back(): void {
    this.location.back();
  }


  addItemToCart( id:any): void {
    let payload = {
      productId: id
    };
    this.cartService.addToCart(payload).subscribe(() => {
      this.alertify.success("your Product Add to cart Successfully")
      this.message.setCount.next(1);

    });
  }

}
