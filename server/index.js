const { GraphQLServer } = require('graphql-yoga')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var Question = mongoose.model('Question',{
    text: String,
    date: { type: Date, default: Date.now },
    votes:{ type: Number, default: 0 },
    difficulty: { type: Number, default: 0 },
    sectors : [String],
    job_titles: [String],
});

var Answer = mongoose.model('Answer',{
    text: String,
    date: { type: Date, default: Date.now },
    upvotes:{ type: Number, default: 0 },
    downvotes:{ type: Number, default: 0},
    sector : String,
    job_title: String,
    questionId: String
});

const typeDefs = `
  type Query {
    questions: [Question]
    question(id:ID!): Question
    answers: [Answer]
    answer(id:ID!): Answer
    answers_filter(questionId: String) : [Answer]
  }

  type Question {
      id: ID!
      text: String!
      date: String
      votes: Int
      difficulty: Int
      sectors: [String]
      job_titles: [String]
      answers: [Answer]
  }

  type Answer {
      id: ID!
      text: String!
      date: String
      upvotes: Int
      downvotes: Int
      sector : String!
      job_title: String!
      questionId: String!
  }

  type Mutation {
      createQuestion(text: String!): Question
      upvoteQuestion(id: ID!, votes: Int) : Boolean
      removeQuestion(id: ID!) : Boolean
      createAnswer(text: String!, sector: String!, job_title: String!, questionId: String!) : Answer
  }
`
const resolvers = {
  Query: {
    questions: () => Question.find(),
    answers: () => Answer.find(),
    question: async (_, {id}) => { return Question.findById(id) },
    answer: async (_, {id}) => { return Answer.findById(id) },
    answers_filter: async (_, {questionId}) => { return Answer.find({"questionId":questionId}) } // find by questionId
  }, 

  Mutation: {
    createQuestion: async (_, {text}) => {
        const question = new Question({ text });
        await question.save();
        return question;
    },
    upvoteQuestion: async (_, {id, votes}) => {
        await Question.findByIdAndUpdate(id, {votes});
        return true;
    },
    removeQuestion: async (_, {id}) => {
        await Question.findByIdAndRemove(id);
        return true;
    },
    createAnswer: async (_, {text, sector, job_title, questionId}) => {
        const answer = new Answer({ text, sector, job_title, questionId })
        await answer.save();
        return answer;
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once('open', function() {
    server.start(() => console.log('Server is running on localhost:4000'))
  });