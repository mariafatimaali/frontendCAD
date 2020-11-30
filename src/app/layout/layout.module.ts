
 import { CustomerDemographicService } from '../_services/customerDemographic/customer-demographic.service';
// import { MatTableModule } from '@angular/material/table';
// import {MatGridListModule} from '@angular/material/grid-list';
// import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { CustDemoService } from '../_service/cust-demo.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { Screen2Component } from './screen2/screen2.component';
import { CustomerDemoComponent } from './customer-demo/customer-demo.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CpMonitoringComponent } from './cp-monitoring/cp-monitoring.component';
import {CplogbookDraftService} from './../_services/cplogbookDraft/cplogbook-draft.service';
import {CpLogbookComponent} from './cp-logbook/cp-logbook.component';
import { DocumentDefiComponent } from './document-defi/document-defi.component';
import { CreditProposalComponent } from './credit-proposal/credit-proposal.component';
import { LogbookComponent } from './logbook/logbook.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SbpwaiversComponent } from './sbpwaivers/sbpwaivers.component';
import { PledgejointComponent } from './pledgejoint/pledgejoint.component';
import { VendorManagementComponent } from './vendor-management/vendor-management.component';
import { TicklersComponent } from './ticklers/ticklers.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { StockHypoComponent } from './stock-hypo/stock-hypo.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { StockPledgeComponent } from './stock-pledge/stock-pledge.component';
import { ValuationExpiryComponent } from './valuation-expiry/valuation-expiry.component';
import { DocumentLegalComponent } from './document-legal/document-legal.component';
import { SafeinComponent } from './safein/safein.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import { ViewDocsComponent } from './view-docs/view-docs.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserIdleModule } from 'angular-user-idle';
import { MatTableExporterModule } from 'mat-table-exporter';
@NgModule({
    imports: [
        CommonModule,
        UserIdleModule.forRoot({idle: 900, timeout: 900, ping: 300}),
        MatNativeDateModule,
        MatDatepickerModule,
        MatTableExporterModule,
        FormsModule,
        // MatPaginator,
        // MatSort,
        MatSnackBarModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        MatSelectModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatCardModule,
        MatGridListModule,
        TranslateModule
    ],
    providers: [
        
        CustomerDemographicService,CplogbookDraftService

   ],
    declarations: [Screen2Component, CustomerDemoComponent,CpLogbookComponent, LayoutComponent, NavComponent, TopnavComponent, SidebarComponent, CpMonitoringComponent, DocumentDefiComponent, CreditProposalComponent, LogbookComponent, SbpwaiversComponent, PledgejointComponent, VendorManagementComponent, TicklersComponent, StockReportComponent, StockHypoComponent, StockPledgeComponent, ValuationExpiryComponent, DocumentLegalComponent, SafeinComponent, ViewDocsComponent, UserManagementComponent, ]

})
export class LayoutModule { }
