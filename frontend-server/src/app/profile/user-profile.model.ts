import { Social } from '../organization/social.model';

export interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  administrator: boolean;
  profilePictureUrl: string;
  posts: number;
  followers: number;
  following: number;
  social_list: Social[];
  bio: string;
  exp: number;
  iat: number;
}
