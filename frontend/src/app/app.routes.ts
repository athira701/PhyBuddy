import { Routes } from '@angular/router';
import { Signup } from './features/auth/pages/signup/signup/signup';
import { Otp } from './features/auth/pages/otp/otp';

export const routes: Routes = [
    {path:'',redirectTo:'signup',pathMatch:'full'},
    {path:'signup',component:Signup},
    {path:'verify-otp',component:Otp},
    // {path:'login',component:Login}
];
