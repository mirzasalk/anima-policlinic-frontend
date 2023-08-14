import React, { useEffect } from "react";
import AdminNav from "./AdminNav";
import { useState } from "react";
import "./admin.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const AdminProfil = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [changeAdminProfilCardShow, setChangeAdminProfilCardShow] =
    useState(false);
  const [adminInfo, setAdminInfo] = useState({
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });

  useEffect(() => {
    setAdminInfo(user);
  }, [user]);

  console.log(adminInfo);
  const hendleAdminInfo = (e) => {
    setAdminInfo({
      ...adminInfo,
      [e.target.name]: e.target.value,
    });
  };
  const changeAdminInfo = async () => {
    try {
      console.log(adminInfo);
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/admin/change-admin-info",
        {
          _id: adminInfo.id,
          firstName: adminInfo.firstName,
          lastName: adminInfo.lastName,
          email: adminInfo.email,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading);
      if (response.data.success) {
        toast.success(response.data.message);
        getUser();
      }
    } catch (error) {
      console.log(error);
    }

    setChangeAdminProfilCardShow(!changeAdminProfilCardShow);
  };
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") }, //ovo ubrzava obradu??
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        dispatch(setUser(null));
        localStorage.clear();
        navigate("/prijava");
      }
    } catch (error) {
      dispatch(setUser(null));
      localStorage.clear();
      navigate("/prijava");
    }
  };

  return (
    <div id="adminMain">
      <div className="WorkSpace">
        <AdminNav />
        <div className="ListeDiv">
          <div className="AdminProfil">
            {changeAdminProfilCardShow ? (
              <div className="cardForChangeBackground">
                <div className="cardForChange">
                  <div className="iconDiv">
                    <img
                      src="x.png"
                      alt="X"
                      onClick={() => {
                        setChangeAdminProfilCardShow(
                          !changeAdminProfilCardShow
                        );
                      }}
                    />
                  </div>
                  <div className="adminInfoElement">
                    <label htmlFor="firstName">Ime</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Promeni Ime"
                      onChange={hendleAdminInfo}
                    />
                  </div>
                  <div className="adminInfoElement">
                    <label htmlFor="lastName">Prezime</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Promeni Prezime"
                      onChange={hendleAdminInfo}
                    />
                  </div>
                  <div className="adminInfoElement">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Promeni Email adresu"
                      onChange={hendleAdminInfo}
                    />
                  </div>
                  <button onClick={changeAdminInfo}>Promeni</button>
                </div>
              </div>
            ) : null}

            <div className="adminImgDiv">
              <img className="AdminProfilimg" src="Admin.png" />
            </div>
            <div className="adminInfo">
              <div className="adminName">
                <div></div>
                <h2>
                  {" "}
                  {user?.firstName} {user?.lastName}{" "}
                </h2>
              </div>
              <div className="otherInfo">
                <h4>
                  <strong>Email:</strong>
                  {user?.email}{" "}
                </h4>
              </div>

              <button
                className="AdminChangeButton"
                onClick={() => {
                  setChangeAdminProfilCardShow(!changeAdminProfilCardShow);
                }}
              >
                Izmeni
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfil;
