import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";

function App() {
  const getData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setFilteredData(data);
    } catch (err) {
      console.log("error", err);
    }
  };
  const deleteRow = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setFilteredData(
      newData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  const toggleEditing = (id) => {
    if (editing.mode) {
      data.forEach((item) => {
        if (item.id === editing.id) {
          item.name = editing.name;
          item.email = editing.email;
          item.role = editing.role;
        }
      });
      setEditing({
        mode: false,
        id: "",
        name: "",
        email: "",
        role: "",
      });
    } else {
      const item = data.find((item) => item.id === id);
      setEditing({
        mode: true,
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    }
  };
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentpageData, setCurrentPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState({
    mode: false,
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [selected, setSelected] = useState([]);
  const onRowClick = (id) => {
    setEditing({
      mode: false,
      id: "",
      name: "",
      email: "",
      role: "",
    });
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const searchData = () => {
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setCurrentPageData(filteredData.slice((page - 1) * limit, page * limit));
    setSelected([]);
  }, [filteredData, page, limit]);
  return (
    <div className="min-h-[100dvh] p-2 mb-10">
      <section className="px-4 py-2 w-fit bg-base-100">
        <h1 className="text-3xl font-bold text-primary-content">
          Admin Dashboard
        </h1>
      </section>
      <section className="my-5 flex flex-row justify-between max-w-7xl mx-auto">
        <div className="flex flex-row items-center">
          <input
            className="input input-primary input-xs input-bordered rounded-sm min-w-[300px]"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchData();
                setPage(1);
              }
            }}
          />
          <button
            className="btn btn-link rounded-sm border btn-xs search-icon"
            onClick={() => {
              searchData();
              setPage(1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div>
          <div className="tooltip" data-tip="Bulk Delete">
            <button
              className="bulk-delete text-white bg-red-600 p-2 rounded-md disabled:opacity-40"
              disabled={filteredData.length === 0}
              onClick={() => {
                setData([]);
                setFilteredData([]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section className="border rounded-lg max-w-7xl mx-auto py-2">
        <table className="table table-xs table-pin-rows bg-base-300">
          <thead>
            <tr className="table-row text-primary">
              <th>
                <input
                  className="checkbox-primary checkbox rounded-sm checkbox-xs"
                  type="checkbox"
                  checked={
                    selected.length === currentpageData.length &&
                    selected.length !== 0
                  }
                  onChange={() => {
                    if (selected.length === currentpageData.length) {
                      setSelected([]);
                    } else {
                      setSelected(currentpageData.map((item) => item.id));
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {currentpageData.map((item, index) => (
              <tr
                key={index}
                className={`table-row bg-base-100 ${
                  editing.mode && item.id === editing.id
                    ? "drop-shadow-lg brightness-90"
                    : ""
                }`}
              >
                <td>
                  <input
                    className="checkbox-primary checkbox rounded-sm checkbox-xs"
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => onRowClick(item.id)}
                  />
                </td>
                <td>
                  <input
                    disabled={!(editing.mode && editing.id == item.id)}
                    onChange={(e) =>
                      setEditing((prev) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      })
                    }
                    value={
                      editing.mode && editing.id == item.id
                        ? editing.name
                        : item.name
                    }
                    className="form-control input input-primary disabled:bg-transparent disabled:border-none disabled:text-neutral disabled:cursor-default"
                  />
                </td>
                <td>
                  <input
                    disabled={!(editing.mode && editing.id == item.id)}
                    onChange={(e) =>
                      setEditing((prev) => {
                        return {
                          ...prev,
                          email: e.target.value,
                        };
                      })
                    }
                    value={
                      editing.mode && editing.id == item.id
                        ? editing.email
                        : item.email
                    }
                    className="form-control input input-primary disabled:bg-transparent disabled:border-none disabled:text-neutral disabled:cursor-default"
                  />
                </td>
                <td>
                  <input
                    disabled={!(editing.mode && editing.id == item.id)}
                    onChange={(e) =>
                      setEditing((prev) => {
                        return {
                          ...prev,
                          role: e.target.value,
                        };
                      })
                    }
                    value={
                      editing.mode && editing.id == item.id
                        ? editing.role
                        : item.role
                    }
                    className="form-control input input-primary disabled:bg-transparent disabled:border-none disabled:text-neutral disabled:cursor-default"
                  />
                </td>
                <td>
                  <div
                    className="tooltip"
                    data-tip={
                      editing.mode && editing.id === item.id ? "Save" : "Edit"
                    }
                  >
                    <button
                      className={`p-2 border rounded m-1 edit ${
                        editing.mode && editing.id === item.id ? "save" : "edit"
                      }`}
                      onClick={() => toggleEditing(item.id)}
                    >
                      {(!editing.mode || editing.id !== item.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      )}
                      {editing.mode && editing.id == item.id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete">
                    <button
                      onClick={() => deleteRow(item.id)}
                      className="p-2 border rounded m-1 text-red-600 delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="mt-5 flex flex-row justify-between">
          <div className="ml-10 flex items-center">
            <span className="text-xs">
              {selected.length} of {filteredData.length} Row(s) Selected
            </span>
            <button
              className="m-2 btn btn-sm btn-error"
              disabled={selected.length === 0}
              onClick={() => {
                const newData = data.filter(
                  (item) => !selected.includes(item.id)
                );
                setData(newData);
                setFilteredData(
                  newData.filter(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.role
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.id.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                );
                setSelected([]);
              }}
            >
              Delete Selected
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
          <Pagination
            className=""
            page={page}
            end={Math.ceil(filteredData.length / 10)}
            setPage={setPage}
          />
        </section>
      </section>
    </div>
  );
}

export default App;
