import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USERS_KEY = 'users';

  constructor(private storage: StorageService) {}

  async register(user: { nombre: string; apellido: string; email: string; password: string }): Promise<boolean> {
    const users = (await this.storage.get(this.USERS_KEY)) || [];
    const exists = users.find((u: any) => u.email === user.email);

    if (exists) return false; // Ya existe el email
    users.push(user);
    await this.storage.set(this.USERS_KEY, users);
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    const users = (await this.storage.get(this.USERS_KEY)) || [];
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      await this.storage.set('logged_in', true);
      return true;
    }
    return false;
  }

  async logout() {
    await this.storage.set('logged_in', false);
  }
}
