import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import api from "../../api";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  useEffect(() => {
    const VerifyEmailUrl = async () => {
      try {
        const url = `/api/user/${params.id}/verify/${params.token}`;
        const { data } = await api.get(url);

        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log("greska", error);
      }
    };
    VerifyEmailUrl();
  }, [params]);
  return (
    <div id="EmailVerifyMain">
      {validUrl ? (
        <div className="EmailVerifyCard">
          <h1>Email Verify Successfully</h1>
          <Link to={"/prijava"}>
            <button className="emailVerifyBtn">Prijavi se</button>
          </Link>
        </div>
      ) : (
        <div className="EmailVerifyCard">
          <h1> Link nije valida,registrujete se ponovo</h1>
          <Link to={"/prijava"}>
            <button className="emailVerifyBtn">Registruj se</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
