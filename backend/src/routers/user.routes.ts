import express from 'express'
import { UserController } from '../controllers/user.controller';
import Message from '../models/message';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/findUser').post(
    (req, res)=>new UserController().findUser(req, res)
)

userRouter.route('/getAllUsers').post(
    (req, res)=>new UserController().getAllUsers(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

// PORUKE 
userRouter.post('/send-message', async (req, res) => {
    const { sender, receiver, content } = req.body;
    
    const message = new Message({
      sender,
      receiver,
      content
    });
  
    try {
      await message.save();
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
});

userRouter.get('/get-messages/:user1', async (req, res) => {
    const { user1 } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: user1 },
          { receiver: user1 }
        ]
      }).sort('timestamp');
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

userRouter.get('/get-messages-2/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { receiver: user1, sender: user1 }
      ]
    }).sort('timestamp');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// DODAVANJE KOMENTARA
userRouter.route('/addComment').post(
  (req, res)=>new UserController().addComment(req, res)
)

export default userRouter;