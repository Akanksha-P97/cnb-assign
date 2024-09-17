export interface Users {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    status?: 'Active' | 'Inactive';
    locked?: 'Yes' | 'No';
    admin?: boolean;
    role?: 'Doc Import' | 'Gate Operations';
}
