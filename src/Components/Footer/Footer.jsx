import "./footer.scss";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <div className="FieldAboveLine">
        <div className="FooterMeni">
          <Link to={"/onama"}>O nama</Link>
          <Link to={"/admin"}>Admin page</Link>
          <Link to={"/"}>Usluge</Link>
          <a href="#">Kontak</a>
        </div>
        <h1 className="Logo">anima</h1>
        <div className="WorkTime">
          <h3>RADNO VREME</h3>

          <div className="WorkDayDiv">
            <p>Radnim danima</p>
            <p>09h-21h</p>
          </div>

          <div className=" SaturdayDiv">
            <p>Subota</p>
            <p>09h-13h</p>
          </div>
        </div>
      </div>
      <p>© Anima, Inc. 2023.</p>
    </div>
  );
};

export default Footer;
