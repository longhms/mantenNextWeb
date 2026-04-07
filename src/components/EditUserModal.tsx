'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, updateUserById, deleteUserById } from "@/services/userService";

interface Props {
    user: User;
}

export default function EditUserModal({ user }: Props) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: user.name,
        birthday: user.birthday,
        department: user.department,
        email: user.email,
        phone: user.phone,
        major: user.major,
        date: user.date,
        score: user.score
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const handleDelete = async () => {
        if(!confirm(`Ban co chac muon xoa user "${user.name}" khong?`)) return;
        setIsDeleting(true);
        setError('');

        try {
            await deleteUserById(user.id);
            router.push('/users');
            router.refresh();
        } catch {
            setError('Xoa that bai. Vui long thu lai');
            setIsDeleting(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        try {
            await updateUserById(user.id, {
                ...form,
                score: Number(form.score),
            });
            setIsModalOpen(false);
            router.refresh();
        } catch {
            setError('Cap nhat that bai. Vui long thu lai');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px'}}>
                <button 
                    onClick={() => { setIsModalOpen(true); setError('');}}
                    style={btnStyle('#1E3A5F')}>
                        Chinh sua
                    </button>
                <button 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    style={btnStyle('#c0392b')}>
                        {isDeleting ? 'Dang xoa...' : 'Xoa'}
                </button>
            </div>

            {error && !isModalOpen && (
                <p style={{ color: '#c0392b', marginBottom: '12px'}}>{error}</p>
            )}

            {isModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0,
                    background:  'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '32px',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    }}>
                        <h3 style={{ color: '#1E3A5F', marginTop: 0, marginBottom: '24px'}}>Chinh sua User: {user.name}</h3>
                        {[
                            { label: 'Name', name: 'name', type: 'text'},
                            { label: 'Birthday', name: 'birthday', type: 'date'},
                            { label: 'Department', name: 'department', type: 'text'},
                            { label: 'Email', name: 'email', type: 'email'},
                            { label: 'Phone', name: 'phone', type: 'text'},
                            { label: 'Major', name: 'major', type: 'text'},
                            { label: 'Date', name: 'date', type: 'date'},
                            { label: 'Score', name: 'score', type: 'number'},
                        ].map(field => (
                            <div key={field.name} style={{ marginBottom: '16px',}}>
                                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color:'#555', fontSize: '14px'}}>
                                    {field.label}
                                </label>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={String(form[field.name as keyof typeof form])}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%', padding: '8px 12px',
                                        border: '1px solid #ccc', borderRadius: '4px',
                                        fontSize: '14px', boxSizing: 'border-box',
                                    }}/>
                            </div>
                        ))}

                        {error && (
                            <p style={{ color: '#c0392b', fontSize: '14px'}}>{error}</p>
                        )}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end'}}>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                disabled = {isSaving}
                                style={btnStyle('#888')}>
                                    Huy
                            </button>
                            <button 
                                onClick={handleSave}
                                disabled={isSaving}
                                style={btnStyle('#1E3A5F')}>
                                    {isSaving ? 'Dang luu...' : 'Luu'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function btnStyle(bg: string): React.CSSProperties {
    return {
        padding: '10px 24px',
        background: bg,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
    }
}