import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '60px'}}>
      <h2 style={{ color: 'white', fontSize: '28px'}}>
        Chao mung den voi User Management App
      </h2>

      <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px'}}>
        Ung dung quan ly nguoi dung
      </p>
      
      <Link href={"/users"} style={{
        background: '#1E3A5F',
        color: 'white',
        padding: '12px 32px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '16px'
      }}>
        Xem danh sach User
      </Link>
    </div>
  );
}
