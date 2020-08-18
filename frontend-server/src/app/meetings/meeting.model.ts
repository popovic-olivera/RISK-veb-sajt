import { Comment } from '../blog/comments.model';

export class Meeting {

    constructor(_id: string,
                title: string,
                author_id: string,
                date: Date,
                description: string,
                posterUrl: string,
                githubRepoUrl: string,
                presentationUrl: string,
                photosUrl: string,
                videoUrl: string,
                surveyUrl: string,
                tags: [string],
                comments: [Comment]) {}
}