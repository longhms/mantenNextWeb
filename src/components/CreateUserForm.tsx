'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/userService";
import { validateUserForm } from "@/utils/userValidation";

interface FormData {
    name:       string;
    birthday:   string;
    department: string;
    email:      string;
    phone:      string;
    major:      string;
    date:       string;
    score:      string;
}

interface FormErrors {
    name?:       string;
    birthday?:   string;
    department?: string;
    email?:      string;
    phone?:      string;
    major?:      string;
    date?:       string;
    score?:      string;
}

function validate(form: FormData): FormErrors {
    const errors: FormErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Name: required, khong qua 100 ky tu
    if (!form.name.trim()) {
        errors.name = 'Name khong duoc de trong.';
    } else if (form.name.trim().length > 100) {
        errors.name = 'Name khong duoc vuot qua 100 ky tu.';
    }

    // Birthday: required, phai truoc ngay hom nay
    if (!form.birthday) {
        errors.birthday = 'Birthday khong duoc de trong.';
    } else if (new Date(form.birthday) >= today) {
        errors.birthday = 'Birthday phai la ngay trong qua khu.';
    }

    // Department: required
    if (!form.department.trim()) {
        errors.department = 'Department khong duoc de trong.';
    }

    // Email: required, dung dinh dang
    if (!form.email.trim()) {
        errors.email = 'Email khong duoc de trong.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Email khong dung dinh dang.';
    }

    // Phone: required, chi chua so, 10-11 chu so
    if (!form.phone.trim()) {
        errors.phone = 'Phone khong duoc de trong.';
    } else if (!/^\d{10,11}$/.test(form.phone)) {
        errors.phone = 'Phone phai la 10-11 chu so.';
    }

    // Major: required
    if (!form.major.trim()) {
        errors.major = 'Major khong duoc de trong.';
    }

    // Date: required, khong duoc truoc Birthday
    if (!form.date) {
        errors.date = 'Date khong duoc de trong.';
    } else if (form.birthday && new Date(form.date) < new Date(form.birthday)) {
        errors.date = 'Date khong duoc truoc Birthday.';
    }

    // Score: required, tu 0 den 10, toi da 1 chu so thap phan
    if (form.score === '') {
        errors.score = 'Score khong duoc de trong.';
    } else {
        const s = Number(form.score);
        if (isNaN(s)) {
            errors.score = 'Score phai la so.';
        } else if (s < 0 || s > 10) {
            errors.score = 'Score phai tu 0 den 10.';
        } else if (!/^\d+(\.\d{0,1})?$/.test(form.score)) {
            errors.score = 'Score toi da 1 chu so thap phan.';
        }
    }

    return errors;
}

const INITIAL_FORM: FormData = {
    name: '', birthday: '', department: '',
    email: '', phone: '', major: '', date: '', score: '',
};

export default function CreateUserForm() {
    const router = useRouter();
    const [form, setForm]       = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors]   = useState<FormErrors>({});
    const [isSaving, setIsSaving] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Xoa loi cua field khi user bat dau sua
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async () => {
        // Validate truoc khi gui
        const newErrors = validateUserForm(form);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSaving(true);
        setApiError('');
        try {
            await createUser({
                name:       form.name.trim(),
                birthday:   form.birthday,
                department: form.department.trim(),
                email:      form.email.trim(),
                phone:      form.phone.trim(),
                major:      form.major.trim(),
                date:       form.date,
                score:      Number(form.score),
            });
            router.push('/users');
            router.refresh();
        } catch {
            setApiError('Tao User that bai. Vui long thu lai.');
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/users');
    };

    const fields: { label: string; name: keyof FormData; type: string; placeholder: string }[] = [
        { label: 'Name *',       name: 'name',       type: 'text',   placeholder: 'Nguyen Van A' },
        { label: 'Birthday *',   name: 'birthday',   type: 'date',   placeholder: '' },
        { label: 'Department *', name: 'department', type: 'text',   placeholder: 'IT, Finance...' },
        { label: 'Email *',      name: 'email',      type: 'email',  placeholder: 'example@email.com' },
        { label: 'Phone *',      name: 'phone',      type: 'text',   placeholder: '0901234567' },
        { label: 'Major *',      name: 'major',      type: 'text',   placeholder: 'Software Engineering...' },
        { label: 'Date *',       name: 'date',       type: 'date',   placeholder: '' },
        { label: 'Score *',      name: 'score',      type: 'number', placeholder: '0 - 10' },
    ];

    return (
        <div style={{
            background: 'white', borderRadius: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)', padding: '32px',
        }}>
            {/* Chia 2 cot cho gon */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {fields.map(field => (
                    <div key={field.name}>
                        <label style={labelStyle}>{field.label}</label>
                        <input
                            name={field.name}
                            type={field.type}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            min={field.name === 'score' ? 0 : undefined}
                            max={field.name === 'score' ? 10 : undefined}
                            step={field.name === 'score' ? 0.1 : undefined}
                            style={{
                                ...inputStyle,
                                borderColor: errors[field.name] ? '#c0392b' : '#ccc',
                            }}
                        />
                        {/* Hien thi loi validate */}
                        {errors[field.name] && (
                            <p style={errorStyle}>{errors[field.name]}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Loi API */}
            {apiError && (
                <p style={{ ...errorStyle, marginTop: '16px', fontSize: '14px' }}>{apiError}</p>
            )}

            {/* Nut hanh dong */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'flex-end' }}>
                <button onClick={handleCancel} disabled={isSaving} style={btnStyle('#888')}>
                    Huy
                </button>
                <button onClick={handleSubmit} disabled={isSaving} style={btnStyle('#1E3A5F')}>
                    {isSaving ? 'Dang luu...' : 'Tao moi'}
                </button>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '6px',
    fontWeight: 'bold', color: '#555', fontSize: '14px',
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px',
    border: '1px solid #ccc', borderRadius: '4px',
    fontSize: '14px', boxSizing: 'border-box',
    outline: 'none',
};

const errorStyle: React.CSSProperties = {
    color: '#c0392b', fontSize: '12px', marginTop: '4px', margin: '4px 0 0 0',
};

function btnStyle(bg: string): React.CSSProperties {
    return {
        padding: '10px 28px', background: bg, color: 'white',
        border: 'none', borderRadius: '6px', cursor: 'pointer',
        fontSize: '14px', fontWeight: 'bold',
    };
}