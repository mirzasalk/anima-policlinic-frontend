import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useState } from "react";
import api from "../../api";

const AboutUs = () => {
  const dispatch = useDispatch();
  const [uprava, setUprava] = useState([
    {
      ime: "Milena Jović",
      opis: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ratione assumenda eveniet ea unde, quisquam architecto minus saepe voluptatum laborum! Nulla, earum sit consequuntur adipisci eum autem corrupti doloribus odio?",
      slika: "dr1.png",
      terapije: ["Psihoanaliza", "Decija psihijatrija"],
      zvanje: "Neuropsihijatar, psihoterapeut",
      id: 1,
      pozicija: "Vlasnik",
    },
    {
      ime: "Jovan Jeremić",
      opis: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ratione assumenda eveniet ea unde, quisquam architecto minus saepe voluptatum laborum! Nulla, earum sit consequuntur adipisci eum autem corrupti doloribus odio?",
      slika: "dr2.png",
      terapije: ["Psihoanaliza", "Decija psihijatrija"],
      zvanje: "Psihijatar, psihoterapeut",
      pozicija: "Direktor",

      id: 2,
    },

    {
      ime: "Dragana Perla",
      opis: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ratione assumenda eveniet ea unde, quisquam architecto minus saepe voluptatum laborum! Nulla, earum sit consequuntur adipisci eum autem corrupti doloribus odio?",
      slika: "dr4.png",
      terapije: ["Psihoanaliza", "Decija psihijatrija"],
      zvanje: "",
      pozicija: "Menadzer",

      id: 4,
    },
  ]);

  const [lekari, setLekari] = useState();
  const getDoctors = async () => {
    try {
      dispatch(showLoading);
      const response = await api.get("/api/user/get-doctors-for-unsigned-user");
      dispatch(hideLoading);
      console.log(response);
      setLekari([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div id="AboutUsMain">
      <Navbar />
      <div className="oNamaImgDiv">
        <img className="FirstImgAboutUs" src="onama.jpg" alt="O nama" />
        <h1>O nama</h1>
      </div>

      <h1 className="naslov">Zašto mi?</h1>
      <div className="ZastoMiDiv">
        <div className="ZastoMiLeftDiv">
          <h2>Uvek smo spremni da pomognemo oko Vašeg problema</h2>
          <p>
            U okviru Poliklinike Anima plus obavlja se psihijatrijsko lečenje
            psihičkih poremećaja gde je pored biološke i socioterapije, poseban
            akcenat stavljen na psihoterapijski tretman kojim se osim kliničkog
            poboljšanja (gubitak simptoma) postiže restrukturacija i bolja
            adaptacija ličnosti kroz korektivno emocionalno iskustvo, što
            značajno poboljšava kvalitet i ispunjenost života i mogućnost
            usredsređenja na važne životne ciljeve. <br />
            <br />
            Pored psihoterapije i psihijatrijskih pregleda kod nas se obavljaju
            i pregledi iz neurologije dece i odraslih, EEG, kao i pregledi iz
            pedijatrije i neonatologije. <br />
            <br />
          </p>
          <h4 className="naslovRadnoVreme">
            RADNO VREME: <br />
            <br />
          </h4>
          <div className="radnoVremeZAstoMi">
            <div>
              <img src="corIconBlack.png" alt="cor" />
              <p>Pon/Pet:</p>
            </div>
            <p>
              <strong> 09:00 - 21:00</strong>
            </p>
          </div>
          <div className="radnoVremeZAstoMi">
            <div>
              <img src="corIconBlack.png" alt="cor" />
              <p>Subota:</p>
            </div>
            <p>
              <strong> 09:00 - 13:00</strong>
            </p>
          </div>
          <Link to={"/kontakt"}>
            <button>Kontaktiraj nas</button>
          </Link>
        </div>
        <img className="ZastoMiImg1" src="onamaruke.jpg" alt="slika" />
      </div>

      <div className="OurTeamDiv">
        <h1 className="naslov">Upoznajte naš tim</h1>
        <div className="drFiledDiv">
          {uprava.map((i, index) => {
            return (
              <div key={index} className="drCard">
                <img
                  className="imageOfDr"
                  src={i.slika}
                  alt="Dr.Milena Jović"
                />
                <h3>{i.ime}</h3>
                <h4>{i.pozicija}</h4>
                <p>{i.zvanje}</p>
              </div>
            );
          })}
        </div>
        <div className="ProfessionalStaffDiv">
          <h1 className="naslov">Stručno osoblje</h1>
          <div className="ProfessionalStaffImagesDiv">
            {lekari?.map((i, index) => {
              if (i.status === "approved" && i.archived === "false") {
                return (
                  <Image
                    key={index}
                    className="StaffImg"
                    cloudName={"dlxwesw2p"}
                    publicId={i.img}
                    alt="o1"
                  />
                );
              }
            })}
          </div>
        </div>
        <Link to={"/ourteam"}>
          <button>Više o timu</button>
        </Link>
      </div>

      <div className="TerapyField">
        <h1 className="naslov">Usluge</h1>
        <div className="TherapyDiv">
          <Link to={"/usluge"}>
            <div className="TerapyCard">
              <img src="psihoterapija-usluge.png" alt="slika" />
              <p>Psihoterapija</p>
            </div>
          </Link>
          <Link to={"/usluge"}>
            <div className="TerapyCard">
              <img src="psiholoski kabinet.png" alt="slika" />
              <p>Grupna analitička psihoterpija</p>
            </div>
          </Link>
          <Link to={"/usluge"}>
            <div className="TerapyCard">
              <img src="psihijatrijaDece.png" alt="slika" />
              <p>Porodična psihoanaliza</p>
            </div>
          </Link>

          <Link to={"/usluge"}>
            <div className="TerapyCard">
              <img src="pedagosko.png" alt="slika" />
              <p>Psihijatrija dece</p>
            </div>
          </Link>
        </div>
        <Link to={"/usluge"}>
          <button className="ViseOUslugamaDugme"> Više o uslugama</button>
        </Link>
      </div>

      <div className="window">
        <div>
          <h1>Potražite stučnu praksu</h1>
          <p>Ne oklevajte da nas konsultujete o svom problemu</p>
          <Link
            className="aboutUsLink"
            to={localStorage.getItem("token") ? "/zakazivanje" : "/prijava"}
          >
            {" "}
            <button>Zakaži termin</button>{" "}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
