import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./UserDetailsPage.scss";
import arrowBack from "../../../assets/icons/arrow_back-24px.svg";
import EditForm from "../../../components/component/EditForm/EditForm";
import Sidebar from "../../../components/component/Sidebar/Sidebar";

function UserDetailsPage() {
  const location = useLocation();
  const { isEdit } = location.state;

  return (
    <div className="content">

    <Sidebar />
    <div className="user-edit">
      <div className="user-edit__header">
        <Link className="user-edit__link" to={`/`}>
          <img
            className="user-edit__icon"
            src={arrowBack}
            alt="Return previous page"
          />
          <h3 className="user-edit__title">Back to Users</h3>
        </Link>
        </div>
  <EditForm isEdit={isEdit} />
       
      </div>
    </div>
  );
}

export default UserDetailsPage;
