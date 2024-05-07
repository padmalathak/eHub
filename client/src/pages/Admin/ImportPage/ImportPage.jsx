import { useState } from "react";
import "./ImportPage.scss";
import axios from "axios";
import OktaForm from "../../../components/component/OktaForm/OktaForm";
import Sidebar from "../../../components/component/Sidebar/Sidebar";

function ImportPage() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState(false);
  const [isOkta, setOkta] = useState(false);
  const [isRandom, setRandom] = useState(true);

  const randomURL = "http://localhost:8081/users/random";

  const handleRandomTab = () => {
    setRandom(true);
    setOkta(false);
  };

  const handleOktaTab = () => {
    setOkta(true);
    setRandom(false);
    setIsGenerated(false);
    setError(false);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const OktaURL = e.target.oktaURL.value;
    const APIToken = e.target.APIToken.value;
    console.log(OktaURL, APIToken);
    try {
      const response = await axios.post(randomURL, {
        OktaURL: OktaURL,
        APIToken: APIToken,
      });
      setIsGenerated(true);
      setError(false);
    } catch (error) {
      setIsGenerated(false);
      setError(true);
      console.error("An error has occured: check URL and TOKEN");
    }
  };

  const handleRandom = async () => {
    try {
      await axios.get(randomURL);
      setIsGenerated(true);
      setError(false);
    } catch (error) {
      console.error("An error has occured:", error);
      setIsGenerated(false);
      setError(true);
    }
  };
  return (
    <div className="content">
      <Sidebar />

      <div className="form">
        <ul className="tab">
          <li className={`tab__list  `}>
            <a
              className={`tab__link ${isRandom ? `tab--active` : ``}`}
              onClick={handleRandomTab}
            >
              Random Users
            </a>
          </li>
          <li className="tab__list">
            <a
              className={`tab__link ${isRandom ? `` : `tab--active`}`}
              onClick={handleOktaTab}
            >
              Import from OKTA
            </a>
          </li>
        </ul>

        <div className="tab-content">
          {isRandom && (
            <div>
              {isGenerated && (
                <h3 className="tab__success">Users Generated Successfully</h3>
              )}
              {error && <h2 className="tab__error">Users not Generated </h2>}

              <h1 className="tab__title">Generate Random Users</h1>
              <button className="button" onClick={handleRandom}>
                Random
              </button>
            </div>
          )}

          {isOkta && (
            <div>
              {isGenerated && (
                <h3 className="tab__success">Users Generated Successfully</h3>
              )}
              {error && <h2 className="tab__error">Users not Generated </h2>}
              <OktaForm
                handleGenerate={(e) => {
                  handleGenerate(e);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportPage;
