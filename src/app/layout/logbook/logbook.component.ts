//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import { UserIdleService } from 'angular-user-idle';
import * as XLSX from 'xlsx';
import { CustService } from '../../_services/custdemo/custdemo.service';
//import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { logBookDraftService } from 'src/app/_services/logBookDraft/logBookDraft.service';
//import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service"
import { format } from 'url';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { customerDemorgaphics } from 'src/app/_models/customerDemographics.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
//import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface facility {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss'],
  //providers: [DateFormatPipe]
})
export class LogbookComponent implements OnInit {

    business: businessSegment[] = [
      { value: 'Corporate', viewValue: 'Corporate' },
      { value: 'Commercial', viewValue: 'Commercial' },
      { value: 'FI', viewValue: 'FI' },
      { value: 'Islamic', viewValue: 'Islamic' },
      { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
      { value: 'Retail', viewValue: 'Retail' },
      { value: 'Structured Credit', viewValue: 'Structured Credit' },
      ];
      Region: regions[] = [
        {value: 'Bahawalpur', viewValue: 'Bahawalpur'},
        {value: 'Faisalabad', viewValue: 'Faisalabad'},
        {value: 'Gujranwala', viewValue: 'Gujarawala'},
        {value: 'Gujrat', viewValue: 'Gujrat'},
        {value: 'Hyderabad', viewValue: 'Hyderabad'},
        {value: 'Islamabad', viewValue: 'Islamabad'},
        {value: 'Jehlum', viewValue: 'Jehlum'},
        {value: 'Karachi', viewValue: 'Karachi'},
        {value: 'Hyderabad', viewValue: 'Hyderabad'},
        {value: 'Lahore', viewValue: 'Lahore'},
        {value: 'Mardan', viewValue: 'Mardan'},
        {value: 'Mirpur', viewValue: 'Mirpur'},
        {value: 'Multan', viewValue: 'Multan'},
        {value: 'Muzafarabad', viewValue: 'Muzafarabad'},
        {value: 'Muzafarabad', viewValue: 'Peshawar'},
        {value: 'Quetta', viewValue: 'Quetta'},
        {value: 'Sahiwal', viewValue: 'Sahiwal'},
        {value: 'Sargodha', viewValue: 'Sargodha'},
        {value: 'Sialkot', viewValue: 'Sialkot'},
    
      ];

  Facility: facility[] = [
   
    
    {value: 'Conventional', viewValue: 'Conventional'},
    {value: 'One-off', viewValue: 'One-off'},
    {value: 'POS', viewValue: 'POS'},
    {value: 'SBF', viewValue: 'SBF'},
    {value: 'Swift Finance', viewValue: 'Swift Finance'}

  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
 primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
receiveddateatCADFormControl = new FormControl('', [Validators.required]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  facilityTypeFormControl = new FormControl('', [ Validators.required]);

  cPReferenceNoFormControl = new FormControl('', [Validators.required]);
  dateReturnedToBussinessFormControl = new FormControl('', [ Validators.required]);
  daetResubmittedbyBussinessFormControl = new FormControl('', [Validators.required]);
  dateSenttoHOKFormControl = new FormControl('', [ Validators.required]);
  dateApprovalReceivedFormControl = new FormControl('', [Validators.required]);
remarksFormControl = new FormControl('', [Validators.required]);
businessSegmentFormControl = new FormControl('', [Validators.required]);
regionFormControl = new FormControl('', [ Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','receiveddateatCAD','nameofBusinessSegment','region','branchName','nameOfBorrower','facilityType',
'cPReferenceNo','dateReturnedToBussiness','daetResubmittedbyBussiness','dateSenttoHOK','dateApprovalReceived','remarks','createdBy','modifiedBy'];
dataSource = new MatTableDataSource();
places: Array<any> = [];

  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
tableprimenumber : number;
///////////////////////////////////Pagination Veriables//////////////////////////////////
  pageSize =5;
  page: any=1;
  previousPage: any;
  totalRec : number;
//////////////////////////////////Data Veriables////////////////////////////////////////
  inputdata : any = [];
  alllogBookDraftDetails: any = [];
//////////////////////////////////Visiblity Veriables///////////////////////////////////
  private isButtonVisible = false;
  public isViewable : boolean;
  public VisiblitypNumb: boolean = false;
  public hideEditButton : boolean = false;
  public hideDeleteButton : boolean = false;
  public hideForm : boolean = false;
  public hideDataTable :boolean = false;
  public caddate ;
////////////////////////////////////////////////////////////////////////

@ViewChild('TABLE', { static: false }) table: ElementRef;
@Input() logBookDraftDetails = {
  object_id: "",
  primeNumber: "",
  receiveddateatCAD:"",
  nameofBusinessSegment: "",
  region: "",
  branchName:"",
  nameOfBorrower:"",
  facilityType:"",
  cPReferenceNo:"",
  ifapplicable : false,
  dateReturnedToBussiness: "",
  daetResubmittedbyBussiness: "",
  dateSenttoHOK: "",
  dateApprovalReceived:"",
  remarks: "",
  createdBy : "",

  modifiedBy : "",
};

constructor(
  //private _dateFormatPipe: DateFormatPipe,
  // private datePipe:DatePipe,
  //private calendar: NgbCalendar,
  private customerdemographicService:CustomerDemographicService,
  private userIdle: UserIdleService,
  private formBuilder: FormBuilder,
  private logbookDraftService: logBookDraftService,
  public actRoute: ActivatedRoute,
  //private toastr: ToastrService,
  public router: Router,
  private _snackBar: MatSnackBar,
  private custService:CustService,
  //public bsDatePicker : BsDatepickerModule,
  private restservice :  RestService) {
  //  this.logBookDraftDetails.receiveddateatCAD = toString(new Date());

}

hideEdit ="true";
editrights(){
  if(localStorage.getItem('Edit') == 'true'){
    this.hideEdit="false";
    console.log(this.hideEdit)
  }else{
    this.hideEdit= "true";
  }

}
  ngOnInit() {
    this.editrights();
    this. deleterights();
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {

    
   this.router.navigate(['login'])
   localStorage.clear();
   this.openSnackBar('Session Expired', 'Sure');
    console.log('Time is up!')});
  
 
    this.formGroup= this.formBuilder.group({
      'PRIMENUMBER':this.primeFormControl,
      'CADRECIV':this.receiveddateatCADFormControl,
      'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
      'BRANCHNAME':this.branchNameControl,
      'FACILITYFORM':this.facilityTypeFormControl,
      'REFERENCEFORM':this.cPReferenceNoFormControl,
      'DATERETURN':this.dateReturnedToBussinessFormControl,
      'DATESENT':this.dateSenttoHOKFormControl,
      'DATERESUBMIT':this.daetResubmittedbyBussinessFormControl,
      'DATEAPPROVAL':this.dateApprovalReceivedFormControl,
      'REMARKS':this.remarksFormControl,
      'REGION':this.regionFormControl,
      'BS':this.businessSegmentFormControl



          });
    this.isViewable = false;
    this.loadLogBookDraftData();
    console.log(this.alllogBookDraftDetails.receiveddateatCAD);
  }


  public toggle(): void { this.isViewable = !this.isViewable; }

  loadLogBookDraftData() {
    return this.logbookDraftService.getlogBookDrafts().subscribe((data: {}) => {
      this.alllogBookDraftDetails = data;
      this.dataSource = new MatTableDataSource(this.alllogBookDraftDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  alphanumeric(searchValue: string)
    { 
    var letters = /^[0-9a-zA-Z]+$/;
    if(searchValue.match(letters))
    {
   // alert('Your registration number have accepted : you can try another');
    return true;
    }
    else
    {
    alert('Please input alphanumeric characters only');
    return false;
    }
    }
  addLogBookDraft() {
  //  this.logBookDraftDetails.createdBy= user;
    // this.logBookDraftDetails.dateReturnedToBussiness = this._dateFormatPipe.transform(this.logBookDraftDetails.dateReturnedToBussiness);
    // this.logBookDraftDetails.dateSenttoHOK = this._dateFormatPipe.transform(this.logBookDraftDetails.dateSenttoHOK);
    // this.logBookDraftDetails.receiveddateatCAD = this._dateFormatPipe.transform(this.logBookDraftDetails.receiveddateatCAD);
    // this.logBookDraftDetails.dateSenttoHOK= this._dateFormatPipe.transform(this.logBookDraftDetails.dateSenttoHOK);
    // this.logBookDraftDetails.dateApprovalReceived= this._dateFormatPipe.transform(this.logBookDraftDetails.dateApprovalReceived);
    var user= localStorage.getItem('userFullName')
    console.log(this.logBookDraftDetails);
    if (this.logBookDraftDetails.object_id == "") {
      if (this.logBookDraftDetails) {
        this.logBookDraftDetails.createdBy= user;
        // var branch_code_id = this.logBookDraftDetails.branchCode;
        // this.logBookDraftDetails.branchCode = this.logBookDraftDetails[branch_code_id].BranchCode;
        this.logbookDraftService.createlogbookdrafts(this.logBookDraftDetails).subscribe((data: {}) => {
     //   this.toastr.success('Log Book Record Added Successfully');
     this.openSnackBar('Log Book Record Added Successfully','Sure');
          this.clearform();
          this.loadLogBookDraftData();
        })
      }
    }
    else {
      if (window.confirm('Are you sure, you want to update?')) {
        this.logBookDraftDetails.modifiedBy= user;
        this.logbookDraftService.updatelogBookDrafts(this.logBookDraftDetails.primeNumber, this.logBookDraftDetails).subscribe((data: {}) => {
         //  this.toastr.success('Log Book Record Updated Successfully');
         this.openSnackBar('Log Book Record Added Successfully','Sure');
        })
        location.reload();
      }

    }
  }


  custdata;
  cnicdata;
  customerTypeName;
  sbpcode;
  customerFullName;
  groupCode;
  totalFBlimit;
  totalNFBlimit;
  totalLimit;
  cpExpiryDate;
  groupName;
  branchNamee;
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  onFocusOut() {
    this.logbookDraftService.getlogBookDraft(this.logBookDraftDetails.primeNumber).subscribe(() => { })
    var data = this.logbookDraftService.getlogBookDraftData()


    if (data> 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.logBookDraftDetails = {

         object_id: data[0]._id,
      primeNumber: data[0].primeNumber,
      receiveddateatCAD:data[0].receiveddateatCAD,
      nameofBusinessSegment: data[0].nameofBusinessSegment,
      region: data[0].region,
    //  branchCode: data[0].branchCode,
      branchName: data[0].branchName,
      nameOfBorrower: data[0].nameOfBorrower,
      facilityType: data[0].facilityType,
      cPReferenceNo: data[0].cPReferenceNo,
      ifapplicable : data[0].ifapplicable,
      dateReturnedToBussiness: data[0].dateReturnedToBussiness,
      daetResubmittedbyBussiness: data[0].daetResubmittedbyBussiness,
      dateSenttoHOK: data[0].dateSenttoHOK,
      dateApprovalReceived: data[0].dateApprovalReceived,
      remarks:data[0].remarks,
      createdBy : "",

      modifiedBy : "",



    };
      console.log(this.logBookDraftDetails);
    }



    else {
      console.log("here")
      console.log(this.logBookDraftDetails.primeNumber)
      this.custService.cust(this.logBookDraftDetails.primeNumber).subscribe((data: {}) => {
        console.log(data);
        this.custdata = data;
        this.customerTypeName = this.custdata.data.basicDetail.customertTypeName;
        this.cnicdata = this.custdata.data.customerCnicDetails;
        this.sbpcode = this.custdata.data.basicDetail["sbpCode "];
        this.nameOfBorrower = this.custdata.data.basicDetail.customerFullName;
        this.groupCode = this.custdata.data.customerLimitHeader.groupCode;
        this.totalFBlimit = this.custdata.data.customerLimitDetail[0]["limitAmount "];
        this.totalNFBlimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
        this.totalLimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
        this.groupName = this.custdata.data.customerLimitHeader.groupCode;
        this.cpExpiryDate= this.custdata.data.customerLimitDetail[0].limitExpiryDate;
        console.log("sbpcode", this.sbpcode);
        this.branchNamee=this.custdata.data.basicDetail.branchName;
        console.log(this.custdata.data.basicDetail.customertTypeName);//customerType

        console.log(this.custdata.data.customerCnicDetails);
        console.log(this.custdata.data.basicDetail["sbpCode "]);//sbpcode
        console.log(this.custdata.data.basicDetail.customerFullName);//name of borrower
        console.log(this.custdata.data.basicDetail.groupName2);//groupName
        console.log(this.custdata.data.customerLimitDetail[0]["limitAmount "])//total FB Limit
        console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total NFB Limit
        console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total limit
        console.log(this.custdata.data.customerLimitHeader.groupCode);//groupCode
        console.log(this.custdata.data.customerLimitDetail[0].limitExpiryDate);//limitExpiryDate

    
          this.logBookDraftDetails = {

               object_id:"",
              primeNumber: this.logBookDraftDetails.primeNumber,
              receiveddateatCAD:"",
              nameofBusinessSegment: "",
              region: "",
            //  branchCode: data[0].branchCode,
              branchName:this.branchNamee,
              nameOfBorrower:this.nameOfBorrower,
              facilityType: "",
              cPReferenceNo: "",
              ifapplicable : false,
              dateReturnedToBussiness: "",
              daetResubmittedbyBussiness:"",
              dateSenttoHOK:"",
              dateApprovalReceived: "",
              remarks:"",
              createdBy:"",
              modifiedBy: ""
      
      
    
        };
        this.findOne();
      },
        error => {
          console.log("Error");
        }
      );

      console.log("Inside Focus");
      // var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      console.log("hiiiiiiiiii", this.logBookDraftDetails)
    }
    // console.log("Inside Focus");

    // var data = this.logbookDraftService.getlogBookDraftData()

    // console.log('data ka zero index : ', data[0]);

    // this.logBookDraftDetails = {
    //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,
    //   receiveddateatCAD:data[0].receiveddateatCAD,
    //   nameofBusinessSegment: data[0].nameofBusinessSegment,
    //   region: data[0].region,
    // //  branchCode: data[0].branchCode,
    //   branchName: data[0].branchName,
    //   nameOfBorrower: data[0].nameOfBorrower,
    //   facilityType: data[0].facilityType,
    //   cPReferenceNo: data[0].cPReferenceNo,
    //   ifapplicable : data[0].ifapplicable,
    //   dateReturnedToBussiness: data[0].dateReturnedToBussiness,
    //   daetResubmittedbyBussiness: data[0].daetResubmittedbyBussiness,
    //   dateSenttoHOK: data[0].dateSenttoHOK,
    //   dateApprovalReceived: data[0].dateApprovalReceived,
    //   remarks:data[0].remarks




    //};

  }
  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.logBookDraftDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.logBookDraftDetails.primeNumber)
      console.log("mariaaaaaaaaaaaaaaaaaaaafatimaaaaaaaaaaaaaaaaaaaaaaaaa")
      console.log(data);
      var findonedata =data;
      console.log(findonedata)
      console.log("if i get heree")
      if(findonedata[0]==null){
        console.log("hereeee")
        alert("Please first make customer Demographics against the Prime Number")
      }else{
        console.log("mariaaaaaaaaaaaaaaaaa")
        console.log(findonedata[0].region)
        this.logBookDraftDetails.region=findonedata[0].region
        console.log(this.logBookDraftDetails.region)
        this.logBookDraftDetails.nameofBusinessSegment=findonedata[0].businessSegment
        //console
      }
      
    })
    }
    
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  
  validaions(){

    // if(!this.logBookDraftDetails.primeNumber ||!this.logBookDraftDetails.nameofBusinessSegment||
    //   !this.logBookDraftDetails.receiveddateatCAD || !this.logBookDraftDetails.region
    //   || !this.logBookDraftDetails.cPReferenceNo || !this.logBookDraftDetails.facilityType
    //   || !this.logBookDraftDetails.nameOfBorrower || this.logBookDraftDetails.cPReferenceNo
    //   ){
      if(!this.logBookDraftDetails.primeNumber){
        this.openSnackBar('please enter all the required fields','Sure');
  
    }
  else  if(!this.logBookDraftDetails.nameofBusinessSegment){
      this.openSnackBar('please enter all the required fields','Sure');

  }
  else  if(!this.logBookDraftDetails.receiveddateatCAD){
    this.openSnackBar('please enter all the required fields','Sure');

}
else  if(!this.logBookDraftDetails.region){
  this.openSnackBar('please enter all the required fields','Sure');

}
else  if(!this.logBookDraftDetails.facilityType){
  this.openSnackBar('please enter all the required fields','Sure');

}
else  if(!this.logBookDraftDetails.cPReferenceNo){
  this.openSnackBar('please enter all the required fields','Sure');

}
  if(this.logBookDraftDetails.primeNumber.length<6){
  this.openSnackBar('please enter primeNumber of 6 digits','Sure');
  
  }
  // if(this.logBookDraftDetails.cnic.length<13){
  //   this.openSnackBar('please enter cnic of 13 digits','Sure');
    
  //   }
    else{
      this.addLogBookDraft();
      console.log('hiii')
      return 0;
    };
   
  if(this.logBookDraftDetails.primeNumber.length<6){
    this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }
    return 0;
  }
  
  editLogBookKDraftData(logBookDraftData) {
    window.confirm('Are you sure, you want to edit?')
    this.disable();
    this.logBookDraftDetails = logBookDraftData;
    //this.caddate = this.logBookDraftDetails.receiveddateatCAD.toString().split('T')[0];
   // this.logBookDraftDetails.receiveddateatCAD = new Date (this.logBookDraftDetails.receiveddateatCAD.toString().split('T')[0]);
    console.log("Details");
    //console.log(this.logBookDraftDetails.receiveddateatCAD.setDate);
    this.isViewable = logBookDraftData.ifapplicable;
    this.VisiblitypNumb = true;
  }
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
  onSearchChange(searchValue: string) {
    console.log(searchValue);
    return this.logbookDraftService.getlogBookDraft(this.logBookDraftDetails.primeNumber).subscribe((data: {}) => {
      this.inputdata = data
      console.log(this.inputdata);
      this.logbookDraftService.setlogBookDraft(data);
      //  this.restservice.setCustomerDemographicData(data);
    });



  }
  clearform() {
    this.logBookDraftDetails.primeNumber="",
    this.logBookDraftDetails.receiveddateatCAD,
    this.logBookDraftDetails.region="",
    this.logBookDraftDetails.branchName="",
    this.logBookDraftDetails.cPReferenceNo="",
    this.logBookDraftDetails.daetResubmittedbyBussiness="",
    this.logBookDraftDetails.dateApprovalReceived="",
    this.logBookDraftDetails.dateReturnedToBussiness="",
    this.logBookDraftDetails.dateSenttoHOK="",
    this.logBookDraftDetails.facilityType="",
    this.logBookDraftDetails.nameOfBorrower="",
    this.logBookDraftDetails.nameofBusinessSegment="",
    this.logBookDraftDetails.remarks=""
    
  }
  hideDelete ="true";

  deleterights(){
    if(localStorage.getItem('Delete') == 'true'){
      this.hideDelete="false";
      console.log(this.hideDelete)
    }else{
      this.hideDelete= "true";
    }

  }

  deletelogBookDraftData(primeNumber){
    console.log(primeNumber)
    if (window.confirm('Are you sure, you want to delete?')){
      this.logbookDraftService.deletelogBookDraft(primeNumber).subscribe(data => {+
       // this.toastr.success('Record deleted Successfully');
       this.openSnackBar('Log Book Record deleted Successfully','Sure');
        this.loadLogBookDraftData();
      })
    }
  }


  searchTableData(searchValue: string) {
    console.log(searchValue);
    return this.logbookDraftService.getlogBookDraft(this.tableprimenumber).subscribe((data: {} ) => {
     this.inputdata = data
     console.log(this.inputdata);
     this.alllogBookDraftDetails = this.inputdata;
     this.logbookDraftService.setlogBookDraft(data);
    //  this.restservice.setCustomerDemographicData(data);

    });
  }


}
