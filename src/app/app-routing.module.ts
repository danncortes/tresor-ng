import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MainTemplateComponent } from './components/main-template/main-template.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NoVerifiedComponent } from './components/no-verified/no-verified.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {VaultsComponent} from "./components/vaults/vaults.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '',
    component: MainTemplateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vaults',
        component: VaultsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginRegisterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'no-verified',
        component: NoVerifiedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'verify',
        component: VerifyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
