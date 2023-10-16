import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    const {
      email,
      password,
    } = this.loginForm.getRawValue();

    const obj = {
      email,
      password,
    };

    this.loginService.login(obj).subscribe({
      next: response =>  {
        this.router.navigate(['/list-note']);
      },
      error: error => {
        this.toastr.error("Ups, algo salió mal, revisa tu usuario y clave e inténtalo una vez más.", "Error!", {
				  timeOut: 4000,
				  closeButton: true,
				  positionClass: 'toast-top-right',
			  });
      },
    });
  }

  registerUser(): void {
    this.router.navigate(['/register']);
  }
}
