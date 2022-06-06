import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../categories/models/category';
import { Product } from '../models/product';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryandproductService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient , private authService: AuthService) { }






getAllproducts(categoryId: number): Observable<Product[]> {
  return this.http.get<Product[]>(this.baseUrl + 'users/' + this.authService.decodedToken.id + '/categories/' + categoryId + '/products');
}

getproduct( categoryId: number , productId:number): Observable<Product> {
 return this.http.get<Product>(this.baseUrl + 'users/' + this.authService.decodedToken.id + '/categories/' + categoryId +'/products/' + productId);
}


}
