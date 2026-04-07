/** Copyright(C) [2026] [Luvina Software Company]
  * 
  * [page.tsx], [Apr 6 ,2026] [ntlong]
  */

import { getAllUsers } from "@/services/userService";
import Link from "next/link";
import Pagination from "@/components/Pagination";

interface Props {
    searchParams: Promise<{ page?: string}>;
}

/**
 * tao function UsersPage de lay du lieu tu api
 * author: [ntlong]
 */
// export default async function UsersPage({ searchParams }: Props) {
//     const { page } = await searchParams;
//     const currentPage = Number(page ?? '0');
//     const data = await getAllUsers(currentPage);
//     const users = data.content;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//                 <h2 style={{ margin: 0, color: '#1E3A5F' }}>
//                     Danh sach User ({data.totalElements} nguoi)
//                 </h2>
//                 <Link href="/users/new" style={{
//                     padding: '10px 20px', background: '#1E3A5F',
//                     color: 'white', borderRadius: '6px',
//                     textDecoration: 'none', fontWeight: 'bold', fontSize: '14px',
//                 }}>
//                     + Tao moi
//                 </Link>
//             </div>

//             {users.length === 0 ? (
//                 <p style={{ color: '#888' }}>Khong tim thay User nao!</p>
//             ) : (
//                 <>
//                     <div style={{ overflowX: 'auto'}}>
//                         <table style={{
//                             width: '100%',
//                             borderCollapse: 'collapse',
//                             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                         }}>
//                             <thead>
//                                 <tr style={{ background: '#1E3A5F', color: 'white'}}>
//                                     {['Name', 'Birthday', 'Department', 'Email', 'Phone', 'Major', 'Date', 'Score', 'Chi tiet']
//                                     .map(h => <th key={h} style={thStyle}>{h}</th>)}
                                    
//                                     {/* <th style={thStyle}>Name</th>
//                                     <th style={thStyle}>Birthday</th>
//                                     <th style={thStyle}>Department</th>
//                                     <th style={thStyle}>Email</th>
//                                     <th style={thStyle}>Phone</th>
//                                     <th style={thStyle}>Major</th>
//                                     <th style={thStyle}>Date</th>
//                                     <th style={thStyle}>Score</th>
//                                     <th style={thStyle}>Chi tiet</th> */}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user, index) => (
//                                     <tr key={user.id}
//                                         style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
//                                         <td style={tdStyle}>{user.name}</td>
//                                         <td style={tdStyle}>{user.birthday}</td>
//                                         <td style={tdStyle}>{user.department}</td>
//                                         <td style={tdStyle}>{user.email}</td>
//                                         <td style={tdStyle}>{user.phone}</td>
//                                         <td style={tdStyle}>{user.major}</td>
//                                         <td style={tdStyle}>{user.date}</td>
//                                         <td style={tdStyle}>{user.score}</td>
//                                         <td style={tdStyle}>
//                                             <Link href={`/users/${user.id}`} style={{ color: '#1E3A5F', fontWeight: 'bold'}}>
//                                                 Xem chi tiet
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <Pagination 
//                         currentPage={data.number}
//                         totalPages={data.totalPages}
//                     />
//                 </>
//             )}

            
//         </div>
//     )
// }

export default async function UsersPage() {
  // Fetch dữ liệu tại Server
  const users = await getAllUsers();
 
  return (
    <div>
      <h2 style={{ marginBottom: '24px', color: '#1E3A5F' }}>
        Danh sách User ({users.length} người)
      </h2>
 
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ background: '#1E3A5F', color: 'white' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Birthday</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Major</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Score</th>
              <th style={thStyle}>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}
                style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.birthday}</td>
                <td style={tdStyle}>{user.department}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.phone}</td>
                <td style={tdStyle}>{user.major}</td>
                <td style={tdStyle}>{user.date}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{user.score}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <Link href={`/users/${user.id}`}
                    style={{ color: '#1E3A5F', fontWeight: 'bold' }}>
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const thStyle: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #4A9EDE'
};

const tdStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderBottom: '1px solid #ddd',
    color: 'black'
}