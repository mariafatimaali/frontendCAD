import { LayoutModule } from '@angular/cdk/layout';
import { RoleService } from "./_services/roles/roles-service.service";
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import  {BranchService} from './_services/branches/branches.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomerDemographicService } from './_services/customerDemographic/customer-demographic.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RestService} from './services/rest.service';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {CplogbookDraftService} from './_services/cplogbookDraft/cplogbook-draft.service';
import {CplogbookApprovedService} from './_services/cplogbookApproved/cplogbook-Approved.service';
import { DefandDeferralService } from "./_services/defanddeferral/defand-deferral.service";
import {logBookDraftService } from './_services/logBookDraft/logBookDraft.service'
import { sbpWaiverService } from './_services/sbpWaiver/sbp-Waiver.service';
import {pledgejointService} from './_services/pledgejoint/pledge-joint.service';
import {vendorManagementService} from './_services/vendorManagement/vendorManagement.service';
import { stockReportService } from './_services/stockReport/stockReport.service';
import { stockInspectionService } from "./_services/stockInspection/stock-Inspection.service";
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
       
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [CustomerDemographicService,sbpWaiverService,CplogbookDraftService,RestService,CplogbookApprovedService,DefandDeferralService,logBookDraftService,pledgejointService,vendorManagementService
        ,stockReportService,stockInspectionService,BranchService,RoleService],
    bootstrap: [AppComponent]
})
export class AppModule {}
