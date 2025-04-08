import {InferSchemaType, model, Schema} from "mongoose";

const noteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    text: {type: String},
}, {timestamps: true});
//timestamps is outside because it does not require user input and can be auto added

//new type for typescript
type Note = InferSchemaType<typeof noteSchema>;

//exports a model of the new type we made with name note to mongodb
export default model<Note>("Note", noteSchema);