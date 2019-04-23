import {Component, OnInit, Input} from '@angular/core';

import {Profile} from '../profile';
import {ProfileService} from '../services/profile.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Location} from '@angular/common';
import {Account} from '../account';
import {AccountService} from '../services/account.service';


@Component({
  selector: 'profiles',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  @Input() profile: Profile;
  @Input() account: Account;
  @Input() accounts: Account[];

  // profile: Profile;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getProfile();
    this.getAccounts();
  }

  private getProfile() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.profileService.getProfile(id).subscribe(profile => this.profile = profile);
  }

  private deleteProfile(id: number) {
    this.profileService.deleteProfile(id).subscribe(profile => this.profile = profile);
  }

private getAccounts() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getAccounts(id).subscribe(account => this.accounts = account);

  }

  goBack(): void {
    this.location.back();
  }

  createAccount(balance: number) {
    console.log(balance);
    const profileID = +this.route.snapshot.paramMap.get('id');
    this.accountService.createAccount({profileID, balance} as Account).subscribe(account => {this.accounts.push(account); });
  }
}
