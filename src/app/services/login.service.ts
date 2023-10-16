import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credential } from '../models/Credential';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
  ) {}

  login(objCreds: Credential) {
    return this.http.post<Array<Credential>>(`${environment.api}/api/v1/auth/authenticate`, objCreds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const token = body.token;
      const userData = body.user;

      localStorage.setItem('token', token);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userLastName', userData.lastName);
      localStorage.setItem('idUser', userData.id);

      return body;
    }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    location.reload();
  }
}
