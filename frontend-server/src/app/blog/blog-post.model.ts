import { Comment } from './comments.model';

export interface BlogPost {
  _id: string;
  title: string;
  author_id: string;
  author_image: string;
  author_first_name: string;
  author_last_name: string;
  date: Date;
  header_image: string;
  url_id: string;
  desc: string;
  content: string;
  tags: [string];
  comments: [Comment];
}
