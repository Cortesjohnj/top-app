import MockData from "../MockData"
import "../assets/styles/AdminTable.css"
import FoundationsTable from "../components/FoundationsTable"
import { useEffect, useState } from "react"
import customAxios from "../axios"

function eliminate(arrData, arrCheck, setData, setArrCheck) {
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

const AdminFoundations = () => {
  const [arrData, setData] = useState(null)
  const [arrCheck, setArrCheck] = useState(null)

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Photo", accessor: "photo" },
    { Header: "Delete", accessor: "check" },
  ]

  //Get data from backend
  const clone = MockData.users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone_number,
    photo: user.photo_url,
    check: "check",
  }))

  setData(clone)
  setArrCheck(
    clone.map(() => {
      return false
    })
  )

  /** 
  useEffect(() => {
    console.log(customAxios)
    customAxios
      .get("http://localhost:8080/admin")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (arrData === null) {
    return (
      <p className="error-foundations">
        {" "}
        There is an unexpected error, please try again later{" "}
      </p>
    )
  }

  setArrCheck(
    arrData.map(() => {
      return false
    })
  )
  */

  return (
    <div>
      <div className="div-table">
        <FoundationsTable
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
          onClick={() => eliminate(arrData, arrCheck, setData, setArrCheck)}
        />
      </div>
    </div>
  )
}

export default AdminFoundations
