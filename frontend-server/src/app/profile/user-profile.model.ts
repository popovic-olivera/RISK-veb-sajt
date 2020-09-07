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
  bio: string;
  occupation: string;
  webUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  portfolioUrl: string;
  exp: number;
  iat: number;
}
