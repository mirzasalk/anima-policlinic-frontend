import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import { useSelector } from "react-redux";

const AdminNav = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="WorkSpaceMeniDiv">
      <div className="AdminMeniTitle">
        <div>
          <h3>Admin</h3>
          <h4>{user?.firstName}</h4>
        </div>
        <p>Control panel</p>
      </div>
      <div className="WorkSpaceMeni">
        <Link className={"adminMeniLinks"} to={"/korisnici"}>
          <div className="elemOfMeni">
            <img src="userIcon.png" alt="icon" />
            Korisinici
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/doktori"}>
          <div className="elemOfMeni">
            <img src="userDoctorIcon.png" alt="icon" />
            Doktori
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/adminprofil"}>
          <div className="elemOfMeni">
            <img src="userAdminIcon.png" alt="icon" />
            Profil
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/zahtevi"}>
          <div className="elemOfMeni">
            <img
              className="zahteviIcon"
              src="userNotification.png"
              alt="icon"
            />
            Zahtevi{" "}
            <strong
              className={
                user?.unseenNotifications &&
                user.unseenNotifications.length !== 0
                  ? "zahteviBrojac"
                  : "zahteviBrojacNone"
              }
            >
              {user?.unseenNotifications &&
              user.unseenNotifications.length !== 0
                ? user.unseenNotifications.length
                : null}
            </strong>
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/terapije"}>
          <div className="elemOfMeni">
            <img src="userTherapy.png" alt="icon" />
            Terapije
          </div>
        </Link>
        <div className="elemOfMeni">
          <img src="userLogoutIcon.png" alt="icon" />
          <Link className={"adminMeniLinks"} to={"/prijava"}>
            Odjavi se
          </Link>
        </div>
        <div className="elemOfMeniLink">
          <Link className={"adminLink"} to={"/usluge"}>
            Početna
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminNav;
