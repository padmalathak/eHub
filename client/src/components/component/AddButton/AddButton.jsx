import "./AddButton.scss";
import { Link } from "react-router-dom";

function AddButton({handleSubmit}) {
  const handleAdd = () => {
    console.log("Add");
  };
  return (

      <div className="addbutton">
        <button className="save-button">
        Add User
      </button>
      </div>

  );
}

export default AddButton;
