import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import {JarebComponent} from './jareb/jareb.component';
import {ClientComponent} from './client/client.component';
import {ProfileComponent} from "./citizen/profile/profile.component";
import {EditprofileComponent} from "./citizen/editprofile/editprofile.component";
import {AddreportComponent} from "./citizen/addreport/addreport.component";
import {ListrepModule} from "./demo/pages/listrep";
import {ListreportComponent} from "./citizen/listreport/listreport.component";
import {PplnearComponent} from "./citizen/pplnear/pplnear.component";
import {ProfilewComponent} from "./worker/profilew/profilew.component";
import {EditprofilewComponent} from "./worker/editprofilew/editprofilew.component";
import {AddreportwComponent} from "./worker/addreportw/addreportw.component";
import {ListreportwComponent} from "./worker/listreportw/listreportw.component";
import {InchargeComponent} from "./worker/incharge/incharge.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then(module => module.MaintenanceModule)
      },
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/analytics',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },

      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'addeq',
        loadChildren: () => import('./demo/pages/addeq/addeq.module').then(module => module.AddeqModule)
      },
      {
        path: 'listeq',
        loadChildren: () => import('./demo/pages/listeq/listeq.module').then(module => module.ListeqModule)
      },
      {
        path: 'listrep',
        loadChildren: () => import('./demo/pages/listrep/listrep.module').then(module => module.ListrepModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./demo/pages/users/users.module').then(module => module.UsersModule)
      }
    ]
  },
  {
    path: 'jareb',
    component: JarebComponent
  },
  {
  path: 'clt',
  component: ClientComponent
  },

  // Citizen yabda hne
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'editprofile',
    component: EditprofileComponent
  },
  {
    path: 'addreport',
    component: AddreportComponent
  },
  {
    path: 'listreport',
    component: ListreportComponent
  },
  {
    path: 'pplnear',
    component: PplnearComponent
  },
  // Citizen youfa hne

  // Worker yabda hne
  {
    path: 'profilew',
    component: ProfilewComponent
  },
  {
    path: 'editprofilew',
    component: EditprofilewComponent
  },
  {
    path: 'addreportw',
    component: AddreportwComponent
  },
  {
    path: 'listreportw',
    component: ListreportwComponent
  },
  {
    path: 'inchargew',
    component: InchargeComponent
  },
  // Worker youfa hne

  {
    path: '**',
    loadChildren: () => import('./demo/pages/maintenance/mainten-error/mainten-error.module').then(module => module.MaintenErrorModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
