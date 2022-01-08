import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { MainTemplateComponent } from './components/main-template/main-template.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoVerifiedComponent } from './components/no-verified/no-verified.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthInterceptor } from './auth.interceptor';
import { CredentialsListComponent } from './components/credentials-list/credentials-list.component';
import { CredentialListItemComponent } from './components/credential-list-item/credential-list-item.component';
import { CredentialFormComponent } from './components/credential-form/credential-form.component';
import { CreateNewCredentialModalComponent } from './components/create-new-credential-modal/create-new-credential-modal.component';
import { CredentialFormFieldComponent } from './components/credential-form-field/credential-form-field.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CryptDecryptInterceptor } from "./interceptors/crypt-decrypt.interceptor";
import { VaultsMenuComponent } from './components/vaults-menu/vaults-menu.component';
import { CreateNewVaultModalComponent } from './components/create-new-vault-modal/create-new-vault-modal.component';
import { VaultsComponent } from './components/vaults/vaults.component';
import { VaultListItemComponent } from './components/vault-list-item/vault-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MainTemplateComponent,
    DashboardComponent,
    NoVerifiedComponent,
    VerifyComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    WelcomeComponent,
    CredentialsListComponent,
    CredentialListItemComponent,
    CredentialFormComponent,
    CreateNewCredentialModalComponent,
    CredentialFormFieldComponent,
    ChipsComponent,
    VaultsMenuComponent,
    CreateNewVaultModalComponent,
    VaultsComponent,
    VaultListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: CryptDecryptInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
