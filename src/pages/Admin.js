//import MockData from "../MockData"
import "../assets/styles/AdminTable.css"
import Table from "../components/Table"
import { useEffect, useState } from "react"
import customAxios from "../axios"

function eliminate(arrData, arrCheck, setData, setArrCheck, URL) {
  var deleteID = []
  for (let i = 0; i < arrCheck.length; i++) {
    if (arrCheck[i]) {
      deleteID.push(arrData[i].id)
    }
  }
  if (deleteID.length > 0) {
    customAxios({
      url: URL,
      method: "delete",
      data: { _id: deleteID },
    }).catch((error) => {
      console.log(error)
    })
    var newData = []
    var newCheck = []
    for (let i = 0; i < arrCheck.length; i++) {
      if (!arrCheck[i]) {
        newData.push(arrData[i])
        newCheck.push(false)
      }
    }
    setData(newData)
    setArrCheck(newCheck)
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
  }))
}

const Admin = (isFoundation) => {
  const [arrData, setData] = useState([])
  const [arrCheck, setArrCheck] = useState([])
  const URL = isFoundation.isFoundation
    ? "http://localhost:8080/admin"
    : "http://localhost:8080/admin/users"

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Photo", accessor: "photo" },
    { Header: "Delete", accessor: "check" },
  ]
  useEffect(() => {
    customAxios
      .get(URL)
      .then((response) => {
        setData(handleData(response.data))
        setArrCheck(
          response.data.map(() => {
            return false
          })
        )
      })
      .catch((error) => {
        console.log(error)
        setData(null)
        setArrCheck(null)
      })
  }, [])

  return (
    <div>
      <div className="div-table">
        <Table
          columns={columns}
          data={arrData}
          state={arrCheck}
          setState={setArrCheck}
        />
      </div>
      <div className="check">
        <input
          type="submit"
          className="delete"
          value="Delete"
          onClick={() =>
            eliminate(arrData, arrCheck, setData, setArrCheck, URL)
          }
        />
      </div>
    </div>
  )
}

export default Admin
