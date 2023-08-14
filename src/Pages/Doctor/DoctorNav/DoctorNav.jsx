import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";

const DoctorNav = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="WorkSpaceMeniDiv">
      <div className="DoctorMeniTitle">
        <div>
          <h3>Doctor</h3>
          <h4>{user?.firstName}</h4>
        </div>
        <p>Kontrolna tabla</p>
      </div>
      <div className="WorkSpaceMeni">
        <Link className={"doctorMeniLinks"} to={"/zakazanitermini"}>
          <div className="elemOfMeni">
            <img src="userIcon.png" alt="icon" />
            Zakazani termini
          </div>
        </Link>

        <Link className={"doctorMeniLinks"} to={"/doctorprofil"}>
          <div className="elemOfMeni">
            <img src="userAdminIcon.png" alt="icon" />
            Profil
          </div>
        </Link>
        <Link className={"doctorMeniLinks"} to={"/zahtevizatermin"}>
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

        <div className="elemOfMeni">
          <img src="userLogoutIcon.png" alt="icon" />
          <Link className={"doctorMeniLinks"} to={"/prijava"}>
            Odjavi se
          </Link>
        </div>
        <div className="elemOfMeniLink">
          <Link className={"doctorLink"} to={"/usluge"}>
            Početna
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DoctorNav;
