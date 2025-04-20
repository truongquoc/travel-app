import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor() {
    // Check if user is stored in localStorage on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }
  
  login(email: string, password: string): Observable<User> {
    // This is a mock implementation - in a real app, you would call an API
    const mockUser: User = {
      id: '1',
      email: email,
      name: email.split('@')[0]
    };
    
    // Simulate API delay
    return of(mockUser).pipe(
      delay(1000),
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  
  signup(name: string, email: string, password: string): Observable<User> {
    // This is a mock implementation - in a real app, you would call an API
    const mockUser: User = {
      id: Date.now().toString(),
      email: email,
      name: name
    };
    
    // Simulate API delay
    return of(mockUser).pipe(
      delay(1000),
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
  
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
