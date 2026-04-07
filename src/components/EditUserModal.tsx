'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, updateUserById, deleteUserById } from "@/services/userService";
import { FormErrors, FormData, validateUserForm } from "@/utils/userValidation";

interface Props {
    user: User;
}

export default function EditUserModal({ user }: Props) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(''); //loi common
    const [errors, setErrors] = useState<FormErrors>({}); //loi validate

    const [form, setForm] = useState<FormData>({
        name: user.name,
        birthday: user.birthday,
        department: user.department,
        email: user.email,
        phone: user.phone,
        major: user.major,
        date: user.date,
        score: String(user.score)
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value}));
        //Xoa loi cua field khi user bat dau sua field
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}));
        }
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
        //validate truoc khi save
        const newErrors = validateUserForm(form);
        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
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

    const fields: { label: string; name: keyof FormData; type: string }[] = [
        { label: 'Name *',       name: 'name',       type: 'text'   },
        { label: 'Birthday *',   name: 'birthday',   type: 'date'   },
        { label: 'Department *', name: 'department', type: 'text'   },
        { label: 'Email *',      name: 'email',      type: 'email'  },
        { label: 'Phone *',      name: 'phone',      type: 'text'   },
        { label: 'Major *',      name: 'major',      type: 'text'   },
        { label: 'Date *',       name: 'date',       type: 'date'   },
        { label: 'Score *',      name: 'score',      type: 'number' },
    ];

    return (
        <>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button onClick={() => { setIsModalOpen(true); setError(''); setErrors({}); }}
                    style={btnStyle('#1E3A5F')}>
                    Chinh sua
                </button>
                <button onClick={handleDelete} disabled={isDeleting} style={btnStyle('#c0392b')}>
                    {isDeleting ? 'Dang xoa...' : 'Xoa'}
                </button>
            </div>

            {error && !isModalOpen && (
                <p style={{ color: '#c0392b', marginBottom: '12px' }}>{error}</p>
            )}

            {isModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }}>
                    <div style={{
                        background: 'white', borderRadius: '8px', padding: '32px',
                        width: '100%', maxWidth: '500px', maxHeight: '90vh',
                        overflowY: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    }}>
                        <h3 style={{ color: '#1E3A5F', marginTop: 0, marginBottom: '24px' }}>
                            Chinh sua User: {user.name}
                        </h3>

                        {fields.map(field => (
                            <div key={field.name} style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>{field.label}</label>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    min={field.name === 'score' ? 0 : undefined}
                                    max={field.name === 'score' ? 10 : undefined}
                                    step={field.name === 'score' ? 0.1 : undefined}
                                    style={{
                                        ...inputStyle,
                                        borderColor: errors[field.name] ? '#c0392b' : '#ccc',
                                    }}
                                />
                                {/* Hien thi loi validate tung field */}
                                {errors[field.name] && (
                                    <p style={errorStyle}>{errors[field.name]}</p>
                                )}
                            </div>
                        ))}

                        {error && (
                            <p style={{ color: '#c0392b', fontSize: '14px' }}>{error}</p>
                        )}

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                            <button onClick={() => { setIsModalOpen(false); setErrors({}); }}
                                disabled={isSaving} style={btnStyle('#888')}>
                                Huy
                            </button>
                            <button onClick={handleSave} disabled={isSaving} style={btnStyle('#1E3A5F')}>
                                {isSaving ? 'Dang luu...' : 'Luu'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '4px',
    fontWeight: 'bold', color: '#555', fontSize: '14px',
};
const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', border: '1px solid #ccc',
    borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box',
};
const errorStyle: React.CSSProperties = {
    color: '#c0392b', fontSize: '12px', margin: '4px 0 0 0',
};
function btnStyle(bg: string): React.CSSProperties {
    return {
        padding: '10px 24px', background: bg, color: 'white',
        border: 'none', borderRadius: '6px', cursor: 'pointer',
        fontSize: '14px', fontWeight: 'bold',
    };
}