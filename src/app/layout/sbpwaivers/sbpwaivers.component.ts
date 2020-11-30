// import 'rxjs/add/operator/map';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { ColdescService } from '../../_services/coldesc/coldesc.service';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sbpWaiverService } from "../../_services/sbpWaiver/sbp-Waiver.service";
import { format } from 'url';
import * as XLSX from 'xlsx';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import {BranchService} from '../../_services/branches/branches.service';
import {DocService} from '../../_services/docService/doc-service';
import { sbpWaiver } from 'src/app/_models/sbpWaiver.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import {MatPaginator} from '@angular/material/paginator';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { filter } from 'rxjs/operators';
//import {BranchService} from '../../_services/branches/branches.service';
//import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sbpwaivers',
  templateUrl: './sbpwaivers.component.html',
  styleUrls: ['./sbpwaivers.component.scss'],
 // providers: [DateFormatPipe]
})
export class SbpwaiversComponent implements OnInit {
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
    
      ];  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
receiveddateatCADFormControl = new FormControl('', [Validators.required]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  natureofExceptionFormControl = new FormControl('', [ Validators.required]);
  aprovalRefFormControl = new FormControl('', [ Validators.required]);
  sBPApprovalLetterDateFormControl = new FormControl('', [Validators.required]);
  attachmentFormControl = new FormControl('', [ Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);

 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','natureofException',
'aprovalRef','sBPApprovalLetterDate','createdBy','createdOn','modifiedBy','modifiedOn'];
dataSource = new MatTableDataSource();
places: Array<any> = [];
  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////

  tableprimenumber: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  previousPage: any;

  totalRec: number;
  branchName:any;
  //tableprimenumber: number;
  allBranchesDetails:any=[];
  //selectedBranch :allBranchesDetails[];
  selectedBranch: any ;

  BranchName: string;
 // BranchName: string;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];
  inputdata1: any = [];

  allsbpWaiverDetails: any = [];

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
    createdBy : "",

    createdOn: "",
     modifiedBy:   "",
     modifiedOn :   "",
     deletedBy:  "",
     deletedOn: "",

    active: ""
  };

  constructor(
    private userIdle: UserIdleService,
    private customerdemographicService:CustomerDemographicService,
    private DocService: DocService,
    private formBuilder: FormBuilder,
    private sbpWaiverService: sbpWaiverService,
    private branchService : BranchService,
    public actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private custService:CustService,
    //private toastr: ToastrService,
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
    this.editrights();
    this. deleterights();
    this.fetchByTab();
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
      'BRANCHCODE':this.BranchCodeFormControl,
      'BRANCHNAME':this.branchNameControl,
      'NATURE':this.natureofExceptionFormControl,
      'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
      'SBPAPPROVAL':this.sBPApprovalLetterDateFormControl,
      'ATTACHMENT':this.attachmentFormControl,
      'REGION':this.regionFormControl,
      'BS':this.businessSegmentFormControl,
      'APPROVEREF':this.aprovalRefFormControl,
          });

    this.loadCustomerDemographicData();
   // this.loadBranches();
    
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

  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.sbpWaiverDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.sbpWaiverDetails.primeNumber)
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
        this.sbpWaiverDetails.region=findonedata[0].region
        console.log(this.sbpWaiverDetails.region)
        this.sbpWaiverDetails.businessSegment=findonedata[0].businessSegment
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

    // if(!this.sbpWaiverDetails.primeNumber ||!this.sbpWaiverDetails.businessSegment||
    //   !this.sbpWaiverDetails.nameOfBorrower || !this.sbpWaiverDetails.region
    //   || !this.sbpWaiverDetails.natureofException || !this.sbpWaiverDetails.aprovalRef
    //   || !this.sbpWaiverDetails.sBPApprovalLetterDate){
      if(!this.sbpWaiverDetails.primeNumber){
        this.openSnackBar('please enter all the required fields','Sure');

    }
  else  if(!this.sbpWaiverDetails.businessSegment){
      this.openSnackBar('please enter all the required fields','Sure');

  }
 else if(!this.sbpWaiverDetails.natureofException){
    this.openSnackBar('please enter all the required fields','Sure');

}
else if(!this.sbpWaiverDetails.region){
  this.openSnackBar('please enter all the required fields','Sure');

}
else if(!this.sbpWaiverDetails.aprovalRef){
  this.openSnackBar('please enter all the required fields','Sure');

}
else if(!this.sbpWaiverDetails.sBPApprovalLetterDate){
  this.openSnackBar('please enter all the required fields','Sure');

}

    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    if(this.sbpWaiverDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }
    return 0;
  }

  onSearchChangeBranch(searchValue){
    console.log("hi mariaaaaa");
    console.log("hi maria",searchValue);
     

    var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.sbpWaiverDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
    //this.sbpWaiverDetails.branchName=this.allBranchesDetails[searchValue].BranchName
   // this.sbpWaiverDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
    console.log ("hiiiii",this.sbpWaiverDetails.branchName);
    localStorage.setItem("branchName",this.sbpWaiverDetails.branchName);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
docServiceData;
url;
docService(){
  console.log('docService')
  if(!this.sbpWaiverDetails.primeNumber){
    alert("prime number is cannot be null")
  }
  else {


   this.DocService.doc(this.sbpWaiverDetails.primeNumber).subscribe((data:{})=>{
this.docServiceData =data;
// const filtered = this.docServiceData.filter(x => this.docServiceData.includes(x.EncryptQueryResult));
// console.log(filtered)
console.log(this.docServiceData.EncryptQueryResult);
this.url='http://10.200.75.143/CADScanUploadWebApp/CrCardUpload.aspx?SrvPhrm='+this.docServiceData.EncryptQueryResult;
window.open(this.url);
// const result: string.concat(this.url, this.docServiceData);
// var str = this.url.concat(this.docServiceData) 
console.log(this.url);

  });
}
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

// addDoc(){
//   if (this.sbpWaiverDetails) {

//     this.sbpWaiverService.docservice(this.sbpWaiverDetails.primeNumber).subscribe((data: {}) => {

//     //  this.toastr.success('sbpWaiver Details Added Successfully');
//     this.inputdata1 = data;
//     console.log(this.inputdata1);

//     })

//   }
// }
  addCustomerDemographic() {
    var user= localStorage.getItem('userFullName')
    this.sbpWaiverDetails.createdBy= user;
    console.log(this.sbpWaiverDetails);
    var today = new Date();
    if (this.sbpWaiverDetails.object_id == "") {

      if (this.sbpWaiverDetails) {

        this.sbpWaiverService.createCustomerDemorgaphics(this.sbpWaiverDetails).subscribe((data: {}) => {
          this.sbpWaiverDetails.createdBy= user;
          
        this.sbpWaiverDetails.createdOn =today.toString();
        console.log(this.sbpWaiverDetails.createdOn)
        //  this.toastr.success('sbpWaiver Details Added Successfully');
        this.openSnackBar('sbpWaiver Details Added  Successfully','Sure');
      //  this.addDoc();
      //this.docService();
                  this.clearform();
                
          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.sbpWaiverDetails.modifiedBy= user;
        this.sbpWaiverDetails.modifiedOn =today.toString();
        this.sbpWaiverService.updateCustomerDemorgaphics(this.sbpWaiverDetails.primeNumber, this.sbpWaiverDetails).subscribe((data: {}) => {

         // this.toastr.success('sbpWaiver Details Updated Successfully');

        
         this.openSnackBar('sbpWaiver Details Updated   Successfully','Sure');
        })

        location.reload();

      }



    }

  }

  fetchByTab() {
    console.log("this isss maria");
    this.sbpWaiverService.getCustomerDemographic(this.sbpWaiverDetails.primeNumber).subscribe((data: {}) => { 
      console.log("yelooooo",data);
    })

    

  }
//   docSearch: any;
 
//   onSearch() {
// console.log("this isss maria")
//     this.sbpWaiverService.getCustomerDemographicc(this.sbpWaiverDetails.primeNumber).subscribe((data:{}) => { 
//       this.docSearch =data;
//       // var data = this.sbpWaiverService.getCustomerDemographicData()
//       // console.log(this.sbpWaiverDetails.primeNumber)
//       console.log(this.docSearch)
//     })
//     // var data = this.sbpWaiverService.getCustomerDemographicData()
//     // console.log(data)
//   }

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



    this.sbpWaiverService.getCustomerDemographic(this.sbpWaiverDetails.primeNumber).subscribe(() => { })
    var data = this.sbpWaiverService.getCustomerDemographicData()

    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.sbpWaiverDetails = {

      object_id: data[0]._id,
      primeNumber: data[0].primeNumber,
      businessSegment: data[0].businessSegment,
      region: data[0].region,
      branchCode: data[0].branchCode,
      branchName: data[0].branchName,
      nameOfBorrower: data[0].nameOfBorrower,
      natureofException: data[0].natureofException,
      aprovalRef: data[0].aprovalRef,
      sBPApprovalLetterDate: data[0].sBPApprovalLetterDate,
      attachment: data[0].attachment,
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
      console.log(this.sbpWaiverDetails);
    }



    else {
      console.log("here")
      console.log(this.sbpWaiverDetails.primeNumber)
      this.custService.cust(this.sbpWaiverDetails.primeNumber).subscribe((data: {}) => {
        console.log(data);
        this.custdata = data;
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
        this.branchNamee=this.custdata.data.basicDetail.branchName;
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

    
          this.sbpWaiverDetails = {

           
      object_id: "",
      primeNumber: this.sbpWaiverDetails.primeNumber,
      businessSegment: "",
      region: "",
      branchCode: this.branchCodee,
      branchName: this.branchNamee,
      nameOfBorrower: this.nameOfBorrower,
      natureofException: "",
      aprovalRef: "",
      sBPApprovalLetterDate: "",
      attachment:"",
      dataStatus: "",
      createdBy : "",

      createdOn:"",
       modifiedBy:  "",
       modifiedOn : "",
       deletedBy: "",
       deletedOn:"",
         
      active:""


      
    
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

      console.log("hiiiiiiiiii", this.sbpWaiverDetails)
    }
    // console.log("Inside Focus");

    // var data = this.sbpWaiverService.getCustomerDemographicData()

    // console.log('data ka zero index : ', data[0]);

    // this.sbpWaiverDetails = {

    //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,
    //   businessSegment: data[0].businessSegment,
    //   region: data[0].region,
    //   branchCode: data[0].branchCode,
    //   branchName: data[0].branchName,
    //   nameOfBorrower: data[0].nameOfBorrower,
    //   natureofException: data[0].natureofException,
    //   aprovalRef: data[0].aprovalRef,
    //   sBPApprovalLetterDate: data[0].sBPApprovalLetterDate,
    //   attachment: data[0].attachment,
    //   dataStatus: data[0].dataStatus,
    //   createdBy: data[0].createdBy,
    //   modifiedBy: data[0].modifiedBy,
    //   active: data[0].active



    // };

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

    return this.sbpWaiverService.getCustomerDemographic(this.sbpWaiverDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.sbpWaiverService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }



  loadCustomerDemographicData() {
 return this.sbpWaiverService.getCustomerDemographics().subscribe((data: {}) => {
      this.allsbpWaiverDetails = data;
      this.dataSource = new MatTableDataSource(this.allsbpWaiverDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  editCustomerDemographic(sbpWaiverData) {
    window.confirm('Are you sure, you want to edit?')
    this.disable();
    this.onFocusOut();
    this.docService();
    // var branch_code_id = this.sbpWaiverDetails.branchCode;
    // this.sbpWaiverDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;

    this.sbpWaiverDetails = sbpWaiverData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.sbpWaiverDetails.primeNumber = "";

    this.sbpWaiverDetails.branchCode = "";

    this.sbpWaiverDetails.businessSegment = "";

    this.sbpWaiverDetails.region = "";

    this.sbpWaiverDetails.branchCode = "";

    this.sbpWaiverDetails.branchName = "";

    this.sbpWaiverDetails.nameOfBorrower = "";

    this.sbpWaiverDetails.natureofException = "";

    this.sbpWaiverDetails.aprovalRef = "";

    this.sbpWaiverDetails.sBPApprovalLetterDate = "";

    this.sbpWaiverDetails.attachment = "";
    this.sbpWaiverDetails.createdBy = "";

    this.sbpWaiverDetails.createdOn= "";
    this.sbpWaiverDetails.modifiedBy= "";
    this.sbpWaiverDetails.modifiedOn = "";
    this.sbpWaiverDetails.deletedBy= "";
     this.sbpWaiverDetails.deletedOn= "";


    // this.sbpWaiverDetails.dataStatus = "";

    // this.sbpWaiverDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.sbpWaiverService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allsbpWaiverDetails = this.inputdata;

      this.sbpWaiverService.setCustomerDemographicData(data);

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
      console.log(primeNumber)
      var user= localStorage.getItem('userFullName')
      this.sbpWaiverDetails.deletedBy = user;
      var today = new Date();
      this.sbpWaiverDetails.deletedOn =today.toString();
      this.sbpWaiverService.deleteCustomersdemographic(primeNumber).subscribe(data => {
      
      // this.toastr.success('sbpWaiver Details deleted Successfully');
      this.openSnackBar('SBP Waivers Added  deleted','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }

}
