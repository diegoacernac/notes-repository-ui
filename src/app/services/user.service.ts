import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.api}/api/v1/user/info/${id}`);
  }

  saveUser(objUser: any) {
    return this.http.post<any>(`${environment.api}/api/v1/auth/register`, objUser, {
      observe: 'response'
    });
  }
}
