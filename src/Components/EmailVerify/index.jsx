import { useState, useEffect, Fragment } from "react";
import "./style.scss";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);

  return (
    <Fragment>
      {validUrl ? (
        <div>
          <img src="" alt="" />
        </div>
      ) : (
        <h1> 404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
