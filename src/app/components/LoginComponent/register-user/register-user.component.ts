import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  save(): void {
    const {
      name,
      lastName,
      email,
      password,
    } = this.registerForm.getRawValue();

    const obj = {
      name,
      lastName,
      email,
      password,
    }

    this.userService.saveUser(obj).subscribe({
      next: response => {
        if (response.ok) {
          this.clearForm();
          this.toast.success(
            "Usuario creado con éxito!",
            "Éxito!",
            {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-top-right',
            }
          );
          this.router.navigate(['']);
        }
      },
      error: error => {
        this.toast.error(
          "Correo ya registrado.",
          "Error",
          {
            timeOut: 4000,
            closeButton: true,
            positionClass: 'toast-top-right',
          }
        );
        this.clearForm();
      }
    });
  }

  back(): void {
    this.router.navigate(['']);
  }

  clearForm(): void {
    this.registerForm.reset();
  }
}
