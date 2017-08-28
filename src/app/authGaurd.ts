import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthServices } from './_services/authguard.service'

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthServices) {}

  canActivate() {
    return this.authService.isLoggedIn();
  }
}