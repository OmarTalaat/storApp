import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient , private authService: AuthService) { }

getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);

}
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users/' + this.authService.decodedToken.id  );
 }


updateUser( user: User) {
 return this.http.put(this.baseUrl + 'users/' + this.authService.decodedToken.id , user);
}



}
