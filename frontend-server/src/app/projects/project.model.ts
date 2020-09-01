import { Contributors } from './contributors.model';

export interface Project {
  img: string;
  link: string;
  name: string;
  desc: string;
  contributors: Contributors[];
}
