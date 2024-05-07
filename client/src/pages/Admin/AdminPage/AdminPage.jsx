import React, { useState } from "react";
import "./AdminPage.scss";
import TableHeader from "../../../components/component/TableHeader/TableHeader";
import UserList from "../../../components/component/UserList/UserList";

function AdminPage() {
  const [userlength, setUserLength] = useState(0);
  const setUserLengths = (userlength) => {
    setUserLength(userlength);
  };
  return (
    <main className="main">
      <h2 className="title"> Users List</h2>
      <p className="main__count">Users Count : {userlength}</p>

      <div className="main__container">
        <TableHeader
          className={"main"}
          firstHeader={"FIRST NAME"}
          secondHeader={"LAST NAME"}
          thirdHeader={"EMAIL"}
          fourthHeader={"STATUS"}
          fifthHeader={"ROLES"}
          sixthHeader={"SOURCE"}
        />
        <UserList setUserLengths={setUserLengths} />
      </div>
    </main>
  );
}

export default AdminPage;
