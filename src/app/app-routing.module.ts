import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/LoginComponent/login/login.component";
import { ListNoteComponent } from "./components/NoteComponent/list-note/list-note.component";
import { AddNoteComponent } from "./components/NoteComponent/add-note/add-note.component";
import { authGuard } from "./helpers/auth.guard";
import { RegisterUserComponent } from "./components/LoginComponent/register-user/register-user.component";
import { ViewUserComponent } from "./components/LoginComponent/view-user/view-user.component";
import { ViewNoteComponent } from "./components/NoteComponent/view-note/view-note.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterUserComponent,
  },
  {
    path: 'view-user',
    component: ViewUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'list-note',
    component: ListNoteComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-note',
    component: AddNoteComponent,
    canActivate: [authGuard],
  },
  {
    path: 'view-note/:noteId',
    component: ViewNoteComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
}) export class AppRoutingModule {}
