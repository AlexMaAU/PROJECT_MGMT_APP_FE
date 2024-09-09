import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
  # 在 GraphQL 查询中，前缀 $ 表示这是一个变量，而不是一个常量或字段名
  # ! 是一个修饰符，表示该变量是必需的
  # 定义了一个名为 deleteClient 的 GraphQL mutation，它接受一个名为 $id 的变量，这个变量的类型是 ID!
  mutation deleteClient($id: ID!) {
    # 调用 deleteClient mutation 并将变量 $id 作为参数传递给 mutation 的 id 字段
    deleteClient(id: $id) {
      # 请求的响应结构，指定了希望从服务器获取的字段
      id
      name
      email
      phone
    }
  }
`;

// 实际发送到服务器的请求会如下所示：
// mutation {
//   deleteClient(id: "12345") {
//     id
//     name
//     email
//     phone
//   }
// }

export const ADD_CLIENT = gql`
  # 类型名称是在后端的 GraphQL Schema 中定义的，后端怎么定义这里就要怎么使用
  # String: 表示一个字符串类型。在 GraphQL Schema 中，标量类型是基本类型，用于定义单个值。
  # Int: 表示一个整数类型。
  # Float: 表示一个浮点数类型。
  # Boolean: 表示一个布尔值类型。
  # ID: 表示一个唯一标识符，通常是字符串类型，用于唯一标识一个对象。
  mutation addClient($name: String!, $phone: String!, $email: String!) {
    addClient(name: $name, phone: $phone, email: $email) {
      id
      name
      phone
      email
    }
  }
`;

