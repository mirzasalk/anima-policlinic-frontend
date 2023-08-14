import React from "react";
import AdminNav from "./AdminNav";
import { useState } from "react";
import { useEffect } from "react";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.scss";
import { toast } from "react-hot-toast";
import { TimePicker } from "antd";

const Doktori = () => {
  const [doctor, setDoctor] = useState([]);
  const [deleteDoctorDivShowing, setDeleteDoctorDivShowing] = useState(false);
  const [changeDoctorDivShowing, setChangeDoctorDivShowing] = useState(false);
  const [doctorID, setDoctorID] = useState("");
  const [userID, setUserID] = useState("");
  const [changedDoctorValues, setChangedDoctorValues] = useState("");
  const dispatch = useDispatch();

  const getDoctors = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        "http://localhost:5000/api/user/get-doctors",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      console.log(response);
      setDoctor([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    console.log(changedDoctorValues);
  }, [changedDoctorValues]);

  const deleteDoctor = async () => {
    try {
      console.log(doctorID);

      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/admin/delete-doctor",
        {
          uId: userID,
          _id: doctorID,
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

        getDoctors();
        setDeleteDoctorDivShowing(false);
      }
    } catch (error) {
      toast.error("greska pri brisanju");
      console.log(error);
      getDoctors();
    }
  };

  const showingDeleteDiv = (doctorID, userID) => {
    setDoctorID(doctorID);
    setUserID(userID);
    setDeleteDoctorDivShowing(true);
  };

  const handleChangeDoctorValues = (e) => {
    setChangedDoctorValues({
      ...changedDoctorValues,
      [e.target.name]: e.target.value,
    });
  };
  const changeDoctorInfo = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/admin/change-doctor-info",
        {
          ...changedDoctorValues,
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
        getDoctors();
      }
    } catch (error) {}
    setChangeDoctorDivShowing(false);
  };
  return (
    <div id="adminMain">
      <div className="WorkSpace">
        <AdminNav />
        <div className="ListeDiv">
          <div className="listaDoktora">
            <h1>Lista doktora</h1>
            <div className="DivForDoktorCards">
              {doctor.map((item, index) => {
                return (
                  <div key={index} className="doctorCard">
                    <img src="dr1.png" />
                    <div className="rightFieldDoctorCard">
                      <h3>
                        {item.firstName} {item.lastName}
                      </h3>
                      <p>Email: {item.email}</p>
                      <p>Broj telefona: {item.phoneNumber}</p>
                      <p>Specijalizacija: {item.specialization}</p>
                      <p>Status: {item.status}</p>
                      <div className="TerapijeZahteva">
                        Terapije:
                        {item.therapies.map((elem, index) => {
                          return item.therapies.length - 1 === index ? (
                            <div key={index}>{elem}</div>
                          ) : (
                            <div key={index}>{elem},</div>
                          );
                        })}{" "}
                      </div>
                      <p>
                        Radno vreme:{" "}
                        {item.timings && item.timings[0][0] < 9 ? "0" : null}
                        {item.timings ? item.timings[0][0] : null}:
                        {item.timings && item.timings[0][1] < 9 ? "0" : null}
                        {item.timings ? item?.timings[0][1] : null}-
                        {item.timings && item.timings[1][0] < 9 ? "0" : null}
                        {item.timings ? item.timings[1][0] : null}:
                        {item.timings && item.timings[1][1] < 9 ? "0" : null}
                        {item.timings ? item?.timings[1][1] : null}
                      </p>

                      <div className="DoctorCardTherapy"></div>
                      <div className="doctorBtnsDiv">
                        <button
                          onClick={() => {
                            setChangeDoctorDivShowing(true);
                            setChangedDoctorValues((prevState) => ({
                              ...prevState,
                              ...item,
                            }));
                          }}
                        >
                          Izmeni
                        </button>
                        <button
                          className="deleteBtn"
                          onClick={() => {
                            showingDeleteDiv(item._id, item.userId);
                          }}
                        >
                          Izbrisi
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {deleteDoctorDivShowing ? (
        <div className="deleteDoctorDivMain">
          <div className="deleteDoctorDiv">
            <div className="imgDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setDeleteDoctorDivShowing(false);
                }}
              />
            </div>
            <h3>Potvrdite da zelite da izbrisete doktora</h3>
            <div className="deleteDoctorButtonsDiv">
              <button onClick={deleteDoctor}>Potvrdi</button>
              <button
                id="deleteBtn"
                onClick={() => {
                  setDeleteDoctorDivShowing(false);
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {changeDoctorDivShowing ? (
        <div className="changeDoctorinfoDiv">
          <div className="changeDoctorinfoFormDiv">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setChangeDoctorDivShowing(false);
                }}
              />
            </div>
            <h1>Izmeni informacije o doktoru</h1>
            <div className="formMiddleLine"></div>
            <div className="fieldAboveCenterLine">
              <div className="inputDiv">
                <label htmlFor="firstName">
                  <p className={"correctClass"}>*Ime</p>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ime"
                  onChange={handleChangeDoctorValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="lastName">
                  <p className={"correctClass"}>*Prezime</p>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Prezime"
                  onChange={handleChangeDoctorValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="email">
                  <p className={"correctClass"}>*Email</p>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChangeDoctorValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="phoneNumber">
                  <p className={"correctClass"}>*Broj telefona</p>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Broj telefona"
                  onChange={handleChangeDoctorValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="address">
                  <p className={"correctClass"}>*Adresa</p>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresa"
                  onChange={handleChangeDoctorValues}
                />
              </div>
            </div>
            <div className="formMiddleLine"></div>
            <div className="fieldBelowCenterLine">
              <div className="inputDiv">
                <label htmlFor="specialization">
                  <p className={"correctClass"}>*Specijalizacija</p>
                </label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Specijalizacija"
                  onChange={handleChangeDoctorValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="experience">
                  <p className={"correctClass"}>*Godine iskustva</p>
                </label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Godine iskustva"
                  onChange={handleChangeDoctorValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="feePerConsultation">
                  <p className={"correctClass"}>*Cena pregleda</p>
                </label>
                <input
                  type="text"
                  name="feePerConsultation"
                  placeholder="Cena pregleda"
                  onChange={handleChangeDoctorValues}
                />
              </div>

              <div className="timePickerDiv">
                <label htmlFor="experience">
                  <p className={"correctClass"}>*Radno vreme</p>
                </label>

                <TimePicker.RangePicker
                  format={"HH:mm"}
                  name="timings"
                  placeholder={["Početak vremena", "Kraj vremena"]}
                  size={"large"}
                  onChange={(Time) => {
                    const timeTemp = changedDoctorValues;
                    timeTemp.timings = [
                      [Time[0].$H, Time[0].$m],
                      [Time[1].$H, Time[1].$m],
                    ];
                  }}
                />
              </div>
              <div className="buttonDiv">
                <button onClick={changeDoctorInfo}>Izmeni</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Doktori;
