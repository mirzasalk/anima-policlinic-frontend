import React, { useEffect } from "react";
import AdminNav from "./AdminNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const Terapije = () => {
  const dispatch = useDispatch();
  const [filterValues, setFilterValues] = useState("");
  const [newTherapyCardShow, setNewTherapyCardShow] = useState(false);
  const [changeTherapyCardShow, setChangeTherapyCardShow] = useState(false);
  const [deleteTherapyCardShow, setDeleteTherapyCardShow] = useState(false);
  const [helperCategory, setHelperCategory] = useState("");
  const [deleteTherapyValues, setDeleteTherapyValues] = useState({
    id: "",
  });
  const [changeTherapyValues, setChangeTherapyValues] = useState({
    slika: "decijaU1.jpg",
    ime: "",
    opis: "",
    doktori: [],
    kategorija: "",
  });
  const [newTherapyValues, setNewTherapyValues] = useState({
    slika: "decijaU1.jpg",
    ime: "",
    opis: "",
    doktori: [],
    kategorija: "",
  });
  const [dropDownClick, setDropDownClick] = useState(false);
  const [terapije, setTerapije] = useState([]);

  const handleFilterInput = (e) => {
    setFilterValues(e.target.value);
  };

  const handleNewTherapyValues = (e) => {
    setNewTherapyValues({
      ...newTherapyValues,
      [e.target.name]: e.target.value,
    });
  };

  const AddNewTherapy = async () => {
    try {
      if (
        newTherapyValues.ime !== "" &&
        newTherapyValues.opis !== "" &&
        newTherapyValues.kategorija !== ""
      ) {
        dispatch(showLoading());
        const response = await axios.post(
          "http://localhost:5000/api/admin/add-new-therapy",
          {
            name: newTherapyValues.ime,
            about: newTherapyValues.opis,
            img: newTherapyValues.slika,
            doctors: newTherapyValues.doktori,
            category: newTherapyValues.kategorija,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        dispatch(hideLoading());

        if (response.data.success) {
          toast.success(response.data.massage);
          handleShowingValues();
          setNewTherapyValues({
            slika: "decijaU1.jpg",
            ime: "",
            opis: "",
            doktori: [],
            kategorija: "",
          });
          getTherapys();
        } else {
          toast.error(response.data.massage);
          handleShowingValues();
        }
      } else {
        toast.error("popunite sva polja");
      }
    } catch (error) {}
  };

  const getTherapys = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get(
        "http://localhost:5000/api/user/get-therapys",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);

      setTerapije([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTherapys();
  }, []);

  const handleShowingValues = () => {
    setNewTherapyCardShow(!newTherapyCardShow);
  };
  const handleShowingValuesForChange = (item) => {
    setChangeTherapyCardShow(!changeTherapyCardShow);

    if (item !== "") {
      setChangeTherapyValues(item);
    }
  };
  const handleChangeTherapyValues = (e) => {
    setChangeTherapyValues({
      ...changeTherapyValues,
      [e.target.name]: e.target.value,
    });
  };

  const changeTherapyInfo = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/admin/change-therapy-info",
        {
          _id: changeTherapyValues._id,
          name: changeTherapyValues.name,
          about: changeTherapyValues.about,
          img: changeTherapyValues.img,
          category: changeTherapyValues.category,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      if (response.data.success) {
        toast.success(response.data.message);
        getTherapys();
        setChangeTherapyValues({
          slika: "decijaU1.jpg",
          ime: "",
          opis: "",
          doktori: [],
          kategorija: "",
        });
      }
    } catch (error) {}
    setChangeTherapyCardShow(!changeTherapyCardShow);
  };
  const deleteTherapy = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        "http://localhost:5000/api/admin/delete-therapy",
        {
          _id: deleteTherapyValues,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      if (response.data.success) {
        toast.success(response.data.message);

        getTherapys();
        setChangeTherapyValues({
          slika: "decijaU1.jpg",
          ime: "",
          opis: "",
          doktori: [],
          kategorija: "",
        });
      }
    } catch (error) {
      toast.error("greska pri brisanju");
      console.log(error);
    }
    setDeleteTherapyCardShow(!deleteTherapyCardShow);
  };
  const handleShowingDeleteTherapyDiv = (item) => {
    setDeleteTherapyCardShow(!deleteTherapyCardShow);
    if (item !== "") {
      setDeleteTherapyValues(item);
    }
  };

  return (
    <div id="adminMain">
      {newTherapyCardShow ? (
        <div className="DivForAddingNewTherapyMain">
          <div className="NewTherapyInputsDiv">
            <div className="newTherapyXiconDiv">
              <img
                className="xIcon"
                src="x.png"
                alt="X"
                onClick={handleShowingValues}
              />
            </div>
            <h1>Add New Therapy</h1>
            <div className="DivInput">
              <label
                className={
                  newTherapyValues.ime === "" ? "labelEror" : "labelCorect"
                }
                htmlFor="ime"
              >
                Ime treapije:
              </label>
              <input
                type="text"
                name="ime"
                placeholder="Unesite ime"
                onChange={handleNewTherapyValues}
              />
            </div>
            <div className="DivInput">
              <label
                className={
                  newTherapyValues.kategorija === ""
                    ? "labelEror"
                    : "labelCorect"
                }
                htmlFor="ime"
              >
                Kategorija:
              </label>
              <div className="categoryOfTherapySelector">
                <div
                  onClick={() => {
                    setDropDownClick(!dropDownClick);
                  }}
                  className="selsectorMainField"
                >
                  {newTherapyValues.kategorija === "" ? (
                    <p> izaberi kategoriju</p>
                  ) : (
                    newTherapyValues.kategorija
                  )}
                  <img src={dropDownClick ? "up.png" : "down.png"} alt="icon" />
                </div>

                {dropDownClick ? (
                  <div className="categoryOfTherapySelectorDropDown">
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setNewTherapyValues({
                          ...newTherapyValues,
                          kategorija: "Psihoterapije",
                        });
                      }}
                    >
                      Psihoterapije
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setNewTherapyValues({
                          ...newTherapyValues,
                          kategorija: "GrupnaAnalitičkaPsihoterpija",
                        });
                      }}
                    >
                      GrupnaAnalitičkaPsihoterpija
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setNewTherapyValues({
                          ...newTherapyValues,
                          kategorija: "PorodičnaPsihoanaliza",
                        });
                      }}
                    >
                      PorodičnaPsihoanaliza
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setNewTherapyValues({
                          ...newTherapyValues,
                          kategorija: "PsihijatrijaDece",
                        });
                      }}
                    >
                      PsihijatrijaDece
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="DivInput">
              <label
                htmlFor="opis"
                className={
                  newTherapyValues.opis === "" ? "labelEror" : "labelCorect"
                }
              >
                Opis:
              </label>
              <textarea
                name="opis"
                id="opis"
                cols="30"
                rows="10"
                placeholder="Unesite opis"
                onChange={handleNewTherapyValues}
              />
            </div>
            <button onClick={AddNewTherapy}>Add</button>
          </div>
        </div>
      ) : null}
      {changeTherapyCardShow ? (
        <div className="DivForAddingNewTherapyMain">
          <div className="NewTherapyInputsDiv">
            <div className="newTherapyXiconDiv">
              <img
                className="xIcon"
                src="x.png"
                alt="X"
                onClick={() => {
                  handleShowingValuesForChange("");
                }}
              />
            </div>
            <h1>Promeni informacije</h1>
            <div className="DivInput">
              <label className={"labelCorect"} htmlFor="ime">
                Ime treapije:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Prmeni ime"
                onChange={handleChangeTherapyValues}
              />
            </div>
            <div className="DivInput">
              <label className={"labelCorect"} htmlFor="ime">
                Kategorija:
              </label>
              <div className="categoryOfTherapySelector">
                <div
                  onClick={() => {
                    setDropDownClick(!dropDownClick);
                  }}
                  className="selsectorMainField"
                >
                  {helperCategory === "" ? (
                    <p> promeni kategoriju</p>
                  ) : (
                    changeTherapyValues.category
                  )}
                  <img src={dropDownClick ? "up.png" : "down.png"} alt="icon" />
                </div>

                {dropDownClick ? (
                  <div className="categoryOfTherapySelectorDropDown">
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setDropDownClick(!dropDownClick);
                        setHelperCategory("Psihoterapije");
                        setChangeTherapyValues({
                          ...changeTherapyValues,
                          category: "Psihoterapije",
                        });
                      }}
                    >
                      Psihoterapije
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setHelperCategory("GrupnaAnalitičkaPsihoterpija");
                        setDropDownClick(!dropDownClick);
                        setChangeTherapyValues({
                          ...changeTherapyValues,
                          category: "GrupnaAnalitičkaPsihoterpija",
                        });
                      }}
                    >
                      GrupnaAnalitičkaPsihoterpija
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setHelperCategory("PorodičnaPsihoanaliza");
                        setDropDownClick(!dropDownClick);
                        setChangeTherapyValues({
                          ...changeTherapyValues,
                          category: "PorodičnaPsihoanaliza",
                        });
                      }}
                    >
                      PorodičnaPsihoanaliza
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setHelperCategory("PsihijatrijaDece");

                        setDropDownClick(!dropDownClick);
                        setChangeTherapyValues({
                          ...changeTherapyValues,
                          category: "PsihijatrijaDece",
                        });
                      }}
                    >
                      PsihijatrijaDece
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="DivInput">
              <label htmlFor="opis" className={"labelCorect"}>
                Opis:
              </label>
              <textarea
                name="about"
                id="about"
                cols="30"
                rows="10"
                placeholder="Promenite opis"
                onChange={handleChangeTherapyValues}
              />
            </div>
            <button onClick={changeTherapyInfo}>Izmeni informacije</button>
          </div>
        </div>
      ) : null}
      {deleteTherapyCardShow ? (
        <div className="deleteTherapyDivMain">
          <div className="deleteTherapyDiv">
            <h3>Potvrdite da zelite da izbrisete terapiju</h3>
            <div className="deleteTherapyButtonsDiv">
              <button onClick={deleteTherapy}>Potvrdi</button>
              <button
                onClick={() => {
                  setDeleteTherapyCardShow(!deleteTherapyCardShow);
                  setDeleteTherapyValues("");
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="WorkSpace">
        <AdminNav />
        <div className="ListeDiv">
          <div className="listaTerapija">
            <h1>Lista terapija</h1>
            <div className="DivForTherapyCards">
              <div className="filterAndAddDiv">
                <input
                  placeholder="filtriraj po nazivu"
                  type="text"
                  onChange={handleFilterInput}
                />
                <button onClick={handleShowingValues}>
                  Dodaj novu terapiju
                </button>
              </div>

              {terapije.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      filterValues === "" ||
                      item.name
                        .toLowerCase()
                        .includes(filterValues.toLowerCase())
                        ? "therapyCard"
                        : "therapyCardDisplayNone"
                    }
                  >
                    <img src={item.img} />

                    <div className="rightFieldTherpyCard">
                      <h3>{item.name}</h3>
                      <p>{item.about}</p>
                      <div className="therapyCardDoctors">
                        <strong>Doktori:</strong>
                        <div>
                          {item.doctors?.map((i, index) => {
                            return <p key={index}>{i}</p>;
                          })}
                        </div>
                      </div>
                      <p>kategorija: {item.category}</p>
                      <div className="TherapyButtonsDiv">
                        <button
                          onClick={() => {
                            handleShowingValuesForChange(item);
                          }}
                        >
                          Izmeni
                        </button>
                        <button
                          className="deleteButton"
                          onClick={() => {
                            handleShowingDeleteTherapyDiv(item._id);
                          }}
                        >
                          Izbriši terapiju
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Terapije;
