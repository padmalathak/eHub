import "./OktaForm.scss";

function OktaForm({ handleGenerate }) {
  return (
    <div>
      <form onSubmit={handleGenerate}>
        <div className="field-wrap">
          <label className="form__label">
            OKTA URL<span className="req">:</span>
            <input
              required
              autoComplete="off"
              className="user-add__form-detail"
              name="oktaURL"
            />
          </label>
        </div>

        <div className="field-wrap">
          <label className="form__label">
            API TOKEN<span className="req">:</span>
            <input
              required
              autoComplete="off"
              className="user-add__form-detail"
              name="APIToken"
            />
          </label>
        </div>

        <button className="button">Generate</button>
      </form>
    </div>
  );
}

export default OktaForm;
