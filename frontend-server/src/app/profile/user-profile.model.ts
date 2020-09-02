export interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  administrator: boolean,
  profilePictureUrl: string;
  exp: number;
  iat: number;
}
