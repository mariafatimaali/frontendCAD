import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CplogbookDraftService } from "../../_services/cplogbookDraft/cplogbook-draft.service";
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefandDeferralService } from "../../_services/defanddeferral/defand-deferral.service";
import { format } from 'url';
import { UserIdleService } from 'angular-user-idle';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import { defanddeferral } from 'src/app/_models/defanddeferral.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import {BranchService} from '../../_services/branches/branches.service';
import * as XLSX from 'xlsx';
//import { DatePipe } from '@angular/common';

interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface cptype{
  value :string;
  viewValue :string;
}
interface nature{
  value :string;
  viewValue :string;
}
interface approval{
  value :string;
  viewValue :string;
}
interface BO {
  value :string;
  viewValue :string;
}
interface AS {
  value :string;
  viewValue :string;
}

@Component({
  selector: 'app-document-defi',
  templateUrl: './document-defi.component.html',
  styleUrls: ['./document-defi.component.scss'],
 // providers: [DateFormatPipe]
})
export class DocumentDefiComponent implements OnInit {
  Approval: approval[] = [ { value: 'BOD', viewValue: 'BOD' },
  { value: 'CRO', viewValue: 'CRO' },
  { value: 'DGM RM', viewValue: 'DGM RM' },

  { value: ' GM Risk Intl', viewValue: ' GM Risk Intl' },

  { value: ' Head Commercial Banking', viewValue: ' Head Commercial Banking' },
  {
    value: 'Head Consumer, Rural & SME Banking'
    , viewValue: 'Head Consumer, Rural & SME Banking'
  },
  { value: '  Head Conventional and Seasonal Finance', viewValue: '  Head Conventional and Seasonal Finance' },
  { value: 'Head of CIU - Unsecured', viewValue: 'Head of CIU - Unsecured' },


  { value: ' Head RBG', viewValue: ' Head RBG' },

  { value: 'Head Retail Lending', viewValue: 'Head Retail Lending' },


  {
    value: 'Head SBF & POS Finance'
    , viewValue: ' Head SBF & POS Finance'
  },

  { value: 'Other', viewValue: ' Other' },
  { value: 'President', viewValue: 'President' },
  { value: 'RCE', viewValue: 'RCE' },
  { value: 'Regional Head Assets', viewValue: 'Regional Head Assets' },
  { value: ' Regional Retail Lending Head', viewValue: 'Regional Retail Lending Head' },



  { value: 'Risk Manager North', viewValue: 'Risk Manager North' },
  { value: 'SCO', viewValue: 'SCO' },
  { value: 'SRCE', viewValue: 'SRCE' },





  ];



  bo: BO[] = [
    {value: 'Blocked', viewValue: 'Blocked'},
    {value: 'Operative', viewValue: 'Operative'},

  ];
  accountstatus: AS[] = [
    {value: 'NPL', viewValue: 'NPL'},
    {value: 'Regular', viewValue: 'Regular'},

  ];



  business: businessSegment[] = [
    { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Commercial', viewValue: 'Commercial' },
    { value: 'FI', viewValue: 'FI' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Retail', viewValue: 'Retail' },
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
  ];
Nature: nature[]= [
  {value: 'Completion of Property Documents/Formalities', viewValue: 'Completion of Property Documents/Formalities'},
  {value: 'pCharge Upgradation from Ranking to Pari Passu/ Exclusiveizza-1', viewValue: 'Charge Upgradation from Ranking to Pari Passu/ Exclusive'},
  {value: 'Revaluation of Fixed Assets', viewValue: 'Revaluation of Fixed Assets'},
  {value: 'Insurance Policies', viewValue: 'Insurance Policies'},
  {value: 'Others	', viewValue: 'Others'	},
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
  CpType: cptype[] = [
    {value: 'Fresh', viewValue: 'Fresh'},
    {value: 'Annual Review', viewValue: 'Annual Review'},
    {value: 'Intermin Review', viewValue: 'Intermin Review'},
    {value: 'SFCP', viewValue: 'SFCP'},
    {value: 'T.E', viewValue: 'T.E'},
    {value: 'Defferal', viewValue: 'Defferal'},
    {value: 'NOC Request', viewValue: 'NOC Request'}

  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
branchCodeFormControl =new FormControl('', [ Validators.required,Validators.maxLength(6)]);
 // BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfRMFormControl = new FormControl('', [Validators.required]);
  nameofTeamLeaderFormControl = new FormControl('', [ Validators.required]);

  totalLimitsFormControl = new FormControl('', [Validators.required]);
  //cPReferenceNoFormControl = new FormControl('', [ Validators.required]);
  //cPInitialDateFormControl = new FormControl('', [Validators.required]);
  //cPApprovalDateFormControl = new FormControl('', [ Validators.required]);
  //approvalLevelFormControl = new FormControl('', [Validators.required]);
  //nameofRMFormControl = new FormControl('', [Validators.required]);
  detailsOfDocumentationDeficienciesFormControl = new FormControl('', [ Validators.required]);
  natureOfDocumentationDeficienciesFormControl = new FormControl('', [Validators.required]);
  deferral1stApprovalDateFormControl = new FormControl('', [ Validators.required]);
  deferralLatestApprovalDateFormControl = new FormControl('', [Validators.required]);
  deferralEffectiveDateFormControl = new FormControl('', [Validators.required]);
  deferralExpiryDateFormControl = new FormControl('', [Validators.required]);
  noOfDeferralsFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  dateOfResolutionFormControl = new FormControl('', [Validators.required]);
  blockedOrOperativeFormControl = new FormControl('', [Validators.required]);
  accountStatusFormControl = new FormControl('', [Validators.required]);
  remarksFormControl = new FormControl('', [Validators.required]);
  dateOfCompletionFormControl = new FormControl('', [Validators.required]);
  deferralPeriodFormControl = new FormControl('', [Validators.required]);
  deferralAgeingFormControl = new FormControl('', [Validators.required]);
  currentDeferalApprovalLevelFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
    // discrepanciesMemoNo2ReceivedOnFormControl = new FormControl('', [Validators.required]);
    // linesReleaseDateFormControl = new FormControl('', [Validators.required]);
    // remarksFormControl = new FormControl('', [Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','nameofBusinessSegment','region','branchCode','branchName','nameOfRM','nameofTeamLeader',
'totalLimits','customerName','detailsOfDocumentationDeficiencies','natureOfDocumentationDeficiencies','deferral1stApprovalDate','deferralLatestApprovalDate','deferralEffectiveDate','deferralExpiryDate',
'noOfDeferrals','currentDeferalApprovalLevel','blockedOrOperative','accountStatus','remarks',
    'dateOfCompletion','deferralPeriod','deferralAgeing','createdBy','createdOn','modifiedBy','modifiedOn'];
dataSource = new MatTableDataSource();
places: Array<any> = [];

  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////

  branchName:any;
  tableprimenumber: number;
  allBranchesDetails:any=[];
  //selectedBranch :allBranchesDetails[];
  selectedBranch: any ;
  public isViewable : boolean;
  BranchName: string;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  previousPage: any;

  totalRec: number;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];

  alldefanddeferralDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////




  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;





  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() defanddeferralDetails = {
    object_id: "",
    primeNumber: "",
    nameofBusinessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfRM: "",
    nameofTeamLeader:"",
    totalLimits: "",
    customerName:"",
    //facilityType: "",
    detailsOfDocumentationDeficiencies: "",
    natureOfDocumentationDeficiencies: "",
    deferral1stApprovalDate: "",
    deferralLatestApprovalDate: "",
   // deferralEffective: "",
    deferralEffectiveDate:"",
   deferralExpiryDate:"",
    noOfDeferrals: "",
    currentDeferalApprovalLevel: "",
    dateOfResolution: "",
    blockedOrOperative: "",
    accountStatus: "",
    remarks: "",
    //temporaryExtensionApprovedupto: "",
    dateOfCompletion: "",
    deferralPeriod: 0,
    deferralAgeing: 0,
    dataStatus: "",
    createdBy : "",

    createdOn: "",
     modifiedBy:   "",
     modifiedOn :   "",
     deletedBy:  "",
     deletedOn: "",
    active: ""



  };
  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };
  constructor(
    private _snackBar: MatSnackBar,
    private customerdemographicService:CustomerDemographicService,
    private userIdle: UserIdleService,
    private defanddeferralService: DefandDeferralService,
    private branchService : BranchService,
    public actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
   // private toastr: ToastrService,
   //private datePipe: DatePipe,
    public router: Router,
    //private _dateFormatPipe: DateFormatPipe,
    private custService: CustService,

    private restservice: RestService

  ) { }

  validatingForm: FormGroup;

  hideEdit ="true";

  editrights(){
    if(localStorage.getItem('Edit') == 'true'){
      this.hideEdit="false";
      console.log(this.hideEdit)
    }else{
      this.hideEdit= "true";
    }

  }
  ngOnInit(): void {
    this.editrights();
    // this.validatingForm = new FormGroup({
    //   required: new FormControl(null, Validators.required)
    // });
    //this.loadBranches();
    this. deleterights();
    this.isViewable = false;
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
      'BRANCHCODE':this.branchCodeFormControl,
      'BRANCHNAME':this.branchNameControl,
      'NAMEOFRM':this.nameOfRMFormControl,
      'NAMEOFTEAM':this.nameofTeamLeaderFormControl,
      'TOTALLIMITS':this.totalLimitsFormControl,
      'DETAILSOFDOC':this.detailsOfDocumentationDeficienciesFormControl,
      'NATUREOFDOC':this.natureOfDocumentationDeficienciesFormControl,
      'DEFFERAL1ST':this.deferral1stApprovalDateFormControl,
      'DEFFERALLATEST':this.deferralLatestApprovalDateFormControl,
      'DEFFERALEFFECTIVE':this.deferralEffectiveDateFormControl,
      'DEFFERALEXPIRY':this.deferralExpiryDateFormControl,
      'NOOFDEFFERALS':this.noOfDeferralsFormControl,
      'DATEOFRESOLUTION':this.dateOfResolutionFormControl,
      'BLOCKEDOROPERATIVE':this.blockedOrOperativeFormControl,
      'ACCOUNTSTATUS':this.accountStatusFormControl,
      'REMARKS':this.remarksFormControl,
      'DATEOFCOM':this.dateOfCompletionFormControl,
      'DEFFERALPERIOD':this.deferralPeriodFormControl,
      'DEFFERALAGING':this.deferralAgeingFormControl,
      'CA':this.currentDeferalApprovalLevelFormControl,
      'REGION':this.regionFormControl,
'BS':this.businessSegmentFormControl



          });
    this.loadCustomerDemographicData();
    console.log("customer Demographics");
    console.log(this.restservice.getRoleData());
    console.log(localStorage.getItem('Edit'));
    console.log(localStorage.getItem('View'));
    console.log(localStorage.getItem('Delete'));





    if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'false') {

      this.hideEditButton = false;

      this.hideForm = false;

      this.hideDeleteButton = true;

      console.log("edit given");

    }

    else if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'true' && localStorage.getItem('View') == 'false') {

      this.hideEditButton = false;

      this.hideForm = false;

      this.hideDeleteButton = false;

      console.log("edit and delete given");

    }

    else if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'true') {

      this.hideEditButton = false;

      this.hideForm = false;

      this.hideDeleteButton = true;

      console.log("all rights given");

    }

    else if (localStorage.getItem('Edit') == 'false' && localStorage.getItem('Delete') == 'true' && localStorage.getItem('View') == 'true') {

      this.hideEditButton = true;

      this.hideForm = true;

      this.hideDeleteButton = false;

      console.log("delete and view given");

    }

    else if (localStorage.getItem('Edit') == 'false' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'true') {

      this.hideEditButton = true;

      this.hideForm = true;

      this.hideDeleteButton = true;



      console.log("NONE given");

    }



  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
// dateApply(){
//  var  dateapply: any ;
// dateapply = this.defanddeferralDetails.deferralExpiryDate ;

// dateapply=Date.now();


// //(this.defanddeferralDetails.deferralEffectiveDate) = Date.now();
// }
onFocusOutBranch() {
  console.log("Inside Focus branch");
  var data = this.branchService.getCustomerDemographicData()
  console.log('data ka zero index : ', data[0]);
  this.branchDetails = {
    object_id: data[0]._id,
    BranchName: data[0].BranchName,
    BranchCode: data[0].BranchCode,
  };

}
first: any=[];
second: any=[];
result : any=[];

onDefferalPeriod(){
  console.log("hiii maaria beta")
 this.first=new Date(this.defanddeferralDetails.deferralEffectiveDate);
 console.log (this.first);
 
  this.second =new Date(this.defanddeferralDetails.deferralExpiryDate);
  console.log(this.second)
  // var date1 = new Date(this.first);
  // console.log(date1)
  // var date2 = new Date(this.second);
  // var di = Math.abs(date2.getDate() - date1.getDate());
  // console.log("Tesing Date",Math.ceil(di/(1000*60*60*24)));
  this.result = Math.round((this.second-this.first)/(1000*60*60*24));
 // this.fourth =this.defanddeferralDetails.dateOfCompletion;
 // this.result1 = Math.round((this.fourth-this.first)/(1000*60*60*24));
//  console.log(this.result1)
var r = this.result.toLocaleString();
console.log('hiiii',r)
this.defanddeferralDetails.deferralPeriod= this.result;
console.log(this.result);
console.log('maria',this.defanddeferralDetails.deferralPeriod);
//return console.log(Math.round((this.second-this.first)/(1000*60*60*24)));
  
}
third: any=[];
fourth: any=[];
result1 : any=[];
onDefferalAgeging(){
  console.log("hiii maaria beta")
 this.third=new Date(this.defanddeferralDetails.deferralEffectiveDate);
  this.fourth =new Date(this.defanddeferralDetails.dateOfCompletion);
  console.log(this.third);
  console.log(this.fourth);
  const diffTime = Math.abs(this.fourth - this.third);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
//this.result1 = Math.round((this.fourth-this.third)/(1000*60*60*24));
console.log(diffDays)

var r =diffDays.toLocaleString();
console.log('hiiii',r)
this.defanddeferralDetails.deferralAgeing= diffDays;
//console.log(this.result1);
console.log('maria',this.defanddeferralDetails.deferralAgeing);
 // return console.log(Math.round((this.fourth-this.third)/(1000*60*60*24)));
  
}
ifrequired(){
  this.isViewable = !this.isViewable;
console.log(this.isViewable)
this.onTodaydate()
}
result3 : any=[];
dateEe :any[];
onTodaydate(){
  this.third=this.defanddeferralDetails.deferralEffectiveDate;
  console.log(this.third);
  var dateE = new Date()
  var myInt = Number(new Date(dateE));
  //this.dateEe
  //console.log(myInt)
  this.result3=Math.round((myInt-this.third)/(1000*60*60*24));
  this.defanddeferralDetails.deferralAgeing = this.result3;
  
  return console.log(Math.round((myInt-this.third)/(1000*60*60*24)));
  
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
findOne(){
  this.customerdemographicService.findOneCustomerDemographics(this.defanddeferralDetails.primeNumber).subscribe((data :{})=>{
    console.log(this.defanddeferralDetails.primeNumber)
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
      this.defanddeferralDetails.region=findonedata[0].region
      console.log(this.defanddeferralDetails.region)
      this.defanddeferralDetails.nameofBusinessSegment=findonedata[0].businessSegment
    }
    
  })
  }
  
onSearchChangeBranch(searchValue){
  console.log("hi mariaaaaa");
  console.log("hi maria",searchValue);

      var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.defanddeferralDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
  //this.defanddeferralDetails.branchName=this.allBranchesDetails[searchValue].BranchName
  //this.defanddeferralDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.defanddeferralDetails.branchName);
  localStorage.setItem("branchName",this.defanddeferralDetails.branchName);

}
ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
  addCustomerDemographic() {
    var user= localStorage.getItem('userFullName')
    this.defanddeferralDetails.createdBy= user; 
    var user= localStorage.getItem('userFullName')
    var today = new Date();
    // this.defanddeferralDetails.deferral1stApprovalDate = this._dateFormatPipe.transform(this.defanddeferralDetails.deferral1stApprovalDate);
    // this.defanddeferralDetails.deferralEffectiveDate = this._dateFormatPipe.transform(this.defanddeferralDetails.deferralEffectiveDate);
    // this.defanddeferralDetails.deferralLatestApprovalDate = this._dateFormatPipe.transform(this.defanddeferralDetails.deferralLatestApprovalDate);



    // this.defanddeferralDetails.dateOfCompletion= this._dateFormatPipe.transform(this.defanddeferralDetails.dateOfCompletion);

    // this.defanddeferralDetails.deferralExpiryDate= this._dateFormatPipe.transform(this.defanddeferralDetails.deferralExpiryDate);
    // this.defanddeferralDetails.dateOfResolution= this._dateFormatPipe.transform(this.defanddeferralDetails.dateOfResolution);

    // console.log(this.limitfeedingDetails.renewalTillExpiryDate);
    // console.log(this.limitfeedingDetails);
    console.log(this.defanddeferralDetails);

    if (this.defanddeferralDetails.object_id == "") {

      if (this.defanddeferralDetails) {
        this.defanddeferralDetails.createdBy= user;   
        this.defanddeferralDetails.createdOn =today.toString();   
        this.defanddeferralService.createCustomerDemorgaphics(this.defanddeferralDetails).subscribe((data: {}) => {
          this.defanddeferralDetails.createdBy= user;
          this.openSnackBar('Document Deficiency Added Successfully','Sure');
          //this.defanddeferralDetails.deferralEffectiveDate= this.datePipe.transform(this.defanddeferralDetails.deferralEffectiveDate, 'yyyy-MM-dd');
         // this.toastr.success('Document Deficiency Added Successfully');

          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.defanddeferralDetails.modifiedBy= user;
        this.defanddeferralDetails.modifiedOn =today.toString();
        this.defanddeferralService.updateCustomerDemorgaphics(this.defanddeferralDetails.primeNumber, this.defanddeferralDetails).subscribe((data: {}) => {

         // this.toastr.success('Document Deficiency Updated Successfully');

         this.openSnackBar('Document Deficiency Updated Successfully','Sure');

        })

        location.reload();

      }



    }

  }

  fetchByTab() {

    if (!this.defanddeferralDetails.primeNumber) {

      return this.defanddeferralService.getCustomerDemographic(this.defanddeferralDetails.primeNumber).subscribe((data: {}) => { })

    }

  }
  ongetload(){
    console.log("hi i am here");

      this.branchName=localStorage.getItem("branchName");
    console.log(this.branchName);
    return this.branchName;  // console.log (this.branchName);
   }
  // onFocusOut() {

  //   // console.log("Inside Focus");

  //   // var data = this.defanddeferralService.getCustomerDemographicData()

  //   // console.log('data ka zero index : ', data[0]);

  //   // this.defanddeferralDetails = {

  //   //   object_id: data[0]._id,

  //   //   primeNumber: data[0].primeNumber,

  //   //   nameofBusinessSegment: data[0].nameofBusinessSegment,

  //   //   region: data[0].region,

  //   //   branchCode: data[0].branchCode,

  //   //   branchName: data[0].branchName,

  //   //   nameOfRM: data[0].nameOfRM,

  //   //   nameofTeamLeader: data[0].nameofTeamLeader,

  //   //   totalLimits: data[0].totalLimits,

  //   //  // facilityType: data[0].facilityType,

  //   //   detailsOfDocumentationDeficiencies: data[0].detailsOfDocumentationDeficiencies,

  //   //   natureOfDocumentationDeficiencies: data[0].natureOfDocumentationDeficiencies,

  //   //   deferral1stApprovalDate: data[0].deferral1stApprovalDate,

  //   //   deferralLatestApprovalDate: data[0].deferralLatestApprovalDate,



  //   //   deferralEffectiveDate: data[0].deferralEffectiveDate,
  //   //   deferralExpiryDate: data[0].deferralExpiryDate,
  //   //   noOfDeferrals: data[0].noOfDeferrals,

  //   //   currentDeferalApprovalLevel: data[0].currentDeferalApprovalLevel,

  //   //   dateOfResolution: data[0].dateOfResolution,

  //   //   blockedOrOperative: data[0].blockedOrOperative,

  //   //   accountStatus: data[0].accountStatus,
  //   //   remarks: data[0].remarks,

  //   //   //temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,

  //   //   dateOfCompletion: data[0].dateOfCompletion,

  //   //   deferralPeriod: data[0].deferralPeriod,

  //   //   deferralAgeing: data[0].deferralAgeing,

  //   //   dataStatus: data[0].dataStatus,

  //   //   createdBy: data[0].createdBy,

  //   //   modifiedBy: data[0].modifiedBy,


  //   //   active: data[0].active



  //   // };

  // }
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
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;
  branchCodee;
  branchNamee;
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  onFocusOut() {
    this.defanddeferralService.getCustomerDemographic(this.defanddeferralDetails.primeNumber).subscribe(() => { })
    var data = this.defanddeferralService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.defanddeferralService.getCustomerDemographic(this.defanddeferralDetails.primeNumber).subscribe(() => { })
      // var data = this.defanddeferralService.getCustomerDemographicData()
      console.log('data ka zero index : ', data[0]);
      
    this.defanddeferralDetails = {
 object_id: data[0]._id,
 primeNumber: data[0].primeNumber,
nameofBusinessSegment: data[0].nameofBusinessSegment,
region: data[0].region,
branchCode: data[0].branchCode,
branchName: data[0].branchName,
 nameOfRM: data[0].nameOfRM,
 nameofTeamLeader: data[0].nameofTeamLeader,
 totalLimits: data[0].totalLimits,
 customerName: data[0].customerName,
  detailsOfDocumentationDeficiencies: data[0].detailsOfDocumentationDeficiencies,
  natureOfDocumentationDeficiencies: data[0].natureOfDocumentationDeficiencies,
 deferral1stApprovalDate: data[0].deferral1stApprovalDate,
 deferralLatestApprovalDate: data[0].deferralLatestApprovalDate,
 deferralEffectiveDate: data[0].deferralEffectiveDate,
     deferralExpiryDate: data[0].deferralExpiryDate,
    noOfDeferrals: data[0].noOfDeferrals,

      currentDeferalApprovalLevel: data[0].currentDeferalApprovalLevel,

      dateOfResolution: data[0].dateOfResolution,

      blockedOrOperative: data[0].blockedOrOperative,

      accountStatus: data[0].accountStatus,
      remarks: data[0].remarks,

      //temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,

      dateOfCompletion: data[0].dateOfCompletion,

      deferralPeriod: data[0].deferralPeriod,

      deferralAgeing: data[0].deferralAgeing,

      dataStatus: data[0].dataStatus,

      createdBy:data[0].createdBy,
      modifiedBy: data[0].modifiedBy,
     // createdBy : "",

  createdOn: data[0].createdOn,
  // modifiedBy:   data[0].modifiedBy,
   modifiedOn :   data[0].modifiedOn,
   deletedBy: data[0].deletedBy,
   deletedOn: data[0].deletedOn,



      active: data[0].active



    };

      console.log(this.defanddeferralDetails);
    }



    else {
      console.log("here")
      console.log(this.defanddeferralDetails.primeNumber)
      this.custService.cust(this.defanddeferralDetails.primeNumber).subscribe((data: {}) => {
        console.log(data);
        this.custdata = data;
       // data.basicDetail.customerFullName
        this.customerTypeName = this.custdata.data.basicDetail.customerFullName;
        console.log("maria beta",this.customerFullName)
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
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
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

        this.defanddeferralDetails = {
        
      object_id: "",

      primeNumber: this.defanddeferralDetails.primeNumber,

      nameofBusinessSegment: "",

      region: "",

      branchCode:  this.branchCodee,

      branchName:   this.branchNamee,

      nameOfRM: "",

      nameofTeamLeader: "",
      customerName:  this.customerTypeName,
      totalLimits: this.totalLimit ,

     // facilityType: data[0].facilityType,

      detailsOfDocumentationDeficiencies: "",

      natureOfDocumentationDeficiencies: "",

      deferral1stApprovalDate: "",

      deferralLatestApprovalDate: "",



      deferralEffectiveDate: "",
      deferralExpiryDate:"",
      noOfDeferrals: "",

      currentDeferalApprovalLevel: "",

      dateOfResolution: "",

      blockedOrOperative: "",

      accountStatus:"",
      remarks:"",

      //temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,

      dateOfCompletion: "",

      deferralPeriod: 0,

      deferralAgeing: 0,

      dataStatus: "",

      createdBy : "",

      createdOn:"",
       modifiedBy:  "",
       modifiedOn : "",
       deletedBy: "",
       deletedOn:"",


      active: ""
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

      console.log("hiiiiiiiiii", this.defanddeferralDetails)
    }
  }
  //
  onChangebranchCode(){
    this.selectedBranch = this.allBranchesDetails[0];
    console.log(this.selectedBranch);
    }

    loadBranches(){
      return this.branchService.getCustomerDemographics().subscribe((data:{})=>{
        this.allBranchesDetails = data;
        console.log(this.allBranchesDetails);
        this.selectedBranch = this.allBranchesDetails[0];
    console.log("hiiiiii",this.selectedBranch);

       // onChangebranchCode();
      });
    }



  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.defanddeferralService.getCustomerDemographic(this.defanddeferralDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.defanddeferralService.setCustomerDemographicData(data);

      //  this.restservice.setdefanddeferralData(data);



    });



  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadCustomerDemographicData() {  
  return this.defanddeferralService.getCustomerDemographics().subscribe((data: {}) => {
      this.alldefanddeferralDetails = data;
      this.dataSource = new MatTableDataSource(this.alldefanddeferralDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }


  validaions(){

    // if(!this.defanddeferralDetails.primeNumber ||!this.defanddeferralDetails.nameofBusinessSegment||
    //   !this.defanddeferralDetails.nameofTeamLeader || !this.defanddeferralDetails.region
    //   || !this.defanddeferralDetails.noOfDeferrals || !this.defanddeferralDetails.totalLimits
    //   || !this.defanddeferralDetails.accountStatus || this.defanddeferralDetails.blockedOrOperative
    //   ||this.defanddeferralDetails.dateOfResolution|| this.defanddeferralDetails.dateOfCompletion||
    //   this.defanddeferralDetails.deferralLatestApprovalDate || this.defanddeferralDetails.nameofTeamLeader||this.defanddeferralDetails.deferral1stApprovalDate
    //   ||this.defanddeferralDetails.detailsOfDocumentationDeficiencies||
    //    this.defanddeferralDetails.deferralEffectiveDate||this.defanddeferralDetails.deferralExpiryDate){
    //     this.openSnackBar('please enter all the required fields','Sure');
  
    // }
    if(!this.defanddeferralDetails.primeNumber){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.nameofBusinessSegment){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.region){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.deferral1stApprovalDate){this.openSnackBar('please enter all the required fields','Sure');}
  //  else if(!this.defanddeferralDetails.dateOfResolution){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.deferralEffectiveDate){this.openSnackBar('please enter all the required fields','Sure');}

   else if(!this.defanddeferralDetails.deferralExpiryDate){this.openSnackBar('please enter all the required fields','Sure');}
  //  else if(!this.defanddeferralDetails.deferralPeriod){this.openSnackBar('please enter all the required fields','Sure');}

  //  else if(!this.defanddeferralDetails.deferralPeriod){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.deferral1stApprovalDate){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.nameofTeamLeader){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.natureOfDocumentationDeficiencies){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.noOfDeferrals){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.currentDeferalApprovalLevel){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.defanddeferralDetails.accountStatus){this.openSnackBar('please enter all the required fields','Sure');}
  //  else if(!this.defanddeferralDetails.remarks){this.openSnackBar('please enter all the required fields','Sure');}
  
   else if(!this.defanddeferralDetails.blockedOrOperative){this.openSnackBar('please enter all the required fields','Sure');}
   
  // else if(!this.defanddeferralDetails.dateOfCompletion && this.isViewable==true){
  //   this.openSnackBar('please enter all the required fields','Sure');
  // }
   //else if(!this.defanddeferralDetails.Remarks){this.openSnackBar('please enter all the required fields','Sure');}
  
  // if(this.limitfeedingDetails.accountNo.length<14){
  //   this.openSnackBar('please enter account number of 14 digits','Sure');
    
  //   }
    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    if(this.defanddeferralDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
      
      }
    return 0;
  }
  
  editCustomerDemographic(defanddeferralData) {
    //var user= localStorage.getItem('userFullName')
    //this.limitfeedingDetails.createdBy= user;
    var user= localStorage.getItem('userFullName')
    this.defanddeferralDetails.modifiedBy= user;
    window.confirm('Are you sure, you want to edit?')
    this.disable();
   // this.onFocusOut();
//this.onDefferalAgeging();
    this.defanddeferralDetails = defanddeferralData;
console.log(this.defanddeferralDetails.deferralAgeing)


    this.VisiblitypNumb = true

  }



  clearform() {

    this.defanddeferralDetails.primeNumber= "",

    this.defanddeferralDetails.nameofBusinessSegment= "",

    this.defanddeferralDetails.region= "",

    this.defanddeferralDetails.branchCode= "",

    this.defanddeferralDetails.branchName= "",

    this.defanddeferralDetails.nameOfRM= "",

    this.defanddeferralDetails.nameofTeamLeader="",

    this.defanddeferralDetails.totalLimits= "",

    this.defanddeferralDetails.customerName= "",

    this.defanddeferralDetails.detailsOfDocumentationDeficiencies= "",

    this.defanddeferralDetails.natureOfDocumentationDeficiencies= "",

    this.defanddeferralDetails.deferral1stApprovalDate= "",
    this.defanddeferralDetails.deferralLatestApprovalDate= "",

   // this.defanddeferralDetails.deferralEffective= "",
    this.defanddeferralDetails.deferralEffectiveDate="",
    this.defanddeferralDetails.deferralExpiryDate= "",
    this.defanddeferralDetails.noOfDeferrals= "",

    this.defanddeferralDetails.currentDeferalApprovalLevel= "",

    this.defanddeferralDetails.dateOfResolution= "",

    this.defanddeferralDetails.blockedOrOperative= "",

    this.defanddeferralDetails.accountStatus= "",

    this.defanddeferralDetails.remarks= "",

    //this.defanddeferralDetails.temporaryExtensionApprovedupto= "",



    this.defanddeferralDetails.dateOfCompletion= "",

    this.defanddeferralDetails.deferralPeriod= 0,

    this.defanddeferralDetails.deferralAgeing= 0,
    this.defanddeferralDetails.dataStatus= "",
    this.defanddeferralDetails.createdBy = "";

    this.defanddeferralDetails.createdOn= "";
    this.defanddeferralDetails.modifiedBy= "";
    this.defanddeferralDetails.modifiedOn = "";
    this.defanddeferralDetails.deletedBy= "";
     this.defanddeferralDetails.deletedOn= "";





  }

  // searchTableData(searchValue: string) {

  //   console.log(searchValue);

  //   return this.defanddeferralService.getCustomerDemographic(this.tableprimeNumber).subscribe((data: {}) => {

  //     this.inputdata = data

  //     console.log(this.inputdata);

  //     this.alldefanddeferralDetails = this.inputdata;

  //     this.defanddeferralService.setCustomerDemographicData(data);

  //     //  this.restservice.setCustomerDemographicData(data);



  //   });

  // }
  hideDelete ="true";

  deleterights(){
    if(localStorage.getItem('Delete') == 'true'){
      this.hideDelete="false";
      console.log(this.hideDelete)
    }else{
      this.hideDelete= "true";
    }

  }


  deleteCustomer(primeNumber) {
     if (window.confirm('Are you sure, you want to delete?')) {
      var user= localStorage.getItem('userFullName')
      this.defanddeferralDetails.deletedBy = user;
      var today = new Date();
      this.defanddeferralDetails.createdOn =today.toString();
      this.defanddeferralService.deleteCustomersdemographic(this.defanddeferralDetails.primeNumber).subscribe(data => {
     //  this.toastr.success('Document Deficiency Deleted Successfully');
     this.openSnackBar('Deficiency Defferal Deleted  Successfully','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }

}
