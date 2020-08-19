export class Button {
    public icon: string;
    public color: string;

    constructor(public url: string, public text: string) {
        if (url.indexOf('github') !== -1) {
            this.icon = 'fa fa-lg fa-github';
            this.color = 'btn btn-dark';
        } else if (url.indexOf('youtube') !== -1) {
            this.icon = 'fa fa-lg fa-youtube';
            this.color = 'btn btn-danger';
        } else if (url.indexOf('docs.google') !== -1) {
            this.icon = 'fa fas fa-comments';
            this.color = 'btn btn-secondary';
        } else {
            this.icon = 'fa fas fa-lg fa-clone';
            this.color = 'btn btn-primary';
        }
    }
}