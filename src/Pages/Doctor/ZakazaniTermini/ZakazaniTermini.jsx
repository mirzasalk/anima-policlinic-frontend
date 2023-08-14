import React, { useEffect } from "react";
import { useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import DoctorNav from "../DoctorNav/DoctorNav";
import axios from "axios";
import { toast } from "react-hot-toast";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
const ZakazaniTermini = () => {
  const { user } = useSelector((state) => state.user);
  const [showDeleteDiv, setShowDeleteDiv] = useState(false);
  const [showCancelDIv, setShowCancelDiv] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState();
  const [apointment, setApointment] = useState();
  const [apointmentId, setApointmentId] = useState();
  const dispatch = useDispatch();

  const getApointments = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/doctor/get-all-apointments",
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
      console.log(response.data);

      if (response.data.success) {
        setApointment(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctor = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/admin/get-doctor-info-by-user-id",
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
        console.log("greska");
        console.log(response.data);
      }
    } catch (error) {
      console.log("greska");
      console.log(error);
    }
  };

  useEffect(() => {
    user ? getDoctor() : null;
  }, [user]);
  console.log(doctorInfo);
  useEffect(() => {
    doctorInfo ? getApointments() : null;
  }, [doctorInfo]);

  const deleteApointment = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/doctor/delete-apointment",
        {
          _id: apointmentId,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        getApointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelApointment = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/doctor/reject-apointments",
        {
          _id: apointmentId,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      console.log(response.data);

      if (response.data.success) {
        toast.success("Termin je otkazan");
        getApointments();
      } else {
        toast.error("Greska pri otkazivanju termina");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="zakazaniTerminiMain">
      <div className="WorkSpace">
        <DoctorNav />
        <div className="rightFieldDiv">
          <div className="listaKorisnickihZahteva">
            <h1>Termini</h1>
            <div className="scrollDiv">
              {apointment?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      item.status === "approved"
                        ? "TerminiApproved"
                        : item.status === "rejected"
                        ? "TerminiRejected"
                        : "TerminiPending"
                    }
                  >
                    <p>
                      <strong>Name:</strong> {item.firstName} {item.lastName}
                    </p>
                    <p>
                      <strong>Broj telefona:</strong> {item.phoneNumber}
                    </p>
                    <p>
                      <strong>datum:</strong>{" "}
                      {item.date[0] <= 9 ? "0" + item.date[0] : item.date[0]}.
                      {item.date[1] <= 9 ? "0" + item.date[1] : item.date[1]}.
                      {item.date[1]}.{item.date[2]}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Vreme:</strong>{" "}
                      {item.timings[0] <= 9
                        ? "0" + item.timings[0]
                        : item.timings[0]}
                      :
                      {item.timings[1] <= 9
                        ? "0" + item.timings[1]
                        : item.timings[1]}
                    </p>
                    <p>
                      <strong>Terapija:</strong> {item.therapy}
                    </p>
                    <p>
                      <strong>Adesa:</strong> {item.address}
                    </p>
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                    <div className="DeleteCancelDiv">
                      {item.status === "approved" ? (
                        <p
                          className="cancel"
                          onClick={() => {
                            setShowCancelDiv(true);
                            setApointmentId(item._id);
                          }}
                        >
                          Otkazi
                        </p>
                      ) : null}
                      {item.status === "rejected" ? (
                        <p
                          className="delete"
                          onClick={() => {
                            setShowDeleteDiv(true);
                            setApointmentId(item._id);
                          }}
                        >
                          Izbrisi
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showCancelDIv ? (
        <div className="backGroundOfShowCard">
          <div className="showCard">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setShowCancelDiv(false);
                }}
              />
            </div>
            <p>Potvrdite da zelite da otkazete odabranu terapiju</p>{" "}
            <div>
              <button
                onClick={() => {
                  cancelApointment();
                  setShowCancelDiv(false);
                }}
              >
                Potvrdi
              </button>
              <button
                onClick={() => {
                  setShowCancelDiv(false);
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showDeleteDiv ? (
        <div className="backGroundOfShowCard">
          <div className="showCard">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setShowDeleteDiv(false);
                }}
              />
            </div>
            <p>Potvrdite da zelite da izbrisete odabranu terapiju</p>{" "}
            <div>
              <button
                onClick={() => {
                  setShowCancelDiv(false);
                  deleteApointment();
                }}
              >
                Potvrdi
              </button>
              <button
                onClick={() => {
                  setShowCancelDiv(false);
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
export default ZakazaniTermini;
