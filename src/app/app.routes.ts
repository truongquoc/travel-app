import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      { 
        path: 'home',
        loadChildren: () => import('./features/home/home-routing.module').then(m => m.HOME_ROUTES)
      },
      {
        path: 'search',
        loadChildren: () => import('./features/search/search-routing.module').then(m => m.SearchRoutingModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth-routing.module').then(m => m.AuthRoutingModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile-routing.module').then(m => m.ProfileRoutingModule)
      }
      // Other feature routes
    ]
  },
  // Routes that don't use the main layout (like auth pages) would go here
];
