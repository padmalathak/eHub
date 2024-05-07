import "./CancelButton.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CancelButton({ to }) {
  return (
    <Link to={to} className="cancel-link">
      <button className="cancel-button">Cancel</button>
    </Link>
  );
}
CancelButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default CancelButton;