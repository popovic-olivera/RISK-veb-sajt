import {Comment} from './comments.model';

export interface Blog {
  _id: string;
  title: string;
  author_id: string;
  date: Date;
  header_image: string;
  url_id: string;
  content: string;
  tags: [string];
  comments: [Comment];
}
