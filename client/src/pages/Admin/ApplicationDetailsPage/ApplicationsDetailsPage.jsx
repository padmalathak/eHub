import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPage from "../UserPage/UserPage";
import Sidebar from "../../../components/component/Sidebar/Sidebar";
import arrowBack from "../../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import "./ApplicationsDetailsPage.scss";
import CommonTable from "../../../components/component/CommonTable/CommonTable";

function ApplicationsDetailsPage({ appName }) {
  const navigate = useNavigate();
  const [appList, setAppList] = useState([]);
  const [appAssign, setAppAssign] = useState(false);
  const [appUsers, setAppUsers] = useState();
  let baseURL = `${process.env.REACT_APP_URL}/apps/users`;
  const token = localStorage.getItem("token");

  const handleAppAsign = async ({ appName }) => {
    try {
      const response = await axios.get(`${baseURL}?filter=${appName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(appName, response.data);
      setAppUsers(response.data);
      setAppAssign(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Assign users for the given app name
  const handleAssignUsers = async (selectedRows) => {
    console.log("handle Clicked", selectedRows, appName);
    if (selectedRows.length) {
      const reqBody = {
        selectedRows: selectedRows,
        appName: appName,
      };
      try {
        const postAppUsers = async () => {
          const response = await axios.post(baseURL, reqBody, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          navigate("/applications");
        };
        postAppUsers();
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
  };

  useEffect(() => {
    if (!appName) {
      navigate("/applications");
    } else {
      const getAPPList = async () => {
        const response = await axios.get(`${baseURL}?app_name=${appName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppList(response.data);
      };
      getAPPList();
    }
  }, []);

  return (
    <div className={`content`}>
      <Sidebar />
      <div className="tables">
        {!appAssign && (
          <>
            <div className="table__ops">
              <div className="table__addbutton">
                {/* <Link to="/applications">Back to Applications</Link> */}
                <button
                  className="add-button"
                  onClick={() => handleAppAsign({ appName })}
                >{`Assign Users for ${appName}`}</button>
              </div>
            </div>
            <table className="table">
          {/* Table headers */}
          <thead>
            <tr>
              <th className="table__header">Display Name</th>
              <th className="table__header">Email</th>
              <th className="table__header">Status</th>
              <th className="table__header">Role</th>

              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {/* Render current items */}
            {appList.map((item) => (
              <tr key={item.id}>
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
          </>
        )}
        

        {appAssign && (
          <div className="tables__role_edit">
            <div className="user-edit__header">
              <Link className="user-edit__link" to={`/applications`}>
                <img
                  className="user-edit__icon"
                  src={arrowBack}
                  alt="Return previous page"
                />
                <h3 className="user-edit__title">Back to Apps</h3>
              </Link>
            </div>
          </div>
        )}

        {appAssign && (
          <div>
            {/* <Link to={"/applications"}>Go back to applications</Link> */}
            <h1 className="app-edit__title">{`Assign users for ${appName}`} </h1>

            <CommonTable tableList={appUsers} handleClick={handleAssignUsers} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsDetailsPage;
