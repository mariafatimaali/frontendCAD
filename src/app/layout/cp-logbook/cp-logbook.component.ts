import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../../_services/branches/branches.service';
import { NgForm } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CplogbookApprovedService } from "../../_services/cplogbookApproved/cplogbook-Approved.service"
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service"
import { format } from 'url';
import * as XLSX from 'xlsx';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { cplogbookApproved } from 'src/app/_models/cplogbookApproved.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { CustService } from '../../_services/custdemo/custdemo.service';
// import { Console } from 'console';

interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface cptype {
  value: string;
  viewValue: string;
}
interface facility {
  value: string;
  viewValue: string;
}
interface approval {
  value: string;
  viewValue: string;
}
interface recordStatus {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-cp-logbook',
  templateUrl: './cp-logbook.component.html',
  styleUrls: ['./cp-logbook.component.scss'],
  //providers: [DateFormatPipe]
})

export class CpLogbookComponent implements OnInit {
  isDisabled: boolean = false;
  Approval: approval[] = [
    { value: 'BOD', viewValue: 'BOD' },
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



  business: businessSegment[] = [
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Commercial', viewValue: 'Commercial' },
    { value: 'Retail', viewValue: 'Retail' },
  ];

  Region: regions[] = [
    { value: 'Bahwalpur', viewValue: 'Bahwalpur' },
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
  CpType: cptype[] = [

    { value: 'Annual Review', viewValue: 'Annual Review' },
    { value: 'Defferal', viewValue: 'Defferal' },
    { value: 'Fresh', viewValue: 'Fresh' },
    { value: 'Intermin Review', viewValue: 'Intermin Review' },
    { value: 'NOC Request', viewValue: 'NOC Request' },
    { value: 'T.E', viewValue: 'T.E' },
    { value: 'SFCP', viewValue: 'SFCP' }



  ];
  Facility: facility[] = [
    { value: 'SBF', viewValue: 'SBF' },
    { value: 'Swift Finance', viewValue: 'Swift Finance' },
    { value: 'POS', viewValue: 'POS' },
    { value: 'Conventional', viewValue: 'Conventional' },
    { value: 'One-off', viewValue: 'One-off' }

  ];


  recordStatus: recordStatus[] = [
    { value: 'Old', viewValue: 'Old' },
    { value: 'Current', viewValue: 'Current' }
    

  ];



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formGroup: FormGroup;
  // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
  primeFormControl = new FormControl('', [Validators.required, Validators.maxLength(6)]);
  receivedDateatCADFormControl = new FormControl('', [Validators.required, Validators.maxLength(6)]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  cPTypeFormControl = new FormControl('', [Validators.required]);

  facilityTypeFormControl = new FormControl('', [Validators.required]);
  cPReferenceNoFormControl = new FormControl('', [Validators.required]);
  cPInitialDateFormControl = new FormControl('', [Validators.required]);
  cPApprovalDateFormControl = new FormControl('', [Validators.required]);
  approvalLevelFormControl = new FormControl('', [Validators.required]);



  nameofRMFormControl = new FormControl('', [Validators.required]);
  nameofTeamLeaderFormControl = new FormControl('', [Validators.required]);
  totalFBLimitFormControl = new FormControl('', [Validators.required]);
  totalNFBLimitFormControl = new FormControl('', [Validators.required]);
  totalLimitFormControl = new FormControl('', [Validators.required]);
  cpExpiryDateFormControl = new FormControl('', [Validators.required]);
  temporaryExtensionApproveduptoFormControl = new FormControl('', [Validators.required]);
  numberofTEApprovedFormControl = new FormControl('', [Validators.required]);
  offerLetterIssuedOnFormControl = new FormControl('', [Validators.required]);
  offerLetterReceivedOnFormControl = new FormControl('', [Validators.required]);
  financeDocumentIssuedOnFormControl = new FormControl('', [Validators.required]);
  financeDocumentReceivedOnFormControl = new FormControl('', [Validators.required]);
  discrepanciesMemoNo1IssuedOnFormControl = new FormControl('', [Validators.required]);
  discrepanciesMemoNo1ReceivedOnFormControl = new FormControl('', [Validators.required]);
  discrepanciesMemoNo2IssuedOnFormControl = new FormControl('', [Validators.required]);
  discrepanciesMemoNo2ReceivedOnFormControl = new FormControl('', [Validators.required]);
  linesReleaseDateFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [Validators.required]);
  remarksFormControl = new FormControl('', [Validators.required]);

  // matcher = new MyErrorStateMatcher();
  displayedColumns = ['select', 'delete', 'primeNumber', 'receivedDateatCAD', 'nameofBusinessSegment', 'region', 'branchCode', 'branchName', 'nameOfBorrower',
    'cPType', 'facilityType', 'cPReferenceNo', 'cPInitialDate', 'cPApprovalDate', 'approvalLevel', 'nameofRM', 'nameofTeamLeader', 'totalFBLimit', 'totalLimit', 'cpExpiryDate', 'temporaryExtensionApprovedupto', 'numberofTEApproved',
    'financeDocumentIssuedOn', 'financeDocumentReceivedOn', 'discrepanciesMemoNo1IssuedOn', 'discrepanciesMemoNo1ReceivedOn', 'discrepanciesMemoNo2IssuedOn', 'discrepanciesMemoNo2ReceivedOn', 'linesReleaseDate', 'remarks',
    'offerLetterIssuedOn', 'offerLetterReceivedOn','recordStatus','createdBy','createdOn','modifiedBy','modifiedOn'];
  dataSource = new MatTableDataSource();
  places: Array<any> = [];
  // model: NgbDateStruct;
  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();
  tableprimenumber: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  previousPage: any;

  totalRec: number;

  //////////////////////////////////Data Veriables////////////////////////////////////////
  branchName: any
  inputdata: any = [];
  recievedDate: any;
  allCplogbookApprovedDetails: any = [];
  allBranchesDetails: any = [];
  selectedBranch: any;
  BranchName: string;
  //////////////////////////////////Visiblity Veriables///////////////////////////////////
  public VisiblitypNumb: boolean = false;
  public hideEditButton: boolean = false;
  public hideDeleteButton: boolean = false;
  public hideForm: boolean = false;
  public hideDataTable: boolean = false;

  @ViewChild('TABLE', { static: false }) table: ElementRef;


  @Input() CplogbookApprovedDetails = {
    object_id: "",
    primeNumber: "",
    receivedDateatCAD: "",
    nameofBusinessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfBorrower: "",
    cPType: "",
    facilityType: "",
    cPReferenceNo: "",
    //nameOfGroup: "",
    cPInitialDate: "",
    cPApprovalDate: "",
    // cPType: "",
    approvalLevel: "",
    nameofRM: "",
    nameofTeamLeader: "",
    totalFBLimit: "",
    totalNFBLimit: "",
    totalLimit: "",
    cpExpiryDate: "",
    temporaryExtensionApprovedupto: "",
    numberofTEApproved: "",
    offerLetterIssuedOn: "",
    offerLetterReceivedOn: "",
    financeDocumentIssuedOn: "",
    financeDocumentReceivedOn: "",
    discrepanciesMemoNo1IssuedOn: "",
    discrepanciesMemoNo1ReceivedOn: "",
    discrepanciesMemoNo2IssuedOn: "",
    discrepanciesMemoNo2ReceivedOn: "",
    linesReleaseDate: "",
    remarks: "",

    active: "",
    createdBy : "",

    createdOn: "",
     modifiedBy:   "",
     modifiedOn :   "",
     deletedBy:  "",
     deletedOn: "",

RecordStatus:""

  };
  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };
  constructor(
    private userIdle: UserIdleService,

    private customerdemographicService: CustomerDemographicService,
    private CplogbookApprovedService: CplogbookApprovedService,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
    // private _dateFormatPipe: DateFormatPipe,
    private _snackBar: MatSnackBar,
    public router: Router,
    private branchService: BranchService,
    private restservice: RestService,
    private custService: CustService,
  ) { }



  ngOnInit(): void {
    //this. deleterights();
    this.editrights();
    this.deleterights();
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {


      this.router.navigate(['login'])
      localStorage.clear();
      sessionStorage.clear();
      this.openSnackBar('Session Expired', 'Sure');
      console.log('Time is up!')
    });


    this.formGroup = this.formBuilder.group({
      'PRIMENUMBER': this.primeFormControl,
      "RECIEVEDDATE": this.receivedDateatCADFormControl,
      'BRANCHCODE': this.BranchCodeFormControl,
      'BRANCHNAME': this.branchNameControl,
      'NAMEOFBORROWER': this.nameOfBorrowerFormControl,
      'CPTYPE': this.cPTypeFormControl,
      'FACILITYTYPE': this.facilityTypeFormControl,
      'CPREFNO': this.cPReferenceNoFormControl,
      'CPINITIATION': this.cPInitialDateFormControl,
      // 'CPAPPROVAL': this.cPApprovalDateFormControl,
      'APPROVALLEVEL': this.approvalLevelFormControl,
      'NAMEOFRM': this.nameofRMFormControl,
      'NAMEOFTEAMKLEADER': this.nameofTeamLeaderFormControl,
      'TOTALFBLIMIT': this.totalFBLimitFormControl,
      'TOTALNFBL': this.totalNFBLimitFormControl,
      'TOATLLIMIT': this.totalLimitFormControl,
      'CPEXPIRY': this.cpExpiryDateFormControl,
      'TEMPEXT': this.temporaryExtensionApproveduptoFormControl,
      'NUMBEROFAPPROVAL': this.numberofTEApprovedFormControl,
      'OFFERLETTERISUE': this.offerLetterIssuedOnFormControl,
      'OFFERLETTERR': this.offerLetterReceivedOnFormControl,
      'FINACEISUE': this.financeDocumentIssuedOnFormControl,
      'FINACEREC': this.financeDocumentReceivedOnFormControl,
      'DIS1ISSUE': this.discrepanciesMemoNo1IssuedOnFormControl,
      'DISC1REC': this.discrepanciesMemoNo1ReceivedOnFormControl,
      'DIS2ISSUE': this.discrepanciesMemoNo2IssuedOnFormControl,
      'DISCR2REC': this.discrepanciesMemoNo2ReceivedOnFormControl,
      'LINEREALSE': this.linesReleaseDateFormControl,
      'REMARKS': this.remarksFormControl,
      'REGION': this.regionFormControl,
      'BS': this.businessSegmentFormControl

    });


    this.loadCustomerDemographicData();
    // this.ongetload();
    // this.loadBranches();
    console.log("customer Demographics");

    console.log(this.restservice.getRoleData());

    console.log(localStorage.getItem('Edit'));

    console.log(localStorage.getItem('View'));

    console.log(localStorage.getItem('Delete'));

    this.onDate();



    // if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'false') {

    //   this.hideEditButton = false;

    //   this.hideForm = false;

    //   this.hideDeleteButton = true;

    //   console.log("edit given");

    // }

    // else if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'true' && localStorage.getItem('View') == 'false') {

    //   this.hideEditButton = false;

    //   this.hideForm = false;

    //   this.hideDeleteButton = false;

    //   console.log("edit and delete given");

    // }

    // else if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'true') {

    //   this.hideEditButton = false;

    //   this.hideForm = false;

    //   this.hideDeleteButton = true;

    //   console.log("all rights given");

    // }

    // else if (localStorage.getItem('Edit') == 'false' && localStorage.getItem('Delete') == 'true' && localStorage.getItem('View') == 'true') {

    //   this.hideEditButton = true;

    //   this.hideForm = true;

    //   this.hideDeleteButton = false;

    //   console.log("delete and view given");

    // }

    // else if (localStorage.getItem('Edit') == 'false' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'true') {

    //   this.hideEditButton = true;

    //   this.hideForm = true;

    //   this.hideDeleteButton = true;



    //   console.log("NONE given");

    // }



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

  addCustomerDemographic() {

    console.log(this.CplogbookApprovedDetails);
    console.log("Testing101", this.formGroup.status);
    var user= localStorage.getItem('userFullName')
    var today = new Date();
    // if(!this.formGroup.errors) {
    if (this.CplogbookApprovedDetails.object_id == "") {
      this.CplogbookApprovedDetails.createdOn =today.toString();
      if (this.CplogbookApprovedDetails) {
        //this.CplogbookApprovedDetails.receiveddateatCAD = CplogbookApprovedDetails.receiveddateatCAD
        // var branch_code_id = this.CplogbookApprovedDetails.branchCode;
        // this.CplogbookApprovedDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.CplogbookApprovedDetails.createdBy= user;
        this.CplogbookApprovedService.createCplogbookApproved(this.CplogbookApprovedDetails).subscribe((data: {}) => {
          this.CplogbookApprovedDetails.createdBy= user;
          console.log(this.CplogbookApprovedDetails.createdBy)
          //this.toastr.success('Cplogbook details Added Successfully');
          this.openSnackBar('Cplogbook details Added Successfully', 'Sure');
          this.clearform();
          console.log(this.CplogbookApprovedDetails);
          this.CplogbookApprovedDetails.createdBy= user;
          this.loadCustomerDemographicData();
          console.log(this.CplogbookApprovedDetails);
        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.CplogbookApprovedDetails.modifiedBy= user;
       // this.customerDemographicDetails.modifiedBy= user;
        this.CplogbookApprovedDetails.modifiedOn =today.toString();
        this.CplogbookApprovedService.updateCplogbookApproved(this.CplogbookApprovedDetails.primeNumber, this.CplogbookApprovedDetails).subscribe((data: {}) => {

          // this.toastr.success('plogbook details Updated Successfully');
          this.openSnackBar('Cplogbook details Updated Successfully', 'Sure');


        })

        location.reload();

      }



    }
    // } else {
    //   this.openSnackBar('Please Enter All Required Fields', 'Sure');
    // }



  }
  enable() {
    this.isDisabled = false
  }

  disable() {
    this.isDisabled = true
  }
  // onSearchChangeBranch(searchValue) {
  //   console.log("hi mariaaaaa");
  //   console.log("hi maria", searchValue);


  //   var branchIndex = -1;
  //   for (var i = 0; i < this.allBranchesDetails.length; i++) {
  //     if (this.allBranchesDetails[i].BranchCode == searchValue) { branchIndex = i; }
  //   }
  //   this.CplogbookApprovedDetails.branchName = this.allBranchesDetails[branchIndex].BranchName;

  //  // this.CplogbookApprovedDetails.branchName = this.allBranchesDetails[searchValue].BranchName
  //   //this.CplogbookApprovedDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  //   console.log("hiiiii", this.CplogbookApprovedDetails.branchName);
  //   localStorage.setItem("branchName", this.CplogbookApprovedDetails.branchName);
  //   // return this.branchService.getCustomerDemographic(this.branchDetails.BranchCode).subscribe((data: {}) => {

  //   //   this.inputdata = data

  //   //   console.log(this.inputdata);

  //   //   this.branchService.setCustomerDemographicData(data);
  //   // });
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchByTab() {

    if (!this.CplogbookApprovedDetails.primeNumber) {

      return this.CplogbookApprovedService.getCplogbookApproved(this.CplogbookApprovedDetails.primeNumber).subscribe((data: {}) => { })

    }

  }
  textBoxDisabled = true;

  toggle() {
    console.log("toggle called")
    this.textBoxDisabled = !this.textBoxDisabled;
    console.log(this.textBoxDisabled)
  }
  // ongetload() {
  //   console.log("hi i am here");

  //   this.branchName = localStorage.getItem("branchName");
  //   console.log(this.branchName);
  //   return this.branchName;  // console.log (this.branchName);
  // }
  loadBranches() {
    return this.branchService.getCustomerDemographics().subscribe((data: {}) => {
      this.allBranchesDetails = data;
      console.log(this.allBranchesDetails);
      this.selectedBranch = this.allBranchesDetails[0];
      console.log("hiiiiii", this.selectedBranch);

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
  nameOfBorrower;
  branchCodee;
  branchNamee;
  cpexiryDate;
  dateEe;
  mm;
  dd;
  yy;
  goback() {
    console.log("goback")
    this.router.navigate(['dashboard'])
  }

  onkeyup(){
console.log(this.CplogbookApprovedDetails.primeNumber)
    this.CplogbookApprovedService.findOneCustomerDemographics(this.CplogbookApprovedDetails.primeNumber).subscribe((data :{})=>{
    console.log("mariaaaa",data)
    console.log( Object.keys( data ).length ) ;
    var length = Object.keys( data ).length
    if(length==1){
      alert("Prime Number already exist on Cplogbook")
     
    }
    else{
      this.onFocusOut();
    }
    })
  }
  onFocusOut() {
    this.CplogbookApprovedService.findOneCustomerDemographics(this.CplogbookApprovedDetails.primeNumber).subscribe((data: {}) => { })
    var data = this.CplogbookApprovedService.getCplogbookApprovedData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);
      this.CplogbookApprovedDetails = {
        object_id: data[0]._id,
        primeNumber: data[0].primeNumber,
        receivedDateatCAD: data[0].receivedDateatCAD,
        nameofBusinessSegment: data[0].nameofBusinessSegment,
        region: data[0].region,
        branchCode: data[0].branchCode,
        branchName: data[0].branchName,
        nameOfBorrower: data[0].nameOfBorrower,
        cPType: data[0].cPType,
        facilityType: data[0].facilityType,
        cPReferenceNo: data[0].cPReferenceNo,
        // nameOfGroup: data[0].nameOfGroup,
        cPInitialDate: data[0].cPInitialDate,
        cPApprovalDate: data[0].cPApprovalDate,
        approvalLevel: data[0].approvalLevel,
        nameofRM: data[0].nameofRM,
        nameofTeamLeader: data[0].nameofTeamLeader,
        totalFBLimit: data[0].totalFBLimit,
        totalNFBLimit: data[0].totalNFBLimit,
        totalLimit: data[0].totalLimit,
        cpExpiryDate: data[0].cpExpiryDate,
        temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,
        numberofTEApproved: data[0].numberofTEApproved,
        offerLetterIssuedOn: data[0].offerLetterIssuedOn,
        offerLetterReceivedOn: data[0].offerLetterReceivedOn,
        financeDocumentIssuedOn: data[0].financeDocumentIssuedOn,
        financeDocumentReceivedOn: data[0].financeDocumentReceivedOn,
        discrepanciesMemoNo1IssuedOn: data[0].discrepanciesMemoNo1IssuedOn,
        discrepanciesMemoNo1ReceivedOn: data[0].discrepanciesMemoNo1ReceivedOn,
        discrepanciesMemoNo2IssuedOn: data[0].discrepanciesMemoNo2IssuedOn,
        discrepanciesMemoNo2ReceivedOn: data[0].discrepanciesMemoNo2ReceivedOn,
        linesReleaseDate: data[0].linesReleaseDate,
        remarks: data[0].remarks,
        active: data[0].active,
        createdBy:data[0].createdBy,
        modifiedBy: data[0].modifiedBy,
       // createdBy : "",

    createdOn: data[0].createdOn,
    // modifiedBy:   data[0].modifiedBy,
     modifiedOn :   data[0].modifiedOn,
     deletedBy: data[0].deletedBy,
     deletedOn: data[0].deletedOn,
        RecordStatus: data[0].RecordStatus
      };
      console.log(this.CplogbookApprovedDetails);
    }



    else {
      console.log("here")
      console.log(this.CplogbookApprovedDetails.primeNumber)
      this.custService.cust(this.CplogbookApprovedDetails.primeNumber).subscribe((data: {}) => {
        console.log(data);
        this.custdata = data;
        this.cpexiryDate = this.custdata.data.customerLimitDetail[1].limitExpiryDate;
        this.dd = this.cpexiryDate.substr(0, 2);
        this.mm = this.cpexiryDate.substr(2, 2);
        this.yy = this.cpexiryDate.substr(4, 5);
        console.log(this.dd)
        console.log(this.mm)
        this.dateEe = this.dd + "/" + this.mm + "/" + this.yy;
      var cp= new Date(this.cpExpiryDate)
        console.log(this.dateEe)
        console.log(cp)
        // Date cp = new Data(cpexiryDate)
        this.customerTypeName = this.custdata.data.basicDetail.customertTypeName;
        this.cnicdata = this.custdata.data.customerCnicDetails;
        this.sbpcode = this.custdata.data.basicDetail["sbpCode "];
        this.nameOfBorrower = this.custdata.data.basicDetail.customerFullName;
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
        this.branchNamee = this.custdata.data.basicDetail.branchName;
        this.groupCode = this.custdata.data.customerLimitHeader.groupCode;
        this.totalFBlimit = this.custdata.data.customerLimitDetail[0]["limitAmount "];
        this.totalNFBlimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
        this.totalLimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
        this.groupName = this.custdata.data.customerLimitHeader.groupCode;
        this.cpExpiryDate = this.custdata.data.customerLimitDetail[0].limitExpiryDate;

        console.log("sbpcode", this.branchCodee);

        console.log("sbpcode", this.branchNamee);

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
        const datecp = Date.parse(this.cpExpiryDate)
        this.CplogbookApprovedDetails = {
          object_id: "",
          primeNumber: this.CplogbookApprovedDetails.primeNumber,
          receivedDateatCAD: "",
          nameofBusinessSegment: "",
          region: "",
          branchCode: this.branchCodee,
          branchName: this.branchNamee,
          nameOfBorrower: this.nameOfBorrower,
          cPType: "",
          facilityType: "",
          cPReferenceNo: "",
          // nameOfGroup: data[0].nameOfGroup,
          cPInitialDate: "",
          cPApprovalDate: "",
          approvalLevel: "",
          nameofRM: "",
          nameofTeamLeader: "",
          totalFBLimit: this.totalFBlimit,
          totalNFBLimit: this.totalNFBlimit,
          totalLimit: this.totalLimit,
          cpExpiryDate: this.dateEe,
          temporaryExtensionApprovedupto: "",
          numberofTEApproved: "",
          offerLetterIssuedOn: "",
          offerLetterReceivedOn: "",
          financeDocumentIssuedOn: "",
          financeDocumentReceivedOn: "",
          discrepanciesMemoNo1IssuedOn: "",
          discrepanciesMemoNo1ReceivedOn: "",
          discrepanciesMemoNo2IssuedOn: "",
          discrepanciesMemoNo2ReceivedOn: "",
          linesReleaseDate: "",
          remarks: "",
          RecordStatus:"",
          active: "",
          createdBy : "",

          createdOn:"",
           modifiedBy:  "",
           modifiedOn : "",
           deletedBy: "",
           deletedOn:"",
        };
        this.findOne();
      },
        error => {
          console.log("Error");
        }
      );

      // console.log("Inside Focus");
      // var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      console.log("hiiiiiiiiii", this.CplogbookApprovedDetails)
    }

    //   temporaryExtensionApprovedupto: data[0].temporaryExtensionApprovedupto,
    //   numberofTEApproved: data[0].numberofTEApproved,
    //   offerLetterIssuedOn: data[0].offerLetterIssuedOn,
    //   offerLetterReceivedOn: data[0].offerLetterReceivedOn,
    //   financeDocumentIssuedOn: data[0].financeDocumentIssuedOn,
    //   financeDocument

  };



  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.CplogbookApprovedService.getCplogbookApproved(this.CplogbookApprovedDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.CplogbookApprovedService.setCplogbookApprovedData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }


  validaions() {
console.log(this.CplogbookApprovedDetails)
    // if(!this.CplogbookApprovedDetails.primeNumber ||!this.CplogbookApprovedDetails.businessSegment||
    //   !this.CplogbookApprovedDetails.typeOfFacility || !this.CplogbookApprovedDetails.region
    //   || !this.CplogbookApprovedDetails.accountNo || !this.CplogbookApprovedDetails.cpApprovalDate
    //   || !this.CplogbookApprovedDetails.nameOfBorrower || !this.CplogbookApprovedDetails.cpApprovalNo
    //   ||!this.CplogbookApprovedDetails.conditions|| !this.CplogbookApprovedDetails.dueDate||
    //   !this.CplogbookApprovedDetails.acctionToBeTaken){
    if (!this.CplogbookApprovedDetails.primeNumber) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.nameofBusinessSegment) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.region) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.cPType) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.facilityType) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.cPReferenceNo) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.cPInitialDate) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.approvalLevel) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.nameofRM) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.nameofTeamLeader) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    else if (!this.CplogbookApprovedDetails.cpExpiryDate) {
      this.openSnackBar('please enter all the required fields', 'Sure');

    }
    // else if (!this.CplogbookApprovedDetails.linesReleaseDate) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.numberofTEApproved) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.financeDocumentIssuedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.financeDocumentReceivedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.discrepanciesMemoNo1IssuedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.discrepanciesMemoNo1ReceivedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.discrepanciesMemoNo2IssuedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.discrepanciesMemoNo2ReceivedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.remarks) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.offerLetterIssuedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
    // else if (!this.CplogbookApprovedDetails.offerLetterReceivedOn) {
    //   this.openSnackBar('please enter all the required fields', 'Sure');

    // }
     else {
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };

    if (this.CplogbookApprovedDetails.primeNumber.length < 6) {
      this.openSnackBar('please enter primeNumber of 6 digits', 'Sure');

    }
    // if(this.CplogbookApprovedDetails.accountNo.length==14){
    //   this.openSnackBar('please enter account number of 14 digits','Sure');

    //   }

    return 0;

  }

  loadCustomerDemographicData() {
    return this.CplogbookApprovedService.getCplogbookApproveds().subscribe((data: {}) => {
      this.allCplogbookApprovedDetails = data;
      console.log(data);

      this.dataSource = new MatTableDataSource(this.allCplogbookApprovedDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      // this.totalRec = (this.allCplogbookApprovedDetails.length / 5) * 10;
      // console.log(this.totalRec);
    });
  }
  findOne() {
    this.customerdemographicService.findOneCustomerDemographics(this.CplogbookApprovedDetails.primeNumber).subscribe((data: {}) => {
      console.log(this.CplogbookApprovedDetails.primeNumber)
      console.log("mariaaaaaaaaaaaaaaaaaaaafatimaaaaaaaaaaaaaaaaaaaaaaaaa")
      console.log(data);
      var findonedata = data;
      console.log(findonedata)
      console.log("if i get heree")
      if (findonedata[0] == null) {
        console.log("hereeee")
        alert("Please first make customer Demographics against the Prime Number")
      } else {
        console.log("mariaaaaaaaaaaaaaaaaa")
        console.log(findonedata[0].region)
        this.CplogbookApprovedDetails.region = findonedata[0].region
        console.log(this.CplogbookApprovedDetails.region)
        this.CplogbookApprovedDetails.nameofBusinessSegment = findonedata[0].businessSegment
      }

    })
  }

  alphanumeric(searchValue: string) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (searchValue.match(letters)) {
      // alert('Your registration number have accepted : you can try another');
      return true;
    }
    else {
      alert('Please input alphanumeric characters only');
      return false;
    }
  }
  editCustomerDemographic(CplogbookApprovedDetails) {
    
    window.confirm('Are you sure, you want to edit?')
    this.disable();
    var user= localStorage.getItem('userFullName')
    this.CplogbookApprovedDetails.modifiedBy= user;
    console.log(this.CplogbookApprovedDetails.modifiedBy)
    // this.CplogbookApprovedDetails.receivedDateatCAD = CplogbookApprovedDetails.receivedDateatCAD
    this.CplogbookApprovedDetails = CplogbookApprovedDetails;
    console.log(this.CplogbookApprovedDetails.receivedDateatCAD)
    console.log("hiiiiiiiiiiii", this.CplogbookApprovedDetails)


    this.VisiblitypNumb = true

  }

  onDate() {
    this.recievedDate = this.CplogbookApprovedDetails.receivedDateatCAD;
    console.log(this.recievedDate);

  }

  clearform() {

    this.CplogbookApprovedDetails.primeNumber = "";
    this.CplogbookApprovedDetails.receivedDateatCAD = "";

    this.CplogbookApprovedDetails.nameofBusinessSegment = "";

    this.CplogbookApprovedDetails.region = "";

    this.CplogbookApprovedDetails.branchCode = "";

    this.CplogbookApprovedDetails.branchName = "";

    this.CplogbookApprovedDetails.nameOfBorrower = "";

    this.CplogbookApprovedDetails.cPType = "";

    this.CplogbookApprovedDetails.facilityType = "";

    this.CplogbookApprovedDetails.cPReferenceNo = "";

    //this.CplogbookApprovedDetails.nameOfGroup = "";

    this.CplogbookApprovedDetails.cPInitialDate = "";

    this.CplogbookApprovedDetails.cPApprovalDate = "";

    this.CplogbookApprovedDetails.approvalLevel = "";

    this.CplogbookApprovedDetails.nameofRM = "";

    this.CplogbookApprovedDetails.nameofTeamLeader = "";

    this.CplogbookApprovedDetails.totalFBLimit = "";

    this.CplogbookApprovedDetails.totalNFBLimit = "";

    this.CplogbookApprovedDetails.totalLimit = "";

    this.CplogbookApprovedDetails.cpExpiryDate = "";

    this.CplogbookApprovedDetails.temporaryExtensionApprovedupto = "";

    this.CplogbookApprovedDetails.numberofTEApproved = "";

    this.CplogbookApprovedDetails.offerLetterIssuedOn = "";

    this.CplogbookApprovedDetails.offerLetterReceivedOn = "";

    this.CplogbookApprovedDetails.financeDocumentIssuedOn = "";

    this.CplogbookApprovedDetails.financeDocumentReceivedOn = "";

    this.CplogbookApprovedDetails.discrepanciesMemoNo1IssuedOn = "";

    this.CplogbookApprovedDetails.discrepanciesMemoNo1IssuedOn = "";
    this.CplogbookApprovedDetails.discrepanciesMemoNo1ReceivedOn = "";
    this.CplogbookApprovedDetails.discrepanciesMemoNo2IssuedOn = "";
    this.CplogbookApprovedDetails.discrepanciesMemoNo2ReceivedOn = "";
    this.CplogbookApprovedDetails.linesReleaseDate = "";
    this.CplogbookApprovedDetails.remarks = "";
    this.CplogbookApprovedDetails.RecordStatus ="";
    this.CplogbookApprovedDetails.createdBy = "";

    this.CplogbookApprovedDetails.createdOn= "";
    this.CplogbookApprovedDetails.modifiedBy= "";
    this.CplogbookApprovedDetails.modifiedOn = "";
    this.CplogbookApprovedDetails.deletedBy= "";
     this.CplogbookApprovedDetails.deletedOn= "";
  //  this.CplogbookApprovedDetails.createdBy="";
  //  this.CplogbookApprovedDetails.modifiedBy= "";
  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.CplogbookApprovedService.getCplogbookApproved(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allCplogbookApprovedDetails = this.inputdata;

      this.CplogbookApprovedService.setCplogbookApprovedData(data);

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
  hideEdit ="true";

  editrights(){
    if(localStorage.getItem('Edit') == 'true'){
      this.hideEdit="false";
      console.log(this.hideEdit)
    }else{
      this.hideEdit= "true";
    }

  }

  deleteCustomer(primeNumber) {
    (window.confirm('Are you sure, you want to delete?')) 
    var user= localStorage.getItem('userFullName')
    this.CplogbookApprovedDetails.deletedBy = user;
    var today = new Date();
    this.CplogbookApprovedDetails.createdOn =today.toString();
      this.CplogbookApprovedService.deleteCplogbookApproved(primeNumber).subscribe(data => {
        // this.toastr.success('Cplogbook details deleted Successfully');
        this.openSnackBar('Cplogbook details deleted Successfully', 'Sure');

        this.loadCustomerDemographicData();

      })

    }
   

  

}
