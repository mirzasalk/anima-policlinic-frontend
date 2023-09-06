import React, { useEffect, useState } from "react";
import "./usluge.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Image } from "cloudinary-react";
import api from "../../api";

const Usluge = () => {
  const dispatch = useDispatch();
  const [psihoterapije, setPsihoterapije] = useState([]);
  const [grupnaAnalitičkaPsihoterpija, setGrupnaAnalitičkaPsihoterpija] =
    useState([]);
  const [porodičnaPsihoanaliza, setPorodičnaPsihoanaliza] = useState([]);
  const [psihijatrijaDece, setPsihijatrijaDece] = useState([]);
  const [lekari, setLekari] = useState([]);
  const [dropDownClick, setDropDownClick] = useState(false);
  const [filterSelec, setFilterSelec] = useState([]);
  const [therapies, setTerapies] = useState([]);
  const [therapiesOfSelectedDoctor, setTherapiesOfSelectedDoctor] = useState();

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

  const getTherapies = async () => {
    try {
      dispatch(showLoading);
      const response = await api.get(
        "/api/user/get-therapies-gor-unsigned-user"
      );
      dispatch(hideLoading);
      console.log(response);
      setTerapies([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
    getTherapies();
  }, []);

  useEffect(() => {
    const psihijatrijaDeceTemp = therapies?.filter((item) => {
      return item.category === "PsihijatrijaDece";
    });
    setPsihijatrijaDece(psihijatrijaDeceTemp);

    const grupnaAnalitičkaPsihoterpijaTemp = therapies?.filter((item) => {
      return item.category === "GrupnaAnalitičkaPsihoterpija";
    });
    setGrupnaAnalitičkaPsihoterpija(grupnaAnalitičkaPsihoterpijaTemp);

    const psihoterapijeTemp = therapies?.filter((item) => {
      return item.category === "Psihoterapije";
    });
    setPsihoterapije(psihoterapijeTemp);

    const porodičnaPsihoanalizaTemp = therapies?.filter((item) => {
      return item.category === "PorodičnaPsihoanaliza";
    });
    setPorodičnaPsihoanaliza(porodičnaPsihoanalizaTemp);
  }, [therapies]);

  useEffect(() => {
    lekari?.map((item) => {
      if (
        filterSelec.length !== 0 &&
        item.firstName === filterSelec[0] &&
        item.lastName === filterSelec[1] &&
        item.status === "approved"
      ) {
        setTherapiesOfSelectedDoctor(item.therapies);
      } else if (filterSelec.length === 0) {
        setTherapiesOfSelectedDoctor([]);
      }
    });
  }, [filterSelec]);

  console.log(lekari, "lekari");

  return (
    <div id="uslugeMain">
      <Navbar />
      <div className="prvaSlikaUslugeDiv">
        <img src="uslugePrva.jpg" alt="aaa" />
        <h1>Usluge</h1>
      </div>

      <div className="TherapyClasses">
        <div
          className="TerapyClassCard"
          onClick={() => {
            const element = document.getElementById("PsihoterapijeDiv");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <img src="psihoterapija-usluge.png" alt="slika" />
          <p>Psihoterapija</p>
        </div>

        <div
          className="TerapyClassCard"
          onClick={() => {
            const element = document.getElementById(
              "GrupnaAnalitičkaPsihoterpijaDiv"
            );
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <img src="psiholoski kabinet.png" alt="slika" />
          <p>Grupna analitička psihoterpija</p>
        </div>

        <div
          className="TerapyClassCard"
          onClick={() => {
            const element = document.getElementById("PorodičnaPsihoanalizaDiv");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <img src="psihijatrijaDece.png" alt="slika" />
          <p>Porodična psihoanaliza</p>
        </div>

        <div
          className="TerapyClassCard"
          onClick={() => {
            const element = document.getElementById("PsihijatrijaDeceDiv");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <img src="pedagosko.png" alt="slika" />
          <p>Psihijatrija dece</p>
        </div>
      </div>

      <div className="filterDiv">
        <div className="filterDivText">
          <p>
            U cilju poboljšanja i unapredjenja usluge, naša stanica vam nudi
            filtriranje terapija prema lekarima koji ih vode. <br />{" "}
            <strong>Ukoliko želite da izaberete željenog lekara </strong>
            koristite filter koji se nalazi u okviru ovog polja.
          </p>
        </div>
        <div className="FilterLekariDropDown">
          <h4>Filter:</h4>
          <div
            onClick={() => {
              setDropDownClick(!dropDownClick);
              console.log(dropDownClick);
            }}
            className="dropDownFirstField"
          >
            <p>
              {filterSelec.length === 0
                ? "Svi lekari"
                : filterSelec[0] + " " + filterSelec[1]}
            </p>

            <img src={dropDownClick ? "up.png" : "down.png"} alt="icon" />
          </div>
          <div className="DropDownScrollDiv">
            {dropDownClick ? (
              <div
                onClick={() => {
                  setFilterSelec([]);
                  setDropDownClick(!dropDownClick);
                }}
              >
                <p>Svi lekari</p>
              </div>
            ) : null}
            {dropDownClick
              ? lekari.map((item, index) => {
                  if (item.status === "approved" && item.archived === "false") {
                    return (
                      <div
                        onClick={() => {
                          setFilterSelec([item.firstName, item.lastName]);
                          setDropDownClick(!dropDownClick);
                        }}
                        key={index}
                      >
                        <p>
                          {item.firstName} {item.lastName}
                        </p>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      </div>

      {filterSelec.length === 0 ? (
        <div id="PsihoterapijeDiv">
          <h1 className="naslovUsluge">Psihoterapija</h1>

          {psihoterapije.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.name}</h2>
                  <p>{item.about}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>
                    </h4>
                    {lekari.map((elem) => {
                      if (
                        elem.therapies.includes(item.name) &&
                        elem.status === "approved" &&
                        elem.archived === "false"
                      ) {
                        return elem.firstName + " " + elem.lastName + ", ";
                      }
                    })}
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <Image
                    className="therapyImg"
                    cloudName={"dlxwesw2p"}
                    publicId={item.img}
                  />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div id="PsihoterapijeDiv">
          <h1 className="naslovUsluge">Psihoterapija</h1>

          {psihoterapije.map((item, index) => {
            if (therapiesOfSelectedDoctor?.includes(item.name)) {
              return (
                <div
                  key={index}
                  className={
                    index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"
                  }
                >
                  <div className="TerapyCardText">
                    <h2>{item.name}</h2>
                    <p>{item.about}</p>
                    <div className="lekariTerapije">
                      <h4>
                        <strong>Lekari:</strong>
                      </h4>{" "}
                      {lekari.map((elem) => {
                        if (
                          elem.therapies.includes(item.name) &&
                          elem.status === "approved" &&
                          elem.archived === "false"
                        ) {
                          return elem.firstName + " " + elem.lastName + ", ";
                        }
                      })}
                      <div></div>
                    </div>
                  </div>
                  <div className="TerapyCardImg">
                    <Image
                      className="therapyImg"
                      cloudName={"dlxwesw2p"}
                      publicId={item.img}
                    />
                    <div className="grayBackgroundDiv"></div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      {filterSelec.length === 0 ? (
        <div id="GrupnaAnalitičkaPsihoterpijaDiv">
          <h1 className="naslovUsluge">Grupna Analitička Psihoterpija</h1>

          {grupnaAnalitičkaPsihoterpija.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.name}</h2>
                  <p>{item.about}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>
                    </h4>{" "}
                    {lekari.map((elem) => {
                      if (
                        elem.therapies.includes(item.name) &&
                        elem.status === "approved" &&
                        elem.archived === "false"
                      ) {
                        return elem.firstName + " " + elem.lastName + ", ";
                      }
                    })}
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <Image
                    className="therapyImg"
                    cloudName={"dlxwesw2p"}
                    publicId={item.img}
                  />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div id="GrupnaAnalitičkaPsihoterpijaDiv">
          <h1 className="naslovUsluge">Grupna Analitička Psihoterpija</h1>

          {grupnaAnalitičkaPsihoterpija.map((item, index) => {
            if (therapiesOfSelectedDoctor?.includes(item.name)) {
              return (
                <div
                  key={index}
                  className={
                    index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"
                  }
                >
                  <div className="TerapyCardText">
                    <h2>{item.name}</h2>
                    <p>{item.about}</p>
                    <div className="lekariTerapije">
                      <h4>
                        <strong>Lekari:</strong>
                      </h4>{" "}
                      {lekari.map((elem) => {
                        if (
                          elem.therapies.includes(item.name) &&
                          elem.status === "approved" &&
                          elem.archived === "false"
                        ) {
                          return elem.firstName + " " + elem.lastName + ", ";
                        }
                      })}
                      <div></div>
                    </div>
                  </div>
                  <div className="TerapyCardImg">
                    <Image
                      className="therapyImg"
                      cloudName={"dlxwesw2p"}
                      publicId={item.img}
                    />
                    <div className="grayBackgroundDiv"></div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      {filterSelec.length === 0 ? (
        <div id="PorodičnaPsihoanalizaDiv">
          <h1 className="naslovUsluge">Porodična Psihoanaliza</h1>

          {porodičnaPsihoanaliza.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.name}</h2>
                  <p>{item.about}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>
                    </h4>{" "}
                    {lekari.map((elem) => {
                      if (
                        elem.therapies.includes(item.name) &&
                        elem.status === "approved" &&
                        elem.archived === "false"
                      ) {
                        return elem.firstName + " " + elem.lastName + ", ";
                      }
                    })}
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <Image
                    className="therapyImg"
                    cloudName={"dlxwesw2p"}
                    publicId={item.img}
                  />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div id="PorodičnaPsihoanalizaDiv">
          <h1 className="naslovUsluge">Porodična Psihoanaliza</h1>

          {porodičnaPsihoanaliza.map((item, index) => {
            if (therapiesOfSelectedDoctor?.includes(item.name)) {
              return (
                <div
                  key={index}
                  className={
                    index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"
                  }
                >
                  <div className="TerapyCardText">
                    <h2>{item.name}</h2>
                    <p>{item.about}</p>
                    <div className="lekariTerapije">
                      <h4>
                        <strong>Lekari:</strong>{" "}
                      </h4>{" "}
                      {lekari.map((elem) => {
                        if (
                          elem.therapies.includes(item.name) &&
                          elem.status === "approved" &&
                          elem.archived === "false"
                        ) {
                          return elem.firstName + " " + elem.lastName + ", ";
                        }
                      })}
                      <div></div>
                    </div>
                  </div>
                  <div className="TerapyCardImg">
                    <Image
                      className="therapyImg"
                      cloudName={"dlxwesw2p"}
                      publicId={item.img}
                    />
                    <div className="grayBackgroundDiv"></div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      {filterSelec.length === 0 ? (
        <div id="PsihijatrijaDeceDiv">
          <h1 className="naslovUsluge">Psihijatrija dece</h1>

          {psihijatrijaDece.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.name}</h2>
                  <p>{item.about}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>{" "}
                    </h4>{" "}
                    {lekari.map((elem) => {
                      if (
                        elem.therapies.includes(item.name) &&
                        elem.status === "approved" &&
                        elem.archived === "false"
                      ) {
                        return elem.firstName + " " + elem.lastName + ", ";
                      }
                    })}
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <Image
                    className="therapyImg"
                    cloudName={"dlxwesw2p"}
                    publicId={item.img}
                  />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div id="PsihijatrijaDeceDiv">
          <h1 className="naslovUsluge">Psihijatrija dece</h1>

          {psihijatrijaDece.map((item, index) => {
            if (therapiesOfSelectedDoctor?.includes(item.name)) {
              return (
                <div
                  key={index}
                  className={
                    index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"
                  }
                >
                  <div className="TerapyCardText">
                    <h2>{item.name}</h2>
                    <p>{item.about}</p>
                    <div className="lekariTerapije">
                      <h4>
                        <strong>Lekari:</strong>
                      </h4>{" "}
                      {lekari.map((elem) => {
                        if (
                          elem.therapies.includes(item.name) &&
                          elem.status === "approved" &&
                          elem.archived === "false"
                        ) {
                          return elem.firstName + " " + elem.lastName + ", ";
                        }
                      })}
                      <div></div>
                    </div>
                  </div>
                  <div className="TerapyCardImg">
                    <Image
                      className="therapyImg"
                      cloudName={"dlxwesw2p"}
                      publicId={item.img}
                    />
                    <div className="grayBackgroundDiv"></div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Usluge;
