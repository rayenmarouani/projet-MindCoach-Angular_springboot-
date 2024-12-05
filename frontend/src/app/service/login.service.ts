import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { user } from '../model/user';
import { Categorie } from '../model/Categorie.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8081/user';
  getUser: any;

  constructor(private http: HttpClient) {}


  login(user: { username: string; password: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  // Method to store user data locally after login
  public saveUserData(userData: any): void {
    localStorage.setItem('username', userData.username);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('email', userData.email);

     // Save the user ID
  }

  // Method to clear user data on logout
  clearUserData(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  // Getters for role and username (optional)
  getRole(): string | null {
    return localStorage.getItem('role');
  }




  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null; // Convert to number or return null
  }

  getAdminEmail(): string | null {
    return localStorage.getItem('email');
  }



  isAuthenticated(): Observable<boolean> {
    const username = localStorage.getItem('username');
    return of(!!username); // Return true if username exists, false otherwise
  }








}
