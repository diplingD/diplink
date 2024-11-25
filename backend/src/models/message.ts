import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Message = new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    content: {
        type: String
    },
    timestamp: { type: Date, default: Date.now }
})

// Pravim model 'MessageModel', nad shemom Message, nad kolekcijom 'messages' (kolekcija u nasoj DB)
export default mongoose.model('MessageModel', Message, 'messages')