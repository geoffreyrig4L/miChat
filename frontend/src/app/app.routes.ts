import { Routes } from '@angular/router';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { DocsComponent } from './features/docs/docs.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'docs', component: DocsComponent },
];
