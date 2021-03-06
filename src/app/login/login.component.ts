import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** The form object */
  myForm: FormGroup;

  /** Google icon */
  faGoogle = faGoogle;

  /** Loading State */
  loading = false;

  /** Success State */
  success = false;
  constructor(private fb: FormBuilder, public auth: AuthService, private router: Router, private message: NzMessageService) { }

  /** retrieve email and password value from user input */
  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /** Submit the form to the backend and do login verification */
  async submitHandler() {
    this.loading = true;
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    try {
      await this.auth.emailSignIn(email, password);
      this.success = true;

      await this.router.navigate(['/']);

    } catch (err) {
      this.message.error(err.message);
      console.error(err.code);
    }
    this.loading = false;
  }

}
