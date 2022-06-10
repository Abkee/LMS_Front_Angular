import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../_models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri = 'https://localhost:7052/api/Authenticate/login';
  token: string | undefined;
 
  constructor(private http: HttpClient,private router: Router) { }
  login(loginform:Login):  Observable<any>{
    return this.http.post(this.uri, loginform);
  }
}
