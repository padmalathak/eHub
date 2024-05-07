import { useEffect, useState } from "react";
import "./RolesPage.scss";
import axios from "axios";
import Sidebar from "../../../components/component/Sidebar/Sidebar";
import chevronRight from "../../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";

function RolesPage() {
  const [rolesList, setRolesList] = useState([]);
  let baseURL = "http://localhost:8081/users/roles";

  useEffect(() => {
    try {
      const getRolesList = async () => {
        const response = await axios.get(baseURL);
        setRolesList(response.data);
      };
      getRolesList();
    } catch (error) {}
  }, []);

  if (!rolesList || rolesList.length === 0) {
    return <></>;
  }

  return (
    <div className={`content`}>
    <Sidebar />
    <div className="tables">
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="table__header">Role Name</th>
            <th className="table__header">Count</th>
          </tr>
        </thead>
        <tbody>
          {rolesList.map(({ role, count_of_role }, i = 0) => {
            return (
              <tr key={`${++i}`}>
                <td className="table__row">
                  {/* <Link
                    to={`/roledetails?role=${role}`}
                    className="table__link"
                  > */}
                  <Link className="table__link"
                    to={{
                      pathname: "/roledetails",
                      search: `?role=${role}`,
                    }}
                  >
                    <div>
                      {role}
                      <img
                        className="table__chevron"
                        src={chevronRight}
                        alt="Chervon-right"
                      />
                    </div>
                  </Link>
                </td>
                <td className="table__row">{count_of_role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default RolesPage;
