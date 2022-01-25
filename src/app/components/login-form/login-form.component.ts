import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public formError = false;
  loginForm: FormGroup;

  constructor(public userService: UserService, public router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      masterPassword: new FormControl('')
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.formError = false;
    });
  }

  public onSubmit(): void {
    this.userService.login(this.loginForm.value).subscribe(() => {
      this.formError = false;
      void this.router.navigateByUrl('');
    }, () => {
      this.formError = true;
    });
  }
}
