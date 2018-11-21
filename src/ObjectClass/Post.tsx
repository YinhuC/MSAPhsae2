class Post {

    constructor(private title: string, private postID: number, private poster: Person) {

    }

    public getTitle() {
        return this.title;
    }

    public getPostID() {
        return this.postID;
    }

    public getPoster() {
        return this.poster;
    }

}
