import { Social } from './social.model';

export interface Person {
  img: string;
  name: string;
  role: string;
  mail: string;
  social_list: Social[];
}
