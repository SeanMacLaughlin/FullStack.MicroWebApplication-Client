import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

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

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Balance History', yAxisID: 'y-axis-1' }
    ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-1',
          position: 'left',
          gridLines: {
            color: '#343a40',
          },
          ticks: {
            fontColor: 'dark',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(0,204,102,0.2)',
      borderColor: 'rgba(0,153,76,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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
    this.createChart();
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
    this.updateChart();
  }

  public async withdraw(amount: number) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.withdraw(id, amount).subscribe(account => this.account = account);
    await this.delay(100);
    this.getAccountBalanceHistory();
    this.updateChart();
  }

  public async transfer(accountToId: number, amount: number) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.transfer(id, accountToId, amount).subscribe(accounts => this.activeAccounts = accounts);
    await this.delay(100);
    this.account = this.activeAccounts[1];
    this.getAccountBalanceHistory();
    await this.delay(100);
    this.updateChart();
  }

  public deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe(account => this.account = account);
  }
  public async createChart() {
    await this.delay(100);
    this.lineChartData = [
      { data: this.balanceHistory, label: 'Balance History', yAxisID: 'y-axis-1' }
    ];
    for (let i = 1; i <= this.balanceHistory.length; i++) {
      this.lineChartLabels.push(i.toString());
    }
  }

  public async updateChart() {
    await this.delay(100);
    this.lineChartData = [
      { data: this.balanceHistory, label: 'Balance History', yAxisID: 'y-axis-1' }
    ];
    this.lineChartLabels.push(this.balanceHistory.length.toString());
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
