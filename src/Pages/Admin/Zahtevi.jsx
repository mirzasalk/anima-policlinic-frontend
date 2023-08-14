import React, { useEffect } from "react";
import AdminNav from "./AdminNav";
import { useState } from "react";
import "./admin.scss";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Zahtevi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState({});
  const [cardShow, setCardShow] = useState(false);

  const showCard = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/get-doctor-info-by-id",
        { userId: id }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      } else {
        console.log("greska");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
    setCardShow(!cardShow);
  };

  const approveDoctorAplication = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/admin/approve-doctor-status",
        { doctorId: doctor._id, status: doctor.status },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        location.reload();
      } else {
        console.log("greska");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const rejectDoctorAplication = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/admin/reject-doctor-status",
        { doctorId: doctor._id, status: doctor.status },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        location.reload();
      } else {
        console.log("greska");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  return (
    <div id="adminMain">
      <div className="WorkSpace">
        <AdminNav />
        <div className="ListeDiv">
          <div className="listaZahteva">
            <h1>Lista zahteva</h1>
            <div className="scrollDiv">
              {user?.unseenNotifications
                ? user.unseenNotifications.map((item, index) => {
                    return (
                      <div
                        key={item.data.doctorId}
                        className="Zahtev"
                        onClick={() => showCard(item.data.doctorId)}
                      >
                        {item.message}
                        <p>Vise</p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      {cardShow ? (
        <div className="doctorRequesCardMain">
          <div className="doctorRequesCard">
            <img src="Admin.png" />
            <div className="rightFieldDoctorCard">
              <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
              <p>Adresa:{doctor.address}</p>
              <p>Email:{doctor.email}</p>
              <p>Godine iskustva: {doctor.experience} godine</p>
              <p>Cena jedne seanse: {doctor.feePerConsultation}</p>
              <p>Specijalizacija: {doctor.specialization}</p>
              <p>Telefon: {doctor.phoneNumber} din</p>
              <p>Status: {doctor.status} </p>
              <div className="TerapijeZahteva">
                Terapije:
                {doctor.therapies.map((item, index) => {
                  return doctor.therapies.length - 1 === index ? (
                    <div key={index}>{item}</div>
                  ) : (
                    <div key={index}>{item},</div>
                  );
                })}{" "}
              </div>
              <p>
                Radno vreme:
                {doctor.timings && doctor.timings[0][0] < 9 ? "0" : null}
                {doctor.timings ? doctor.timings[0][0] : null}:
                {doctor.timings && doctor.timings[0][1] < 9 ? "0" : null}
                {doctor.timings ? doctor?.timings[0][1] : null}-
                {doctor.timings && doctor.timings[1][0] < 9 ? "0" : null}
                {doctor.timings ? doctor.timings[1][0] : null}:
                {doctor.timings && doctor.timings[1][1] < 9 ? "0" : null}
                {doctor.timings ? doctor?.timings[1][1] : null}
              </p>
              <div className="butonsDiv">
                <button onClick={approveDoctorAplication}>Potvrdi</button>
                <button
                  onClick={rejectDoctorAplication}
                  className="odbijButton"
                >
                  Odbij
                </button>
              </div>
            </div>
            <img className="exitIcon" src="x.png" onClick={showCard} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Zahtevi;
