import { Component } from '@angular/core';
import { AuthHero } from '../../components/auth-hero/auth-hero';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthHero],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
