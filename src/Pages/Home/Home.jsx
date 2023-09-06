import Navbar from "../../Components/Navbar";
import "./home.css";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div id="homeMain">
      <Navbar />
      <div className="mainImgDiv">
        <img src="homepage.jpeg" id="homePageMainImg" />
        <h1 className="naslovPocetna">Početna</h1>
      </div>
      <div className="ZastoMiDivHome">
        <img className="ZastoMiImg1" src="onamaruke.jpg" alt="slika" />
        <div className="ZastoMiRightDiv">
          <h2>Mi Pružamo Najbolju Zdravstvenu Negu</h2>
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
          <button>Kontaktiraj nas</button>
        </div>
      </div>
      {/* <div className="ourSpecies">
        <div className="cardOfSpecies">
          <h3>Psihoterapije</h3>
        </div>
        <div className="cardOfSpecies">
          <h3>Grupna Analitička Psihoterpija</h3>
        </div>
        <div className="cardOfSpecies">
          <h3>Porodična Psihoanaliza</h3>
        </div>
        <div className="cardOfSpecies">
          <h3>Psihijatrija Dece</h3>
        </div>
      </div> */}
      <section class="services">
        <div class="service">
          <h2>Individualne Psihoterapije</h2>
          <p>Personalizovani pristup i podrška za vaše mentalno zdravlje.</p>
        </div>

        <div class="service">
          <h2>Porodične Terapije</h2>
          <p>
            Rešavanje izazova i konflikata unutar porodice uz stručnu pomoć.
          </p>
        </div>

        <div class="service">
          <h2>Grupne Analitičke Terapije</h2>
          <p>
            Podrška i deljenje iskustava sa osobama koje prolaze kroz slične
            situacije.
          </p>
        </div>
        <div class="service">
          <h2>Dečije psihoterapije</h2>
          <p>Siguran i podržavajući prostor za dečiju terapiju i razvoj.</p>
        </div>
      </section>
      <div className="savetiMain">
        <div className="savetiUpDiv">
          <h1>Saveti za Vas</h1>
        </div>
        <div className="savetiDownDiv">
          <div className="savetiCard">
            <p>
              "Ako dobro mislite o sebi, zašto je potrebno da još neko dobro
              misli o vama."
            </p>
            <div className="nameAndImgDiv">
              <img src="mihail_litvak.jpg" />
              <h3>Mihail Litvak</h3>
            </div>
          </div>
          <div className="savetiCard">
            <p>
              "Dobar život je proces, a ne stanje. To je putovanje, a ne
              odredište."
            </p>
            <div className="nameAndImgDiv">
              <img src="carlRogers.jpg" />
              <h3>Carl Rogers</h3>
            </div>
          </div>
          <div className="savetiCard">
            <p>
              „Sve je uvek prisutno unutra u čoveku. U dubinama njegovog
              nepreglednog, nesvesnog života. Cela prošlost, individualna i
              kolektivna."
            </p>
            <div className="nameAndImgDiv">
              <img src="VladetaJerotic.jpg" />
              <h3>Vladeta Jerotić</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="homeWindow">
        <div className="ZastoNasDiv">
          <h1>Zašto izabrati nas!</h1>
          <p>
            Odaberite našu polikliniku za stručnu negu, podršku i tretmane koji
            će vam pomoći da ostvarite emocionalno blagostanje i bolji kvalitet
            života.
          </p>
        </div>
        <div>
          <div>
            <img src="starts.png" />
            <h3>Višegodišnje iskustvo</h3>
          </div>
          <div>
            <img src="users.png" />
            <h3>Veliki broj zadovoljnih korisnika</h3>
          </div>
          <div>
            <img src="doctorIconHome.png" />
            <h3>Stručno osoblje</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
