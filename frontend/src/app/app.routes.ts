import { Routes } from '@angular/router';
import { ConvProviderComponent } from './components/conv-provider/conv-provider.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ConvProviderComponent },
      { path: ':id', component: ConvProviderComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
