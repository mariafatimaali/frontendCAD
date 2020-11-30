import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import { NgForm } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { pledgejointService } from "../../_services/pledgejoint/pledge-joint.service";
import { format } from 'url';
import { Observable, observable, from } from 'rxjs';
import * as XLSX from 'xlsx';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { pledgejoint } from 'src/app/_models/pledgejoint.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BranchService} from '../../_services/branches/branches.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';

interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface conductedby{
  value: string;
  viewValue: string;
}
interface frequency{
  value: string;
  viewValue: string;
}
interface joint{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pledgejoint',
  templateUrl: './pledgejoint.component.html',
  styleUrls: ['./pledgejoint.component.scss'],
 // providers: [DateFormatPipe]
})
export class PledgejointComponent implements OnInit {
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

  Frequency: frequency[] = [

    {value: 'Daily', viewValue: 'Daily'},
    {value: 'Weekly', viewValue: 'Weekly'},
    {value: 'Fortnightly', viewValue: 'Fortnightly'},
    {value: 'Monthly', viewValue: 'Monthly'},
    {value: 'Quarterly', viewValue: 'Quarterly'},
    {value: 'Semi-annualy', viewValue: 'Semi-annualy'},
    {value: 'Annualy', viewValue: 'Annualy'}

  ];

  Conductedby: conductedby[] = [
    {value: 'By RCAD', viewValue: 'By RCAD'},
    {value: 'By BU', viewValue:  'By BU'},
    {value: 'By Audit', viewValue: 'By Audit'},
    {value: 'By RCAD & BU', viewValue: 'By RCAD & BU'},
    {value: 'Out-soruce', viewValue: 'Out-soruce'},


  ];
  Joint: joint[] = [
    {value: 'Joint Inspection', viewValue: 'Joint Inspection'},
    {value: 'Applicable As per SBP PR.', viewValue:  'Applicable As per SBP PR.'},
    {value: 'Applicable As per Bank Policy.', viewValue: 'Applicable As per Bank Policy.'},
 
    {value: 'Not Applicable.', viewValue: 'Not Applicable.'},


  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
 primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  rMCreditHubFormControl = new FormControl('', [ Validators.required]);

  limitFormControl = new FormControl('', [Validators.required]);
  frequencyFormControl = new FormControl('', [ Validators.required]);
  marchConductedByFormControl = new FormControl('', [Validators.required]);
  marchConductedDateFormControl = new FormControl('', [ Validators.required]);
  juneConductedByFormControl = new FormControl('', [Validators.required]);
  juneConductedDateFormControl = new FormControl('', [Validators.required]);

  sepConductedByFormControl = new FormControl('', [Validators.required]);
  sepConductedDateFormControl = new FormControl('', [ Validators.required]);
  decConductedByControl = new FormControl('', [Validators.required]);
  decConductedDateFormControl = new FormControl('', [ Validators.required]);
  remarksFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);

 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','rMCreditHub',
'limit','frequency','marchConductedBy','marchConductedDate','juneConductedBy','juneConductedDate','sepConductedBy','sepConductedDate','decConductedBy','decConductedDate'];
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

  allpledgejointDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////



  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;





  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() pledgejointDetails = {

    object_id: "",
    primeNumber: "",
    businessSegment:"",
    region:"",
    branchCode:"",
    branchName:"",
    nameOfBorrower:"",
    rMCreditHub:"",
    limit:"",
    frequency:"",
   
    marchConductedBy:"",
    marchConductedDate:"",
    juneConductedBy:"",
    juneConductedDate:"",
    sepConductedBy:"",
    sepConductedDate:"",
    decConductedBy:"",
    decConductedDate:"",
    remarks:"",
    dataStatus: "",
    createdBy : "",
    modifiedBy :"",
    active:""

  };
  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };

  constructor(
    private userIdle: UserIdleService,
    private customerdemographicService:CustomerDemographicService,
    private formBuilder: FormBuilder,
    private pledgejointService: pledgejointService,
    private branchService : BranchService,
    public actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private custService:CustService,
   // private toastr: ToastrService,
 //  private _dateFormatPipe: DateFormatPipe,
    public router: Router,

    private restservice: RestService

  ) { }



  ngOnInit(): void {
   // this. deleterights();
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
      'BRANCHCODE':this.BranchCodeFormControl,
      'BRANCHNAME':this.branchNameControl,
      'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
      'RMCREDIT':this.rMCreditHubFormControl,
      'LIMIT':this.limitFormControl,
      'FREQUENCY':this.frequencyFormControl,
      'MARCHCONDUCTEd':this.marchConductedByFormControl,
      'MARCHDATE':this.marchConductedDateFormControl,
      'JUNECONDUCTED':this.juneConductedByFormControl,
      'JUNEDATE': this.juneConductedDateFormControl,
      'SEPBY':this.sepConductedByFormControl,
      'SEPDATE':this.sepConductedDateFormControl,
      'DECBY':this.decConductedByControl,
      'DECDATE':this.decConductedDateFormControl,
      'REMARKS':this.remarksFormControl,
      'REGION':this.regionFormControl,
'BS':this.businessSegmentFormControl,




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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }

onSearchChangeBranch(searchValue){
  console.log("hi mariaaaaa");
  console.log("hi maria",searchValue);

  var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.pledgejointDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;

 // this.pledgejointDetails.branchName=this.allBranchesDetails[searchValue].BranchName
  //this.pledgejointDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.pledgejointDetails.branchName);
  localStorage.setItem("branchName",this.pledgejointDetails.branchName);
    // return this.branchService.getCustomerDemographic(this.branchDetails.BranchCode).subscribe((data: {}) => {

    //   this.inputdata = data

    //   console.log(this.inputdata);

    //   this.branchService.setCustomerDemographicData(data);
    // });
}

  addCustomerDemographic() {
    // this.pledgejointDetails.marchConductedDate = this._dateFormatPipe.transform(this.pledgejointDetails.marchConductedDate);
    // this.pledgejointDetails.juneConductedDate = this._dateFormatPipe.transform(this.pledgejointDetails.juneConductedDate);
    // this.pledgejointDetails.sepConductedDate = this._dateFormatPipe.transform(this.pledgejointDetails.sepConductedDate);
    // this.pledgejointDetails.decConductedDate= this._dateFormatPipe.transform(this.pledgejointDetails.decConductedDate);
    //this.pledgejointDetails.dateApprovalReceived= this._dateFormatPipe.transform(this.pledgejointDetails.dateApprovalReceived);
    console.log(this.pledgejointDetails.remarks);

    if (this.pledgejointDetails.object_id == "") {

      if (this.pledgejointDetails) {
        // var branch_code_id = this.pledgejointDetails.branchCode;
        // this.pledgejointDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.pledgejointService.createCustomerDemorgaphics(this.pledgejointDetails).subscribe((data: {}) => {
          this.openSnackBar('Pledge joint Details Added Successfully','Sure');
//this.toastr.success('Customer Added Successfully');

          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
  // var branch_code_id = this.pledgejointDetails.branchCode;
  //       this.pledgejointDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.pledgejointService.updateCustomerDemorgaphics(this.pledgejointDetails.primeNumber, this.pledgejointDetails).subscribe((data: {}) => {

         // this.toastr.success('Customer Updated Successfully');
         this.openSnackBar('Pledge joint Details Updated Successfully','Sure');


        })

        location.reload();

      }



    }

  }

  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.pledgejointDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.pledgejointDetails.primeNumber)
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
        this.pledgejointDetails.region=findonedata[0].region
        console.log(this.pledgejointDetails.region)
        this.pledgejointDetails.businessSegment=findonedata[0].businessSegment
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

    // if(!this.pledgejointDetails.primeNumber ||!this.pledgejointDetails.businessSegment||
    //   !this.pledgejointDetails.nameOfBorrower || !this.pledgejointDetails.region
    //   || !this.pledgejointDetails.rMCreditHub || !this.pledgejointDetails.limit
    //   || !this.pledgejointDetails.frequency || this.pledgejointDetails.marchConductedBy
    //   ||this.pledgejointDetails.marchConductedDate|| this.pledgejointDetails.juneConductedBy||this.pledgejointDetails.juneConductedDate
    //   ||this.pledgejointDetails.sepConductedBy||this.pledgejointDetails.sepConductedDate
    //   || this.pledgejointDetails.decConductedBy||this.pledgejointDetails.decConductedDate){
    //    
    if(!this.pledgejointDetails.primeNumber){
     this.openSnackBar('please enter all the required fields','Sure');

    }
   else if(!this.pledgejointDetails.businessSegment){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
   else  if(!this.pledgejointDetails.region){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.marchConductedBy){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.marchConductedDate){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.frequency){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.sepConductedBy){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.sepConductedDate){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.juneConductedBy){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else  if(!this.pledgejointDetails.juneConductedDate){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }

    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    if(this.pledgejointDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }
    return 0;
  }

  fetchByTab() {

    if (!this.pledgejointDetails.primeNumber) {

      return this.pledgejointService.getCustomerDemographic(this.pledgejointDetails.primeNumber).subscribe((data: {}) => { })

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
  branchNamee;
  nameOfBorrower;
  branchCodee;
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  onFocusOut() {




    this.pledgejointService.getCustomerDemographic(this.pledgejointDetails.primeNumber).subscribe(() => { })
    var data = this.pledgejointService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.pledgejointDetails = {

    
     
      object_id: data[0]._id,
      primeNumber: data[0].primeNumber,

      businessSegment:data[0].businessSegment,
      region:data[0].region,
      branchCode:data[0].branchCode,
      branchName:data[0].branchName,
      nameOfBorrower:data[0].nameOfBorrower,
      rMCreditHub:data[0].rMCreditHub,
      limit:data[0].limit,
      frequency:data[0].frequency,
      
      marchConductedBy:data[0].marchConductedBy,
      marchConductedDate:data[0].marchConductedDate,
      juneConductedBy:data[0].juneConductedBy,
      juneConductedDate:data[0].juneConductedDate,
      sepConductedBy:data[0].sepConductedBy,
      sepConductedDate:data[0].sepConductedDate,
      decConductedBy:data[0].decConductedBy,
      decConductedDate:data[0].decConductedDate,
      remarks:data[0].remarks,
      dataStatus: data[0].dataStatus,
      createdBy: data[0].createdBy,
      modifiedBy: data[0].modifiedBy,
      active: data[0].active


    };
      console.log(this.pledgejointDetails);
    }



    else {
      console.log("here")
      console.log(this.pledgejointDetails.primeNumber)
      this.custService.cust(this.pledgejointDetails.primeNumber).subscribe((data: {}) => {
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
        console.log(this.custdata.data.basicDetail.customertTypeName);//customerType
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
        this.branchNamee=this.custdata.data.basicDetail.branchName;
        console.log(this.custdata.data.customerCnicDetails);
        console.log(this.custdata.data.basicDetail["sbpCode "]);//sbpcode
        console.log(this.custdata.data.basicDetail.customerFullName);//name of borrower
        console.log(this.custdata.data.basicDetail.groupName2);//groupName
        console.log(this.custdata.data.customerLimitDetail[0]["limitAmount "])//total FB Limit
        console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total NFB Limit
        console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total limit
        console.log(this.custdata.data.customerLimitHeader.groupCode);//groupCode
        console.log(this.custdata.data.customerLimitDetail[0].limitExpiryDate);//limitExpiryDate

    
          this.pledgejointDetails = {

     
      object_id: "",
      primeNumber: this.pledgejointDetails.primeNumber,

      businessSegment: "",
      region: "",
      branchCode:   this.branchCodee,
      branchName:  this.branchNamee,
      nameOfBorrower:this.nameOfBorrower,
      rMCreditHub: "",
      limit:this.totalLimit,
      frequency: "",

      marchConductedBy: "",
      marchConductedDate: "",
      juneConductedBy: "",
      juneConductedDate: "",
      sepConductedBy: "",
      sepConductedDate: "",
      decConductedBy: "",
      decConductedDate: "",
      remarks: "",
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

      console.log("hiiiiiiiiii", this.pledgejointDetails)
    }
   
    // console.log("Inside Focus");

    // var data = this.pledgejointService.getCustomerDemographicData()

    // console.log('data ka zero index : ', data[0]);

    // this.pledgejointDetails = {

    //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,

    //   businessSegment:data[0].businessSegment,
    //   region:data[0].region,
    //   branchCode:data[0].branchCode,
    //   branchName:data[0].branchName,
    //   nameOfBorrower:data[0].nameOfBorrower,
    //   rMCreditHub:data[0].rMCreditHub,
    //   limit:data[0].limit,
    //   frequency:data[0].frequency,
    //   marchConductedBy:data[0].marchConductedBy,
    //   marchConductedDate:data[0].marchConductedDate,
    //   juneConductedBy:data[0].juneConductedBy,
    //   juneConductedDate:data[0].juneConductedDate,
    //   sepConductedBy:data[0].sepConductedBy,
    //   sepConductedDate:data[0].sepConductedDate,
    //   decConductedBy:data[0].decConductedBy,
    //   decConductedDate:data[0].decConductedDate,
    //   remarks:data[0].remarks,
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

    return this.pledgejointService.getCustomerDemographic(this.pledgejointDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.pledgejointService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }



  loadCustomerDemographicData() {
 return this.pledgejointService.getCustomerDemographics().subscribe((data: {}) => {
      this.allpledgejointDetails = data;
      this.dataSource = new MatTableDataSource(this.allpledgejointDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  editCustomerDemographic(pledgejointData) {
    window.confirm('Are you sure, you want to edit?')
this.disable();
    this.pledgejointDetails = pledgejointData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.pledgejointDetails.primeNumber = "";

    this.pledgejointDetails.branchCode = "";

    this.pledgejointDetails.businessSegment = "";

    this.pledgejointDetails.region = "";

    this.pledgejointDetails.branchCode = "";

    this.pledgejointDetails.branchName = "";

    this.pledgejointDetails.nameOfBorrower = "";

    this.pledgejointDetails.rMCreditHub= "";
    this.pledgejointDetails.limit= "";
    this.pledgejointDetails.frequency= "";
 
    this.pledgejointDetails.marchConductedBy= "";
    this.pledgejointDetails.marchConductedDate= "";
    this.pledgejointDetails.juneConductedBy= "";
    this.pledgejointDetails.juneConductedDate= "";
    this.pledgejointDetails.sepConductedBy= "";
    this.pledgejointDetails.sepConductedDate= "";
    this.pledgejointDetails.decConductedBy= "";
    this.pledgejointDetails.decConductedDate= "";

    this.pledgejointDetails.dataStatus = "";
    // this.pledgejointDetails.dataStatus = "";

    // this.pledgejointDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.pledgejointService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allpledgejointDetails = this.inputdata;

      this.pledgejointService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });

  }



  deleteCustomer(primeNumber) {
     if (window.confirm('Are you sure, you want to delete?')) {
      this.pledgejointService.deleteCustomersdemographic(primeNumber).subscribe(data => {
      // this.toastr.success('Customer deleted Successfully');
      this.openSnackBar('Pledge joint Details Deleted Successfully','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }
}
