import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Product } from 'src/app/products/models/product';
import { CategoryandproductService } from '../service/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<Product[]> {
  products!:Product[]

  constructor(private productsservice: CategoryandproductService,
    private router: Router, private alertify: AlertifyService ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productsservice.getAllproducts(+route.params['id']).pipe(
      catchError(error => {
          this.alertify.error('Proplem retriving data');
          this.router.navigate(['/home']);
          return of(null);
      })
  );
  }
}
