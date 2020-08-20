import { Comment } from '../blog/comments.model';

export class Meeting {

    constructor(public title: string,
                public description: string,
                public githubRepoUrl?: string,
                public _id?: string,
                public author_id?: string,
                public date?: Date,
                public posterUrl?: string,
                public presentationUrl?: string,
                public photosUrl?: string,
                public videoUrl?: string,
                public surveyUrl?: string,
                public tags?: [string],
                public comments?: [Comment]) {}

                
}