import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('user_name'); // o 'form_answer' si prefieres
    if (userData) {
      return true; // ✅ Puede entrar
    } else {
      this.router.navigate(['/formulario']); // 🔒 Redirige al formulario
      return false;
    }
  }
}
