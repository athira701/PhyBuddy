import { UserRole } from "../../../shared/enums/user-role.enum";
import { UserStatus } from "../../../shared/enums/user-status.enum";

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}