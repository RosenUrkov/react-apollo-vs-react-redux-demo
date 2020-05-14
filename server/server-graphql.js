const { gql, ApolloServer } = require("apollo-server");
const { v4: uuid } = require("uuid");
const data = require("./data.json");

const typeDefs = gql`
  type Recipe {
    id: ID!
    name: String!
    ingredients: [Ingredient]!
  }

  type Ingredient {
    id: ID!
    name: String!
    quantity: String!
  }

  input RecipeInput {
    name: String!
    ingredients: [IngredientInput]!
  }

  input IngredientInput {
    name: String!
    quantity: String!
  }

  type Query {
    getRecipes: [Recipe]!
  }

  type Mutation {
    addRecipe(recipe: RecipeInput): Recipe
  }
`;

const resolvers = {
  Query: {
    getRecipes() {
      return data.slice();
    },
  },
  Mutation: {
    addRecipe(_, { recipe }) {
      const createdRecipe = {
        ...recipe,
        id: uuid(),
        ingredients: recipe.ingredients.map((ing) => ({ ...ing, id: uuid() })),
      };

      data.push(createdRecipe);
      return createdRecipe;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
