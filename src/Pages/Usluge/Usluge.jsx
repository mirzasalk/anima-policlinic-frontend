import React, { useEffect, useState } from "react";
import "./usluge.scss";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Usluge = () => {
  const dispatch = useDispatch();
  const [psihoterapije, setPsihoterapije] = useState([]);
  const [grupnaAnalitičkaPsihoterpija, setGrupnaAnalitičkaPsihoterpija] =
    useState([
      {
        ime: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
        slika: "grupnaU1.jpg",
        lekari: ["Dr.Dragana Perla", "Dr.Omer Sadiković"],
      },
      {
        ime: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
        slika: "grupnaU2.jpg",
        lekari: ["Dr.Omer Sadiković", "Dr.Milena Jović"],
      },
      {
        ime: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
        slika: "grupnaU3.jpg",
        lekari: ["Dr.Dragana Perla", "Dr.Jovan Jeremeić"],
      },
      {
        ime: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
        slika: "grupnaU4.jpg",
        lekari: ["Dr.Jovan Jeremeić", "Dr.Milena Jović"],
      },
    ]);
  const [porodičnaPsihoanaliza, setPorodičnaPsihoanaliza] = useState([
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "porodicnaU1.jpg",
      lekari: ["Dr.Jovan Jeremeić", "Dr.Milena Jović"],
    },
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "porodicnaU2.jpg",
      lekari: ["Dr.Dragana Perla", "Dr.Jovan Jeremeić"],
    },
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "porodicnaU3.jpg",
      lekari: ["Dr.Omer Sadiković", "Dr.Milena Jović"],
    },
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "porodicnaU4.jpg",
      lekari: ["Dr.Dragana Perla", "Dr.Omer Sadiković"],
    },
  ]);
  const [psihijatrijaDece, setPsihijatrijaDeceDiv] = useState([
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "decijaU1.jpg",
      lekari: ["Dr.Omer Sadiković", "Dr.Milena Jović"],
      age: 30,
    },
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "decijaU2.jpg",
      lekari: ["Dr.Dragana Perla", "Dr.Omer Sadiković"],
      age: 25,
    },
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "decijaU3.jpg",
      lekari: ["Dr.Jovan Jeremeić", "Dr.Milena Jović"],
      age: 20,
    },
    {
      ime: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ut totam quod a non, natus laborum praesentium libero hic beatae dolorem fugit sunt consectetur? Id amet voluptas dignissimos velit nobis.",
      slika: "decijaU4.jpg",
      lekari: ["Dr.Dragana Perla", "Dr.Jovan Jeremeić"],
      age: 48,
    },
  ]);
  const [lekari, setLekari] = useState([]);
  const [dropDownClick, setDropDownClick] = useState(false);
  const [filterSelec, setFilterSelec] = useState([]);
  const [therapies, setTerapies] = useState([]);
  const [therapiesOfSelectedDoctor, setTherapiesOfSelectedDoctor] = useState();

  const getDoctors = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        "http://localhost:5000/api/user/get-doctors-for-unsigned-user"
      );
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
      const response = await axios.get(
        "http://localhost:5000/api/user/get-therapies-gor-unsigned-user"
      );
      dispatch(hideLoading);
      console.log(response);
      setTerapies([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const psihoterapijeFiltered = psihoterapije;
  //   filterSelec.length !== 0
  //     ? psihoterapije.filter((item) => item.lekari.includes(filterSelec))
  //     : psihoterapije;

  const grupnaAnalitičkaPsihoterpijaFiltered = grupnaAnalitičkaPsihoterpija;
  //   filterSelec.length !== 0
  //     ? grupnaAnalitičkaPsihoterpija.filter((item) =>
  //         item.lekari.includes(filterSelec)
  //       )
  //     : grupnaAnalitičkaPsihoterpija;

  const porodičnaPsihoanalizaFiltered =
    filterSelec.length !== 0
      ? porodičnaPsihoanaliza.map((item) => {
          return therapiesOfSelectedDoctor?.includes(item.name) ? item : null;
        })
      : porodičnaPsihoanaliza;

  //     ? porodičnaPsihoanaliza.filter((item) =>
  //         item.lekari.includes(filterSelec)
  //       )
  //     : porodičnaPsihoanaliza;

  const psihijatrijaDeceFiltered = psihijatrijaDece;
  //   filterSelec.length !== 0
  //     ? psihijatrijaDece.filter((item) => item.lekari.includes(filterSelec))
  //     : psihijatrijaDece;

  useEffect(() => {
    getDoctors();
    getTherapies();
  }, []);

  useEffect(() => {
    therapies?.map((item) => {
      item.category === "PorodičnaPsihoanaliza"
        ? setPorodičnaPsihoanaliza([...porodičnaPsihoanaliza, item])
        : item.category === "GrupnaAnalitičkaPsihoterpija"
        ? setGrupnaAnalitičkaPsihoterpija([
            ...grupnaAnalitičkaPsihoterpija,
            item,
          ])
        : item.category === "PsihijatrijaDece"
        ? setPsihijatrijaDeceDiv([...psihijatrijaDece, item])
        : setPsihoterapije([...psihoterapije, item]);
    });
  }, [therapies]);

  useEffect(() => {
    lekari?.map((item) => {
      if (
        filterSelec.length !== 0 &&
        item.firstName === filterSelec[0] &&
        item.lastName === filterSelec[1]
      ) {
        setTherapiesOfSelectedDoctor(item.therapies);
      }
    });
  }, [filterSelec]);
  console.log(therapies);
  console.log(therapiesOfSelectedDoctor);
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
                })
              : null}
          </div>
        </div>
      </div>

      {psihoterapijeFiltered.length !== 0 ? (
        <div id="PsihoterapijeDiv">
          <h1 className="naslovUsluge">Psihoterapija</h1>

          {psihoterapijeFiltered.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.ime}</h2>
                  <p>{item.text}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>
                    </h4>
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <img className="therapyImg" src={item.slika} />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {grupnaAnalitičkaPsihoterpijaFiltered.length !== 0 ? (
        <div id="GrupnaAnalitičkaPsihoterpijaDiv">
          <h1 className="naslovUsluge">Grupna analitička psihoterpija</h1>
          {grupnaAnalitičkaPsihoterpijaFiltered.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.ime}</h2>
                  <p>{item.text}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>
                    </h4>
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <img className="therapyImg" src={item.slika} />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {porodičnaPsihoanalizaFiltered.length !== 0 ? (
        <div id="PorodičnaPsihoanalizaDiv">
          <h1 id="naslovUsluge">Porodična psihoanaliza</h1>
          {porodičnaPsihoanalizaFiltered.map((item, index) => {
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
                    <div></div>
                  </div>
                </div>
                <div className="TerapyCardImg">
                  <img className="therapyImg" src={item.img} />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {psihijatrijaDeceFiltered.length !== 0 ? (
        <div id="PsihijatrijaDeceDiv">
          <h1 className="naslovUsluge">Psihijatrija dece</h1>
          {psihijatrijaDeceFiltered.map((item, index) => {
            return (
              <div
                key={index}
                className={index % 2 == 0 ? "TerapyCard" : "TerapyCardInverse"}
              >
                <div className="TerapyCardText">
                  <h2>{item.ime}</h2>
                  <p>{item.text}</p>
                  <div className="lekariTerapije">
                    <h4>
                      <strong>Lekari:</strong>
                    </h4>
                    <div></div>
                  </div>
                </div>

                <div className="TerapyCardImg">
                  <img className="therapyImg" src={item.slika} />
                  <div className="grayBackgroundDiv"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default Usluge;
