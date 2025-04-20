import { HomeComponent } from './home/home.component';
import { HOME_ROUTES } from './home-routing.module';

// This file is kept for backward compatibility
// In modern Angular (17+), we use standalone components and functional routing
export { HomeComponent };
export { HOME_ROUTES };

// This is used for lazy loading in the app.routes.ts
export default HomeComponent;
