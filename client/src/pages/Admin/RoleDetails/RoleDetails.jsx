import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import UserPage from "../UserPage/UserPage";

function RoleDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [queryparam, setQueryParams] = useState(
    location.search.split("?role=")[1]
  );

  useEffect(() => {
    setQueryParams(location.search.split("?role=")[1]);
  }, [searchParams]);

  //   console.log(searchParams, queryparam, location.search.split("?role=")[1]);
  return (
    <div>
      <UserPage role={true} queryparam={queryparam} />
    </div>
  );
}

export default RoleDetails;
