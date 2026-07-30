import { Component } from '@angular/core';
import { AuthHero } from '../../components/auth-hero/auth-hero';
import { Brand } from '../../../../shared/components/atoms/brand/brand';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthHero,Brand],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
