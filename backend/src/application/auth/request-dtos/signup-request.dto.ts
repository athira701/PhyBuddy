import { UserRole } from "../../../shared/enums/user-role.enum";


export interface SignupRequestDto{
    name : string;
    email:string;
    password:string;
    role:UserRole;
}