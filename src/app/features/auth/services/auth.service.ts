import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { 
    // Check if user is already logged in from localStorage
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(email: string, password: string): Observable<User> {
    // In a real application, this would make an HTTP request to your backend
    // For this demo, we'll simulate a successful login if the password is valid
    if (!email || !password || password.length < 6) {
      return throwError(() => new Error('Invalid email or password'));
    }

    // Create a user object
    const user: User = {
      email,
      name: email.split('@')[0], // Just use the part before @ as the name
      isLoggedIn: true
    };

    // Simulate API delay
    return of(user).pipe(
      delay(1000), // Simulate network delay
      tap(user => {
        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(fullName: string, email: string, password: string): Observable<User> {
    // In a real application, this would make an HTTP request to your backend
    // For this demo, we'll simulate a successful registration
    if (!fullName || !email || !password || password.length < 6) {
      return throwError(() => new Error('Invalid registration data'));
    }

    // Create a user object
    const user: User = {
      email,
      name: fullName,
      isLoggedIn: true
    };

    // Simulate API delay
    return of(user).pipe(
      delay(1000), // Simulate network delay
      tap(user => {
        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
