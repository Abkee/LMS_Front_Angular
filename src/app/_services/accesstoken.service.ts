import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesstokenService {

  setAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  removeAccessToken(): void {
    localStorage.removeItem('token');
  }
}
