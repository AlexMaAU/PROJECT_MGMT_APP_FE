import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ClientRow({ client }) {
  // useMutation 是一个用于执行 GraphQL 变更（mutation）的 Hook。它用于执行数据修改操作，如创建、更新或删除记录
  // 返回值 deleteClient: 是一个函数，用于触发 mutation。你可以调用这个函数并传递变量来执行变更操作。
  const [deleteClient, { loading, error }] = useMutation(DELETE_CLIENT, {
    // variables: 这是一个可选的配置对象，用于传递变量到 mutation 中。
    variables: { id: client.id },
    // refetchQueries 是 useMutation 的一个可选配置选项，用于在 mutation 执行后重新查询指定的查询（queries）。这通常用于在执行变更操作后更新相关的 UI 数据。
    // refetchQueries 允许你指定一个或多个查询，当 mutation 完成后，这些查询会被重新执行。这样可以确保 UI 中的数据与后端数据保持同步。

    // useMutation删除数据后，存在数据无法即时更新的问题，需要手动刷新页面。有下面2种解决方案：

    // 解决方案1：refetchQueries - 重新发起网络请求可能会带来性能开销, 可能导致页面更新延迟
    // 虽然ClientRow的数据是在Clients组件中通过 useQuery(GET_CLIENTS) 获取的数据，但是这个数据是从 Apollo Client 的缓存中读取的。
    // Apollo Client 的缓存机制确保所有使用同一查询的组件都能够获取最新的数据。
    // 如果在 refetchQueries 中指定了 GET_CLIENTS，它会导致 Apollo Client 重新执行该查询，并更新缓存。这会触发所有依赖于 GET_CLIENTS 查询结果的组件重新渲染，以显示最新的数据。
    // refetchQueries: [{ query: GET_CLIENTS }],

    // 解决方案2: update - 不需要重新发起网络请求，只更新缓存，但是需要手动管理缓存的更新，可能会导致缓存一致性问题 (用户体验更好)
    // 需要更新merge policy，见App.js
    // update以后返回的数据是deleteClient
    update(cache, { data: { deleteClient } }) {
      // 从cache里获取GET_CLIENTS以后获得的数据
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      // 对cache中GET_CLIENTS以后获得的数据进行新的写入
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          // 写入的incoming数据是之前clients的数据中过滤掉不需要的数据
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

