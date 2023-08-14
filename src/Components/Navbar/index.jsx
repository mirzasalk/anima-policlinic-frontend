import React, { useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-info-by-id",
        {}, //??

        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="nav">
      <div className="wrapper">
        <div className="logo">anima</div>
        <nav className="menu-item1">
          <ul>
            <li>
              <Link to={"/"}>Početna</Link>
            </li>
            <li>
              <Link to={"/onama"}>O nama</Link>
            </li>
            <li>
              <Link to={"/usluge"}>Usluge</Link>
            </li>

            <li>
              <a href="#">Lekari</a>
            </li>

            <li>
              <a href="#">Kontakt</a>
            </li>
            <li>
              {user?.isAdmin || user?.isDoctor ? null : localStorage.getItem(
                  "token"
                ) ? (
                <Link to={"/zakazivanje"}>Zakaži termin</Link>
              ) : (
                <Link to={"/prijava"}>Zakaži termin</Link>
              )}
            </li>
            <li>
              {user?.isAdmin || user?.isDoctor ? null : localStorage.getItem(
                  "token"
                ) ? (
                <Link to={"/apliciranje"}>Apliciraj za posao</Link>
              ) : (
                <Link to={"/prijava"}>Apliciraj za posao</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div className="menu-item2">
        {user?.isAdmin ? (
          <Link className={"navLink"} to={"/korisnici"}>
            Kontrolna tabla
          </Link>
        ) : null}
        {user?.isDoctor ? (
          <Link className={"navLink"} to={"/doctorprofil"}>
            Radni prostor
          </Link>
        ) : null}
        {user ? (
          <Link to={"/prijava"}>
            <button>
              <p>Odjavi se </p>
            </button>
          </Link>
        ) : (
          <Link to={"/prijava"}>
            <button>
              <p>Prijavi se </p>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
