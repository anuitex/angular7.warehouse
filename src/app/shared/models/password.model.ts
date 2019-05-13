import { UserModel } from "@app/shared/models";

export class PasswordModel {
    userModel: UserModel;
    currentPassword: string;
    newPassword: string;
}