import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String!
    origin: Location!
    location: Location!
    image: String!
    episode: [Episode!]!
    created: String!
  }

  type Query {
    characters(page: Int): CharactersData
  }

  type CharactersData {
    info: PageInfo!
    results: [Character!]!
  }

  type PageInfo {
    count: Int!
    pages: Int!
    next: Int
    prev: Int
  }
`;