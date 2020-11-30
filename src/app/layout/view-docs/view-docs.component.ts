//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {DocViewService} from '../../_services/docServiceview/docview-service';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { Router, ActivatedRoute } from '@angular/router';
import { sbpWaiverService } from "../../_services/sbpWaiver/sbp-Waiver.service";
@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.scss']
})
export class ViewDocsComponent implements OnInit {
  formGroup: FormGroup;
  primeFormControl = new FormControl('', [ Validators.required]);
  @Input() sbpWaiverDetails = {

    object_id: "",
    primeNumber: "",
    businessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfBorrower: "",
    natureofException: "",
    aprovalRef: "",
    sBPApprovalLetterDate: "",
    attachment: "",
    dataStatus: "",
    createdBy: "",
    modifiedBy: "",
    active: ""
  };
  inputdata: {};
  constructor(
    private userIdle: UserIdleService,
    private docViewService: DocViewService,
    private formBuilder: FormBuilder,
    private sbpWaiverService: sbpWaiverService,
    public router: Router,
  ) 
  {

   
   }

  ngOnInit(): void {
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {

    
   this.router.navigate(['login'])
  // this.openSnackBar('Session Expired', 'Sure');
    console.log('Time is up!')});
  
 
    this.formGroup= this.formBuilder.group({
      'PRIMENUMBER':this.primeFormControl,
    });
  }
  docServiceData;
  url;

docSearch: any;
 
onSearchChange() {
  this.sbpWaiverService.getCustomerDemographic(this.sbpWaiverDetails.primeNumber).subscribe((data: any) =>
  {
  console.log(data);
  })
  }

  docService(){
    console.log('docService')
    return this.docViewService.doc(this.sbpWaiverDetails.primeNumber).subscribe((data:{})=>{
  this.docServiceData =data;
  // const filtered = this.docServiceData.filter(x => this.docServiceData.includes(x.EncryptQueryResult));
  // console.log(filtered)
  console.log(this.docServiceData.EncryptQueryResult);
  this.url='http://10.200.75.143/CADScanUploadWebApp/CrCardViewer.aspx?SrvPhrm='+this.docServiceData.EncryptQueryResult;
  window.open(this.url);
  // const result: string.concat(this.url, this.docServiceData);
  // var str = this.url.concat(this.docServiceData) 
  console.log(this.url);
  
    });
  }
   
}
