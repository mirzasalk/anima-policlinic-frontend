import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import DoctorNav from "../DoctorNav/DoctorNav";
import axios from "axios";
import { toast } from "react-hot-toast";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import api from "../../../api";
const ZahteviZaTermin = () => {
  const { user } = useSelector((state) => state.user);
  const [cardShow, setCardShow] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [apointment, setApointment] = useState();
  const dispatch = useDispatch();
  const getDoctor = async () => {
    try {
      dispatch(showLoading());
      const response = await api.post(
        "/api/admin/get-doctor-info-by-user-id",
        { userId: user.id },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctorInfo(response.data.data);
      } else {
        setDoctorInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getApointments = async () => {
    try {
      dispatch(showLoading);
      const response = await api.post(
        "/api/doctor/get-apointments",
        {
          doctorId: doctorInfo?._id,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      if (response.data.success) {
        setApointment(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    user ? getDoctor() : null;
    user ? getApointments() : null;
  }, [user]);
  useEffect(() => {
    doctorInfo ? getApointments() : null;
  }, [doctorInfo]);

  const showingCard = (item) => {
    setCardShow(true);
    setUserInfo(item);
  };

  const aproveApointments = async () => {
    try {
      dispatch(showLoading);
      const response = await api.post(
        "/api/doctor/approve-apointments",
        {
          _id: userInfo._id,
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
        getApointments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectApointments = async () => {
    try {
      dispatch(showLoading());
      const response = await api.post(
        "/api/doctor/reject-apointments",
        { _id: userInfo._id },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        console.log("greska");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  console.log(userInfo);
  return (
    <div id="doctorMain">
      <div className="WorkSpace">
        <DoctorNav />
        <div className="rightFieldDiv">
          <div className="listaKorisnickihZahteva">
            <h1>Lista zahteva</h1>
            <div className="scrollDiv">
              {apointment?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="Zahtev"
                    onClick={() => {
                      showingCard(item);
                    }}
                  >
                    Korisnik {item.firstName} {item.lastName} je aplicirao za
                    termin.
                    <p>Vise</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {cardShow ? (
        <div className="ShowCardBackgroun">
          <div className="aproveCard">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setCardShow(false);
                }}
              />
            </div>
            <div className="infoDiv">
              <img src="Admin.png" alt="" />
              <div className="mainOfInfoDiv">
                <h3>
                  {userInfo?.firstName} {userInfo?.lastName}
                </h3>
                <p>Adresa: {userInfo?.address}</p>
                <p>Email: {userInfo?.email}</p>itemuserInfo
                <p>Telefon: {userInfo?.phoneNumber}</p>
                <p>Status: {userInfo?.status}</p>
                <p>
                  Vreme:{" "}
                  {userInfo.timings && userInfo.timings[0] < 9 ? "0" : null}
                  {userInfo.timings ? userInfo.timings[0] : null}:
                  {userInfo.timings && userInfo.timings[1] < 9 ? "0" : null}
                  {userInfo.timings ? userInfo?.timings[1] : null}
                </p>
              </div>
            </div>
            <div className="btnsDiv">
              <button
                onClick={() => {
                  setCardShow(false);
                  aproveApointments();
                }}
              >
                Potvrdi
              </button>
              <button
                className="rejectBtn"
                onClick={() => {
                  setCardShow(false);
                  rejectApointments();
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ZahteviZaTermin;
