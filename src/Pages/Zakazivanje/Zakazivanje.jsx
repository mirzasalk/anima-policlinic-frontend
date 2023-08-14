import React from "react";
import Navbar from "../../Components/Navbar";
import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TimePicker, Space, DatePicker } from "antd";

const Zakazivanje = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState([]);
  const [bookingDivShowing, setBookingDivShowing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [allchecked, setAllChecked] = useState([]);
  const [showMyApointment, setShowMyApointment] = useState(false);
  const dispatch = useDispatch();
  const [backgroundSelector, setBackgroundSelector] = useState(-1);
  const [validationArray, setValidationArray] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
    timings: true,
    therapy: true,
  });
  const [apointment, setApointment] = useState();
  const [validSubmit, setValidSubmit] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [showCancelDiv, setShowCancelDiv] = useState(false);
  const [apointmentId, setApointmentId] = useState();

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

  const handleUserValues = (e) => {
    if (e.target.value !== "") {
      setValidationArray({
        ...validationArray,
        [e.target.name]: false,
      });
    } else {
      setValidationArray({
        ...validationArray,
        [e.target.name]: true,
      });
    }
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    validationArray.firstName ||
    validationArray.lastName ||
    validationArray.email ||
    validationArray.phoneNumber ||
    validationArray.address ||
    validationArray.timings ||
    validationArray.therapy
      ? setValidSubmit(false)
      : setValidSubmit(true);
  };

  useEffect(() => {
    validateInputs();
  }, [validationArray]);

  useEffect(() => {
    if (userInfo.timings === undefined) {
      setValidationArray({
        ...validationArray,
        timings: true,
      });
    } else {
      setValidationArray({
        ...validationArray,
        timings: false,
      });
    }
  }, [userInfo.timings]);

  useEffect(() => {
    if (userInfo.therapy === undefined) {
      setValidationArray({
        ...validationArray,
        therapy: true,
      });
    } else {
      setValidationArray({
        ...validationArray,
        therapy: false,
      });
    }
  }, [userInfo.therapy]);

  useEffect(() => {
    if (user) {
      setUserInfo({
        ...userInfo,
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        doctorTimings: doctorInfo.timings,
      });
      setValidationArray({
        ...validationArray,
        firstName: false,
        email: false,
        lastName: false,
      });
    }
  }, [user, doctorInfo]);

  const booking = async (e) => {
    try {
      e.preventDefault();
      if (validSubmit) {
        dispatch(showLoading());
        const response = await axios.post(
          "http://localhost:5000/api/user/apointment-apply",
          { ...userInfo },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        dispatch(hideLoading());
        console.log(response, "RESPONSE!");
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else toast.error("Molimo vas ispunite sva polja");
    } catch (error) {
      dispatch(hideLoading());
      toast.error("doslo je do greske pokusajte kasnije");
      console.log(error);
    }
  };
  console.log(userInfo);
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/check-availability",
        { ...userInfo },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setAvailability(true);
      } else {
        toast.error(response.data.message);
        setAvailability(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("greska");
    }
  };
  const getApointments = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/user/get-apointments",
        {
          userId: user.id,
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
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    user ? getApointments() : null;
  }, [user]);

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
    <div id="zakazivanjeMain">
      <div className="WorkSpace">
        <Navbar />
        <div className="ListeDiv">
          <div className="listaDoktora">
            {!showMyApointment ? (
              <h1>Zakažite termin kod željenog lekara</h1>
            ) : (
              <h1>Moji termini</h1>
            )}
            <div className="myApointment">
              {!showMyApointment ? (
                <div
                  onClick={() => {
                    setShowMyApointment(true);
                  }}
                >
                  Moji termini
                </div>
              ) : (
                <div
                  onClick={() => {
                    setShowMyApointment(false);
                  }}
                >
                  Zakazani termini
                </div>
              )}
            </div>
            <div className="DivForDoktorCards">
              {!showMyApointment
                ? doctor.map((item, index) => {
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
                            {item.timings && item.timings[0][0] < 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[0][0] : null}:
                            {item.timings && item.timings[0][1] < 9
                              ? "0"
                              : null}
                            {item.timings ? item?.timings[0][1] : null}-
                            {item.timings && item.timings[1][0] < 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[1][0] : null}:
                            {item.timings && item.timings[1][1] < 9
                              ? "0"
                              : null}
                            {item.timings ? item?.timings[1][1] : null}
                          </p>

                          <div className="DoctorCardTherapy"></div>
                          <div className="doctorBtnsDiv">
                            <button
                              onClick={() => {
                                setBookingDivShowing(true);
                                setDoctorInfo((prevState) => ({
                                  ...prevState,
                                  ...item,
                                }));
                                setUserInfo({
                                  ...userInfo,
                                  doctorId: item._id,
                                  doctorFirstName: item.firstName,
                                  doctorLastName: item.lastName,
                                });
                              }}
                            >
                              Zakaži
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : apointment?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          item.status === "pending"
                            ? "MyTermPending"
                            : item.status === "approved"
                            ? "MyTermAproved"
                            : "MyTermReject"
                        }
                      >
                        <p>
                          <strong>Doktor: </strong>
                          {item.doctorFirstName} {item.doctorLastName}{" "}
                        </p>
                        <p>
                          {" "}
                          <strong>Terapija: </strong>
                          {item.therapy}
                        </p>
                        <p>
                          <strong>Datum: </strong>
                          {item.date && item.date[0] <= 9 ? "0" : null}
                          {item.date ? item.date[0] : null}.
                          {item.date && item.date[1] <= 9 ? "0" : null}
                          {item.date ? item.date[1] : null}.{item.date[2]}
                        </p>
                        <p>
                          <strong>Termin:</strong>{" "}
                          {item.timings && item.timings[0] <= 9 ? "0" : null}
                          {item.timings ? item.timings[0] : null}:
                          {item.timings && item.timings[1] <= 9 ? "0" : null}
                          {item.timings ? item?.timings[1] : null}
                        </p>
                        <p>
                          <strong>Status: </strong>
                          {item.status}
                        </p>
                        {item.status === "rejected" ? null : (
                          <p
                            className="reject"
                            onClick={() => {
                              setApointmentId(item._id);
                              setShowCancelDiv(true);
                            }}
                          >
                            Otkazi
                          </p>
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      {bookingDivShowing ? (
        <div className="bookingDiv">
          <div className="bookingFormDiv">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setBookingDivShowing(false);
                  setUserInfo({});
                  setValidationArray({
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    address: true,
                    timings: true,
                    therapy: true,
                  });
                  setBackgroundSelector(-1);
                }}
              />
            </div>
            <h1>
              Zakažite termin kod doktora {doctorInfo?.firstName}{" "}
              {doctorInfo?.lastName}
            </h1>
            <div className="middleLine"></div>
            <div className="aboveField">
              <div className="inputDiv">
                <label htmlFor="phoneNumber">
                  <p
                    className={
                      validationArray.phoneNumber
                        ? "errorClass"
                        : "correctClass"
                    }
                  >
                    *Broj telefona
                  </p>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Broj telefona"
                  onChange={handleUserValues}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="address">
                  <p
                    className={
                      validationArray.address ? "errorClass" : "correctClass"
                    }
                  >
                    *Adresa
                  </p>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresa"
                  onChange={handleUserValues}
                />
              </div>
            </div>
            <div className="middleLine"></div>
            <div className="belowField">
              <div className="inputDiv">
                <label htmlFor="therapy">
                  <p
                    className={
                      validationArray.therapy ? "errorClass" : "correctClass"
                    }
                  >
                    *Terapija
                  </p>
                </label>
                <div className="therapiesField">
                  {doctorInfo.therapies.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          backgroundSelector === index
                            ? "selectedTherapy"
                            : "therapy"
                        }
                        onClick={() => {
                          setUserInfo({ ...userInfo, therapy: item });
                          setBackgroundSelector(index);
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="timeDiv">
                <label htmlFor="experience">
                  <p
                    className={
                      validationArray.timings ? "errorClass" : "correctClass"
                    }
                  >
                    *Vreme
                  </p>
                </label>

                <Space direction="vertical">
                  <DatePicker
                    format={"DD.MM.YYYY"}
                    onChange={(Time) => {
                      setAvailability(false);
                      const timeTemp = userInfo;
                      timeTemp.date = [Time.$D, Time.$M + 1, Time.$y];
                      setUserInfo({ ...timeTemp });
                    }}
                  />
                  <TimePicker
                    format="HH:mm"
                    className="timePicker"
                    placeholder="Unesite vreme termina"
                    size="large"
                    onChange={(Time) => {
                      const timeTemp = userInfo;
                      timeTemp.timings = [Time.$H, Time.$m];
                      setAvailability(false);
                      setUserInfo({ ...timeTemp });
                    }}
                  />
                </Space>
              </div>
              <div className="radnovremedoktora">
                Radno vreme doktora: <br />
                {doctorInfo.timings && doctorInfo.timings[0][0] <= 9
                  ? "0"
                  : null}
                {doctorInfo.timings ? doctorInfo.timings[0][0] : null}:
                {doctorInfo.timings && doctorInfo.timings[0][1] <= 9
                  ? "0"
                  : null}
                {doctorInfo.timings ? doctorInfo?.timings[0][1] : null}-
                {doctorInfo.timings && doctorInfo.timings[1][0] <= 9
                  ? "0"
                  : null}
                {doctorInfo.timings ? doctorInfo.timings[1][0] : null}:
                {doctorInfo.timings && doctorInfo.timings[1][1] <= 9
                  ? "0"
                  : null}
                {doctorInfo.timings ? doctorInfo?.timings[1][1] : null}
              </div>
              <div className="buttonDiv">
                {availability ? (
                  <button onClick={booking}>Zakaži</button>
                ) : (
                  <button
                    onClick={() => {
                      checkAvailability([userInfo.timings, userInfo.date]);
                    }}
                  >
                    Proveri dostupnost termina
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showCancelDiv ? (
        <div className="backgroundForCancelDiv">
          <div className="cancelDiv">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setShowCancelDiv(false);
                }}
              />
            </div>
            <p>Potvrdite da zelite da izbrisete odabrani termin</p>
            <div className="btnDiv">
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
    </div>
  );
};
export default Zakazivanje;
