import { Routes } from '@angular/router';
import { ConvComponent } from '@components/conv/conv.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'conversations',
    canActivate: [AuthGuard],
    children: [{ path: ':id', component: ConvComponent }],
  },
];
