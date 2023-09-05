import React, { useEffect } from "react";
import DoctorNav from "../DoctorNav/DoctorNav";
import { useState } from "react";
import "./style.scss";
import "../doctor.scss";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { TimePicker } from "antd";
import api from "../../../api";

const DoctorProfil = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [changeDoctorProfilCardShow, setChangeDoctorProfilCardShow] =
    useState(false);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [imageChangeCard, setImageChangeCard] = useState("");
  const [allchecked, setAllChecked] = useState([]);
  const [therapies, setTherapies] = useState([]);
  const [previewSorce, setPreviewSorce] = useState();
  const [fileInputState, setFileInputState] = useState("");

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
      const response = await api.post(
        "/api/doctor/change-presonaldoctor-info",
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
      const response = await api.get(
        "/api/user/get-therapys",
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
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
  };
  const previewFile = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSorce(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    setImageChangeCard(false);
    if (!previewSorce) return;
    uploadImg(previewSorce);
  };
  const uploadImg = async (img) => {
    try {
      console.log(previewSorce);
      dispatch(showLoading);
      const response = await api.post(
        "/api/doctor/upload-doctor-img",
        { imgUrl: previewSorce, _id: doctorInfo._id },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      getDoctor();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTherapys();
  }, []);
  console.log(doctorInfo);
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

            {imageChangeCard ? (
              <div className="changeImageDiv">
                <div className="changeImageCard">
                  <div className="xIconDiv">
                    <img
                      className="ximg"
                      src="x.png"
                      onClick={() => {
                        setImageChangeCard(false);
                      }}
                    />
                  </div>
                  {console.log(doctorInfo.img)}
                  <Image
                    className="drimg"
                    cloudName={"dlxwesw2p"}
                    publicId={doctorInfo.img}
                    onClick={() => {
                      setImageChangeCard(true);
                    }}
                  />
                  {previewSorce ? (
                    <img className="arrowDown" src="arrow-down.png"></img>
                  ) : null}
                  {previewSorce ? (
                    <img className="uploadedImg" src={previewSorce} />
                  ) : null}
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    className="fileInput"
                    value={fileInputState}
                  />
                  {previewSorce ? (
                    <button onClick={handleSubmitFile}> Potvrdi </button>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="doctorImgDiv">
              <Image
                className="DoctorProfilimg"
                cloudName={"dlxwesw2p"}
                publicId={doctorInfo?.img}
                onClick={() => {
                  setImageChangeCard(true);
                }}
              />
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
