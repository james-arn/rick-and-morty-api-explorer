import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Episode {
    id: ID!
    name: String!
    air_date: String!
    episode: String!
    characters: [Character!]!
    created: String!
  }

  type Query {
    episodes(page: Int): EpisodesData
  }

  type EpisodesData {
    info: PageInfo!
    results: [Episode!]!
  }
`;