import * as express from 'express';
import UserModel from '../models/user';

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let mail = req.body.mail;
        let password = req.body.password;

        UserModel.findOne({ 'mail': mail, 'password': password }).exec()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    findUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOne({ 'username': username }).exec()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    getAllUsers = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.find({ 'username': { $ne: username } }).exec()
            .then(usersList => {
                res.json(usersList);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    register = async (req: express.Request, res: express.Response) => {
        let user = new UserModel ({
            firstname: req.body.firstname,
            lastname: "",
            username: req.body.username,
            mail: req.body.mail,
            password: req.body.password,
            skills: req.body.skills,
            bio: req.body.bio,
            pictureURL: req.body.pictureURL,
            videoURL: req.body.videoURL,
            igURL: req.body.igURL,
            ytURL: req.body.ytURL,
            spotifyURL: req.body.spotifyURL,
            likesCnt: 0,
            dislikesCnt: 0,
            city: req.body.city,
            country: req.body.country,
            comments: []
        })           

        user.save()
            .then(resp => {
                res.json({'message': 'ok'});
            })
            .catch(err => {
                console.log(err);
                res.json({'message': 'error'});
            });
    }
    
    // DODAVANJE KOMENTARA
    addComment = async (req: express.Request, res: express.Response) => {
        let username = req.body.username;       // Username korisnika kojem dodajemo komentar
        let author = req.body.author;           // Autor komentara
        let commentText = req.body.commentText;     // Content komentara
    
        try {
            // Find the user by username
            let user = await UserModel.findOne({ 'username': username }).exec();
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Create a new comment object
            let newComment = {
                author: author,
                comment: commentText
            };
    
            // Add the new comment to the user's comments array
            user.comments.push(newComment);
    
            // Save the updated user document
            await user.save();
    
            res.json({ message: "Comment added successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    

}