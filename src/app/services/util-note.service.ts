import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../components/NoteComponent/add-note/add-note.component';

@Injectable({
  providedIn: 'root',
})
export class UtilNoteService {
  constructor(
    private dialog: MatDialog
  ) {}

  addNoteDialog() {
    return this.dialog.open(AddNoteComponent, {
      width: "800px",
      height: "600px",
      disableClose: true
    });
  }
}
