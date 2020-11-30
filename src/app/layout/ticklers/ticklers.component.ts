import { DatePipe } from '@angular/common';
//i/port{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { NgForm } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InsuranceTicklerService} from './../../_services/insuranceTickler/insuranceTickler.service';
import { format } from 'url';
import * as XLSX from 'xlsx';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { insuranceTickler } from 'src/app/_models/insuranceTickler.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import { formatDate } from '@angular/common';
import {BranchService} from '../../_services/branches/branches.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
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
interface ppr {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ticklers',
  templateUrl: './ticklers.component.html',
  styleUrls: ['./ticklers.component.scss'],
 // providers: [DateFormatPipe]
})
export class TicklersComponent implements OnInit {
  isDisabled: boolean = false;
    business: businessSegment[] = [
      { value: 'Corporate', viewValue: 'Corporate' },
      { value: 'Commercial', viewValue: 'Commercial' },
      { value: 'FI', viewValue: 'FI' },
      { value: 'Islamic', viewValue: 'Islamic' },
      { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
      { value: 'Retail', viewValue: 'Retail' },
      { value: 'Structured Credit', viewValue: 'Structured Credit' },
      ];

  PPR: ppr[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
 primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);




  nameofInsuranceCoFormControl = new FormControl('', [Validators.required]);
  hBLShareFormControl = new FormControl('', [ Validators.required]);
  totalSumInsuredFormControl = new FormControl('', [Validators.required]);
 // nameofInsuranceCoFormControl = new FormControl('', [ Validators.required]);
  policyNoFormControl = new FormControl('', [Validators.required]);
  nameofCoInsuranceFormControl = new FormControl('', [ Validators.required]);

  hBLCoInsuranceAmountFormControl = new FormControl('', [Validators.required]);
  stocksHypoFormControl = new FormControl('', [ Validators.required]);
 // pPRStausFormControl = new FormControl('', [Validators.required]);
  stocksPledgeFormControl = new FormControl('', [ Validators.required]);
  buildingFormControl = new FormControl('', [Validators.required]);

  machineryFormControl = new FormControl('', [ Validators.required]);

  otherFormControl = new FormControl('', [Validators.required]);
  expiryDatesFormControl = new FormControl('', [ Validators.required]);
  pPRStausFormControl = new FormControl('', [Validators.required]);
  pPRUptillDateFormControl = new FormControl('', [ Validators.required]);
  nextPremiumDueDateFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','nameofInsuranceCo',
'policyNo','totalSumInsured','hBLShare','nameofCoInsurance','hBLCoInsuranceAmount','stocksHypo','stocksPledge','building','machinery'
, 'other', 'expiryDate', 'pPRStaus', 'pPRUptillDate','nextPremiumDueDate','createdBy','modifiedBy'];
dataSource = new MatTableDataSource();
places: Array<any> = [];

  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
  branchName:any;
  //tableprimenumber: number;
  allBranchesDetails:any=[];
  //selectedBranch :allBranchesDetails[];
  selectedBranch: any ;

  BranchName: string;
  tableprimeNumber: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  previousPage: any;

  totalRec: number;
  expiryDate :any;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];

  allinsuranceTicklerDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////



  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;


  //ppDD :any;

  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() insuranceTicklerDetails = {

    object_id: "",

    primeNumber: "",

    businessSegment: "",
    region: "",

    branchCode:"",
    branchName: "",

    nameOfBorrower: "",

    nameofInsuranceCo: "",

    policyNo: "",

    totalSumInsured: "",

    hBLShare: "",

    nameofCoInsurance: "",

    hBLCoInsuranceAmount: "",

    stocksHypo: "",stocksPledge: "",building: "",machinery: "", other: "", expiryDate: "", pPRStaus: "", pPRUptillDate:"", nextPremiumDueDate: "",
    dataStatus: "",

    createdBy : "",

    modifiedBy : "",
    active:""


  };
  ppDD :any;
 pp:DatePipe = new DatePipe('en-US')
  datePipeFr: DatePipe = new DatePipe('fr-FR')
  constructor(
    @Inject(LOCALE_ID) private _locale: string,
    private formBuilder: FormBuilder,
    private userIdle: UserIdleService,
    private insuranceTicklerService: InsuranceTicklerService,
    public actRoute: ActivatedRoute,
    private custService:CustService,
   // private toastr: ToastrService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private branchService : BranchService,
    private restservice: RestService,
private customerdemographicService:CustomerDemographicService

  ) {

}
// onTransform(){
//   this.ppDD= this.insuranceTicklerDetails.pPRUptillDate;
//   console.log (this.ppDD);
//   console.log(this.ppDD.transform(new Date(), 'dd MMMM')); // 21 September

// }

  ngOnInit(): void {
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
  
 
   // this.onTransform();
   this.formGroup= this.formBuilder.group({
     'PRIMEFORM':this.primeFormControl,
  'BRANCHCODE':this.BranchCodeFormControl ,
  'BRANCHNAME':this.branchNameControl ,
  'NAMEOFBORROWER':this.nameOfBorrowerFormControl ,




  'NAMEOFINSURANCE':this.nameofInsuranceCoFormControl ,
  'HBLSHARE':this.hBLShareFormControl ,
  'TOTALSUM':this.totalSumInsuredFormControl,

   'POLICYNO':this.policyNoFormControl  ,
   'NAMEOFCOINSURANCE':this.nameofCoInsuranceFormControl ,
   'HBLCOINSURANCE':this.hBLCoInsuranceAmountFormControl ,
   'STOCKSHYPO':this.stocksHypoFormControl ,
   // pPRStausFormControl = new FormControl('', [Validators.required]);
   'STOCKEPLEDGE':this.stocksPledgeFormControl ,
   'BUILDINGFORM':this.buildingFormControl ,
   'MACHINERY':this.machineryFormControl ,
   'OTHER':this.otherFormControl,
   'EXPIRY':this.expiryDatesFormControl ,
   'PPR':this.pPRStausFormControl,
   'PPTYILLDATE':this.pPRUptillDateFormControl,
   'NEXTPREMIUM':this.nextPremiumDueDateFormControl,
   'REGION':this.regionFormControl,
   'BS':this.businessSegmentFormControl,
'BRANCNAME':this.branchNameControl,

        });
    this.loadCustomerDemographicData();
    //.loadBranches();
    console.log("customer Demographics");
    console.log(this.restservice.getRoleData());
    console.log(localStorage.getItem('Edit'));
    console.log(localStorage.getItem('View'));
    console.log(localStorage.getItem('Delete'));


//this.onDate();


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

//  year:any;
//  month:any;
//  day:any;
// onDate(){
// this.ppDD=this.insuranceTicklerDetails.pPRUptillDate;
//  //return this.ppDD;
//  console.log(this.ppDD);
// //this.ppDD= Date.Now.ToUniversalTime().ToString("O")
// console.log(this.ppDD.substring(0, 4))
// console.log(this.ppDD.substring(5,7))
// console.log(this.ppDD.substring(8,10))
// this.year =this.ppDD.substring(0, 4);
// this.month =this.ppDD.substring(5,7);
// this.day= this.ppDD.substring(8,10);
// //this.ppDD = moment().format('DD MM YYYY')
// this.ppDD = this.day +"-" +this.month +"-"+ this.year;
// console.log(this.ppDD);
// this.insuranceTicklerDetails.pPRUptillDate= this.ppDD;
// console.log (this.insuranceTicklerDetails.pPRUptillDate);
// }

// fromJsonDate(jDate): string {
//   const bDate: Date = new Date(jDate);
//   return bDate.toISOString().substring(0, 10);  //Ignore time
// }
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 9000,
  });
  console.log("this")
;
}


findOne(){
  this.customerdemographicService.findOneCustomerDemographics(this.insuranceTicklerDetails.primeNumber).subscribe((data :{})=>{
    console.log(this.insuranceTicklerDetails.primeNumber)
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
      this.insuranceTicklerDetails.region=findonedata[0].region
      console.log(this.insuranceTicklerDetails.region)
      this.insuranceTicklerDetails.businessSegment=findonedata[0].businessSegment
    }
    
  })
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
validaions(){

//   if(!this.insuranceTicklerDetails.primeNumber ||!this.insuranceTicklerDetails.businessSegment||
//     !this.insuranceTicklerDetails.nameofCoInsurance || !this.insuranceTicklerDetails.region
//     || !this.insuranceTicklerDetails.nameofInsuranceCo || !this.insuranceTicklerDetails.policyNo
//     || !this.insuranceTicklerDetails.nextPremiumDueDate || this.insuranceTicklerDetails.pPRUptillDate
//     ||this.insuranceTicklerDetails.pPRStaus|| this.insuranceTicklerDetails.totalSumInsured||
//     this.insuranceTicklerDetails.hBLCoInsuranceAmount||this.insuranceTicklerDetails.hBLShare||
//     this.insuranceTicklerDetails.machinery||this.insuranceTicklerDetails.stocksHypo||
//     this.insuranceTicklerDetails.stocksPledge||this.insuranceTicklerDetails.other||this.insuranceTicklerDetails.building){
//       this.openSnackBar('please enter all the required fields','Sure');

//   }
// if(this.insuranceTicklerDetails.primeNumber.length<6){
// this.openSnackBar('please enter primeNumber of 6 digits','Sure');

// }
//   else{
//     this.addCustomerDemographic();
//     console.log('hiii')
//     return 0;
//   };
 
//   return 0;
if(!this.insuranceTicklerDetails.primeNumber){
  this.openSnackBar('please enter all the required fields','Sure');

 }
 else if(!this.insuranceTicklerDetails.hBLShare){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.insuranceTicklerDetails.hBLCoInsuranceAmount){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.insuranceTicklerDetails.nameofInsuranceCo){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
   else if(!this.insuranceTicklerDetails.nameofInsuranceCo){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
   else if(!this.insuranceTicklerDetails.policyNo){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
   else if(!this.insuranceTicklerDetails.totalSumInsured){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  else if(!this.insuranceTicklerDetails.businessSegment){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.insuranceTicklerDetails.region){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.insuranceTicklerDetails.stocksPledge){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
   else if(!this.insuranceTicklerDetails.stocksHypo){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  
   else if(!this.insuranceTicklerDetails.building){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
   
  
   else if(!this.insuranceTicklerDetails.machinery){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  
   else if(!this.insuranceTicklerDetails.other){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  
   else if(!this.insuranceTicklerDetails.expiryDate){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  
   else if(!this.insuranceTicklerDetails.pPRUptillDate){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
   else if(!this.insuranceTicklerDetails.pPRStaus){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  
   else if(!this.insuranceTicklerDetails.nextPremiumDueDate){
    this.openSnackBar('please enter all the required fields','Sure');
 
   }
  
   

 else{
   this.addCustomerDemographic();
   console.log('hiii')
   return 0;
 };
 if(this.insuranceTicklerDetails.primeNumber.length<6){
    this.openSnackBar('please enter primeNumber of 6 digits','Sure');
  
   }
}



onSearchChangeBranch(searchValue){
  console.log("hi mariaaaaa");
  console.log("hi maria",searchValue);
  var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.insuranceTicklerDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
 // this.insuranceTicklerDetails.branchName=this.allBranchesDetails[searchValue].BranchName
  //this.insuranceTicklerDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.insuranceTicklerDetails.branchName);
  localStorage.setItem("branchName",this.insuranceTicklerDetails.branchName);
    // return this.branchService.getCustomerDemographic(this.branchDetails.BranchCode).subscribe((data: {}) => {

    //   this.inputdata = data

    //   console.log(this.inputdata);

    //   this.branchService.setCustomerDemographicData(data);
    // });
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
  addCustomerDemographic() {
    var user= localStorage.getItem('userFullName')
    this.insuranceTicklerDetails.createdBy= user;
    console.log(this.insuranceTicklerDetails);

    if (this.insuranceTicklerDetails.object_id == "") {
      if (this.insuranceTicklerDetails) {
        this.insuranceTicklerDetails.createdBy= user;
      //    var branch_code_id = this.insuranceTicklerDetails.branchCode;
      // this.insuranceTicklerDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.insuranceTicklerService.createCustomerDemorgaphics(this.insuranceTicklerDetails).subscribe((data: {}) => {
          this.insuranceTicklerDetails.createdBy= user;
        //  this.toastr.success('Customer Added Successfully');
        this.openSnackBar('Insurance Tickler Added Successfully','Sure');

          this.clearform();
          this.loadCustomerDemographicData();
          this.insuranceTicklerDetails.expiryDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
          this.expiryDate=this.insuranceTicklerDetails.expiryDate;
          console.log("hiii",this.expiryDate)
          console.log("hi maria date",this.insuranceTicklerDetails.expiryDate);

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.insuranceTicklerDetails.modifiedBy= user;
      //  var branch_code_id = this.insuranceTicklerDetails.branchCode;
      // this.insuranceTicklerDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.insuranceTicklerService.updateCustomerDemorgaphics(this.insuranceTicklerDetails.primeNumber, this.insuranceTicklerDetails).subscribe((data: {}) => {

         // this.toastr.success('Customer Updated Successfully');

         this.openSnackBar('Insurance Tickler Updated Successfully','Sure');

        })

        location.reload();

      }



    }

  }

  fetchByTab() {

    if (!this.insuranceTicklerDetails.primeNumber) {

      return this.insuranceTicklerService.getCustomerDemographic(this.insuranceTicklerDetails.primeNumber).subscribe((data: {}) => { })

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
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;

  branchNamee;

  branchCodee;
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  onFocusOut() {




    this.insuranceTicklerService.getCustomerDemographic(this.insuranceTicklerDetails.primeNumber).subscribe(() => { })
    var data = this.insuranceTicklerService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.insuranceTicklerDetails = {

      object_id: data[0]._id,

      primeNumber: data[0].primeNumber,

      businessSegment: data[0].businessSegment,

      region: data[0].region,

      branchCode: data[0].branchCode,

      branchName: data[0].branchName,

      nameOfBorrower: data[0].nameOfBorrower,

      nameofInsuranceCo: data[0].nameofInsuranceCo,

      policyNo: data[0].policyNo,



     totalSumInsured: data[0].totalSumInsured,



      hBLShare: data[0].hBLShare,

      nameofCoInsurance: data[0].nameofCoInsurance,

      //deferralEffective: data[0].deferralEffective,

      hBLCoInsuranceAmount: data[0].hBLCoInsuranceAmount,

      stocksHypo: data[0].stocksHypo,

      stocksPledge: data[0].stocksPledge,

      building: data[0].building,

      machinery: data[0].machinery,

      other: data[0].other,
      expiryDate: data[0].expiryDate,

      //temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,

      pPRStaus: data[0].pPRStaus,

      pPRUptillDate: data[0].pPRUptillDate,

      nextPremiumDueDate: data[0].nextPremiumDueDate,

      dataStatus: data[0].dataStatus,

      createdBy: data[0].createdBy,

      modifiedBy: data[0].modifiedBy,


      active: data[0].active





    };
      console.log(this.insuranceTicklerDetails);
    }



    else {
      console.log("here")
      console.log(this.insuranceTicklerDetails.primeNumber)
      this.custService.cust(this.insuranceTicklerDetails.primeNumber).subscribe((data: {}) => {
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

    
          this.insuranceTicklerDetails = {

     
      object_id: "",
      primeNumber: this.insuranceTicklerDetails.primeNumber,


      businessSegment:  "",

      region:  "",

      branchCode: this.branchCodee,
      branchName: this.branchNamee,

      nameOfBorrower: this.nameOfBorrower,

      nameofInsuranceCo:  "",

      policyNo: "",



     totalSumInsured:  "",



      hBLShare: "",

      nameofCoInsurance:  "",

      //deferralEffective: data[0].deferralEffective,

      hBLCoInsuranceAmount:  "",

      stocksHypo: "",

      stocksPledge:  "",

      building:  "",

      machinery:  "",

      other:  "",
      expiryDate:  "",

      //temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,

      pPRStaus:  "",

      pPRUptillDate:  "",

      nextPremiumDueDate:  "",

      dataStatus:  "",

      createdBy:  "",

      modifiedBy:  "",


      active:  "",


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

      console.log("hiiiiiiiiii", this.insuranceTicklerDetails)
    }



    // console.log("Inside Focus");

    // var data = this.insuranceTicklerService.getCustomerDemographicData()

    // console.log('data ka zero index : ', data[0]);

    // this.insuranceTicklerDetails = {

    //   object_id: data[0]._id,

    //   primeNumber: data[0].primeNumber,

    //   businessSegment: data[0].businessSegment,

    //   region: data[0].region,

    //   branchCode: data[0].branchCode,

    //   branchName: data[0].branchName,

    //   nameOfBorrower: data[0].nameOfBorrower,

    //   nameofInsuranceCo: data[0].nameofInsuranceCo,

    //   policyNo: data[0].policyNo,



    //  totalSumInsured: data[0].totalSumInsured,



    //   hBLShare: data[0].hBLShare,

    //   nameofCoInsurance: data[0].nameofCoInsurance,

    //   //deferralEffective: data[0].deferralEffective,

    //   hBLCoInsuranceAmount: data[0].hBLCoInsuranceAmount,

    //   stocksHypo: data[0].stocksHypo,

    //   stocksPledge: data[0].stocksPledge,

    //   building: data[0].building,

    //   machinery: data[0].machinery,

    //   other: data[0].other,
    //   expiryDate: data[0].expiryDate,

    //   //temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,

    //   pPRStaus: data[0].pPRStaus,

    //   pPRUptillDate: data[0].pPRUptillDate,

    //   nextPremiumDueDate: data[0].nextPremiumDueDate,

    //   dataStatus: data[0].dataStatus,

    //   createdBy: data[0].createdBy,

    //   modifiedBy: data[0].modifiedBy,


    //   active: data[0].active



    // };

  }



  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.insuranceTicklerService.getCustomerDemographic(this.insuranceTicklerDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.insuranceTicklerService.setCustomerDemographicData(data);

      //  this.restservice.setinsuranceTicklerData(data);



    });



  }
  ExportTOExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }


  loadCustomerDemographicData() {
 return this.insuranceTicklerService.getCustomerDemographics().subscribe((data: {}) => {
      this.allinsuranceTicklerDetails = data;
      this.dataSource = new MatTableDataSource(this.allinsuranceTicklerDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
  disable() {
    this.isDisabled = true
  }
  editCustomerDemographic(insuranceTicklerData) {
    window.confirm('Are you sure, you want to edit?')
    this.disable();
    this.insuranceTicklerDetails = insuranceTicklerData;
   // this.onDate();


    this.VisiblitypNumb = true

  }



  clearform() {

    this.insuranceTicklerDetails.primeNumber= "",

    this.insuranceTicklerDetails.businessSegment= "",

    this.insuranceTicklerDetails.region= "",

    this.insuranceTicklerDetails.branchCode= "",

    this.insuranceTicklerDetails.branchName= "",

    this.insuranceTicklerDetails.nameOfBorrower= "",

    this.insuranceTicklerDetails.nameofInsuranceCo= "",

    this.insuranceTicklerDetails.policyNo= "",

    this.insuranceTicklerDetails.totalSumInsured= "",

    this.insuranceTicklerDetails.hBLShare= "",

    this.insuranceTicklerDetails.nameofCoInsurance= "",

    this.insuranceTicklerDetails.hBLCoInsuranceAmount= "",

    this.insuranceTicklerDetails.stocksHypo= "",

    this.insuranceTicklerDetails.stocksPledge= "",

    this.insuranceTicklerDetails.building= "",

    this.insuranceTicklerDetails.machinery= "",

    this.insuranceTicklerDetails.other= "",

    this.insuranceTicklerDetails.expiryDate= "",

    this.insuranceTicklerDetails.pPRStaus= "",

    this.insuranceTicklerDetails.pPRUptillDate= "",

    this.insuranceTicklerDetails.nextPremiumDueDate= "",

    this.insuranceTicklerDetails.dataStatus= "",

    this.insuranceTicklerDetails.createdBy= "",

    this.insuranceTicklerDetails.modifiedBy= ""


  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.insuranceTicklerService.getCustomerDemographic(this.tableprimeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allinsuranceTicklerDetails = this.inputdata;

      this.insuranceTicklerService.setCustomerDemographicData(data);

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
      this.insuranceTicklerService.deleteCustomersdemographic(primeNumber).subscribe(data => {
       //this.toastr.success('Customer deleted Successfully');
       this.openSnackBar('Insurance Tickler deleted Successfully','Sure');

        this.loadCustomerDemographicData();

      })

    }

  }
}
