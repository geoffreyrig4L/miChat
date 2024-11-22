import { Routes } from '@angular/router';
import { ConvComponent } from './components/conv/conv.component';
import { DocsComponent } from './features/docs/docs.component';
import { SignInComponent } from './features/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'conversations', component: ConvComponent },
];
