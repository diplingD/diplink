import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';

const app = express();
app.use(cors())
app.use(express.json())

// Uspostavljamo konekciju sa bazom podataka
mongoose.connect('mongodb://localhost:27017/diplinkDB')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('diplinkDB connected')
})

const router = express.Router();
router.use('/users', userRouter)


app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));