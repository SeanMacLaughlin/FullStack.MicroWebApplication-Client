import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {AccountsComponent} from './accounts/accounts.component';
import {AccountComponent} from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SafeDeleteComponent } from './safe-delete/safe-delete.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    AboutComponent,
    ProfileDetailComponent,
    AccountDetailsComponent,
    AccountsComponent,
    AccountComponent,
    HomepageComponent,
    SafeDeleteComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
