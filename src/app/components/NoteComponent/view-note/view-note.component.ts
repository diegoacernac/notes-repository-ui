import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css'],
})
export class ViewNoteComponent implements OnInit {
  noteId: any;
  viewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.params['noteId'];
    this.createForm();
    this.loadNoteData();
  }

  loadNoteData(): void {
    if (this.noteId) {
      this.noteService.getNotesById(this.noteId).subscribe((notes: any) => {
        console.log(notes);
        this.viewForm.setValue({
          category: notes.category.name,
          title: notes.title,
          body: notes.body,
        });
        this.disableControls();
      });
    }
  }

  createForm(): void {
    this.viewForm = this.formBuilder.group({
      category: [null, [Validators.required]],
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
    });
  }

  enableControls(): void {
    this.viewForm.enable();
  }

  disableControls(): void{
    this.viewForm.disable();
  }

  back(): void {
    this.router.navigate(['/list-note']);
  }
}
