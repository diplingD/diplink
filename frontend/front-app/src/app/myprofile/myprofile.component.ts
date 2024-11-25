import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Komentar } from '../models/komentar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit, AfterViewInit{
  constructor(private router: ActivatedRoute, private service: UserService, private sanitizer: DomSanitizer, private http: HttpClient, private myRouter: Router) { }

  ngOnInit(){
    this.username = this.router.snapshot.paramMap.get('username')!;

    this.service.findUser(this.username).subscribe((userFromDB: User)=>{
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
        this.comments = userFromDB.comments;
        this.igLink = userFromDB.igURL;
        this.ytLink = userFromDB.ytURL;
        this.spotifyLink = userFromDB.spotifyURL;
      }
      else{
        this.message="Neocekivana greska!"
      }
    });

    // PORUKE
    this.getMessages();
  }

  ngAfterViewInit(){
    
  }

  // Fields:
  username: string;
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
  comments: Komentar[] = [];
  ytLink: string;
  igLink: string;
  spotifyLink: string;


  // PORUKE
  isChatVisible: boolean = false;
  messages: any[] = [];
  newMessage: string = '';
  //currentUser: string = this.username;; // Replace with actual logged-in user
  receiver: string = 'edsheeran'; // Replace with the chat recipient

  getMessages() {
    this.http.get(`http://localhost:4000/users/get-messages/${this.username}`)     // saljemo sendera i receivera
      .subscribe((data: any) => {
        this.messages = data;
      });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const messageData = {
        sender: this.username,
        receiver: this.receiver,
        content: this.newMessage
      };

      this.http.post('http://localhost:4000/users/send-message', messageData)
        .subscribe(() => {
          this.getMessages(); // Refresh messages
          this.newMessage = ''; // Clear input field
        });
    }
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  navigateToProfile(username: string) {
    this.myRouter.navigate([`/userprofile/${username}/${this.username}`]); // Example of navigating to a profile
  }
  
}
