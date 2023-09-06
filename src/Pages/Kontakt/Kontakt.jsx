import React from "react";
import "./style.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer/Footer";
const Kontakt = () => {
  return (
    <div id="contactMain">
      <Navbar />
      <section class="contact-info">
        <h2>Kontakt Informacije</h2>
        <p>
          <strong>Adresa:</strong> Višegradska 64, Novi Pazar
        </p>
        <p>
          <strong>Telefon:</strong> +381 20 312 -122
        </p>
        <p>
          <strong>Email:</strong> Anima@poliklinika.com
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Kontakt;
