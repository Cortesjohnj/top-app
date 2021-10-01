import "../assets/styles/AdminTable.css";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import customAxios from "../axios";
import Home from "../pages/Home";

const Admin = (isF) => {
  const [arrData, setData] = useState([]);
  const [arrCheck, setArrCheck] = useState([]);
  const [page, setPage] = useState(1);
  const url = isF.isFoundation
    ? customAxios.defaults.baseURL + "/admin?page="
    : customAxios.defaults.baseURL + "/admin/users?page=";
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [getAll, setGetAll] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [typeSearch, setTypeSearch] = useState("_id");

  function updateSearch(e) {
    setSearchText(e.target.value);
  }

  function typeSearchF(e) {
    setTypeSearch(e.target.value);
  }

  function nextPage() {
    if (getAll) setNewData(url + (page + 1), true);
    else requestSearch(page + 1);
    setPage(page + 1);
    setDisablePrev(false);
  }

  function setNewData(thisUrl, isNext) {
    customAxios
      .get(thisUrl)
      .then((response) => {
        setData(handleData(response.data));
        setArrCheck(
          response.data.map(() => {
            return false;
          })
        );
        if (isNext) {
          if (response.data.length < 5) {
            setDisableNext(true);
          }
        }
      })
      .catch((error) => {
        setData(null);
        setArrCheck(null);
      });
  }

  function previousPage() {
    if (getAll) setNewData(url + (page - 1), false);
    else requestSearch(page - 1);
    if (page - 1 === 1) setDisablePrev(true);
    setPage(page - 1);
    setDisableNext(false);
  }

  function eliminate() {
    var deleteID = [];
    for (let i = 0; i < arrCheck.length; i++) {
      if (arrCheck[i]) {
        deleteID.push(arrData[i].id);
      }
    }
    if (deleteID.length > 0) {
      customAxios({
        url: url + page,
        method: "delete",
        data: { _id: deleteID },
      }).catch((error) => {
        console.log(error);
      });
      var newData = [];
      var newCheck = [];
      for (let i = 0; i < arrCheck.length; i++) {
        if (!arrCheck[i]) {
          newData.push(arrData[i]);
          newCheck.push(false);
        }
      }
      setData(newData);
      setArrCheck(newCheck);
    }
  }

  function requestSearch(nPage) {
    if (searchText !== "") {
      customAxios({
        url: customAxios.defaults.baseURL + "/adminSearch?page=" + nPage,
        method: "post",
        data: {
          isUser: !isF.isFoundation,
          field: typeSearch,
          value: searchText.trim(),
        },
      })
        .then((response) => {
          setData(handleData(response.data));
          setArrCheck(
            response.data.map(() => {
              return false;
            })
          );
          setGetAll(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleData(data) {
    return data.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phoneNumber,
      photo: user.photoUrl,
      check: "check",
    }));
  }

  function backHome() {
    setNewData(url + 1, setData, setArrCheck);
    setGetAll(true);
  }

  function handleKeypress(e) {
    if (e.keyCode === 13) {
      requestSearch(page);
    }
  }

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Photo", accessor: "photo" },
    { Header: "Delete", accessor: "check" },
  ];
  useEffect(() => {
    setNewData(url + 1, setData, setArrCheck);
  }, [url]);

  if (arrData === null) {
    return <Home />;
  }

  return (
    <div className="AdminTable_General" onKeyUp={handleKeypress}>
      <div className="AdminTable__divTable">
        <Table
          columns={columns}
          data={arrData}
          state={arrCheck}
          setState={setArrCheck}
        />
      </div>
      <div className="AdminTable__bottomDiv">
        <select className="AdminTable__bottomButtons" onChange={typeSearchF}>
          <option value="_id">Id</option>
          <option value="email">Email</option>
          <option value="name">Name</option>
        </select>
        <input
          type="text"
          className="AdminTable__bottomButtons"
          value={searchText}
          onChange={updateSearch}
          onSubmit={() => handleKeypress()}
        />
        <input
          type="submit"
          value="Search"
          className="AdminTable__bottomButtons"
          onClick={() => requestSearch(page)}
          onKeyPress={() => handleKeypress()}
        />
        <input
          type="submit"
          value="List All"
          className="AdminTable__bottomButtons"
          onClick={() => backHome()}
          disabled={getAll}
        />
        <input
          type="submit"
          value="Previous"
          className="AdminTable__bottomButtons"
          onClick={() => previousPage()}
          disabled={disablePrev}
        />
        <input
          type="submit"
          value="Next"
          className="AdminTable__bottomButtons"
          onClick={() => nextPage()}
          disabled={disableNext}
        />
        <input
          type="submit"
          className="AdminTable__bottomButtons"
          value="Delete"
          onClick={() => eliminate()}
        />
      </div>
    </div>
  );
};

export default Admin;
