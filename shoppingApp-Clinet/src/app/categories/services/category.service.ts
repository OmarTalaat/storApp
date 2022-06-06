import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient , private authService: AuthService) { }


  getAllcategoriesforuser(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'users/' + this.authService.decodedToken.id + '/categories' );
   }

   getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl +'users/' + this.authService.decodedToken.id + '/categories/' + id);

  }

}
