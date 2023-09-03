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
import { TimePicker, Space } from "antd";
import { Image } from "cloudinary-react";

// require("dotenv").config();
const Doktori = () => {
  const [previewSorce, setPreviewSorce] = useState();
  const [doctor, setDoctor] = useState([]);
  const [deleteDoctorDivShowing, setDeleteDoctorDivShowing] = useState(false);
  const [newDoctorInfo, setNewDoctorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    timings: null,
    therapies: null,
  });

  const [imageChangeCard, setImageChangeCard] = useState(false);
  const [changeDoctorDivShowing, setChangeDoctorDivShowing] = useState(false);
  const [showNewDoctorCard, setShowNewDoctorCard] = useState(false);
  const [doctorID, setDoctorID] = useState("");
  const [doctorImgCloudUrl, setDoctorImgCloudUrl] = useState("");

  const [userID, setUserID] = useState("");
  const [changedDoctorValues, setChangedDoctorValues] = useState("");
  const [allchecked, setAllChecked] = useState([]);
  const [therapies, setTherapies] = useState([]);
  const dispatch = useDispatch();
  const [validationArray, setValidationArray] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
    specialization: true,
    experience: true,
    feePerConsultation: true,
    timings: true,
    therapies: true,
    password: true,
  });
  const [doktorsStatus, setDoktorsStatus] = useState("approved");
  const [validSubmit, setValidSubmit] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
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

  const deleteDoctor = async () => {
    try {
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

  const onChangeInputNewDoctor = (e) => {
    if (e.target.value !== "") {
      setValidationArray({
        ...validationArray,
        [e.target.name]: false,
      });
      setNewDoctorInfo({ ...newDoctorInfo, [e.target.name]: e.target.value });
    } else {
      setValidationArray({
        ...validationArray,
        [e.target.name]: true,
      });
    }
  };

  const handleCheckedTherapiesNewDoctor = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    setShowNewDoctorCard(false);
    try {
      e.preventDefault();
      if (validSubmit) {
        dispatch(showLoading());

        const response = await axios.post(
          "http://localhost:5000/api/admin//create-new-doctor",
          { ...newDoctorInfo, img: previewSorce },
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

          setNewDoctorInfo({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            specialization: "",
            experience: "",
            feePerConsultation: "",
            timings: null,
            therapies: null,
          });
          setValidationArray({
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            address: true,
            specialization: true,
            experience: true,
            feePerConsultation: true,
            timings: true,
            therapies: true,
            password: true,
          });
          getDoctors();
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

  const validateInputs = () => {
    validationArray.firstName ||
    validationArray.lastName ||
    validationArray.email ||
    validationArray.phoneNumber ||
    validationArray.address ||
    validationArray.specialization ||
    validationArray.experience ||
    validationArray.feePerConsultation ||
    validationArray.timings ||
    validationArray.password ||
    validationArray.therapies
      ? setValidSubmit(false)
      : setValidSubmit(true);
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
    setImageChangeCard(false);
    e.preventDefault();
    if (!previewSorce) return;
    uploadImg(previewSorce);
  };
  const uploadImg = async (img) => {
    try {
      console.log(previewSorce);
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/admin/upload-doctor-img",
        { imgUrl: previewSorce, doctorId: doctorID },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      getDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allchecked.length === 0) {
      setValidationArray({
        ...validationArray,
        therapies: true,
      });
    } else {
      setValidationArray({
        ...validationArray,
        therapies: false,
      });
    }
  }, [, allchecked]);

  useEffect(() => {
    if (newDoctorInfo.timings === null) {
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
  }, [newDoctorInfo.timings]);
  useEffect(() => {
    validateInputs();
  }, [validationArray]);

  useEffect(() => {
    getDoctors();
    getTherapys();
  }, []);

  useEffect(() => {
    setNewDoctorInfo({ ...newDoctorInfo, therapies: allchecked });
  }, [allchecked]);
  console.log(doctorID);

  return (
    <div id="adminMain">
      <div className="WorkSpace">
        <AdminNav />

        <div className="ListeDiv">
          <div className="listaDoktora">
            <h1>Lista doktora</h1>
            <div className="AddNewDoctorDiv">
              <div className="changePageStatusDiv">
                <p
                  onClick={() => {
                    setDoktorsStatus("approved");
                  }}
                >
                  Aktivni
                </p>
                <p
                  onClick={() => {
                    setDoktorsStatus("rejected");
                  }}
                >
                  Odbijeni
                </p>
                <p
                  onClick={() => {
                    setDoktorsStatus("archived");
                  }}
                >
                  Arhivirani
                </p>
              </div>
              <button
                className="AddNewDoctorBtn"
                onClick={() => {
                  setShowNewDoctorCard(true);
                }}
              >
                Dodaj doktora
              </button>
            </div>
            {doktorsStatus === "approved" ? (
              <div className="DivForApprovedDoktorCards">
                {doctor.map((item, index) => {
                  if (item.status === "approved" && item.archived === "false") {
                    return (
                      <div key={index} className="doctorCard">
                        <Image
                          className="doctorCardImg"
                          cloudName={"dlxwesw2p"}
                          publicId={item.img}
                          onClick={() => {
                            setImageChangeCard(true);
                            setDoctorID(item._id);
                            setDoctorImgCloudUrl(item.img);
                          }}
                        />

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
                            {item.timings && item.timings[0][0] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[0][0] : null}:
                            {item.timings && item.timings[0][1] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item?.timings[0][1] : null}-
                            {item.timings && item.timings[1][0] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[1][0] : null}:
                            {item.timings && item.timings[1][1] <= 9
                              ? "0"
                              : null}
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
                  }
                })}
              </div>
            ) : null}
            {doktorsStatus === "rejected" ? (
              <div className="DivForRejectedDoktorCards">
                {doctor.map((item, index) => {
                  if (item.status === "rejected" && item.archived === "false") {
                    return (
                      <div key={index} className="doctorCard">
                        <Image
                          className="doctorCardImg"
                          cloudName={"dlxwesw2p"}
                          publicId={item.img}
                          onClick={() => {
                            setImageChangeCard(true);
                            setDoctorID(item._id);
                            setDoctorImgCloudUrl(item.img);
                          }}
                        />
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
                            {item.timings && item.timings[0][0] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[0][0] : null}:
                            {item.timings && item.timings[0][1] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item?.timings[0][1] : null}-
                            {item.timings && item.timings[1][0] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[1][0] : null}:
                            {item.timings && item.timings[1][1] <= 9
                              ? "0"
                              : null}
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
                  }
                })}
              </div>
            ) : null}
            {doktorsStatus === "archived" ? (
              <div className="DivForArchivedDoktorCards">
                {doctor.map((item, index) => {
                  if (item.archived === "true") {
                    return (
                      <div key={index} className="doctorCard">
                        <Image
                          className="doctorCardImg"
                          cloudName={"dlxwesw2p"}
                          publicId={item.img}
                          onClick={() => {
                            setImageChangeCard(true);
                            setDoctorID(item._id);
                            setDoctorImgCloudUrl(item.img);
                          }}
                        />
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
                            {item.timings && item.timings[0][0] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[0][0] : null}:
                            {item.timings && item.timings[0][1] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item?.timings[0][1] : null}-
                            {item.timings && item.timings[1][0] <= 9
                              ? "0"
                              : null}
                            {item.timings ? item.timings[1][0] : null}:
                            {item.timings && item.timings[1][1] <= 9
                              ? "0"
                              : null}
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
                  }
                })}
              </div>
            ) : null}
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
      {showNewDoctorCard ? (
        <div id="newDoctorMain">
          <div className="formDiv">
            <div className="iconDivNewDoctor">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setShowNewDoctorCard(false);
                  setNewDoctorInfo({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    specialization: "",
                    experience: "",
                    feePerConsultation: "",
                    timings: null,
                    therapies: null,
                  });
                  setValidationArray({
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    address: true,
                    specialization: true,
                    experience: true,
                    feePerConsultation: true,
                    timings: true,
                    therapies: true,
                    password: true,
                  });
                }}
              />
            </div>
            <h1>Apliciraj za posao</h1>
            <div className="formMiddleLine"></div>

            <div className="fieldAboveCenterLine">
              <div className="inputDiv">
                <label htmlFor="firstName">
                  <p
                    className={
                      validationArray.firstName ? "errorClass" : "correctClass"
                    }
                  >
                    *Ime
                  </p>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ime"
                  onChange={onChangeInputNewDoctor}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="lastName">
                  <p
                    className={
                      validationArray.lastName ? "errorClass" : "correctClass"
                    }
                  >
                    *Prezime
                  </p>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Prezime"
                  onChange={onChangeInputNewDoctor}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="email">
                  <p
                    className={
                      validationArray.email ? "errorClass" : "correctClass"
                    }
                  >
                    *Email
                  </p>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChangeInputNewDoctor}
                />
              </div>
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
                  onChange={onChangeInputNewDoctor}
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
                  onChange={onChangeInputNewDoctor}
                />
              </div>
            </div>
            <div className="formMiddleLine"></div>
            <div className="fieldBelowCenterLine">
              <div className="inputDiv">
                <label htmlFor="specialization">
                  <p
                    className={
                      validationArray.specialization
                        ? "errorClass"
                        : "correctClass"
                    }
                  >
                    *Specijalizacija
                  </p>
                </label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Specijalizacija"
                  onChange={onChangeInputNewDoctor}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="experience">
                  <p
                    className={
                      validationArray.experience ? "errorClass" : "correctClass"
                    }
                  >
                    *Godine iskustva
                  </p>
                </label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Godine iskustva"
                  onChange={onChangeInputNewDoctor}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="feePerConsultation">
                  <p
                    className={
                      validationArray.feePerConsultation
                        ? "errorClass"
                        : "correctClass"
                    }
                  >
                    *Cena pregleda
                  </p>
                </label>
                <input
                  type="text"
                  name="feePerConsultation"
                  placeholder="Cena pregleda"
                  onChange={onChangeInputNewDoctor}
                />
              </div>

              <div className="timePickerDiv">
                <label htmlFor="experience">
                  <p
                    className={
                      validationArray.timings ? "errorClass" : "correctClass"
                    }
                  >
                    *Radno vreme
                  </p>
                </label>

                <Space wrap>
                  <TimePicker.RangePicker
                    format="HH:mm"
                    name="timings"
                    placeholder={["Početka vremena", "Kraj vremena"]}
                    size={"large"}
                    onChange={(Time) => {
                      console.log(Time);
                      let timeTemp = newDoctorInfo;
                      timeTemp.timings = [
                        [Time[0].$H, Time[0].$m],
                        [Time[1].$H, Time[1].$m],
                      ];

                      setNewDoctorInfo({ ...timeTemp });
                    }}
                  />
                </Space>
              </div>
              <div className="inputPassDiv">
                <label htmlFor="password">
                  <p
                    className={
                      validationArray.password ? "errorClass" : "correctClass"
                    }
                  >
                    *Password
                  </p>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Sifra"
                  onChange={onChangeInputNewDoctor}
                />
              </div>
              <div className="inputDivTerapies">
                <label htmlFor="feePerConsultation">
                  <p className={previewSorce ? "correctClass " : "errorClass"}>
                    *Slika
                  </p>
                </label>
                <div className="addImgDiv">
                  {previewSorce ? (
                    <img
                      className="uploadedImg"
                      src={previewSorce}
                      width="100"
                      height="100"
                    />
                  ) : null}
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    className="fileInput"
                    value={fileInputState}
                  />
                </div>
              </div>
              <div className="inputDivTerapies">
                <label htmlFor="feePerConsultation">
                  <p
                    className={
                      validationArray.therapies ? "errorClass" : "correctClass"
                    }
                  >
                    *Terapije
                  </p>
                </label>
                <div className="terapiesCheckbox">
                  {therapies.map((item, index) => {
                    return (
                      <div key={index} className="therapiCheckField">
                        <input
                          value={item.name}
                          type="checkbox"
                          onChange={handleCheckedTherapiesNewDoctor}
                        />
                        <span> {item.name} </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="buttonDiv">
              <button onClick={handleSubmit}>Kreiraj nalog doktora </button>
            </div>
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

            <Image
              className="drimg"
              cloudName={"dlxwesw2p"}
              publicId={doctorImgCloudUrl}
              onClick={() => {
                setImageChangeCard(true);
                setDoctorID(item._id);
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
    </div>
  );
};
export default Doktori;
