import { Comment } from '../blog/comments.model';

export class Meeting {

    constructor(public _id: string,
                public title: string,
                public author_id: string,
                public date: Date,
                public description: string,
                public posterUrl: string,
                public githubRepoUrl: string,
                public presentationUrl: string,
                public photosUrl: string,
                public videoUrl: string,
                public surveyUrl: string,
                public tags: [string],
                public comments: [Comment]) {}
}