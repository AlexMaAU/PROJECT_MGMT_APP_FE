import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

export default function Clients() {
  // useQuery调用gql, useQuery 是一个用于执行 GraphQL 查询的 Hook。它的主要目的是从 GraphQL 服务器获取数据，并处理请求的状态（如加载状态和错误）
  // useQuery类似于一个state management，有自己的loading, error和返回的data数据对象
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </>
  );
}

