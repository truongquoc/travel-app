import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule, 
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    NgIf
  ], 
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
  timeObservable: Observable<Date> = new Observable<Date>((subscriber) => {
    setInterval(() => {
      subscriber.next(new Date());
    }, 1000);
  });

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.isAuthenticated$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    
    // Subscribe to current user changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
