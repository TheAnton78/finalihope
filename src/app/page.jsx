"use client";
import Image from "next/image";
import News from "@/app/components/News";
import Catalog from "@/app/components/catalog";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const aboutRef = useRef(null);
  const repsolRef = useRef(null);
  const devonRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Контекстное меню */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        padding: "15px 0",
        zIndex: 10
      }}>
        <button onClick={() => router.push("/catalog-page")} style={navButtonStyle}>Каталог</button>
        <button onClick={() => scrollTo(aboutRef)} style={navButtonStyle}>О компании</button>
      </nav>

      {/* Фон */}
      <div style={backgroundStyle}></div>

      {/* Главный контент */}
      <main style={mainStyle}>
        <h1 style={titleStyle}>ЦНК</h1>
        <h2 style={subtitleStyle}>Надежный поставщик нефтепродуктов</h2>
        <p style={descStyle}>
          Мы предлагаем продукцию REPSOL и DEVON. Качество, проверенное временем.
        </p>

        {/* Логотипы партнеров */}
        <div style={logoRowStyle}>
          <Image src="/repsol-logo.png" alt="Repsol" width={250} height={140} priority onClick={() => scrollTo(repsolRef)} style={{ cursor: "pointer" }} />
          <Image src="/devon-logo.png" alt="Devon" width={250} height={140} priority onClick={() => scrollTo(devonRef)} style={{ cursor: "pointer" }} />
        </div>

        <a href="/catalog-page" style={orderBtnStyle}>Сделать заказ</a>
      </main>

    

      {/* О компании */}
      <section ref={aboutRef} style={sectionStyle}>
        <div style={blockTitleStyle}>О компании</div>
        <div style={blockTextStyle}>
          <p>В нашей компании вы можете приобрести масла и смазки... по всей России.</p>
        </div>

        <div style={{ ...blockTitleStyle, marginTop: 20 }}>Наши преимущества</div>
        <div style={blockTextStyle}>
          <p>Мы предлагаем только проверенную продукцию...</p>
        </div>
      </section>

      {/* Описание Repsol и Devon */}
      <section style={sectionStyle}>
        <div ref={repsolRef} style={{ marginBottom: 40 }}>
          <h3 style={brandTitleStyle}>REPSOL</h3>
          <p style={brandDescStyle}>REPSOL — это международная энергетическая компания...</p>
        </div>

        <div ref={devonRef}>
          <h3 style={brandTitleStyle}>DEVON</h3>
          <p style={brandDescStyle}>DEVON Energy — американская компания, специализирующаяся на добыче нефти...</p>
        </div>
      </section>

      <News />
    </div>
  );
}

const navButtonStyle = {
  background: "none",
  color: "white",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
  textTransform: "uppercase"
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundImage: "url('/background.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  zIndex: "-1"
};

const mainStyle = {
  position: "relative",
  zIndex: 1,
  width: "100%",
  textAlign: "center",
  paddingTop: "100px"
};

const titleStyle = {
  fontSize: "80px",
  fontWeight: "bold",
  color: "white",
  textShadow: "4px 4px 10px rgba(0,0,0,0.8)",
  marginBottom: "5px"
};

const subtitleStyle = {
  fontSize: "38px",
  fontWeight: "bold",
  color: "white",
  textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
  marginBottom: "15px"
};

const descStyle = {
  fontSize: "25px",
  fontWeight: "bold",
  color: "white",
  maxWidth: "600px",
  margin: "0 auto 20px",
  textShadow: "1px 1px 3px rgba(0,0,0,0.6)"
};

const logoRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginBottom: "25px"
};

const orderBtnStyle = {
  backgroundColor: "red",
  color: "white",
  padding: "15px 30px",
  fontSize: "18px",
  fontWeight: "bold",
  borderRadius: "5px",
  textDecoration: "none",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
  transition: "background 0.3s ease"
};

const sectionStyle = {
  backgroundColor: "white",
  padding: "20px",
  marginTop: "80px"
};

const blockTitleStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f7931e",
  padding: "10px 20px",
  color: "white",
  fontSize: "22px",
  fontWeight: "bold",
  borderRadius: "5px",
  textTransform: "uppercase",
  maxWidth: "350px",
  marginBottom: "0px"
};

const blockTextStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "#f8f8f8",
  padding: "20px",
  borderRadius: "5px",
  fontSize: "18px",
  lineHeight: "1.6",
  color: "#333"
};

const brandTitleStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "10px"
};

const brandDescStyle = {
  fontSize: "18px",
  color: "#444",
  maxWidth: "900px",
  margin: "0 auto"
};
