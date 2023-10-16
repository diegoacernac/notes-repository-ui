import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/Note';
import { LoginService } from 'src/app/services/login.service';
import { NoteService } from 'src/app/services/note.service';
import { UtilNoteService } from 'src/app/services/util-note.service';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.css'],
})
export class ListNoteComponent implements OnInit {
  notesArray: Array<Note> = [];
  user: string = '';

  constructor(
    private noteService: NoteService,
    private utils: UtilNoteService,
    private loginService: LoginService,
    private toast: ToastrService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem('userName') ?? 'por aquí';
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(note => {
      this.notesArray = note;
      console.log(this.notesArray);
    });
  }

  addNote(): void {
    this.route.navigate(['/add-note']);
    /* const dialogRef = this.utils.addNoteDialog();
    dialogRef.afterClosed().subscribe(res => {
      this.loadNotes();
    }); */
  }

  deleteNote(id: any): void {
    this.noteService.delete(id).subscribe((response: any) => {
      console.log(response);
    });
  }

  viewProfile(): void {
    this.route.navigate(['/view-user']);
  }

  signOut(): void {
    this.loginService.logOut();
  }

  viewNote(noteId: any): void {
    this.route.navigate(['/view-note', noteId]);
  }
}
