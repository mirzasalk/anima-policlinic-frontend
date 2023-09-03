import React, { useEffect, useState } from "react";
import "./style.scss";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Image } from "cloudinary-react";

const OurTeam = () => {
  const dispatch = useDispatch();

  const [lekari, setLekari] = useState([]);
  const [dropDownClick, setDropDownClick] = useState(false);
  const [filterSelec, setFilterSelec] = useState("Sve terapije");
  const [therapies, setTerapies] = useState([]);
  let c = 0;
  const getDoctors = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        "http://localhost:5000/api/user/get-doctors-for-unsigned-user"
      );
      dispatch(hideLoading);

      setLekari([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const getTherapies = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        "http://localhost:5000/api/user/get-therapies-gor-unsigned-user"
      );
      dispatch(hideLoading);

      setTerapies([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
    getTherapies();
  }, []);

  return (
    <div id="lekariMain">
      <Navbar />
      <div className="prvaSlikaOurTeamDiv">
        <img src="onama.jpg" alt="aaa" />
        <h1>Lekari</h1>
      </div>

      <div className="filterDiv">
        <div className="filterDivText">
          <p>
            U cilju poboljšanja i unapredjenja usluge, naša stanica vam nudi
            filtriranje doktora prema terapijama . <br />{" "}
            <strong>Ukoliko želite da izaberete željenou terapiju </strong>
            koristite filter koji se nalazi u okviru ovog polja.
          </p>
        </div>
        <div className="FilterTerapijeDropDown">
          <h4>Filter:</h4>
          <div
            onClick={() => {
              setDropDownClick(!dropDownClick);
            }}
            className="dropDownFirstField"
          >
            <p>{filterSelec}</p>

            <img src={dropDownClick ? "up.png" : "down.png"} alt="icon" />
          </div>
          <div className="DropDownScrollDiv">
            {dropDownClick ? (
              <div
                onClick={() => {
                  setFilterSelec("Sve terapije");
                  setDropDownClick(!dropDownClick);
                }}
              >
                <p>Sve terapije</p>
              </div>
            ) : null}
            {dropDownClick
              ? therapies.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        setFilterSelec(item.name);
                        setDropDownClick(!dropDownClick);
                      }}
                      key={index}
                    >
                      <p>{item.name}</p>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      {filterSelec === "Sve terapije" ? (
        <div id="listaLekara">
          <h1 className="naslovLekari">Lekari</h1>

          {lekari.map((item, index) => {
            console.log(c);
            if (item.status === "approved" && item.archived === "false") {
              return (
                <div
                  key={index}
                  className={
                    (index - c) % 2 == 0 ? "DoctorCard" : "DoctorCardInverse"
                  }
                >
                  <div className="DoctorCardText">
                    <h2>
                      {item.firstName} {item.lastName}
                    </h2>
                    <p>
                      <strong>Godine Iskustva: </strong>
                      {item.experience}
                    </p>
                    <p>
                      <strong>Specijalizacija: </strong>
                      {item.specialization}
                    </p>
                    <p>
                      <strong>Cena termina: </strong>
                      {item.feePerConsultation}din
                    </p>
                    <p>
                      <strong>Terapije: </strong>
                      {item.therapies.map((elem) => {
                        return elem + ",";
                      })}
                    </p>
                    <p>
                      <strong>Radno vreme: </strong>
                      {item.timings && item.timings[0][0] <= 9 ? "0" : null}
                      {item.timings ? item.timings[0][0] : null}:
                      {item.timings && item.timings[0][1] <= 9 ? "0" : null}
                      {item.timings ? item?.timings[0][1] : null}-
                      {item.timings && item.timings[1][0] <= 9 ? "0" : null}
                      {item.timings ? item.timings[1][0] : null}:
                      {item.timings && item.timings[1][1] <= 9 ? "0" : null}
                      {item.timings ? item?.timings[1][1] : null}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {item.email}
                    </p>
                  </div>
                  <div className="DoctorCardImg">
                    <Image
                      className="doctorImg"
                      cloudName={"dlxwesw2p"}
                      publicId={item.img}
                    />

                    <div className="grayBackgroundDiv"></div>
                  </div>
                </div>
              );
            } else {
              c = c + 1;
            }
          })}
        </div>
      ) : (
        <div id="listaLekara">
          <h1 className="naslovLekari">Lekari</h1>

          {lekari.map((item, index) => {
            console.log(c);
            if (
              item.therapies.includes(filterSelec) &&
              item.status === "approved" &&
              item.archived === "false"
            ) {
              return (
                <div
                  key={index}
                  className={
                    (index - c) % 2 == 0 ? "DoctorCard" : "DoctorCardInverse"
                  }
                >
                  <div className="DoctorCardText">
                    <h2>
                      {item.firstName} {item.lastName}
                    </h2>
                    <p>
                      <strong>Godine Iskustva: </strong>
                      {item.experience}
                    </p>
                    <p>
                      <strong>Arhiv</strong>
                    </p>
                    <p>
                      <strong>Specijalizacija: </strong>
                      {item.specialization}
                    </p>
                    <p>
                      <strong>Cena termina: </strong>
                      {item.feePerConsultation}din
                    </p>
                    <p>
                      <strong>Terapije: </strong>
                      {item.therapies.map((elem) => {
                        return elem + ",";
                      })}
                    </p>
                    <p>
                      <strong>Radno vreme: </strong>
                      {item.timings && item.timings[0][0] <= 9 ? "0" : null}
                      {item.timings ? item.timings[0][0] : null}:
                      {item.timings && item.timings[0][1] <= 9 ? "0" : null}
                      {item.timings ? item?.timings[0][1] : null}-
                      {item.timings && item.timings[1][0] <= 9 ? "0" : null}
                      {item.timings ? item.timings[1][0] : null}:
                      {item.timings && item.timings[1][1] <= 9 ? "0" : null}
                      {item.timings ? item?.timings[1][1] : null}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {item.email}
                    </p>
                  </div>
                  <div className="DoctorCardImg">
                    <img className="doctorImg" src={item.img} />
                    <div className="grayBackgroundDiv"></div>
                  </div>
                </div>
              );
            } else {
              c = c + 1;
            }
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OurTeam;
