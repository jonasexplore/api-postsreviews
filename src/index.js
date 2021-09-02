const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const typeDefs = gql`
  scalar DateTime
  type User {
    id: Int
    nome: String
    email: String
    createdAt: DateTime
    posts: [Post]
  }

  type Post {
    id: Int
    titulo: String
    conteudo: String
  }

  type Query {
    users: [User]
    postsByUser(id: Int): [Post]
    postsByReviewer(id: Int): [Post]
  }

  type Mutation {
    createUserAndPost(
      nome: String
      email: String
      titulo: String
      conteudo: String
    ): User
  }
`;

const resolvers = {
  Query: {
    users: async () =>
      await prisma.user.findMany({
        include: {
          posts: true,
        },
      }),
    postsByUser: async (_, args) =>
      await prisma.user
        .findUnique({
          where: { id: Number(args.id) },
        })
        .posts(),
    postsByReviewer: async (_, args) =>
      await prisma.review
        .findUnique({
          where: { id: Number(args.id) },
        })
        .reviewer()
        .posts(),
  },
  Mutation: {
    createUserAndPost: async (_, args) => {
      const { nome, email, titulo, conteudo } = args;

      return await prisma.user.create({
        data: {
          nome,
          email,
          posts: {
            create: {
              titulo,
              conteudo,
            },
          },
        },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: prisma });
server.listen({ port: 4000 }, () =>
  console.log(`Servidor pronto em localhost:4000`)
);
