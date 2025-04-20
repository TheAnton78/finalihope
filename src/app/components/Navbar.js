import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header style={{ 
      position: "absolute", 
      top: 0, 
      width: "100%", 
      backgroundColor: "rgba(255, 255, 255, 0.8)", 
      padding: "15px 20px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      backdropFilter: "blur(5px)"
    }}>
      {/* Логотип слева */}
      <Image src="/logo.png" alt="ЦНК" width={80} height={50} />

      {/* Название компании в центре */}
      <h1 style={{ fontSize: "26px", fontWeight: "bold", color: "red", margin: 0, flex: 1, textAlign: "center" }}>
        ЦНК
      </h1>

      {/* Навигационное меню */}
      <nav>
        <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ margin: "0 20px" }}>
            <Link href="/" style={{ color: "#000", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>МЫ</Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link href="/repsol" style={{ color: "#000", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>REPSOL</Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link href="/devon" style={{ color: "#000", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>DEVON</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
