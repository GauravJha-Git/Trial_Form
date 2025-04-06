import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  watsNumber: { type: String, required: false },
  service: { type: String, required: true },
  comments: { type: String, required: false }
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;
