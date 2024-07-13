import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Location {
    id: ID!
    name: String!
    type: String!
    dimension: String!
    residents: [Character!]!
    created: String!
  }

  type Query {
    locations(page: Int): LocationsData
  }

  type LocationsData {
    info: PageInfo!
    results: [Location!]!
  }
`;