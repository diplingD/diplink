export class User{
    firstname: string;
    lastname: string;
    username: string;
    mail: string;
    password: string;
    skills: string[];
    bio: string;
    pictureURL: string;
    videoURL: string;
    igURL: string;
    ytURL: string;
    spotifyURL: string;
    likesCnt: number;
    dislikesCnt: number;
    city: string;
    country: string;
    comments: {
        author: string;
        comment: string;
    }[];
}