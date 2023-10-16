import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Note } from '../models/Note';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private http: HttpClient
  ) {}

  getNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(`${environment.api}/api/v1/notes/status`);
  }

  getNotesById(id: number): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(`${environment.api}/api/v1/notes/active/${id}`);
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${environment.api}/api/v1/categories`);
  }

  getTags(): Observable<Array<Tag>> {
    return this.http.get<Array<Tag>>(`${environment.api}/api/v1/tags`);
  }

  public save(objNote: any) {
    return this.http.post<Note>(`${environment.api}/api/v1/notes`, objNote);
  }

  delete(id: any) {
    return this.http.put<Note>(`${environment.api}/api/v1/notes/delete/${id}`,
    {
      observe: 'response'
    })
    .pipe(map( response => response ));
  }
}
