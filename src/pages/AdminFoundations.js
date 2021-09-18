import MockData from "../MockData"
import "../assets/styles/AdminTable.css"
import FoundationsTable from "../components/FoundationsTable"
import { useState } from "react"

const AdminFoundations = () => {
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

  const [arrCheck, setArrCheck] = useState(
    clone.map(() => {
      return false
    })
  )
  const [arrData, setData] = useState(clone)

  function eliminate() {
    var newData = []
    var newCheck = []
    for (let i = 0; i < arrCheck.length; i++) {
      if (!arrCheck[i]) {
        newData.push(clone[i])
        newCheck.push(false)
      }
    }
    setData(newData)
    setArrCheck(newCheck)
  }

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
          onClick={() => eliminate()}
        />
      </div>
    </div>
  )
}

export default AdminFoundations
