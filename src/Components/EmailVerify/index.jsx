import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  useEffect(() => {
    const VerifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/user/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);

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
