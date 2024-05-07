import React, { useEffect, useState } from "react";

function CommonTable({ tableList, handleClick }) {
  // for Bulk select
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllRowsSelected, setIsAllRowsSelected] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableList.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Handler for toggling all rows selection
  // Handler for toggling all rows selection
  const handleSelectAllRows = () => {
    const allRowIds = currentItems.map((row) => row.id);
    setSelectedRows(isAllRowsSelected ? [] : allRowIds);
    setIsAllRowsSelected(!isAllRowsSelected);
  };

  // Handler for toggling individual row selection
  const handleRowCheckboxChange = (id) => {
    let updatedSelectedRows = [...selectedRows];
    if (updatedSelectedRows.includes(id)) {
      updatedSelectedRows = updatedSelectedRows.filter((rowId) => rowId !== id);
    } else {
      updatedSelectedRows.push(id);
    }
    setSelectedRows(updatedSelectedRows);
    setIsAllRowsSelected(updatedSelectedRows.length === currentItems.length);
  };

  return (
    <div>
      {" "}
      <button className="add-button" onClick={() => handleClick(selectedRows)}>
        Assign{" "}
      </button>
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="table__header">
              <input
                type="checkbox"
                onChange={handleSelectAllRows}
                checked={isAllRowsSelected}
              ></input>
            </th>
            <th className="table__header">Display Name</th>
            <th className="table__header">Email</th>
            <th className="table__header">Status</th>
            <th className="table__header">Role</th>

            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Render current items */}
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="table__row"> 
                <input
                  type="checkbox"
                  onChange={() => handleRowCheckboxChange(item.id)}
                  checked={selectedRows.includes(item.id)}
                ></input>
              </td>
              <td className="table__row">
                <div>
                  {item.firstName} {item.lastName}
                </div>
              </td>
              <td className="table__row"> {item.email}</td>
              <td className="table__row">
                {" "}
                <p className={`table__${item.status}`}>{item.status}</p>
              </td>
              <td className="table__row">{item.role}</td>

              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tablePage">
        <div className="pageNumber">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                className="pgbtn"
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CommonTable;
