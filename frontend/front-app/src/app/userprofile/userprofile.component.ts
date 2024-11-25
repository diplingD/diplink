import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Komentar } from '../models/komentar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  constructor(private router: ActivatedRoute, private service: UserService, private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(){
    this.userUsername = this.router.snapshot.paramMap.get('userUsername');
    this.myUsername = this.router.snapshot.paramMap.get('myUsername');

    this.service.findUser(this.userUsername).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        this.firstname = userFromDB.firstname;
        this.lastname = userFromDB.lastname;
        this.pictureURL = userFromDB.pictureURL;
        this.videoURL = userFromDB.videoURL;
        this.sanitizedVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
        this.skills = userFromDB.skills;
        this.bio = userFromDB.bio;
        this.city = userFromDB.city;
        this.country = userFromDB.country;
        this.mail = userFromDB.mail;
        this.igLink = userFromDB.igURL;
        this.ytLink = userFromDB.ytURL;
        this.spotifyLink = userFromDB.spotifyURL;
        this.comments = userFromDB.comments;
      }
      else{
        this.message="Neocekivana greska!"
      }
    });

    // PORUKE
    this.getMessages();
  }

  // Fields:
  userUsername: string;
  myUsername: string;
  message: string;

  firstname: string;
  lastname: string;
  pictureURL: string;
  videoURL: string;
  sanitizedVideoURL: SafeResourceUrl;
  skills: string[] = [];
  bio: string;
  city: string;
  country: string;
  mail: string;
  ytLink: string;
  igLink: string;
  spotifyLink: string;
  comments: Komentar[] = [];

  commentClicked: boolean = false;
  newCommentText: string;
  addComment(){
    this.commentClicked = true;
  }
  commendAdded(){
    this.service.addComment(this.userUsername, this.myUsername, this.newCommentText).subscribe((response: any) => {
      console.log('Comment added successfully:', response);
    }, (error) => {
      console.error('Error adding comment:', error);
    });

    // Manually update the comments array on the front-end to reflect the new comment
    this.comments.push({
      author: this.myUsername,       // Use the current user's username as the author
      comment: this.newCommentText   // Use the comment text from the textarea
    });

    this.commentClicked = false;
  }

  // CHAT - PORUKE
  // PORUKE
  isChatVisible: boolean = false;
  messages: any[] = [];
  newMessage: string = '';

  getMessages() {
    this.http.get(`http://localhost:4000/users/get-messages/${this.myUsername}`)     // saljemo sendera i receivera
      .subscribe((data: any) => {
        this.messages = data;
      });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const messageData = {
        sender: this.myUsername,
        receiver: this.userUsername,
        content: this.newMessage
      };

      this.http.post('http://localhost:4000/users/send-message', messageData)
        .subscribe(() => {
          this.getMessages();     // Refresh messages
          this.newMessage = '';   // Clear input field
        });
    }
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

}
