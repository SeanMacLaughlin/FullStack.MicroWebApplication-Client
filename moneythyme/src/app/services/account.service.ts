import {Injectable} from '@angular/core';
import {Account} from '../account';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = 'https://moneythyme.herokuapp.com/accounts';

  constructor(private http: HttpClient) {
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url);
  }

  getAccounts(profile_id: number): Observable<Account[]> {
    const url = `${this.accountUrl}/all/${profile_id}`;
    return this.http.get<Account[]>(url);
  }

  deposit(id: number, amount: number): Observable<Account> {
    const url = `${this.accountUrl}/deposit/${id}/${amount}`;
    return this.http.put<Account>(url, []);
  }

  withdraw(id: number, amount: number): Observable<Account> {
    const url = `${this.accountUrl}/withdraw/${id}/${amount}`;
    return this.http.put<Account>(url, []);
  }


  transfer(idFrom: number, idTo: number, amount: number):Observable<Account[]> {
    const url = `${this.accountUrl}/transfer/${idTo}/${idFrom}/${amount}`;
    return this.http.put<Account[]>(url, []);
  }

  createAccount(account: Account): Observable<Account> {
    console.log('entered service');
    console.log(account);
    return this.http.post<Account>(this.accountUrl, account);
  }

  deleteAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.delete<Account>(url);
  }
}
