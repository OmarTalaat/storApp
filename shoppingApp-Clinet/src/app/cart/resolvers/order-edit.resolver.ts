import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Order } from '../models/order';
import { AlertifyService } from '../../services/alertify.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderEditResolver implements Resolve<Order> {


  constructor(private cartservice: CartService, private router: Router,
    private alertify: AlertifyService ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order>{
    return this.cartservice.getorderbyid(+route.params['id']).pipe(

      catchError(error => {
          this.alertify.error('Proplem retriving data');
          this.router.navigate(['/categorylist']);
          return of(null);
      })
      )
  }
}
