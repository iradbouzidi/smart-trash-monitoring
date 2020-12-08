import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { HttpClientModule } from '@angular/common/http';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthSigninModule} from './demo/pages/authentication/auth-signin/auth-signin.module';
import {AddeqModule} from './demo/pages/addeq';
import {UsersModule} from './demo/pages/users';
import {ListeqModule} from './demo/pages/listeq';
import {ListrepModule} from './demo/pages/listrep';
import { JarebComponent } from './jareb/jareb.component';
import {ClientComponent} from './client/client.component';
import { ProfileComponent } from './citizen/profile/profile.component';
import { EditprofileComponent } from './citizen/editprofile/editprofile.component';
import { AddreportComponent } from './citizen/addreport/addreport.component';
import { ListreportComponent } from './citizen/listreport/listreport.component';
import { PplnearComponent } from './citizen/pplnear/pplnear.component';
import { AddreportwComponent } from './worker/addreportw/addreportw.component';
import { EditprofilewComponent } from './worker/editprofilew/editprofilew.component';
import { ListreportwComponent } from './worker/listreportw/listreportw.component';
import { ProfilewComponent } from './worker/profilew/profilew.component';
import { InchargeComponent } from './worker/incharge/incharge.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    JarebComponent,
    ClientComponent,
    ProfileComponent,
    EditprofileComponent,
    AddreportComponent,
    ListreportComponent,
    PplnearComponent,
    AddreportwComponent,
    EditprofilewComponent,
    ListreportwComponent,
    ProfilewComponent,
    InchargeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    AuthSigninModule,
    AddeqModule,
    ListeqModule,
    ListrepModule,
    UsersModule,
    HttpClientModule,
  ],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
