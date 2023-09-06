import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import "./aliciranjezaposao.css";
import { TimePicker, Space } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ApliciranjeZaPosao = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [previewSorce, setPreviewSorce] = useState();
  const [fileInputState, setFileInputState] = useState("");

  const [doctorData, setDoctorData] = useState({
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
  });

  const [validSubmit, setValidSubmit] = useState(false);
  const [therapies, setTherapies] = useState([]);
  const [allchecked, setAllChecked] = useState([]);
  const onChangeInput = (e) => {
    if (e.target.value !== "") {
      setValidationArray({
        ...validationArray,
        [e.target.name]: false,
      });
      setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
    } else {
      setValidationArray({
        ...validationArray,
        [e.target.name]: true,
      });
    }
  };

  useEffect(() => {
    if (doctorData.timings === null) {
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
  }, [doctorData.timings]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validSubmit) {
        dispatch(showLoading());

        const response = await api.post(
          "/api/user/doctor-apply",
          { ...doctorData, userId: user.id, img: previewSorce },
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

  useEffect(() => {
    validateInputs();
  }, [validationArray]);

  useEffect(() => {
    if (allchecked.length === 0) {
      setValidationArray({
        ...validationArray,
        therapies: true,
      });
      setDoctorData({ ...doctorData, therapies: allchecked });
    } else {
      setValidationArray({
        ...validationArray,
        therapies: false,
      });
      setDoctorData({ ...doctorData, therapies: allchecked });
    }
  }, [allchecked]);

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
    !previewSorce
      ? setValidSubmit(false)
      : setValidSubmit(true);
  };

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

  useEffect(() => {
    getTherapys();
  }, []);

  const handleCheckedTherapies = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
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
  console.log(user);

  return (
    <div id="apliciranjeMain">
      <Navbar />
      <div className="formDiv">
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
              onChange={onChangeInput}
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
              onChange={onChangeInput}
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
              onChange={onChangeInput}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="phoneNumber">
              <p
                className={
                  validationArray.phoneNumber ? "errorClass" : "correctClass"
                }
              >
                *Broj telefona
              </p>
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Broj telefona"
              onChange={onChangeInput}
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
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="formMiddleLine"></div>
        <div className="fieldBelowCenterLine">
          <div className="inputDiv">
            <label htmlFor="specialization">
              <p
                className={
                  validationArray.specialization ? "errorClass" : "correctClass"
                }
              >
                *Specijalizacija
              </p>
            </label>
            <input
              type="text"
              name="specialization"
              placeholder="Specijalizacija"
              onChange={onChangeInput}
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
              onChange={onChangeInput}
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
              onChange={onChangeInput}
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
                  let timeTemp = doctorData;
                  timeTemp.timings = [
                    [Time[0].$H, Time[0].$m],
                    [Time[1].$H, Time[1].$m],
                  ];

                  setDoctorData({ ...timeTemp });
                }}
              />
            </Space>
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
                      placeholder={item.name}
                      type="checkbox"
                      onChange={handleCheckedTherapies}
                    />
                    <span> {item.name} </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="buttonDiv">
          <button onClick={handleSubmit}>Pošalji zahtev</button>
        </div>
      </div>
    </div>
  );
};
export default ApliciranjeZaPosao;
