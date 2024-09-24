import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountsService } from '../auth/accounts.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  accountService = inject(AccountsService);
  private router = inject(Router);

  logout() {
    this.accountService.logoutUser();
    this.router.navigateByUrl('');
  }
}
