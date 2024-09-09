import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Add new client
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: name,
      email: email,
      phone: phone,
    },
    // update以后返回的数据是addClient
    update(cache, { data: { addClient } }) {
      // 从cache里获取GET_CLIENTS以后获得的数据
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      // 对cache中GET_CLIENTS以后获得的数据进行新的写入
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          // 写入的incoming数据是之前clients的数据concat新获得的数据
          // 在 JavaScript 中，使用 concat 方法和 [] 的结合用于合并数组。concat 是 JavaScript 数组的方法，用于合并两个或多个数组。它不会修改原始数组，而是返回一个新数组，其中包含了合并后的结果。
          clients: clients.concat([addClient]),
        },
      });
    },
  });

  function onSubmit(e) {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }

    addClient();

    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

