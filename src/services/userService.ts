/** Copyright(C) [2026] [Luvina Software Company]
  * 
  * [userService.ts], [Apr 6 ,2026] [ntlong]
  */

/**
 * tao interface User de mapping du lieu dc gui ve tu API
 * author: [ntlong]
 */
export interface User {
    id: number;
    name: string;
    birthday: string;
    department: string;
    email: string;
    phone: string;
    major: string;
    date: string;
    score: number;
}

/**
 * tao interface PageResponse de mapping du lieu cac ban ghi trong 1 trang duoc gui ve tu API
 * author: [ntlong]
 */
export interface PageResponse {
    content: User[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number
}

const BASE_URL = 'http://localhost:8080/api'; //url mac dinh cua API

/**
 * lay tat ca User duoc tra ve tu api
 * author: [ntlong]
 * @returns res.json()
 */
export async function getAllUsers(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`, {
        cache: 'no-store', //luon fetch du lieu moi tu api
    });
    if (!res.ok) throw new Error('Fetch User that bai');
    return res.json();
}

/**
 * lay thong tin cua User da chon.
 * author: [ntlong]
 * @param id (truyen id user de lay thong tin user)
 * @returns res.json()
 */
export async function getUserById(id: number): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        cache: 'no-store', //luon fetch du lieu moi tu api
    });
    if (!res.ok) throw new Error(`Fetch User ${id} that bai`);
    return res.json();
}

/**
 * lay cac ban ghi cua trang
 * @param page trang muon lay danh sach.
 * @returns res.json()
 */
// export async function getAllUsers(page: number = 0):Promise<PageResponse> {
//     const res = await fetch(
//         `${BASE_URL}/users?page=${page}&size=15`,
//         { cache: 'no-store'}
//     );
//     if (!res.ok) throw new Error('Failed to fetch users');
//     return res.json();
// }

/**
 * goi phuong thuc xoa user bang api.
 * author: [ntlong]
 * @param id id cua user muon xoa.
 */
export async function deleteUserById(id:number): Promise<void> {
    const res = await fetch (
        `${BASE_URL}/users/${id}`, {
            method: 'DELETE',
            cache: 'no-store'
        }
    );
    if(!res.ok) throw new Error(`Xoa User ${id} that bai`);
}

/**
 * Goi phuong thuc update user.
 * author: [ntlong]
 * @param id id User muon chinh sua.
 * @param user thong tin muon chinh sua.
 * @returns res.json()
 */
export async function updateUserById(id:number, user: Omit<User, 'id'>): Promise<User> {
    const res = await fetch (
        `${BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user),
            cache: 'no-store'
        }
    )
    if(!res.ok) throw new Error(`Cap nhat User ${id} that bai`);
    return res.json();
}

export async function createUser(user:Omit<User, 'id'>): Promise<User> {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user),
        cache: 'no-store',
    })
    if (!res.ok) throw new Error('Tao User that bai');
    return res.json();
}
