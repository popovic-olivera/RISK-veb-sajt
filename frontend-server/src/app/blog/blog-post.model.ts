import { Comment } from './comments.model';

export interface BlogPost {
  _id: string;
  title: string;
  author_id: string;
  author_image: string;
  date: Date;
  header_image: string;
  url_id: string;
  content: string;
  tags: [string];
  comments: [Comment];
}
