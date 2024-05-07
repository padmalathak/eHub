import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./UserPage.scss";
import deleteIcon from "../../../assets/icons/delete_outline-24px.svg";
import sortIcon from "../../../assets/icons/sort-24px.svg";
import editIcon from "../../../assets/icons/edit-24px.svg";
import chevronRight from "../../../assets/icons/chevron_right-24px.svg";
import arrowBack from "../../../assets/icons/arrow_back-24px.svg";
import Sidebar from "../../../components/component/Sidebar/Sidebar";
import DeleteModal from "../../../components/component/DeleteModal/DeleteModal";
import AddButton from "../../../components/component/AddButton/AddButton";
import SearchHeader from "../../../components/component/SearchHeader/SearchHeader";

const UserPage = ({ role, queryparam }) => {
  let baseURL = "http://localhost:8081/users";
  const navigate = useNavigate();
  const [userList, setuserList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const token = localStorage.getItem("token");

  const [id, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteIconClick = (e, firstName, lastName, id) => {
    e.preventDefault();
    setModalShow(true);
    setMessage([
      `${firstName} ${lastName} `,
      `${firstName} ${lastName} from the list of users`,
    ]);
    setId(id);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      const response = await axios.get(`${baseURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserList(response.data);
      setModalShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // ---------Sorting---------
  const handleSort = async (e, queryValue, sortOrder) => {
    setSortQuery(queryValue);
    baseURL = `http://localhost:8081/users?sort=${queryValue}&sortOrder=${sortOrder}`;
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setuserList(response.data);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    try {
      if (!role) {
        const getUserList = async () => {
          if (searchQuery) {
            baseURL += `?search=${searchQuery}`;
          }
          // if (searchQuery && sortQuery) {
          // baseURL += `?search=${searchQuery}&sort=${sortQuery}&sortOrder=${sortOrder}`;
          // }

          try {
            const response = await axios.get(baseURL, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            // setUserLengths(response.data.length);
            console.log(response.data);
            setuserList(response.data);
          } catch (error) {
            console.log("Unauthorized", error);
            navigate("/login");
          }
        };
        getUserList();
      } else {
        console.log(queryparam);
        const getRolesList = async () => {
          baseURL = `http://localhost:8081/users/roledetails?role=${queryparam}`;
          const response = await axios.get(baseURL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setuserList(response.data);
        };
        getRolesList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [userList.length, searchQuery]);

  if (!userList || userList.length === 0) {
    return (
      <>
        <div className="content">
          <Sidebar />
          <div className="tables">
            <SearchHeader
              placeholder="Search ..."
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
      </>
    );
  }

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={`content ${modalShow ? `content--show` : ``}`}>
        {<Sidebar />}
        <div className="tables">
          {!role && (
            <>
              <div className="table__ops">
              <div className="table__addbutton">
              <Link to={`/user/add`}>
                <button className="add-button">Add User</button>
                {/* <AddButton /> */}
              </Link>
              </div>
              <SearchHeader
                placeholder="Search ..."
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              </div>
            </>
          )}
          {/* {role && <Link to={`/roles`}>Go Back</Link>} */}
          {role && <div className="tables__role_edit"><div className="user-edit__header">
        <Link className="user-edit__link" to={`/roles`}>
          <img
            className="user-edit__icon"
            src={arrowBack}
            alt="Return previous page"
          />
          <h3 className="user-edit__title">Back to Roles</h3>
        </Link>
        </div></div>}
          <table className="table">
            {/* Table headers */}
            <thead>
              <tr>
                <th className="table__header">
                  Display Name
                  <img
                    className="tableHeader__icon"
                    src={sortIcon}
                    alt="Sorting arrows icon/button"
                    onClick={(e) => handleSort(e, `firstName`, sortOrder)}
                  />
                </th>
                <th className="table__header">
                  Email
                  <img
                    className="tableHeader__icon"
                    src={sortIcon}
                    alt="Sorting arrows icon/button"
                    onClick={(e) => handleSort(e, `email`, sortOrder)}
                  />
                </th>
                <th className="table__header">
                  Status
                  <img
                    className="tableHeader__icon"
                    src={sortIcon}
                    alt="Sorting arrows icon/button"
                    onClick={(e) => handleSort(e, `status`, sortOrder)}
                  />
                </th>
                <th className="table__header">
                  Role
                  <img
                    className="tableHeader__icon"
                    src={sortIcon}
                    alt="Sorting arrows icon/button"
                    onClick={(e) => handleSort(e, `role`, sortOrder)}
                  />
                </th>
                <th className="table__header">Actions</th>

                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {/* Render current items */}
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="table__row">
                    <Link
                      to={`/user/${item.id}`}
                      className="table__link"
                      state={{ isEdit: false }}
                    >
                      <div>
                        {item.firstName} {item.lastName}
                        <img
                          className="table__chevron"
                          src={chevronRight}
                          alt="Chervon-right"
                        />
                      </div>
                    </Link>
                  </td>
                  <td className="table__row"> {item.email}</td>
                  <td className="table__row">
                    {" "}
                    <p className={`table__${item.status}`}>{item.status}</p>
                  </td>
                  <td className="table__row">{item.role}</td>
                  <td className="table__row ">
                    {" "}
                    <div className="table--icon">
                      <img
                        className="table__icon"
                        src={deleteIcon}
                        alt="Delete icon linking to delete user"
                        onClick={(e) =>
                          handleDeleteIconClick(
                            e,
                            item.firstName,
                            item.lastName,
                            item.id
                          )
                        }
                      />
                      <Link
                        to={`/user/${item.id}`}
                        state={{ isEdit: true }}
                        className="user__link"
                      >
                        <img
                          className="table__icon"
                          src={editIcon}
                          alt="Edit icon linking to edit user"
                        />
                      </Link>
                    </div>
                  </td>

                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
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
      </div>
      {modalShow && (
        <DeleteModal
          onHide={handleClose}
          message={message}
          handleDelete={() => handleDelete(id)}
        />
      )}
    </>
  );
};

export default UserPage;
