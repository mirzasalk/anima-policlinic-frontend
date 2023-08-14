import React, { useEffect } from "react";
import DoctorNav from "../DoctorNav/DoctorNav";
import { useState } from "react";
import "./style.scss";
import "../doctor.scss";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { TimePicker } from "antd";

const DoctorProfil = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [changeDoctorProfilCardShow, setChangeDoctorProfilCardShow] =
    useState(false);
  const [doctorInfo, setDoctorInfo] = useState({});

  const [allchecked, setAllChecked] = useState([]);
  const [therapies, setTherapies] = useState([]);

  let terap = doctorInfo?.therapies;
  doctorInfo ? console.log(doctorInfo) : null;
  const hendleDoctorInfo = (e) => {
    setDoctorInfo({
      ...doctorInfo,
      [e.target.name]: e.target.value,
    });
  };

  const changeDoctorInfo = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/doctor/change-presonaldoctor-info",
        {
          userId: doctorInfo?.userId,
          _id: doctorInfo?._id,
          firstName: doctorInfo.firstName,
          lastName: doctorInfo.lastName,
          email: doctorInfo.email,
          feePerConsultation: doctorInfo.feePerConsultation,
          experience: doctorInfo.experience,
          address: doctorInfo.address,
          specialization: doctorInfo.specialization,
          phoneNumber: doctorInfo.phoneNumber,
          timings: doctorInfo.timings,
          therapies: allchecked,
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
        getDoctor();
      }
    } catch (error) {
      console.log(error);
    }

    setChangeDoctorProfilCardShow(!changeDoctorProfilCardShow);
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
    if (user?.id) {
      getDoctor();
    }
  }, [user]);

  useEffect(() => {
    setDoctorInfo(user);
  }, [user]);

  function handleCheckedTherapies(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }

  const getTherapys = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        "http://localhost:5000/api/user/get-therapys",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);

      setTherapies([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTherapys();
  }, []);
  return (
    <div id="doctorMain">
      <div className="WorkSpace">
        <DoctorNav />
        <div className="rightFieldDiv">
          <div className="DoctorProfil">
            {changeDoctorProfilCardShow ? (
              <div className="cardForChangeBackground">
                <div className="cardForChange">
                  <div className="iconDiv">
                    <img
                      src="x.png"
                      alt="X"
                      onClick={() => {
                        setChangeDoctorProfilCardShow(
                          !changeDoctorProfilCardShow
                        );
                      }}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="firstName">Ime</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Promeni Ime"
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="lastName">Prezime</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Promeni Prezime"
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Promeni Email adresu"
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="feePerConsultation">Cena seanse</label>
                    <input
                      type="number"
                      name="feePerConsultation"
                      placeholder="Promeni cenu seanse"
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="experience">Godine iskustva</label>
                    <input
                      type="number"
                      name="experience"
                      placeholder="Promeni godine iskustva"
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="address">Adresa</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Promeni adresu "
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="specialization">Specijalizacija</label>
                    <input
                      type="text"
                      name="specialization"
                      placeholder="Promeni specijalizacuju "
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="phoneNumber">Broj telefona</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Promeni broj telefona "
                      onChange={hendleDoctorInfo}
                    />
                  </div>
                  <div className="inputDivTerapies">
                    <label htmlFor="feePerConsultation">Terapije</label>
                    <div className="terapiesCheckbox">
                      {therapies.map((item) => {
                        return (
                          <div className="therapiCheckField">
                            <input
                              value={item?.name}
                              type="checkbox"
                              onChange={handleCheckedTherapies}
                            />
                            <span> {item?.name} </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="doctorInfoElement">
                    <label htmlFor="phoneNumber">Radno vreme</label>
                    <TimePicker.RangePicker
                      name="timings"
                      placeholder={["Početka vremena", "Kraj vremena"]}
                      size={"large"}
                      onChange={(Time) => {
                        console.log(Time);
                        const timeTemp = doctorInfo;
                        timeTemp.timings = Time;
                        setDoctorInfo({ ...timeTemp });
                      }}
                    />
                  </div>
                  <button onClick={changeDoctorInfo}>Promeni</button>
                </div>
              </div>
            ) : null}

            <div className="doctorImgDiv">
              <img className="DoctorProfilimg" src="Admin.png" />
            </div>
            <div className="doctorInfo">
              <div className="doctorName">
                <div></div>
                <h2>
                  {" "}
                  {doctorInfo?.firstName} {user?.lastName}{" "}
                </h2>
              </div>
              <div className="otherInfo">
                <h4>
                  <strong>Email: </strong>
                  <p>{doctorInfo?.email}</p>
                </h4>
                <h4>
                  <strong>Broj telefona: </strong>
                  <p>{doctorInfo?.phoneNumber} </p>
                </h4>
                <h4>
                  <strong>Specijalizacija: </strong>
                  <p>{doctorInfo?.specialization} </p>
                </h4>
                <h4>
                  <strong>Adresa: </strong>
                  <p>{doctorInfo?.address} </p>
                </h4>
                <h4>
                  <strong>Godine iskustva: </strong>
                  <p>{doctorInfo?.experience} </p>
                </h4>
                <h4>
                  <strong>Cena pregleda: </strong>
                  <p>{doctorInfo?.feePerConsultation}din </p>
                </h4>
                <h4>
                  <strong>Terapije: </strong>
                  <div className="therapyDiv">
                    {terap
                      ? terap.map((elem, index) => {
                          return terap.length - 1 === index ? (
                            <div key={index}>{elem}</div>
                          ) : (
                            <div key={index}>{elem},</div>
                          );
                        })
                      : null}
                  </div>
                </h4>
                <h4>
                  <strong>Status: </strong>
                  <p>{doctorInfo?.status} </p>
                </h4>
              </div>

              <button
                className="DoctorChangeButton"
                onClick={() => {
                  setChangeDoctorProfilCardShow(!changeDoctorProfilCardShow);
                  setAllChecked([]);
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
export default DoctorProfil;
