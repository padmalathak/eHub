import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserList.scss";
import DeleteModal from "../DeleteModal/DeleteModal";

import deleteIcon from "../../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../../assets/icons/edit-24px.svg";
import chevronRight from "../../../assets/icons/chevron_right-24px.svg";

function UserList({ setUserLengths }) {
  let baseURL = "http://localhost:8081/users";
  const [userList, setuserList] = useState([]);

  const [message, setMessage] = useState([]);
  const [id, setId] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const handleDeleteIconClick = (e, firstName, id) => {
    console.log("in delete");
    e.preventDefault();

    setModalShow(true);
    setMessage([`${firstName} `, `${firstName} from the list of users`]);
    setId(id);
  };

  const handleClose = () => {
    setModalShow(false);
  };
  const handleDelete = async (id) => {
    console.log("delete clicked");
    // try {
    //   await axios.delete(`${baseURL}/${id}`);
    //   const response = await axios.get(`${baseURL}`);
    //   setWarehouseListval(response.data);
    //   setModalShow(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    try {
      const getUserList = async () => {
        const response = await axios.get(baseURL);
        console.log(response.data);
        setUserLengths(response.data.length);
        setuserList(response.data);
      };
      getUserList();
    } catch (error) {
      console.log(error);
    }
  }, [userList.length]);

  if (!userList || userList.length === 0) {
    return <></>;
  }
  return (
    <>
      {userList.map(
        ({ id, firstName, lastName, email, status, role }, index) => (
          <section
            className={`user__container ${
              index === 0 ? "user__container--firstRow" : ""
            }`}
            key={id}
          >
            <div className="user__container--first">
              <h4 className="user__sectionTitle">First Name</h4>
              <Link to={`/user/${id}`} className="user__link">
                <div className="user__name-container">
                  <p className="user__name">{firstName}</p>
                  <img
                    className="user__chevron"
                    src={chevronRight}
                    alt="Chervon right arrow icon that links to user info page"
                  />
                </div>
              </Link>
            </div>
            <div className="user__container--second">
              <h4 className="user__sectionTitle">Last Name</h4>
              <p className="user__text">{lastName}</p>
            </div>
            <div className="user__container--third">
              <h4 className="user__sectionTitle">Email</h4>
              <p className="user__text">{email}</p>
            </div>
            <div className="user__container--fourth">
              <h4 className="user__sectionTitle">Status</h4>
              <p className="user__text">{status}</p>
            </div>
            <div className="user__container--fifth">
              <h4 className="user__sectionTitle">Roles</h4>
              <p className="user__text">{role}</p>
            </div>

            <div className="user__container--sixth">
              <img
                className="user__delete icon"
                src={deleteIcon}
                alt="Delete icon linking to delete user"
                onClick={(e) => handleDeleteIconClick(e, firstName, id)}
              />
              <Link to={`/user/${id}/edit`} className="user__link">
                <img
                  className="user__edit"
                  src={editIcon}
                  alt="Edit icon linking to edit user"
                />
              </Link>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default UserList;
