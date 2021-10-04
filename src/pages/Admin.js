import "../assets/styles/AdminTable.css";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import customAxios from "../axios";
import Home from "../pages/Home";

function eliminate(arrData, arrCheck, setData, setArrCheck, URL) {
  var deleteID = [];
  for (let i = 0; i < arrCheck.length; i++) {
    if (arrCheck[i]) {
      deleteID.push(arrData[i].id);
    }
  }
  if (deleteID.length > 0) {
    customAxios({
      url: URL,
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

function nextPage(
  url,
  page,
  setPage,
  setData,
  setArrCheck,
  setDisableNext,
  setDisablePrev
) {
  setNewData(url + (page + 1), setData, setArrCheck, true, setDisableNext);
  setPage(page + 1);
  setDisablePrev(false);
}

function previousPage(
  url,
  page,
  setPage,
  setData,
  setArrCheck,
  setDisablePrev,
  setDisableNext
) {
  setNewData(url + (page - 1), setData, setArrCheck);
  if (page - 1 === 1) setDisablePrev(true);
  setPage(page - 1);
  setDisableNext(false);
}

function setNewData(url, setData, setArrCheck, isNext, setDisableNext) {
  customAxios
    .get(url)
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

const Admin = (isF) => {
  const [arrData, setData] = useState([]);
  const [arrCheck, setArrCheck] = useState([]);
  const [page, setPage] = useState(1);
  const url = isF.isFoundation
    ? customAxios.defaults.baseURL + "/admin?page="
    : customAxios.defaults.baseURL + "/admin/users?page=";
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

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
    <div className="AdminTable_General">
      <div className="AdminTable__divTable">
        <Table
          columns={columns}
          data={arrData}
          state={arrCheck}
          setState={setArrCheck}
        />
      </div>
      <div className="AdminTable__bottomDiv">
        <input
          type="submit"
          value="Previous"
          className="AdminTable__bottomButtons"
          onClick={() =>
            previousPage(
              url,
              page,
              setPage,
              setData,
              setArrCheck,
              setDisablePrev,
              setDisableNext
            )
          }
          disabled={disablePrev}
          data-testid="previousButton"
        />
        <input
          type="submit"
          value="Next"
          className="AdminTable__bottomButtons"
          onClick={() =>
            nextPage(
              url,
              page,
              setPage,
              setData,
              setArrCheck,
              setDisableNext,
              setDisablePrev
            )
          }
          data-testid="nextButton"
          disabled={disableNext}
        />
        <input
          type="submit"
          className="AdminTable__bottomButtons"
          value="Delete"
          onClick={() =>
            eliminate(arrData, arrCheck, setData, setArrCheck, url + page)
          }
          data-testid="deleteButton"
        />
      </div>
    </div>
  );
};

export default Admin;
