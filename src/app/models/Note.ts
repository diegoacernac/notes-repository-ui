import { Category } from "./Category";
import { Tag } from "./Tag";

export class Note {
  id: Number = 0;
  title: string = '';
  body: string = '';
  status: boolean = true;
  registerDate: Date = new Date;
  registerUser: string = '';
  category: Category = new Category;
  tag: Tag = new Tag;
}
