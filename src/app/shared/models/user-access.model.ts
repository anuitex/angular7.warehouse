// Models
import { UserModel } from './user.model';

export class UserAccessModel {
    userModel: UserModel;
    accessToken: string;
    newToken: string;
}