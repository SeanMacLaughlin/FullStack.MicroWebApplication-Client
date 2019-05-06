import {Component, Input, OnInit} from '@angular/core';

import {AccountService} from '../services/account.service';
import {ProfileService} from '../services/profile.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Account} from '../account';
import {Profile} from '../profile';
import {Location} from '@angular/common';




@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: Account;
  accounts: Account[];
  profile: Profile;
  activeAccounts: Account[];
  balanceHistory: number[];

  constructor(
    private accountService: AccountService,

    private profileService: ProfileService,
    private route: ActivatedRoute,
    private location: Location,

  ) {
  }

  ngOnInit() {
    this.getAccount();
    this.getAccountBalanceHistory();
  }

  private getAccount() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getAccount(id).subscribe(account => this.account = account);
  }

  public getThisProfileAccounts() {
    this.accountService.getAccounts(this.account.profileID).subscribe(accounts => this.accounts = accounts);
  }

  public getAccountBalanceHistory() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getBalanceHistory(id).subscribe(balanceHistory => this.balanceHistory = balanceHistory);
  }

  public async deposit(amount: number) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.deposit(id, amount).subscribe(account => this.account = account);
    await this.delay(100);
    this.getAccountBalanceHistory();
  }

  public async withdraw(amount: number) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.withdraw(id, amount).subscribe(account => this.account = account);
    await this.delay(100);
    this.getAccountBalanceHistory();
  }

  public async transfer(accountToId: number, amount: number){
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.transfer(id, accountToId, amount).subscribe(accounts => this.activeAccounts = accounts);
    await this.delay(100);
    this.account = this.activeAccounts[1];
    this.getAccountBalanceHistory();
  }
  goBack(): void {
    this.location.back();
  }

  public deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe(account => this.account = account);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
