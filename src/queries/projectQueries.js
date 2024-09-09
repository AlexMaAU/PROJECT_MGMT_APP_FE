import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    # projects: 是一个字段，表示查询的目标，这个字段是 GraphQL schema 中定义的
    projects {
      # 响应结构: { id, name, status } 指定了希望从服务器获取的数据字段
      id
      name
      status
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

