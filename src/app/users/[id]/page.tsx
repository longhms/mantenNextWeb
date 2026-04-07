/** Copyright(C) [2026] [Luvina Software Company]
  * 
  * [page.tsx], [Apr 6 ,2026] [ntlong]
  */

import Link from 'next/link';
import { getUserById } from '@/services/userService';
import EditUserModal from '@/components/EditUserModal';
 
/**
 * Tao props de dong bo
 */
interface Props {
  params: Promise<{ id: string }>;
}
 
export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await getUserById(Number(id));
 
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/users" style={{
        display: 'inline-block',
        marginBottom: '24px',
        color: '#blue',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        ← Quay lại danh sách
      </Link>

      <EditUserModal user={user}/>
 
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        padding: '32px'
      }}>
        <h2 style={{ color: '#1E3A5F', marginBottom: '24px' }}>
          Chi tiet nguoi dung: {user.name}
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {[
              ['FullName', user.name],
              ['Birthday', user.birthday],
              ['Department', user.department],
              ['Email', user.email],
              ['Phone', user.phone],
              ['Major', user.major],
              ['Date', user.date],
              ['Score', String(user.score)],
            ].map(([label, value]) => (
              <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 16px', fontWeight: 'bold',
                  color: '#555', width: '150px', background: '#f9f9f9' }}>
                  {label}
                </td>
                <td style={{ padding: '12px 16px', color:'black' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}