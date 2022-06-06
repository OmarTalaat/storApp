import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Order } from '../models/order';
import { Product } from '../../products/models/product';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient , private authService: AuthService) { }

getactiveorder() :Observable<Order>{
  return this.http.get<Order>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/?status=Active');
}


addToCart(productId:any){
  return this.http.post(this.baseUrl + 'users/' + this.authService.decodedToken.id  +'/addproduct',productId)
}



getAllitemsinorders(orderId:number) :Observable<Item[]>{
return this.http.get<Item[]>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId+'/items' )
}

getItemdetails( orderId:number, itemId:number) : Observable<Item> {
return this.http.get<Item>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId+'/items' +itemId)
}

editItemQuantit(orderId:number,itemId:number,item:Item) {
  return this.http.put(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId+'/items/' +itemId ,item )
}


removeItem(orderId:number, itemId:number) {
  return this.http.delete<Item>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId+'/items/' +itemId)
}

getorderbyid(orderId:number) :Observable<Order>{
  return this.http.get<Order>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId);
}



orderUpdate(orderId:number ,order:Order) {
  return this.http.put<Order>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId  ,order);
}
deleteOrder (orderId:number) {
  return this.http.delete<Order>(this.baseUrl + 'users/' + this.authService.decodedToken.id +'/orders/'+orderId)
}

}
