const mongoose = require('mongoose');


let questionNumber = 1;

const questionSchema = new mongoose.Schema({
  question: {
    type: String, 
    required: true,
  },
  index:{
    type: Number
  },
  difficulty: {
    type : Number,
    required: true,
    validate: [validateDifficulty, 'invalid difficulty']
  },
  image_1: {
      type: String,
      required:true
    },
  image_2: {
      type: String,
      required:true
    },
  image_3: {
      type: String,
      required:false
    },
  image_4: {
      type: String,
      required:false
    },
  answer: [{
    type: String, 
    required: true
  }],
  points: {type: Number},
  hint:{
    required:true,
    type:String
  }
});
function validateDifficulty(n) {return (n <= 3 && n >= 1)}
questionSchema.pre('save', async function (next) {
  console.log("saving a new question to db");
  if(this.difficulty == 1){
    this.points == 100;
  }else if(this.difficulty == 2){
    this.points == 200;
  }else{
    this.points == 300;
  }
  this.index = questionNumber;
  questionNumber++;
  console.log("New Index set");
  next();
});
questionSchema.post('save', () => {
  console.log("question saved");
});
const Question = mongoose.model('questions', questionSchema);

module.exports = Question;