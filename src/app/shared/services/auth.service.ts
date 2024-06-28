import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  constructor(private router: Router) { }

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

  redirectToAdminPanel(token: string | null) {
    if(token){
      let decodedToken = this.decodeToken(token);
      if(decodedToken.role_id == 2 && !this.isTokenExpired(token)){
        this.router.navigate(['/adminPanel']);
      }
    }
  }
}
