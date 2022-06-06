import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/cart/models/item';
import { Order } from 'src/app/cart/models/order';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  total:number=0
  sum:number;
 @Input() subtotal!:number
  @Input() order!:Order
  items!:Item[]
  quantity:number;
  itemId:number;
  getquantity:number;
  item!:Item;
   itemcount:number;
  @Output() itemcountupdate: EventEmitter<number> =   new EventEmitter();

  constructor(private cartservice:CartService, private alertify:AlertifyService , private message:MessageService) { }

  ngOnInit() {
    this.loadItems();

   this.total= parseFloat((this.order?.total).toFixed(2))
    this.itemcount =this.order?.itemcount


  }

  loadItems() {
    this.cartservice.getAllitemsinorders(this.order?.id).subscribe((items:Item[])=>{
      this.items = items;

    })
  }




  updateItem(data:Item) {
    this.item = data;
     if (data.quantity > 0) {
      this.cartservice.editItemQuantit(this.order.id ,data.id ,data).subscribe( next =>{
        this.cartservice.getAllitemsinorders(this.order.id).subscribe((items:Item[])=>{
         this.items =items
          this.sum = parseFloat(items.filter(item => item.subtotal)
          .reduce((sum, current) => (sum + current.subtotal), 0).toFixed(2))
        // console.log('out',this.sum)
         this.total = this.sum
       })
 })
    } else {
      this.alertify.error('can not let item 0')
    }
  }


  deleteItem(data:Item){
    let index = this.items.indexOf(data);
  this.items.splice(index, 1);
  this.total -= parseFloat(data.subtotal.toFixed(2))
  this.itemcount --;
  this.itemcountupdate.emit(this.itemcount)
   this.cartservice.removeItem(this.order.id ,data.id).subscribe(()=>{
    this.items = this.items.filter(p => p.id !== data.id , 1);
    this.alertify.warning("Product remove from cart Successfully")
    this.cartservice.getAllitemsinorders(this.order.id).subscribe((items:Item[])=>{
      this.items =items
       this.sum = parseFloat(items.filter(item => item.subtotal)
       .reduce((sum, current) => (sum + current.subtotal), 0).toFixed(2))
     // console.log('out',this.sum)
      this.total = this.sum
    })



  })





  }







}



