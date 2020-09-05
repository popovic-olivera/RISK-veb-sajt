import { Social } from '../organization/social.model';

export interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  administrator: boolean;
  profilePictureUrl: string;
  postsNum: number;
  followers: string[];
  following: string[];
  social_list: Social[];
  bio: string;
  exp: number;
  iat: number;
}
