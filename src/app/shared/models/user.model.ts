export class UserModel {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    role: string = 'user';
}