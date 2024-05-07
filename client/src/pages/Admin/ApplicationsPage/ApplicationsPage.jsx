import { useEffect, useState } from "react";
import "./ApplicationsPage.scss";
import axios from "axios";
import chevronRight from "../../../assets/icons/chevron_right-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/component/Sidebar/Sidebar";

function ApplicationsPage({ setAppName }) {
  let apiURL = `${process.env.REACT_APP_URL}/apps/list`;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAppClick = (app_name) => {
    setAppName(app_name);
    navigate("/applicationsdetails");
  };

  const [apps, setApps] = useState([]);
  useEffect(() => {
    try {
      const getApps = async () => {
        const response = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApps(response.data);
      };
      getApps();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={`content`}>
    <Sidebar />
      <div className="tables">
        <table className="table">
        <thead>
          <tr>
          <th className="table__header">APP NAME</th>
          <th className="table__header">APP COUNT</th>
          </tr>
        </thead>
        <tbody>
        {apps.map((app, i = 0) => {
          return (
            <tr key={++i}>
              <td className="table__row">
              {/* <Link to={`/applicationsdetails`} className="table__link"> */}
              <div
                className="table__link"
                onClick={() => {
                  handleAppClick(app.app_name);
                }}
              >
                {app.app_name}
                <img
                  className="table__chevron"
                  src={chevronRight}
                  alt="Chervon-right"
                />
              </div>
              {/* </Link> */}
              </td>
              <td className="table__row">{app.count}</td>
            </tr>
          );
        })}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationsPage;
