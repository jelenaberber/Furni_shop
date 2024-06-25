import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return true;
    }
    const expirationDate = decodedToken.exp * 1000;
    return (new Date().getTime() > expirationDate);
  }

  login(token: string) {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }
}
