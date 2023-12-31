import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

import "./login.css";
import { setUser } from "../../redux/userSlice";
import api from "../../api";

const Login = () => {
  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState({});
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validSubmit, setValidSubmit] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chechValidation, setChechValidation] = useState(true);
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await api.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") }, //ovo ubrzava obradu??
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        if (response.data.data.verified === false) {
          setChechValidation(response.data.data.verified);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(setUser(null));
      localStorage.clear();
      navigate("/prijava");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validSubmit) {
        dispatch(showLoading());

        const response = await api.post("/api/user/login", userData);
        dispatch(hideLoading());
        if (response.data.success) {
          console.log(response.data);
          toast.success(response.data.massage);
          localStorage.setItem("token", response.data.data);
          getUser();
        } else {
          console.log(response);
          toast.error(response.data.massage);
          setChechValidation(true);
        }
      } else toast.error("Molimo vas unesite ispravne podatke");
    } catch (error) {
      dispatch(hideLoading());
      toast.error(response.data.massage);
      console.log(error);
    }
  };

  const validateInputs = () => {
    let valid = true;
    if (!userData.email) {
      setEmailError("Potrebno je da unesete Vašu email adresu");
      valid = false;
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(userData.email)) {
      setEmailError("Uneta email adresa nije validna");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!userData.password || userData.password === "") {
      setPasswordError("Potrebno je uneti šifru");
      valid = false;
    } else if (userData.password.length < 8) {
      setPasswordError("Šifra mora imati više od 8 karaktera");
      valid = false;
    } else {
      setPasswordError("");
    }
    valid ? setValidSubmit(true) : setValidSubmit(false);
  };

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    validateInputs();
  };
  useEffect(() => {
    validateInputs();
  }, [userData]);
  useEffect(() => {
    dispatch(setUser(null));
    localStorage.clear();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>Prijavi se</h2>

          <div className="emailPasInputsDiv">
            <input
              type="email"
              placeholder="Email adresa"
              name="email"
              onChange={onChangeInput}
            />

            <span>{emailError}</span>
          </div>
          <div className="emailPasInputsDiv">
            <input
              type="password"
              placeholder="Unesite šifru"
              name="password"
              onChange={onChangeInput}
            />

            <span>{passwordError}</span>
          </div>

          {!chechValidation ? (
            <div className="verifiedDiv">
              Na vasem Email-u je posalt link za verifikaciju,molimo vas
              verifikujte vas Email{" "}
            </div>
          ) : null}

          <button>Prijavi se</button>
          <Link to={"/registracija"}>Napravi svoj nalog</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
