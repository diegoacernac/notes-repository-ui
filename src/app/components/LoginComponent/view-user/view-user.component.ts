import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  userForm!: FormGroup;
  userName: string = localStorage.getItem('userName') ?? 'Información Usuario';
  userLastName: string = localStorage.getItem('userLastName') ?? 'Información Usuario';
  userDataTitle: any = null;
  editMode: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userDataTitle = this.userName + ' ' + this.userLastName;
    this.createForm();
    this.loadDataUser();
  }

  loadDataUser(): void {
    const idUserStorage = localStorage.getItem('idUser') ?? '';
    this.userService.getById(idUserStorage).subscribe((user: any) => {
      console.log(user);
      this.userForm.setValue({
        name: user.name,
        lastName: user.lastName,
      });
      this.disableControls();
    });
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  enableControls(): void {
    this.editMode = true;
    this.userForm.enable();
  }

  disableControls(): void{
    this.editMode = false;
    this.userForm.disable();
  }

  back(): void {
    this.router.navigate(['list-note']);
  }

  save(): void {

  }
}
