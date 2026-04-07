/** Copyright(C) [2026] [Luvina Software Company]
 *
 * [userValidation.ts], [Apr 8, 2026] [ntlong]
 */

export interface FormData {
    name:       string;
    birthday:   string;
    department: string;
    email:      string;
    phone:      string;
    major:      string;
    date:       string;
    score:      string;
}

export interface FormErrors {
    name?:       string;
    birthday?:   string;
    department?: string;
    email?:      string;
    phone?:      string;
    major?:      string;
    date?:       string;
    score?:      string;
}

/**
 * Validate form tao moi / chinh sua User
 * author: [ntlong]
 * @param form - du lieu form can validate
 * @returns FormErrors - object chua cac loi (neu co)
 */
export function validateUserForm(form: FormData): FormErrors {
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