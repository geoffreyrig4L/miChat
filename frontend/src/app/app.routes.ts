import { Routes } from '@angular/router';

import { ConvComponent } from '@components/conv/conv.component';
import { SignInComponent } from '@components/users/sign-in/sign-in.component';
import { DocsComponent } from './components/docs/docs.component';
import { SignUpComponent } from '@components/users/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'conversations', component: ConvComponent },
];
