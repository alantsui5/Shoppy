import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthService } from 'service/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /** register form group */
  rForm: FormGroup;
  constructor(private fb: FormBuilder, public auth: AuthService) { }
  /** State of Loading */
  loading = false;
  /** State of success */
  success = false;

  /** Get email, password, name from user input */
  ngOnInit() {
    this.rForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
      ]],
      name: ['',
        Validators.required,
      ],
      passwordConfirm: ['',
        Validators.required]
    });
  }

  /** send the user register request to the backend and get response */
  async registering() {
    this.loading = true;
    let name = this.rForm.value.name;
    let email = this.rForm.value.email;
    let password = this.rForm.value.password;
    await this.auth.register(email, password, name)
    this.loading = false;
  }

  /** get the validity of email input */
  get email() {
    return this.rForm.get('email');
  }

  /** get the validity of password input */
  get password() {
    return this.rForm.get('password');
  }
  /** get the validity of passwordConfirm input */
  get passwordConfirm() {
    return this.rForm.get('passwordConfirm');
  }
  /** get the validity of name input */
  get name() {
    return this.rForm.get('name');
  }

}
