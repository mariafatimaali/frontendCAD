import {MatSnackBar} from '@angular/material/snack-bar';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { limitfeedingService } from "../../_services/limitfeeding/limitfeeding.service";
import { CplogbookDraftService } from "../../_services/cplogbookDraft/cplogbook-draft.service";
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { format } from 'url';
import { UserIdleService } from 'angular-user-idle';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { limitfeeding } from 'src/app/_models/limitfeeding.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import {BranchService} from '../../_services/branches/branches.service';
//import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
// import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
export interface PeriodicElement {
  primeNumber: string;

}

interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface bf {
  value: string;
  viewValue: string;
}
interface document {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-credit-proposal',
  templateUrl: './credit-proposal.component.html',
  styleUrls: ['./credit-proposal.component.scss'],
  //providers: [DateFormatPipe]
})
export class CreditProposalComponent implements OnInit {
    business: businessSegment[] = [
      { value: 'Corporate', viewValue: 'Corporate' },
      { value: 'Commercial', viewValue: 'Commercial' },
      { value: 'FI', viewValue: 'FI' },
      { value: 'Islamic', viewValue: 'Islamic' },
      { value: 'Structured Credit', viewValue: 'Structured Credit' },
      { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
      { value: 'Retail', viewValue: 'Retail' },
      ];
      document: document[] = [
        { value: 'Documents awaited from BU/ Customer', viewValue: 'Documents awaited from BU/ Customer' },
        { value: 'Stamp duty not recovered', viewValue: 'Stamp duty not recovered' },
         { value: 'Documents received with discrepancy', viewValue: 'Documents received with discrepancy' },
        // { value: 'Islamic', viewValue: 'Islamic' },
        // { value: 'Structured Credit', viewValue: 'Structured Credit' },
        // { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
        // { value: 'Retail', viewValue: 'Retail' },
        ];
  
      bf: bf[] = [
        {value: 'Document awaited from Customer/BU', viewValue: 'Document awaited from Customer/BU'},
        {value: 'Stamp duty not recovered', viewValue: 'Stamp duty not recovered'},
        {value: 'Documents recieved with discrepency', viewValue: 'Documents recieved with discrepency'},
      
      ];


  Region: regions[] = [
    { value: 'Bahawalpur', viewValue: 'Bahawalpur' },
    { value: 'Faisalabad', viewValue: 'Faisalabad' },
    { value: 'Gujranwala', viewValue: 'Gujarawala' },
    { value: 'Gujrat', viewValue: 'Gujrat' },
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Islamabad', viewValue: 'Islamabad' },
    { value: 'Jehlum', viewValue: 'Jehlum' },
    { value: 'Karachi', viewValue: 'Karachi' },
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Lahore', viewValue: 'Lahore' },
    { value: 'Mardan', viewValue: 'Mardan' },
    { value: 'Mirpur', viewValue: 'Mirpur' },
    { value: 'Multan', viewValue: 'Multan' },
    { value: 'Muzafarabad', viewValue: 'Muzafarabad' },
    { value: 'Muzafarabad', viewValue: 'Peshawar' },
    { value: 'Quetta', viewValue: 'Quetta' },
    { value: 'Sahiwal', viewValue: 'Sahiwal' },
    { value: 'Sargodha', viewValue: 'Sargodha' },
    { value: 'Sialkot', viewValue: 'Sialkot' },


  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
primeFormControl = new FormControl('', [ Validators.required]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  lastCPExpiryDateFormControl = new FormControl('', [ Validators.required]);

  renewalTillExpiryDateFormControl = new FormControl('', [Validators.required]);
  cPApprovalDateFormControl = new FormControl('', [ Validators.required]);
  renewedCPReceivedDateFormControl = new FormControl('', [Validators.required]);
  noofdaysPendingFormControl = new FormControl('', [ Validators.required]);
  deficiencyObjectionFormControl = new FormControl('', [Validators.required]);
  briefDiscriptioneFormControl = new FormControl('', [Validators.required]);
  resolutionDateFormControl = new FormControl('', [ Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select', 'delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','lastCPExpiryDate',
'renewalTillExpiryDate','cPApprovalDate','renewedCPReceivedDate','noofdaysPending','deficiencyObjection','briefDiscription','resolutionDate','createdBy','modifiedBy'];
dataSource = new MatTableDataSource();
places: Array<any> = [];


  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////

  tableprimenumber: number;
  branchName:any;
  //tableprimenumber: number;
  allBranchesDetails:any=[];
  //selectedBranch :allBranchesDetails[];
  selectedBranch: any ;

  BranchName: string;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  previousPage: any;

  totalRec: number;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];

  alllimitfeedingDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////



  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;





  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() limitfeedingDetails = {

    object_id: "",
    primeNumber: "",
    businessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfBorrower: "",
    lastCPExpiryDate :"",
    renewalTillExpiryDate :"",
    cPApprovalDate :"",
    renewedCPReceivedDate :"",
    noofdaysPending :"",
    deficiencyObjection :"",
    briefDiscription :"",
    resolutionDate :"",
    dataStatus:"",
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
    private userIdle: UserIdleService,
    private customerdemographicService:CustomerDemographicService,
    private branchService : BranchService,
    private formBuilder: FormBuilder,
    private limitfeedingService: limitfeedingService,
    private _snackBar: MatSnackBar,
    public actRoute: ActivatedRoute,
    private custService: CustService,
  //  private _dateFormatPipe: DateFormatPipe,

  //  private toastr: ToastrService,

    public router: Router,

    private restservice: RestService

  ) { }

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
    this. deleterights();
    this.editrights();
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {

    
   this.router.navigate(['login'])
   localStorage.clear();
   sessionStorage.clear();
   this.openSnackBar('Session Expired', 'Sure');
    console.log('Time is up!')});
  
 

    //this.toDate = this._dateFormatPipe.transform(toDate);

    // if (paidDate != 'null') {
    //   this.paidDate = this._dateFormatPipe.transform(paidDate);
    // }
    // if (paidDateTo != 'null') {
    //   this.paidDateTo = this._dateFormatPipe.transform(paidDateTo);
    // }
   
    this.formGroup= this.formBuilder.group({
      'PRIMENUMBER':this.primeFormControl,
      'BRANCHCODE':this.BranchCodeFormControl,
      'BRANCHNAME':this.branchNameControl,
      'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
      'GROUPCODE':this.lastCPExpiryDateFormControl,
      'CPAPPROVALDATE':this.cPApprovalDateFormControl,
      'RENEWALTILL':this.renewalTillExpiryDateFormControl,
     // 'CPAPPROVAL':this.cPApprovalDateFormControl,
     'PENDING':this.noofdaysPendingFormControl,
      'RENEWEDCPR':this.renewedCPReceivedDateFormControl,
      'DEFIOBJ':this.deficiencyObjectionFormControl,
      'BRIEFDESCRIPTION':this.briefDiscriptioneFormControl,
      'RESOLUTIONDATE':this.resolutionDateFormControl,
      'REGION':this.regionFormControl,
      'BS':this.businessSegmentFormControl



          });
    this.loadCustomerDemographicData();
    //this.loadBranches();
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
  ExportTOExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
  get flagFormControl() { 
    return this.formGroup.get('flagFormControl'); 
}
// objectcheck(){
//   if(this.limitfeedingDetails[0].length<1){
//     console.log("the oject is empty")
//   }
// }
  // onSearchChangeBranch(searchValue){
  //   console.log("hi mariaaaaa");
  //   console.log("hi maria",searchValue);
  //  var branchIndex = -1;
  // for(var i =0;i < this.allBranchesDetails.length; i++){
  //   if(this.allBranchesDetails[i].BranchCode == searchValue)
  //  { branchIndex = i;}
  // }
  // this.limitfeedingDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
  //   //this.limitfeedingDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  //   console.log ("hiiiii",this.limitfeedingDetails.branchName);
  //   localStorage.setItem("branchName",this.limitfeedingDetails.branchName);

  // }
  // loadBranches(){
  //   return this.branchService.getCustomerDemographics().subscribe((data:{})=>{
  //     this.allBranchesDetails = data;
  //     console.log(this.allBranchesDetails);
  //     this.selectedBranch = this.allBranchesDetails[0];
  // console.log("hiiiiii",this.selectedBranch);

  //    // onChangebranchCode();
  //   });
  // }
  addCustomerDemographic() {
    var user= localStorage.getItem('userFullName')
    this.limitfeedingDetails.createdBy= user;
    if (this.limitfeedingDetails.object_id == "") {
      var today = new Date();
      if (this.limitfeedingDetails) {
        // var branch_code_id = this.limi
        this.limitfeedingDetails.createdOn =today.toString();
        // this.limitfeedingDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.limitfeedingDetails.createdBy= user;
        this.limitfeedingService.createCustomerDemorgaphics(this.limitfeedingDetails).subscribe((data: {}) => {
          this.limitfeedingDetails.createdBy= user;
    //      this.toastr.success('Credit Proposal Added Successfully');

    this.openSnackBar('Credit Proposal Added  Successfully','Sure');
          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.limitfeedingDetails.modifiedBy= user;
        this.limitfeedingDetails.modifiedOn =today.toString();
        // var branch_code_id = this.limitfeedingDetails.branchCode;
        // this.limitfeedingDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.limitfeedingService.updateCustomerDemorgaphics(this.limitfeedingDetails.primeNumber, this.limitfeedingDetails).subscribe((data: {}) => {

         // this.toastr.success('Credit Proposal Updated Successfully');
         this.openSnackBar('Credit Proposal Updated Successfully','Sure');


        })

        location.reload();

      }



    }

  }
  first: any=[];
second: any=[];
result : any=[];
datee : Date;
f : any=[];
onDefferalPeriod(){
  console.log("hiii maaria beta")
 this.first=this.limitfeedingDetails.renewedCPReceivedDate;
this.f = new Date(this.first)
 console.log (this.first);
  this.second = new Date();
console.log(this.second);
 this.result = Math.round((this.second-this.f)/(1000*60*60*24));
 this.limitfeedingDetails.noofdaysPending = this.result;
 var zero='0'
 if(this.result ==1){
   this.limitfeedingDetails.noofdaysPending = zero
 }
//  // this.fourth =this.defanddeferralDetails.dateOfCompletion;
//  // this.result1 = Math.round((this.fourth-this.first)/(1000*60*60*24));
// //  console.log(this.result1)
// var r = this.result.toLocaleString();
// console.log('hiiii',r)
// this.defanddeferralDetails.deferralPeriod= r;
// console.log(this.result);
// console.log('maria',this.defanddeferralDetails.deferralPeriod);
///return console.log(Math.round((this.second-this.first)/(1000*60*60*24)));

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
  this.customerdemographicService.findOneCustomerDemographics(this.limitfeedingDetails.primeNumber).subscribe((data :{})=>{
    console.log(this.limitfeedingDetails.primeNumber)
    console.log("mariaaaaaaaaaaaaaaaaaaaafatimaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(data);
    var findonedata =data;
    console.log(findonedata)
    console.log("if i get heree")
    if(findonedata[0]==null){
      console.log("hereeee")
     // alert("Please first make customer Demographics against the Prime Number")
    }else{
      console.log("mariaaaaaaaaaaaaaaaaa")
      console.log(findonedata[0].region)
      this.limitfeedingDetails.region=findonedata[0].region
      console.log(this.limitfeedingDetails.region)
      this.limitfeedingDetails.businessSegment=findonedata[0].businessSegment
    }
    
  })
  }
  
  fetchByTab() {

    if (!this.limitfeedingDetails.primeNumber) {

      return this.limitfeedingService.getCustomerDemographic(this.limitfeedingDetails.primeNumber).subscribe((data: {}) => { })

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
  branchCodee;
  branchNamee;
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;
  onkeyup(){

    this.customerdemographicService.findOneCustomerDemographics(this.limitfeedingDetails.primeNumber).subscribe((data :{})=>{
    console.log("mariaaaa",data)
    console.log( Object.keys( data ).length ) ;
    var length = Object.keys( data ).length
    if(length==0){
      alert("Please make customer Demographics of prime Number")
     
    }
    else{
      this.onFocusOut();
    }
     })
  }
  onFocusOut() {

    this.limitfeedingService.findOneCustomerDemographics(this.limitfeedingDetails.primeNumber).subscribe(() => { })
    var data = this.limitfeedingService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.limitfeedingDetails = {

        object_id: data[0]._id,
        primeNumber: data[0].primeNumber,
        businessSegment: data[0].businessSegment,
        region: data[0].region,
        branchCode: data[0].branchCode,
        branchName: data[0].branchName,
        nameOfBorrower: data[0].nameOfBorrower,
        lastCPExpiryDate :data[0].lastCPExpiryDate,
      renewalTillExpiryDate :data[0].renewalTillExpiryDate,
      cPApprovalDate :data[0].cPApprovalDate,
      renewedCPReceivedDate :data[0].renewedCPReceivedDate,
      noofdaysPending :data[0].noofdaysPending,
      deficiencyObjection :data[0].deficiencyObjection,
      briefDiscription :data[0].briefDiscription,
      resolutionDate :data[0].resolutionDate,
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
      console.log(this.limitfeedingDetails);
    }



    else {
      console.log("here")
      console.log(this.limitfeedingDetails.primeNumber)
      this.custService.cust(this.limitfeedingDetails.primeNumber).subscribe((data: {}) => {
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

    
          this.limitfeedingDetails = {

            object_id: "",
            primeNumber: this.limitfeedingDetails.primeNumber,
            businessSegment: "",
            region: "",
            branchCode: this.branchCodee,
            branchName: this.branchNamee,
            nameOfBorrower: this.nameOfBorrower,
            lastCPExpiryDate :"",
          renewalTillExpiryDate :"",
          cPApprovalDate :"",
          renewedCPReceivedDate :"",
          noofdaysPending :"",
          deficiencyObjection :"",
          briefDiscription :"",
          resolutionDate :"",
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

      console.log("hiiiiiiiiii", this.limitfeedingDetails)
    }
  }

  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }

  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.limitfeedingService.getCustomerDemographic(this.limitfeedingDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.limitfeedingService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadCustomerDemographicData() {
   // this.limitfeedingDetails.renewalTillExpiryDate = this._dateFormatPipe.transform(this.limitfeedingDetails.renewalTillExpiryDate);
  console.log(this.limitfeedingDetails.renewalTillExpiryDate);
 return this.limitfeedingService.getCustomerDemographics().subscribe((data: {}) => {

      this.alllimitfeedingDetails = data;
      this.dataSource = new MatTableDataSource(this.alllimitfeedingDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
   isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
 

  
   
  validaions(){
console.log(this.limitfeedingDetails)
    if(!this.limitfeedingDetails.primeNumber){ this.openSnackBar('please enter all the required fields','Sure');}
    
    
    if(!this.limitfeedingDetails.businessSegment){ this.openSnackBar('please enter all the required fields','Sure');}

    else if( !this.limitfeedingDetails.renewalTillExpiryDate){ this.openSnackBar('please enter all the required fields','Sure');} 
    else if (!this.limitfeedingDetails.region){ this.openSnackBar('please enter all the required fields','Sure');}
    //  else if(!this.limitfeedingDetails.renewedCPReceivedDate ){ this.openSnackBar('please enter all the required fields','Sure');}
    // else if  (!this.limitfeedingDetails.resolutionDate){ this.openSnackBar('please enter all the required fields','Sure');}
else if( !this.limitfeedingDetails.nameOfBorrower) { this.openSnackBar('please enter all the required fields','Sure');}
// else if(!this.limitfeedingDetails.deficiencyObjection){ this.openSnackBar('please enter all the required fields','Sure');}
  else   if(!this.limitfeedingDetails.cPApprovalDate){ this.openSnackBar('please enter all the required fields','Sure');}
    else if( !this.limitfeedingDetails.briefDiscription){ this.openSnackBar('please enter all the required fields','Sure');}
    // else  if(!this.limitfeedingDetails.resolutionDate){
    //     this.openSnackBar('11please enter all the required fields','Sure');
  
    // }
  
  // if(this.limitfeedingDetails.accountNo.length<14){
  //   this.openSnackBar('please enter account number of 14 digits','Sure');
    
  //   }
    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    // if(this.limitfeedingDetails.primeNumber.length<6){
    //   this.openSnackBar('please enter primeNumber of 6 digits','Sure');
      
    //   }
    return 0;
  }
  
  editCustomerDemographic(limitfeedingData) {
    var user= localStorage.getItem('userFullName')
    this.limitfeedingDetails.modifiedBy= user;
    window.confirm('Are you sure, you want to edit?')
    // var branch_code_id = this.limitfeedingDetails.branchCode;
    // this.limitfeedingDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
    this.disable();
    this.limitfeedingDetails = limitfeedingData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.limitfeedingDetails.primeNumber = "";
    this.limitfeedingDetails.branchCode = "";
    this.limitfeedingDetails.businessSegment = "";
    this.limitfeedingDetails.region = "";
    this.limitfeedingDetails.branchCode = "";
    this.limitfeedingDetails.branchName = "";
    this.limitfeedingDetails.nameOfBorrower="";
    this.limitfeedingDetails.lastCPExpiryDate ="",
    this.limitfeedingDetails.renewalTillExpiryDate ="",
    this.limitfeedingDetails.cPApprovalDate ="",
    this.limitfeedingDetails.renewedCPReceivedDate ="",
    this.limitfeedingDetails.noofdaysPending ="",
    this.limitfeedingDetails.deficiencyObjection ="",
    this.limitfeedingDetails.briefDiscription ="",
    this.limitfeedingDetails.resolutionDate ="",
    this.limitfeedingDetails.createdBy = "";

    this.limitfeedingDetails.createdOn= "";
    this.limitfeedingDetails.modifiedBy= "";
    this.limitfeedingDetails.modifiedOn = "";
    this.limitfeedingDetails.deletedBy= "";
     this.limitfeedingDetails.deletedOn= "";


    // this.limitfeedingDetails.dataStatus = "";

    // this.limitfeedingDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.limitfeedingService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.alllimitfeedingDetails = this.inputdata;

      this.limitfeedingService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });

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

  deleteCustomer(primeNumber) {
     if (window.confirm('Are you sure, you want to delete?')) {
      this.limitfeedingService.deleteCustomersdemographic(primeNumber).subscribe(data => {
        var user= localStorage.getItem('userFullName')
        this.limitfeedingDetails.deletedBy = user;
        var today = new Date();
        this.limitfeedingDetails.createdOn =today.toString();
       //this.toastr.success('Credit ProposalSuccessfully');
       this.openSnackBar('Credit Proposal  deleted  Successfully','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }


}
