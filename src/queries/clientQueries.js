import { gql } from "@apollo/client";

// gql中定义 query 语句
export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

