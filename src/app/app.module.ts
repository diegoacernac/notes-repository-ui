import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './components/LoginComponent/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddNoteComponent } from './components/NoteComponent/add-note/add-note.component';
import { ListNoteComponent } from './components/NoteComponent/list-note/list-note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilNoteService } from './services/util-note.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { RegisterUserComponent } from './components/LoginComponent/register-user/register-user.component';
import { ViewUserComponent } from './components/LoginComponent/view-user/view-user.component';
import { ViewNoteComponent } from './components/NoteComponent/view-note/view-note.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListNoteComponent,
    AddNoteComponent,
    RegisterUserComponent,
    ViewUserComponent,
    ViewNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    UtilNoteService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
