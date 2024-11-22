import { Routes } from '@angular/router';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { DocsComponent } from './docs/docs.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'docs', component: DocsComponent },
];
