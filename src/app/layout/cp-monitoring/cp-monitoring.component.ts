import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormControlName } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CplogbookDraftService } from "../../_services/cplogbookDraft/cplogbook-draft.service";
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { format } from 'url';
import { UserIdleService } from 'angular-user-idle';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { EmailService } from '../../_services/emailService/email.service';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { cplogbookDraft } from 'src/app/_models/cplogbookDraft.model';
import * as XLSX from 'xlsx';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-cp-monitoring',
  templateUrl: './cp-monitoring.component.html',
  styleUrls: ['./cp-monitoring.component.scss'],
  //providers: [DateFormatPipe]
})
export class CpMonitoringComponent implements OnInit {

  business: businessSegment[] = [
    { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Commercial', viewValue: 'Commercial' },
    
    { value: 'FI', viewValue: 'FI' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
 
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Retail', viewValue: 'Retail' },
  ];
  facility: facility[] = [
    { value: 'SBF', viewValue: 'SBF' },
    { value: 'Swift Finance', viewValue: 'Swift Finance' },
    { value: 'POS', viewValue: 'POS' },
    { value: 'Conventional', viewValue: 'Conventional' },
    { value: 'One-Off', viewValue: 'One-Off' },

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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formGroup: FormGroup;
  // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
  primeFormControl = new FormControl('', [Validators.required]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  cpApprovalNoFormControl = new FormControl('', [Validators.required]);
  cpApprovalDateFormControl = new FormControl('', [Validators.required]);
  groupCodeFormControl = new FormControl('', [Validators.required]);
  dateOfDisbursementFormControl = new FormControl('', [Validators.required]);
  typeOfFacilityFormControl = new FormControl('', [Validators.required]);
  accountNoFormControl = new FormControl('', [Validators.required]);
  conditionsFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  trackingDateFormControl = new FormControl('', [Validators.required]);
  actionFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [Validators.required]);
  complianceDateFormControl = new FormControl('', [Validators.required]);
  // matcher = new MyErrorStateMatcher();
  displayedColumns = ['select', 'delete','primeNumber', 'businessSegment', 'region', 'branchCode', 'nameOfBorrower', 'cpApprovalNo', 'cpApprovalDate',
    'dateOfDisbursement', 'typeOfFacility', 'accountNo', 'dueDate', 'trackingDate', 'acctionToBeTaken', 'complianceDate',
  'createdBy','modifiedBy'];
  dataSource = new MatTableDataSource();
  places: Array<any> = [];

  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
  public isViewable: boolean;
  tableprimenumber: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  object_id: any;
  previousPage

  totalRec: number;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];

  allcplogbookDraftDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////



  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;




  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() cplogbookDraftDetails = {

    object_id: "",
    primeNumber: "",
    businessSegment: "",
    region: "",
    branchCode: "",
    nameOfBorrower: "",
    cpApprovalNo: "",
    cpApprovalDate: "",
    dateOfDisbursement: "",
    typeOfFacility: "",
    accountNo: "",
    conditions: "",
    dueDate: "",
    trackingDate: "",
    acctionToBeTaken: "",
    complianceDate: "",
    remarks:"",
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
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private cplogbookDraftService: CplogbookDraftService,
    public actRoute: ActivatedRoute,
    private customerdemographicService: CustomerDemographicService,
    //   private toastr: ToastrService,
    public router: Router,
    // private _dateFormatPipe: DateFormatPipe,
    private restservice: RestService,
    private _snackBar: MatSnackBar,
    private custService: CustService
  ) { }



  ngOnInit(): void {
    this.editrights();
    this. deleterights();
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {


      this.router.navigate(['login'])
      sessionStorage.clear();
      this.openSnackBar('Session Expired', 'Sure');
      console.log('Time is up!')
    });


    this.isViewable = false;
    this.formGroup = this.formBuilder.group({
      'PRIMENUMBER': this.primeFormControl,
      'BRANCHCODE': this.BranchCodeFormControl,
      'NAMEOFBORROWER': this.nameOfBorrowerFormControl,
      'GROUPCODE': this.groupCodeFormControl,
      'CPAPPROVAL': this.cpApprovalNoFormControl,
      'CPAPPROVALDATE': this.cpApprovalDateFormControl,
      'DATEOFDISBURSEMENT': this.dateOfDisbursementFormControl,
      'TYPEOFFACILITY': this.typeOfFacilityFormControl,
      'ACCOUNTNO': this.accountNoFormControl,
      'CONDITIONS': this.conditionsFormControl,
      'DUEDATE': this.dueDateFormControl,
      'TRACKINGDATE': this.trackingDateFormControl,
      'ACTION': this.actionFormControl,
      'REGION': this.regionFormControl,
      'BS': this.businessSegmentFormControl,
      'complianceDate': this.complianceDateFormControl


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

findOne(){
this.customerdemographicService.findOneCustomerDemographics(this.cplogbookDraftDetails.primeNumber).subscribe((data :{})=>{
  console.log(this.cplogbookDraftDetails.primeNumber)
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
    this.cplogbookDraftDetails.region=findonedata[0].region
    console.log(this.cplogbookDraftDetails.region)
    this.cplogbookDraftDetails.businessSegment=findonedata[0].businessSegment
  }
  
})
}


  sendEmail() {
    // this.sendEmail.
    this.emailService.sendEmail().subscribe((data: {}) => {
      this.openSnackBar('email is sent to the concern', 'Sure');
    });
  }
  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  addCustomerDemographic() {
    var today = new Date();
    console.log(this.cplogbookDraftDetails);
var user= localStorage.getItem('userFullName')
    if (this.cplogbookDraftDetails.object_id == "") {
      this.cplogbookDraftDetails.dataStatus = "1";
      if (this.cplogbookDraftDetails) {
        this.cplogbookDraftDetails.createdBy= user;
        this.cplogbookDraftDetails.createdOn =today.toString();
        console.log(this.cplogbookDraftDetails.createdOn)
        this.cplogbookDraftService.createCustomerDemorgaphics(this.cplogbookDraftDetails).subscribe((data: {}) => {
          this.cplogbookDraftDetails.createdBy= user;
          console.log(this.cplogbookDraftDetails);
        
          // this.toastr.success('Customer Added Successfully');
          this.openSnackBar('CP Condition Monitoring Added Successfully', 'Sure');

          this.clearform();
          this.sendEmail();
          this.loadCustomerDemographicData();

        })
        //this.cplogbookDraftDetails.createdBy= user;
      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.cplogbookDraftDetails.createdBy= user;
        this.cplogbookDraftDetails.modifiedOn =today.toString();
        //  var branch_code_id = this.cplogbookDraftDetails.branchCode;
        //         this.cplogbookDraftDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.cplogbookDraftService.updateCustomerDemorgaphics(this.cplogbookDraftDetails.primeNumber, this.cplogbookDraftDetails).subscribe((data: {}) => {

          //       this.toastr.success('Customer Updated Successfully');

          this.openSnackBar('CpMonitoring  Updated Successfully', 'Sure');

        })
      //  this.cplogbookDraftDetails.createdBy= user;
        location.reload();

      }



    }

  }
  public toggle(): void { this.isViewable = !this.isViewable; }
  fetchByTab() {

    if (!this.cplogbookDraftDetails.primeNumber) {

      return this.cplogbookDraftService.getCustomerDemographic(this.cplogbookDraftDetails.primeNumber).subscribe((data: {}) => { })

    }

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  branchCodee;
  branchNamee;
  onFocusOut() {
// this.findOne();
    this.cplogbookDraftService.getCustomerDemographic(this.cplogbookDraftDetails.primeNumber).subscribe(() => { })
    var data = this.cplogbookDraftService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);
      this.cplogbookDraftDetails = {
        object_id: data[0]._id,
        primeNumber: data[0].primeNumber,
        businessSegment: data[0].businessSegment,
        region: data[0].region,
        branchCode: data[0].branchCode,
        nameOfBorrower: data[0].nameOfBorrower,
        cpApprovalNo: data[0].cpApprovalNo,
        cpApprovalDate: data[0].cpApprovalDate,
        dateOfDisbursement: data[0].dateOfDisbursement,
        typeOfFacility: data[0].typeOfFacility,
        accountNo: data[0].accountNo,
        conditions: data[0].conditions,
        dueDate: data[0].dueDate,
        trackingDate: data[0].trackingDate,
        acctionToBeTaken: data[0].acctionToBeTaken,
        complianceDate: data[0].complianceDate,
        remarks:data[0].remarks,
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
      };
      console.log(this.cplogbookDraftDetails);
    }



    else {
      // this.findOne();
      console.log("here")
      console.log(this.cplogbookDraftDetails.primeNumber)
      this.custService.cust(this.cplogbookDraftDetails.primeNumber).subscribe((data: {}) => {
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
        this.cpExpiryDate = this.custdata.data.customerLimitDetail[0].limitExpiryDate;
        console.log("sbpcode", this.sbpcode);
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
        this.branchNamee = this.custdata.data.basicDetail.branchName;
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

        this.cplogbookDraftDetails = {
          object_id: "",
          primeNumber: this.cplogbookDraftDetails.primeNumber,
          businessSegment: "",
          region: "",
          branchCode: this.branchCodee,
          nameOfBorrower: this.nameOfBorrower,
          cpApprovalNo: "",
          cpApprovalDate: "",
          dateOfDisbursement: "",
          typeOfFacility: "",
          accountNo: "",
          conditions: "",
          dueDate: "",
          trackingDate: "",
          acctionToBeTaken: "",
          complianceDate: "",
          remarks:"",
          dataStatus: "",
          createdBy : "",

          createdOn:"",
           modifiedBy:  "",
           modifiedOn : "",
           deletedBy: "",
           deletedOn:"",
          active: "",
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

      console.log("hiiiiiiiiii", this.cplogbookDraftDetails)
    }
   
  }
  //  onFocusOut() {

  //    console.log("Inside Focus");

  //    var data = this.cplogbookDraftService.getCustomerDemographicData()

  //    console.log('data ka zero index : ', data[0]);

  //    this.cplogbookDraftDetails = {

  //      object_id: data[0]._id,

  //      primeNumber: data[0].primeNumber,

  //      businessSegment: data[0].businessSegment,

  //      region: data[0].region,

  //      branchCode: data[0].branchCode,



  //      nameOfBorrower: data[0].nameOfBorrower,

  //      cpApprovalNo:data[0].cpApprovalNo,
  //      cpApprovalDate: data[0].cpApprovalDate,
  //      dateOfDisbursement: data[0].dateOfDisbursement,
  //      typeOfFacility: data[0].typeOfFacility,
  //      accountNo: data[0].accountNo,
  //      conditions: data[0].conditions,
  //      dueDate:data[0].dueDate,
  //      trackingDate: data[0].trackingDate,
  //      acctionToBeTaken: data[0].acctionToBeTaken,
  //      complianceDate : data[0].complianceDate,
  //      dataStatus: data[0].dataStatus,
  //      createdBy : data[0].createdBy,
  //      modifiedBy : data[0].modifiedBy,
  //        active:data[0].active,



  //    };

  //  }

  trackdate: Date
  result: string;
  result12: string;
  onChange() {

    console.log('mariafatima')

    var dt = new Date(this.cplogbookDraftDetails.dueDate);

    dt.setDate(dt.getDate() - 7);

    console.log("maria", dt)
    this.result = dt.toLocaleString();
    this.result12 = this.result.substr(0,10);
    this.cplogbookDraftDetails.trackingDate = this.result12;
    console.log("maria", this.cplogbookDraftDetails.trackingDate);


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
  validaions() {

    // if(!this.cplogbookDraftDetails.primeNumber ||!this.cplogbookDraftDetails.businessSegment||
    //   !this.cplogbookDraftDetails.typeOfFacility || !this.cplogbookDraftDetails.region
    //   || !this.cplogbookDraftDetails.accountNo || !this.cplogbookDraftDetails.cpApprovalDate
    //   || !this.cplogbookDraftDetails.nameOfBorrower || !this.cplogbookDraftDetails.cpApprovalNo
    //   ||!this.cplogbookDraftDetails.conditions|| !this.cplogbookDraftDetails.dueDate||
    //   !this.cplogbookDraftDetails.acctionToBeTaken){
    if (!this.cplogbookDraftDetails.primeNumber) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.cplogbookDraftDetails.businessSegment) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.cplogbookDraftDetails.region) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.cplogbookDraftDetails.typeOfFacility) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.cplogbookDraftDetails.cpApprovalDate) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.cplogbookDraftDetails.cpApprovalNo) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    // else if (!this.cplogbookDraftDetails.dateOfDisbursement) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.cplogbookDraftDetails.accountNo) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    else if (!this.cplogbookDraftDetails.dueDate) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    // else if (!this.cplogbookDraftDetails.acctionToBeTaken) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    else {
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };

    if (this.cplogbookDraftDetails.primeNumber.length < 6) {
      this.openSnackBar('please enter primeNumber of 6 digits', 'Sure');

    }
    if (this.cplogbookDraftDetails.accountNo.length == 14) {
      this.openSnackBar('please enter account number of 14 digits', 'Sure');

    }

    return 0;

  }
  alphanumeric(searchValue: string)
{ 
var letters = /^[0-9a-zA-Z]+$/;
if(searchValue.match(letters))
{
//alert('Your registration number have accepted : you can try another');
return true;
}
else
{
alert('Please input alphanumeric characters only');
return false;
}
}

  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.cplogbookDraftService.getCustomerDemographic(this.cplogbookDraftDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.cplogbookDraftService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }



  loadCustomerDemographicData() {
    return this.cplogbookDraftService.getCustomerDemographics().subscribe((data: {}) => {
      this.allcplogbookDraftDetails = data;
      console.log(data);
      console.log(this.allcplogbookDraftDetails);

      this.dataSource = new MatTableDataSource(this.allcplogbookDraftDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      //  this.totalRec = (this.allcplogbookDraftDetails.length / 5) * 10;
      //  console.log(this.totalRec);
    });
  }

  editCustomerDemographic(cplogbookDraftData) {
    window.confirm('Are you sure, you want to edit?')
   // var user =localStorage.getItem('userFullName')
    var user= localStorage.getItem('userFullName')
    this.cplogbookDraftDetails.modifiedBy= user;
    this.disable();
    this.cplogbookDraftDetails = cplogbookDraftData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.cplogbookDraftDetails.primeNumber = "";

    this.cplogbookDraftDetails.branchCode = "";

    this.cplogbookDraftDetails.businessSegment = "";

    this.cplogbookDraftDetails.region = "";

    this.cplogbookDraftDetails.branchCode = "";

    //  this.cplogbookDraftDetails.branchName = "";

    this.cplogbookDraftDetails.nameOfBorrower = "";

    this.cplogbookDraftDetails.cpApprovalNo = "";

    this.cplogbookDraftDetails.cpApprovalDate = "";

    this.cplogbookDraftDetails.dateOfDisbursement = "";

    this.cplogbookDraftDetails.typeOfFacility = "";

    this.cplogbookDraftDetails.accountNo = "";

    this.cplogbookDraftDetails.conditions = "";

    this.cplogbookDraftDetails.dueDate = "";

    this.cplogbookDraftDetails.trackingDate = "";

    this.cplogbookDraftDetails.acctionToBeTaken = "";
    this.cplogbookDraftDetails.complianceDate = "";
    this.cplogbookDraftDetails.remarks="",
    
    this.cplogbookDraftDetails.createdOn= "";
    this.cplogbookDraftDetails.modifiedBy= "";
    this.cplogbookDraftDetails.modifiedOn = "";
    this.cplogbookDraftDetails.deletedBy= "";
     this.cplogbookDraftDetails.deletedOn= "";
  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.cplogbookDraftService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allcplogbookDraftDetails = this.inputdata;

      this.cplogbookDraftService.setCustomerDemographicData(data);

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
      this.cplogbookDraftService.deleteCustomersdemographic(primeNumber).subscribe(data => {
        var user= localStorage.getItem('userFullName')
        this.cplogbookDraftDetails.deletedBy = user;
        var today = new Date();
        this.cplogbookDraftDetails.createdOn =today.toString();
        //  this.toastr.success('Customer deleted Successfully');
        this.openSnackBar('CP Condition Monitoring deleted Successfully', 'Sure');
        this.loadCustomerDemographicData();

      })

    }

  }

}
