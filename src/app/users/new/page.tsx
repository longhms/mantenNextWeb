import Link from 'next/link';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateUserPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/users" style={{
                display: 'inline-block', marginBottom: '24px',
                color: '#1E3A5F', textDecoration: 'none', fontWeight: 'bold',
            }}>
                ← Quay lai danh sach
            </Link>

            <h2 style={{ color: '#1E3A5F', marginBottom: '24px' }}>
                Tao User moi
            </h2>

            <CreateUserForm />
        </div>
    );
}