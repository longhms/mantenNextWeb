/** Copyright(C) [2026] [Luvina Software Company]
  * 
  * [Header.tsx], [Apr 6 ,2026] [ntlong]
  */
import Link from "next/link";

/**
 * tao function Header de hien thi Header trong trang web
 * author: [ntlong]
 */
export default function Header() {
    return(
        <header style={{
            background: '#1E3A5F',
            color: 'white',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <h1 style={{ margin: 0, fontSize: '20px'}}>User Management</h1> {/* Tieu de trang web */}
            <nav>
                <Link href={"/"} style={{ color: 'white', marginRight: '16px', textDecoration: 'none'}}>Trang chu</Link> {/* Link den trang chu */}
                <Link href={"/users"} style={{ color: 'white', textDecoration: 'none'}}>Danh sach User</Link> {/* Link den Trang Danh sach User */}
            </nav>
        </header>
    )
}
