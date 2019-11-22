const { GraphQLServer } = require('graphql-yoga')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var Question = mongoose.model('Question',{
    text: String,
    date: { type: Date, default: Date.now },
    votes:{ type: Number, default: 0 },
    difficulty: { type: Number, default: 0 },
    sectors : [String],
    job_titles: [String]
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    questions: [Question]
  }

  type Question {
      id: ID!
      text: String!
      date: String
      votes: Int
      difficulty: Int
      sectors: [String]
      job_titles: [String]
  }

  type Mutation {
      createQuestion(text: String!): Question
      upvoteQuestion(id: ID!, votes: Int) : Boolean
      removeQuestion(id: ID!) : Boolean
      addQuestionMeta(id: ID!, sectors: [String], job_titles: [String]) : Boolean
  }
`
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    questions: () => Question.find()
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
    addQuestionMeta: async (_, {id, sectors, job_titles}) => {
        const question = await Question.findById(id=id, sectors, job_titles);
        question.sectors.append(sectors);
        question.job_titles.append(job_titles);
        await question.save();
        return true;
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once('open', function() {
    server.start(() => console.log('Server is running on localhost:4000'))
  });
