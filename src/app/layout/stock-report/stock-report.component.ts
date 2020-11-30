import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stockReportService } from '../../_services/stockReport/stockReport.service';
import { format } from 'url';
import * as XLSX from 'xlsx';
import { UserIdleService } from 'angular-user-idle';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { stockReport } from 'src/app/_models/stockReportTickler.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {BranchService} from '../../_services/branches/branches.service';
import {MatSnackBar} from '@angular/material/snack-bar';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
export interface PeriodicElement {
  primeNumber: string;

}
interface stock {
  value: string;
  viewValue: string;
}

interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface dateformat {
  value: string;
  viewValue: string;
}
interface year{
  value: string;
  viewValue: string;

}
@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss'],
 // providers: [DateFormatPipe]
})
export class StockReportComponent implements OnInit {
  isDisabled: boolean = false;
// annually :boolean =false;
//   monthly :boolean =false;
//   quaterly:boolean =false;
//   semianually: boolean =false;

  business: businessSegment[] = [
    { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Commercial', viewValue: 'Commercial' },
    { value: 'FI', viewValue: 'FI' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Retail', viewValue: 'Retail' },
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
  ];

  stock: stock[] = [
   
    {value: 'Annualy', viewValue: 'Annualy'},
    {value: 'Monthly', viewValue: 'Monthly'},
    {value: 'Quaterly', viewValue: 'Quaterly'},
    {value: 'SemiAnually', viewValue: 'SemiAnually'},
  ];

  dateformat: dateformat[] = [
    {value: '	Received', viewValue: 'Received'},
    {value: 	'Not Applicable', viewValue:'Not Applicable'},
      {value: 'Deferral In-place', viewValue:'Deferral In-place' },
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
  year: year[] = [
        { value: '	2017'	, viewValue: '2017	' },
    { value: '	2018'	, viewValue: '	2018	' },
    { value: '	2019'	, viewValue: '		2019	' },
    { value: '	2020'	, viewValue: '		2020	' },
    { value: '	2021'	, viewValue: '		2021	' },
    { value: '	2022'	, viewValue: '		2022	' },
    { value: '	2023'	, viewValue: '		2023	' },
    { value: '	2024'	, viewValue: '		2024	' },
    { value: '	2025'	, viewValue: '		2025	' },
    { value: '	2026'	, viewValue: '		2026	' },
    { value: '	2027'	, viewValue: '		2027	' },
    { value: '	2028'	, viewValue: '		2028	' },
    { value: '	2029'	, viewValue: '		2029	' },
    { value: '	2030'	, viewValue: '		2030	' },
    { value: '	2031'	, viewValue: '		2031	' },
    { value: '	2032'	, viewValue: '		2032	' },
    { value: '	2033'	, viewValue: '		2033	' },
    { value: '	2034'	, viewValue: '		2034	' },
    { value: '	2035'	, viewValue: '		2035	' },
    { value: '	2036'	, viewValue: '		2036	' },
    { value: '	2037'	, viewValue: '		2037	' },
    { value: '	2038'	, viewValue: '		2038	' },
    { value: '	2039'	, viewValue: '		2039	' },
    { value: '	2040'	, viewValue: '		2040	' },
    { value: '	2041'	, viewValue: '		2041	' },
    { value: '	2042'	, viewValue: '		2042	' },
    { value: '	2043'	, viewValue: '		2043	' },
    { value: '	2044'	, viewValue: '		2044	' },
    { value: '	2045'	, viewValue: '		2045	' },
    { value: '	2046'	, viewValue: '		2046	' },
    { value: '	2047'	, viewValue: '		2047	' },
    { value: '	2048'	, viewValue: '		2048	' },
    { value: '	2049'	, viewValue: '		2049	' },
    { value: '	2050'	, viewValue: '		2050	' },

    
    ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
 primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);




  rMCreditHubFormControl = new FormControl('', [Validators.required]);
  limitFormControl = new FormControl('', [ Validators.required]);
  stockReportCycleFormControl = new FormControl('', [ Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
  janFormControl = new FormControl('', [ Validators.required]);
  febFormControl= new FormControl('', [ Validators.required]);
  yearFormControl= new FormControl('', [ Validators.required]);
//
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','rMCreditHub','stockReportCycle',
'limit','yearly','st1quater',
'nd2qauter',
'rd3quater',
'th4quater',
'ndsemianually',
'stsemianually','jan','feb','mar','apr','may','june','july','aug'
, 'sep', 'oct', 'nov', 'dec','year','remarks','createdBy','createdOn','modifiedBy','modifiedOn'];
dataSource = new MatTableDataSource();
places: Array<any> = [];
 ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
 branchName:any;
 //tableprimenumber: number;
 allBranchesDetails:any=[];
 //selectedBranch :allBranchesDetails[];
 selectedBranch: any ;

 BranchName: string;
 tableprimenumber: number;

 ///////////////////////////////////Pagination Veriables//////////////////////////////////

 pageSize = 5;

 page: any = 1;

 previousPage: any;

 totalRec: number;

 //////////////////////////////////Data Veriables////////////////////////////////////////

 inputdata: any = [];

 allstockReportDetails: any = [];

 //////////////////////////////////Visiblity Veriables///////////////////////////////////



 public VisiblitypNumb: boolean = false;

 public hideEditButton: boolean = false;

 public hideDeleteButton: boolean = false;

 public hideForm: boolean = false;

 public hideDataTable: boolean = false;




 @Input() branchDetails = {
  object_id: "",
  BranchName: "",
  BranchCode: ""

};

 @ViewChild('TABLE', { static: false }) table: ElementRef;
 selectedValue = '0';
 @Input() stockReportDetails = {

   object_id: "",

   primeNumber: "",
   businessSegment: "",
   region: "",
   branchCode: "",
   branchName: "",
   nameOfBorrower: "",
   rMCreditHub: "",
   limit: "",
   stockReportCycle: "",
   jan: "",
   feb: "",
   mar: "",
   apr: "",
   may:"",
   june:"",
   july:"",
   aug:"",
   sep:"",
   oct:"",
   nov:"",
   dec:"",
   dataStatus: "",
   createdBy : "",

   createdOn: "",
    modifiedBy:   "",
    modifiedOn :   "",
    deletedBy:  "",
    deletedOn: "",

   year:"",
   active: "",
   yearly :  "",
   st1quater :  "",
   nd2qauter:  "",
   rd3quater: "",
   th4quater: "",
stsemianually:"",
ndsemianually:"",
  remarks:"",
 };

 constructor(
  private custService:CustService,
  private customerdemographicService:CustomerDemographicService,
   private stockReportService: stockReportService,
   private formBuilder: FormBuilder,
   private userIdle: UserIdleService,
   public actRoute: ActivatedRoute,
   private _snackBar: MatSnackBar,
   private branchService : BranchService,
   //private toastr: ToastrService,

   public router: Router,
   //private _dateFormatPipe: DateFormatPipe,
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
 'BRANCHCODE':this.BranchCodeFormControl ,
 'BRANCHNAME':this.branchNameControl ,
 'NAMEOFBORROWER':this.nameOfBorrowerFormControl ,




 'RMCREDITHUB':this.rMCreditHubFormControl ,
 'LIMIT':this.limitFormControl ,
 'STOCKREPORT':this.stockReportCycleFormControl,
 'REGION':this.regionFormControl,
 'BS':this.businessSegmentFormControl,
 'JAN':this.janFormControl,
 'FEB':this.febFormControl,
'year': this.yearFormControl
       });
   this.loadCustomerDemographicData();
 //  this.loadBranches();
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
selectedType = 'opentype';

onChange(searchValue) {
  this.selectedType = searchValue;
  console.log(this.selectedType)
}
oncycle(){
  // if(this.stockReportDetails.stockReportCycle=="Annually"){
  //   this.annually == true;
  // }
}
findOne(){
  this.customerdemographicService.findOneCustomerDemographics(this.stockReportDetails.primeNumber).subscribe((data :{})=>{
    console.log(this.stockReportDetails.primeNumber)
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
      this.stockReportDetails.region=findonedata[0].region
      console.log(this.stockReportDetails.region)
      this.stockReportDetails.businessSegment=findonedata[0].businessSegment
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
disable() {
  this.isDisabled = true
}
onSearchChangeBranch(searchValue){
  console.log("hi mariaaaaa");
  console.log("hi maria",searchValue);
  var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.stockReportDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
  //this.stockReportDetails.branchName=this.allBranchesDetails[searchValue].BranchName
  //this.stockReportDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.stockReportDetails.branchName);
  localStorage.setItem("branchName",this.stockReportDetails.branchName);
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
public isViewable : boolean = false;
public toggle(): void { this.isViewable = true;
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
 // this.stockReportDetails.jan = this._dateFormatPipe.transform(this.stockReportDetails.jan);
  // this.stockReportDetails.feb = this._dateFormatPipe.transform(this.stockReportDetails.feb);
  // this.stockReportDetails.mar = this._dateFormatPipe.transform(this.stockReportDetails.mar);
  // this.stockReportDetails.apr = this._dateFormatPipe.transform(this.stockReportDetails.apr);

  // this.stockReportDetails.may = this._dateFormatPipe.transform(this.stockReportDetails.may);
  // this.stockReportDetails.june = this._dateFormatPipe.transform(this.stockReportDetails.june);
  // this.stockReportDetails.july = this._dateFormatPipe.transform(this.stockReportDetails.july);
  // this.stockReportDetails.aug = this._dateFormatPipe.transform(this.stockReportDetails.aug);

  // this.stockReportDetails.sep = this._dateFormatPipe.transform(this.stockReportDetails.sep);
  // this.stockReportDetails.oct = this._dateFormatPipe.transform(this.stockReportDetails.oct);
  // this.stockReportDetails.nov = this._dateFormatPipe.transform(this.stockReportDetails.nov);
  // this.stockReportDetails.dec = this._dateFormatPipe.transform(this.stockReportDetails.dec);
  var user= localStorage.getItem('userFullName')
  this.stockReportDetails.createdBy= user;
  var today = new Date();
   console.log(this.stockReportDetails);

   if (this.stockReportDetails.object_id == "") {
    this.stockReportDetails.createdBy= user;
    this.stockReportDetails.createdOn =today.toString();
    console.log(this.stockReportDetails.createdOn)
     if (this.stockReportDetails) {
      // var branch_code_id = this.stockReportDetails.branchCode;
      // this.stockReportDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
      
      
       this.stockReportService.createCustomerDemorgaphics(this.stockReportDetails).subscribe((data: {}) => {
        this.stockReportDetails.createdBy= user;
        // this.toastr.success('Stock Report Added Successfully');
        this.openSnackBar('Stock Report Added Successfully','Sure');
         this.clearform();

         this.loadCustomerDemographicData();

       })

     }

   }

   else {

     if (window.confirm('Are you sure, you want to update?')) {
      this.stockReportDetails.modifiedBy= user;
      this.stockReportDetails.modifiedOn =today.toString();
//  var branch_code_id = this.stockReportDetails.branchCode;
//       this.stockReportDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;

       this.stockReportService.updateCustomerDemorgaphics(this.stockReportDetails.primeNumber, this.stockReportDetails).subscribe((data: {}) => {

       //  this.toastr.success('Stock Report Updated Successfully');



       })

       location.reload();

     }



   }

 }

 fetchByTab() {

   if (!this.stockReportDetails.primeNumber) {

     return this.stockReportService.getCustomerDemographic(this.stockReportDetails.primeNumber).subscribe((data: {}) => { })

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
  onkeyup(){

    this.stockReportService.findOneCustomerDemographics(this.stockReportDetails.primeNumber).subscribe((data :{})=>{
    console.log("mariaaaa",data)
    console.log( Object.keys( data ).length ) ;
    var length = Object.keys( data).length
    if(length==1){
      alert("Prime Number already exist")
     
    }
    else{
      this.onFocusOut();
    }
    })
  }
 onFocusOut() {
  this.stockReportService.findOneCustomerDemographics(this.stockReportDetails.primeNumber).subscribe(() => { })
  var data = this.stockReportService.getCustomerDemographicData()


  if (data > 0) {
    console.log("caddddddd")
    // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
    //var data = this.customerdemographicService.getCustomerDemographicData()
    // console.log('data ka zero index : ', data[0]);

    this.stockReportDetails = {

     object_id: data[0]._id,
     primeNumber: data[0].primeNumber,
     businessSegment: data[0].businessSegment,
     region: data[0].region,
     branchCode: data[0].branchCode,
     branchName: data[0].branchName,
     nameOfBorrower: data[0].nameOfBorrower,
     rMCreditHub: data[0].rMCreditHub,
     limit:data[0].limit,
     stockReportCycle: data[0].stockReportCycle,
     jan:data[0].jan,
     feb: data[0].feb,
     mar: data[0].mar,
     apr: data[0].apr,
     may:data[0].may,
     june:data[0].june,
     july:data[0].july,
     aug:data[0].aug,
     sep:data[0].sep,
     oct:data[0].oct,
     nov:data[0].nov,
     dec:data[0].dec,
     dataStatus: data[0].dataStatus,
     createdBy:data[0].createdBy,
       modifiedBy: data[0].modifiedBy,
      // createdBy : "",
 
   createdOn: data[0].createdOn,
   // modifiedBy:   data[0].modifiedBy,
    modifiedOn :   data[0].modifiedOn,
    deletedBy: data[0].deletedBy,
    deletedOn: data[0].deletedOn,
     active: data[0].active,
     year: data[0].year,
     yearly :  data[0].yearly,
     st1quater : data[0].st1quater,
     nd2qauter:   data[0].nd2qauter,
     rd3quater: data[0].rd3quater,
     th4quater:  data[0].th4quater,
     stsemianually: data[0].stsemianually,
     ndsemianually:data[0].ndsemianually,
     remarks:data[0].remarks
  };
    console.log(this.stockReportDetails);
  }



  else {
    console.log("here")
    console.log(this.stockReportDetails.primeNumber)
    this.custService.cust(this.stockReportDetails.primeNumber).subscribe((data: {}) => {
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

  
        this.stockReportDetails = {

         
    object_id: "",
    primeNumber: this.stockReportDetails.primeNumber,
    
 
     businessSegment: "",
     region: "",
     branchCode: this.branchCodee,
     branchName: this.branchNamee,
     nameOfBorrower: this.nameOfBorrower,
     rMCreditHub: "",
     limit:this.totalLimit,
     stockReportCycle: "",
     jan:"",
     feb: "",
     mar: "",
     apr: "",
     may:"",
     june:"",
     july:"",
     aug:"",
     sep:"",
     oct:"",
     nov:"",
     dec:"",
     dataStatus: "",
     createdBy : "",

     createdOn:"",
      modifiedBy:  "",
      modifiedOn : "",
      deletedBy: "",
      deletedOn:"",
        
     active: "",
year:"",
yearly :  "",
st1quater : "",
nd2qauter:  "",
rd3quater:"",
th4quater: "",
ndsemianually:"",
stsemianually:"",
remarks:""
    
  
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

    console.log("hiiiiiiiiii", this.stockReportDetails)
  }

  //  console.log("Inside Focus");

  //  var data = this.stockReportService.getCustomerDemographicData()

  //  console.log('data ka zero index : ', data[0]);

  //  this.stockReportDetails = {

  //    object_id: data[0]._id,
  //    primeNumber: data[0].primeNumber,
  //    businessSegment: data[0].businessSegment,
  //    region: data[0].region,
  //    branchCode: data[0].branchCode,
  //    branchName: data[0].branchName,
  //    nameOfBorrower: data[0].nameOfBorrower,
  //    rMCreditHub: data[0].rMCreditHub,
  //    limit:data[0].limit,
  //    stockReportCycle: data[0].stockReportCycle,
  //    jan:data[0].jan,
  //    feb: data[0].feb,
  //    mar: data[0].mar,
  //    apr: data[0].apr,
  //    may:data[0].may,
  //    june:data[0].june,
  //    july:data[0].july,
  //    aug:data[0].aug,
  //    sep:data[0].sep,
  //    oct:data[0].oct,
  //    nov:data[0].nov,
  //    dec:data[0].dec,
  //    dataStatus: data[0].dataStatus,
  //    createdBy: data[0].createdBy,
  //    modifiedBy: data[0].modifiedBy,
  //    active: data[0].active



  //  };

 }

 validaions(){

  // if(!this.stockReportDetails.primeNumber ||!this.stockReportDetails.businessSegment||
  //   !this.stockReportDetails.branchName || !this.stockReportDetails.branchCode
  //   || !this.stockReportDetails.nameOfBorrower || !this.stockReportDetails.rMCreditHub
  //   || !this.stockReportDetails.stockReportCycle || !this.stockReportDetails.limit){
//       this.openSnackBar('please enter all the required fields','Sure');

//   }
// if(this.stockReportDetails.primeNumber.length<6){
// this.openSnackBar('please enter primeNumber of 6 digits','Sure');

// }
//   else{
//     this.addCustomerDemographic();
//     console.log('hiii')
//     return 0;
//   };
 
//   return 0;



if(!this.stockReportDetails.primeNumber){
  this.openSnackBar('please enter all the required fields','Sure');

 }
 else if(!this.stockReportDetails.rMCreditHub){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.stockReportDetails.stockReportCycle){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.stockReportDetails.businessSegment){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.stockReportDetails.region){
   this.openSnackBar('please enter all the required fields','Sure');

  }

 else{
   this.addCustomerDemographic();
   console.log('hiii')
   return 0;
 };
}



 onSearchChange(searchValue: string) {

   console.log(searchValue);

   return this.stockReportService.getCustomerDemographic(this.stockReportDetails.primeNumber).subscribe((data: {}) => {

     this.inputdata = data

     console.log(this.inputdata);

     this.stockReportService.setCustomerDemographicData(data);

     //  this.restservice.setCustomerDemographicData(data);



   });



 }



 loadCustomerDemographicData() {
return this.stockReportService.getCustomerDemographics().subscribe((data: {}) => {
     this.allstockReportDetails = data;
     this.dataSource = new MatTableDataSource(this.allstockReportDetails);
     this.dataSource.paginator = this.paginator;
     console.log(this.dataSource);
   });
 }

 editCustomerDemographic(stockReportData) {
  window.confirm('Are you sure, you want to edit?')
  this.onFocusOut();
  this.disable();
   this.stockReportDetails = stockReportData;


console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii",this.stockReportDetails)
console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii",this.stockReportDetails.jan)

   this.VisiblitypNumb = true

 }



 clearform() {

   this.stockReportDetails.primeNumber = "";
   this.stockReportDetails.businessSegment = "";
   this.stockReportDetails.region = "";
   this.stockReportDetails.branchCode = "";
   this.stockReportDetails.branchName = "";
   this.stockReportDetails.nameOfBorrower = "";
   this.stockReportDetails.rMCreditHub= "";
   this.stockReportDetails.limit= "";
   this.stockReportDetails.stockReportCycle= "";
   this.stockReportDetails.jan= "";
   this.stockReportDetails.feb= "";
   this.stockReportDetails.mar= "";
   this.stockReportDetails.apr= "";
   this.stockReportDetails.may= "";
   this.stockReportDetails.june= "";
   this.stockReportDetails.july= "";
   this.stockReportDetails.aug= "";
   this.stockReportDetails.sep= "";
   this.stockReportDetails.oct= "";
   this.stockReportDetails.nov= "";
   this.stockReportDetails.dec= "";
   this.stockReportDetails.year="";
   this.stockReportDetails.yearly="";
   this.stockReportDetails.st1quater="";
   this.stockReportDetails.nd2qauter="";
   this.stockReportDetails.rd3quater="";
   this.stockReportDetails.th4quater="";

   this.stockReportDetails.stsemianually="";
   this.stockReportDetails.ndsemianually="";
   
   this.stockReportDetails.createdBy = "";

   this.stockReportDetails.createdOn= "";
   this.stockReportDetails.modifiedBy= "";
   this.stockReportDetails.modifiedOn = "";
   this.stockReportDetails.deletedBy= "";
    this.stockReportDetails.deletedOn= "";
    this.stockReportDetails.remarks="";
   // this.stockReportDetails.dataStatus = "";

   // this.stockReportDetails.customerType = "";

 }

 searchTableData(searchValue: string) {

   console.log(searchValue);

   return this.stockReportService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

     this.inputdata = data

     console.log(this.inputdata);

     this.allstockReportDetails = this.inputdata;

     this.stockReportService.setCustomerDemographicData(data);

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
      var user= localStorage.getItem('userFullName')
      this.stockReportDetails.deletedBy = user;
      var today = new Date();
      this.stockReportDetails.deletedOn =today.toString();
     this.stockReportService.deleteCustomersdemographic(primeNumber).subscribe(data => {
    //  this.toastr.success('Customer deleted Successfully');

    this.openSnackBar('Stock Report deleted Successfully','Sure');
       this.loadCustomerDemographicData();

     })

   }

 }


}
