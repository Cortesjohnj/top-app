import { useTable } from "react-table"

function Table({ columns, data, state, setState }) {
  // Use the state and functions returned from useTable to build your UI
  function handleChange(position) {
    const updateState = state.map((item, index) =>
      index === position ? !item : item
    )
    setState(updateState)
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const str = String(cell.value)
                if (str.startsWith("http")) {
                  return (
                    <td {...cell.getCellProps()} className="td">
                      <img src={str} className="photos" alt="foundation"></img>
                    </td>
                  )
                } else if (str.startsWith("check")) {
                  return (
                    <td {...cell.getCellProps()} className="td">
                      <input
                        type="checkbox"
                        className="check"
                        checked={state[i]}
                        onChange={() => handleChange(i)}
                      />
                    </td>
                  )
                }
                return (
                  <td {...cell.getCellProps()} className="td">
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
