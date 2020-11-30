// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LayoutComponent } from './layout.component';
// import { Screen1Component } from './screen1/screen1.component';
// import { Screen2Component } from './screen2/screen2.component';

// const routes: Routes = [
//     {
//         path: '',
//         component: LayoutComponent,
//         children: [
//             {
//                 path: '',
//                 redirectTo: 'dashboard'
//             },
//             {
//                 path: 'dashboard',
//                 loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
//             },
//             {
//                 path: 'screen1',
//                 loadChildren: () => import('./screen1/screen1.module').then(m => m.Screen1Module)
//             },
//             {
//                 path: 'screen2',
//                 component: Screen2Component
//             }
//         ]
//     }
// ];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule],
// })
// export class LayoutRoutingModule {}
//import { StockReportComponent } from './customer/stock-report/stock-report.component';
//import { InsuranceTickleComponent } from './insurance-tickle/insurance-tickle.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';

import { CustomerDemoComponent } from './customer-demo/customer-demo.component';
import { DocumentDefiComponent } from './document-defi/document-defi.component';
// import { DocumentDefiComponent } from './document-defi/document-defi.component'
 import { CreditProposalComponent } from './credit-proposal/credit-proposal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
 import { TicklersComponent } from './ticklers/ticklers.component';
import { ValuationExpiryComponent } from './valuation-expiry/valuation-expiry.component';
// import { from } from 'rxjs';
import { StockReportComponent } from './stock-report/stock-report.component'
 import { CpMonitoringComponent } from './cp-monitoring/cp-monitoring.component';
 import { LogbookComponent } from './logbook/logbook.component';
 import { UserManagementComponent } from './user-management/user-management.component';
 import { CpLogbookComponent } from './cp-logbook/cp-logbook.component';
import { SbpwaiversComponent } from './sbpwaivers/sbpwaivers.component';
 import {StockHypoComponent} from './stock-hypo/stock-hypo.component';
  import {StockPledgeComponent} from './stock-pledge/stock-pledge.component';
import {SafeinComponent} from './safein/safein.component';
import {PledgejointComponent} from './pledgejoint/pledgejoint.component';
 import {DocumentLegalComponent} from './document-legal/document-legal.component';
import {VendorManagementComponent} from './vendor-management/vendor-management.component';
import {ViewDocsComponent} from './view-docs/view-docs.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }, {
                         path: 'dashboard',
                         loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
                     },
                  //   { path: '**', redirectTo: 'home' }
{ path: 'tickler-insurance', component: TicklersComponent },
{ path: 'viewdocs', component: ViewDocsComponent },
          { path: 'safe-in', component: SafeinComponent },
           { path: 'stock-report', component: StockReportComponent },
           { path: 'valuation-expiry', component: ValuationExpiryComponent },
          //  { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'customer-demo', component: CustomerDemoComponent },
         { path: 'cp-monitoring', component: CpMonitoringComponent },
         { path: 'pledge-joint', component: PledgejointComponent },
            { path: 'cp-logbook-approved', component: CpLogbookComponent },
           { path: 'documentL', component: DocumentLegalComponent },
            { path: 'sbp-waivers', component: SbpwaiversComponent },
            { path: 'credit-proposal', component: CreditProposalComponent },
            { path: 'documentD', component: DocumentDefiComponent },
         { path: 'stock-hypo', component: StockHypoComponent },
            { path: 'stock-pledge', component: StockPledgeComponent },
             { path: 'vendor-managenment', component: VendorManagementComponent },
                  { path: 'logbook', component: LogbookComponent },
             { path: 'user', component: UserManagementComponent },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
