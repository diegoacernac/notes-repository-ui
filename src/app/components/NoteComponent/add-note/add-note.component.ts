import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ListNoteComponent } from '../list-note/list-note.component';
import { Tag } from 'src/app/models/Tag';
import { Category } from 'src/app/models/Category';
import { NoteService } from 'src/app/services/note.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  categoriesArray: Array<Category> = [];
  tagsArray: Array<Tag> = [];
  noteForm!: FormGroup;
  currentDate!: Date;
  selectedTags: Array<Tag> = [];
  userName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ListNoteComponent>,
    private noteService: NoteService,
    public toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadResources();
    this.currentDate = new Date();
    this.userName = localStorage.getItem('userName') ?? 'por aquí';
  }

  createForm(): void {
    this.noteForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
      /* tag: [null] */
    });
  }

  loadResources(): void {
    const calls = [
      this.noteService.getCategories(),
      this.noteService.getTags(),
    ];

    forkJoin(calls).subscribe(([
      categorie, tag
    ]) => {
      this.categoriesArray = categorie;
      this.tagsArray = tag;
    })
  }

  back(): void {
    //this.dialogRef.close();
    this.router.navigate(['/list-note']);
  }

  setCategory(categoryId: number) {
    const selectedCategory = this.categoriesArray.find(cat => categoryId == cat.id);
    return selectedCategory;
  }

  toggleTagSelection(event: any, tag: Tag): void {
    const tagIndex = this.selectedTags.findIndex(selectedTag => selectedTag.id === tag.id);

    if (tagIndex !== -1) {
      this.selectedTags.splice(tagIndex, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  save(): void {
    this.currentDate = new Date();
    const {
      title,
      body,
    } = this.noteForm.getRawValue();

    const objNote = {
      category: this.setCategory(this.noteForm.controls['category'].getRawValue()),
      title,
      body,
      status: true,
      registerDate: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'/* +'T'+'HH:mm:ss.SSSX' */),
      registerUser: 'Diego Cerna',
      tag: this.selectedTags.map(tag => ({
        id: tag.id,
        name: tag.name,
        status: tag.status
      })),
    };
    this.noteService.save(objNote).subscribe((res) => {
      this.toastr.success("Control guardado correctamente...", "Éxito!", {
				timeOut: 3000,
				closeButton: true,
				positionClass: 'toast-top-right',
			});
      this.router.navigate(['list-note']);
      /* this.dialogRef.close(true); */
    })
  }
}
