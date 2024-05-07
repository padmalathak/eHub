import AppList from "../../../components/component/AppList/AppList";
import SidebarMenu from "../../../components/component/SidebarMenu/SidebarMenu";
import "./UserDashboard.scss";

function UserDashboard() {
  function getName(){
    const token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
    if (token['iss']=="https://accounts.google.com"){
      return token['name']
    }

    else {
      return token['firstName'] + " " + token['lastName']
    }
  }
  const name = getName();
  return (
    <div className="dashboard">
      <SidebarMenu name={name} />
      <AppList />
    </div>
  );
}

export default UserDashboard;
