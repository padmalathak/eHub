import { useEffect, useState } from "react";
import "./AppList.scss";
import axios from "axios";

function AppList() {
  let apiUrl = `${process.env.REACT_APP_URL}/apps`;
  const token = localStorage.getItem("token");

  const [appList, setAppList] = useState([]);

  // const handleCard = () => {
  //   console.log("card clicked");
  // };

  useEffect(() => {
    try {
      const getApps = async () => {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setAppList(response.data);
      };
      getApps();
    } catch (error) {}
  }, []);
  return (
    <div className="apps">
      <h2 className="apps__title">My Apps</h2>
      <div className="centered">
        <section className="cards">
          {appList.map((app) => {
            let url = app.app_link;
            return (
              <><div
                key={app.id}
                className="app-card"
                onClick={() => window.open(url, "_blank")}
              >
                <div className={`app-card__${app.app_name}`}>
                {/* <img
                  src={app.app_img}
                  className="app-card__img"
                  alt="icons" /> */}
              </div><p className="app-card__text">{app.app_name}</p>
              </div>
              </>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default AppList;
