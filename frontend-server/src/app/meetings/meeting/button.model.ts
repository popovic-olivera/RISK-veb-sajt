export class Button {
    public icon: string;
    public color: string;
    public text: string;

    constructor(public url: string, public code: string) {
        if (code.includes('github')) {
            this.icon = 'fa fa-lg fa-github';
            this.color = 'btn btn-dark';
            this.text = 'Kod';
        } else if (code.includes('video')) {
            this.icon = 'fa fa-lg fa-youtube';
            this.color = 'btn btn-danger';
            this.text = 'Video';
        } else if (code.includes('survey')) {
            this.icon = 'fa fas fa-comments';
            this.color = 'btn btn-secondary';
            this.text = 'Utisci';
        } else if (code.includes('presentation')) {
            this.icon = 'fa fas fa-lg fa-clone';
            this.color = 'btn btn-primary';
            this.text = 'Prezentacija';
        } else {
            this.icon = 'fa fas fa-lg fa-clone';
            this.color = 'btn btn-primary';
            this.text = 'Klikni';
        }
    }
}