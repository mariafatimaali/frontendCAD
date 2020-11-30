import { collateral } from '../../_models/collateral.model';
import * as XLSX from 'xlsx';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { UserIdleService } from 'angular-user-idle';
import { ColdescService } from '../../_services/coldesc/coldesc.service';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { safeInOutRegisterService } from "../../_services/safeInOutRegister/safeInOutRegister.service";
import { format } from 'url';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import { safeInOutRegister } from 'src/app/_models/safeInOutRegister.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BranchService} from '../../_services/branches/branches.service';
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
interface ack {
  value: string;
  viewValue: string;
}
interface col {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-safein',
  templateUrl: './safein.component.html',
  styleUrls: ['./safein.component.scss'],
  //providers: [DateFormatPipe]
})
export class SafeinComponent implements OnInit {
    business: businessSegment[] = [
      { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Commercial', viewValue: 'Commercial' },
    { value: 'FI', viewValue: 'FI' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Retail', viewValue: 'Retail' },
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
      ];

      Ack: ack[] = [
        {value: 'Yes', viewValue: 'Yes'},
        {value: 'No', viewValue: 'No'},
       
      ];
      Col: col[] = [
      {value:'	A01	 ',viewValue:'	A01	 '},
{value:'	A02	 ',viewValue:'	A02	 '},
{value:'	A04	 ',viewValue:'	A04	 '},
{value:'	A05	 ',viewValue:'	A05	 '},
{value:'	A08	 ',viewValue:'	A08	 '},
{value:'	A20	 ',viewValue:'	A20	 '},
{value:'	A21	 ',viewValue:'	A21	 '},
{value:'	A22	 ',viewValue:'	A22	 '},
{value:'	A23	 ',viewValue:'	A23	 '},
{value:'	A24	 ',viewValue:'	A24	 '},
{value:'	A25	 ',viewValue:'	A25	 '},
{value:'	A26	 ',viewValue:'	A26	 '},
{value:'	A27	 ',viewValue:'	A27	 '},
{value:'	A28	 ',viewValue:'	A28	 '},
{value:'	A29	 ',viewValue:'	A29	 '},
{value:'	A30	 ',viewValue:'	A30	 '},
{value:'	A31	 ',viewValue:'	A31	 '},
{value:'	A32	 ',viewValue:'	A32	 '},
{value:'	A33	 ',viewValue:'	A33	 '},
{value:'	A35	 ',viewValue:'	A35	 '},
{value:'	A36	 ',viewValue:'	A36	 '},
{value:'	A37	 ',viewValue:'	A37	 '},
{value:'	A38	 ',viewValue:'	A38	 '},
{value:'	A39	 ',viewValue:'	A39	 '},
{value:'	A41	 ',viewValue:'	A41	 '},
{value:'	A42	 ',viewValue:'	A42	 '},
{value:'	A43	 ',viewValue:'	A43	 '},
{value:'	A44	 ',viewValue:'	A44	 '},
{value:'	A45	 ',viewValue:'	A45	 '},
{value:'	A46	 ',viewValue:'	A46	 '},
{value:'	A47	 ',viewValue:'	A47	 '},
{value:'	A53	 ',viewValue:'	A53	 '},
{value:'	A54	 ',viewValue:'	A54	 '},
{value:'	A55	 ',viewValue:'	A55	 '},
{value:'	A56	 ',viewValue:'	A56	 '},
{value:'	A57	 ',viewValue:'	A57	 '},
{value:'	A58	 ',viewValue:'	A58	 '},
{value:'	A59	 ',viewValue:'	A59	 '},
{value:'	A63	 ',viewValue:'	A63	 '},
{value:'	A64	 ',viewValue:'	A64	 '},
{value:'	A66	 ',viewValue:'	A66	 '},
{value:'	A71	 ',viewValue:'	A71	 '},
{value:'	A82	 ',viewValue:'	A82	 '},
{value:'	A83	 ',viewValue:'	A83	 '},
{value:'	A84	 ',viewValue:'	A84	 '},
{value:'	A85	 ',viewValue:'	A85	 '},
{value:'	A86	 ',viewValue:'	A86	 '},
{value:'	A87	 ',viewValue:'	A87	 '},
{value:'	A91	 ',viewValue:'	A91	 '},
{value:'	A92	 ',viewValue:'	A92	 '},
{value:'	A93	 ',viewValue:'	A93	 '},
{value:'	A94	 ',viewValue:'	A94	 '},
{value:'	A95	 ',viewValue:'	A95	 '},
{value:'	A96	 ',viewValue:'	A96	 '},
{value:'	A97	 ',viewValue:'	A97	 '},
{value:'	A98	 ',viewValue:'	A98	 '},
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
      pattern="^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$";
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
primeFormControl = new FormControl('', [ Validators.required]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  collateralReferenceFormControl = new FormControl('', [ Validators.required,Validators.pattern(('^[0-9]$'))]);

  collateralTypeDescriptionFormControl = new FormControl('', [Validators.required]);
  detailofCollateralFormControl = new FormControl('', [ Validators.required]);


  listofDocumentsFormControl = new FormControl('', [Validators.required]);

  acknowledgementReceiptOfBorrowerFormControl = new FormControl('', [Validators.required]);
  permanentSafeoutDateFormControl = new FormControl('', [ Validators.required]);
  temporarySafeoutDateControl = new FormControl('', [Validators.required]);
 safeinDateFormControl = new FormControl('', [ Validators.required]);
  remarksFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
 // matcher = new MyErrorStateMatcher();



displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','collateralReference',
'collateralTypeDescription','detailofCollateral','safeinDate','temporarySafeoutDate','permanentSafeoutDate',
'acknowledgementReceiptOfBorrower','remarks','listofDocuments','createdBy','createdOn','modifiedBy','modifiedOn'];
dataSource = new MatTableDataSource();
places: Array<any> = [];

  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
  branchName:any;
  //tableprimenumber: number;
  allBranchesDetails:any=[];
  //selectedBranch :allBranchesDetails[];
  selectedBranch: any ;

  BranchName: string;
  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////

  tableprimenumber: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;

  page: any = 1;

  previousPage: any;

  totalRec: number;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];

  allsafeInOutRegisterDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////



  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;





  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() safeInOutRegisterDetails = {

    object_id: "",
    primeNumber: "",
    receivedDateAtCAD: "",
    businessSegment:"",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfBorrower: "",
    collateralReference: "",
    collateralTypeDescription: "",
   // sBPApprovalLetterDate: "",
    detailofCollateral: "",
    safeinDate: "",
    temporarySafeoutDate: "",
    permanentSafeoutDate: "",
    acknowledgementReceiptOfBorrower: "",
    remarks:"",
    listofDocuments: "",
    dataStatus: "",
 
    createdBy : "",

    createdOn: "",
     modifiedBy:   "",
     modifiedOn :   "",
     deletedBy:  "",
     deletedOn: "",
    active:"",
    collateralType:"",

  };
  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };

  constructor(
    private customerdemographicService:CustomerDemographicService,
    private userIdle: UserIdleService,
    private formBuilder: FormBuilder,
    private safeInOutRegisterService: safeInOutRegisterService,
    private branchService : BranchService,
    public actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private custService:CustService,
  //  private toastr: ToastrService,
 // private _dateFormatPipe: DateFormatPipe,
    public router: Router,
private coldescService : ColdescService,
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
  
 
    //this.coldemo();
    this.formGroup= this.formBuilder.group({
      'PRIMENUMBER':this.primeFormControl,
      'BRANCHCODE':this.BranchCodeFormControl,
      'BRANCHNAME':this.branchNameControl,
      'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
      'collateralReference':this.collateralReferenceFormControl,
      'collateralType':this.collateralTypeDescriptionFormControl,
      'detailofCollateral':this.detailofCollateralFormControl,
      'acknowledgementReceipt':this.acknowledgementReceiptOfBorrowerFormControl,
      'permanentSafeout':this.permanentSafeoutDateFormControl,

      'temporarySafeout': this.temporarySafeoutDateControl,


      'istofDocuments':this.listofDocumentsFormControl,
      'SAFEINDATE':this.safeinDateFormControl,
      'REMARKS':this.remarksFormControl,
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.safeInOutRegisterDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.safeInOutRegisterDetails.primeNumber)
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
        this.safeInOutRegisterDetails.region=findonedata[0].region
        console.log(this.safeInOutRegisterDetails.region)
        this.safeInOutRegisterDetails.businessSegment=findonedata[0].businessSegment
      }
      
    })
    }
    

@Input() collateraldata = {
  collateralType: "A01",
  collateralReference: "B1ABFQ 03",
     dealType:"",
   dealBranch:"",
  dealReference:"",
  accountNumber:""

};
coldate :any;
  coldemo() {
    console.log('hereee')
 
    this.coldescService.cust(this.safeInOutRegisterDetails.collateralType,this.safeInOutRegisterDetails.collateralReference).subscribe((data: {}) => {
      console.log(data);
     
      this.coldate = data;
     console.log (this.coldate);
     console.log(this.coldate.data.collateralTypeDescription)
      
     this.safeInOutRegisterDetails.collateralTypeDescription= this.coldate.data.collateralTypeDescription
     console.log(this.safeInOutRegisterDetails.collateralTypeDescription);
    },
      error => {
        console.log("Error");
      }
    );
  }
 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
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
onSearchChangeBranch(searchValue){
  console.log("hi mariaaaaa");
  console.log("hi maria",searchValue);
  
    var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.safeInOutRegisterDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
//  this.safeInOutRegisterDetails.branchName=this.allBranchesDetails[searchValue].BranchName
  //this.safeInOutRegisterDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.safeInOutRegisterDetails.branchName);
  localStorage.setItem("branchName",this.safeInOutRegisterDetails.branchName);
    // return this.branchService.getCustomerDemographic(this.branchDetails.BranchCode).subscribe((data: {}) => {

    //   this.inputdata = data

    //   console.log(this.inputdata);

    //   this.branchService.setCustomerDemographicData(data);
    // });
}


  addCustomerDemographic() {
    var user= localStorage.getItem('userFullName')
    this.safeInOutRegisterDetails.createdBy= user;
console.log(this.safeInOutRegisterDetails)
    if (this.safeInOutRegisterDetails.object_id == "") {
      var today = new Date();
      if (this.safeInOutRegisterDetails) {
        this.safeInOutRegisterDetails.createdBy= user;
        this.safeInOutRegisterDetails.createdOn =today.toString();
      
        this.safeInOutRegisterDetails.createdBy= user;
        // var branch_code_id = this.safeInOutRegisterDetails.branchCode;
        // this.safeInOutRegisterDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.safeInOutRegisterService.createCustomerDemorgaphics(this.safeInOutRegisterDetails).subscribe((data: {}) => {
          this.safeInOutRegisterDetails.createdBy= user;
        //  this.toastr.success('Safein Register Added Successfully');
        this.openSnackBar('Safein Register Added Successfully','Sure');
          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
//  var branch_code_id = this.safeInOutRegisterDetails.branchCode;
this.safeInOutRegisterDetails.modifiedBy= user;

this.safeInOutRegisterDetails.modifiedOn =today.toString();
//         this.safeInOutRegisterDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.safeInOutRegisterService.updateCustomerDemorgaphics(this.safeInOutRegisterDetails.primeNumber, this.safeInOutRegisterDetails).subscribe((data: {}) => {
          this.safeInOutRegisterDetails.modifiedBy= user;
          //this.toastr.success('Safein Register Updated Successfully');
          this.openSnackBar('Safein Register Updated Successfully','Sure');


        })

        location.reload();

      }



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
  fetchByTab() {

    if (!this.safeInOutRegisterDetails.primeNumber) {

      return this.safeInOutRegisterService.getCustomerDemographic(this.safeInOutRegisterDetails.primeNumber).subscribe((data: {}) => { })

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

    this.safeInOutRegisterService.getCustomerDemographic(this.safeInOutRegisterDetails.primeNumber).subscribe(() => { })
    var data = this.safeInOutRegisterService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.safeInOutRegisterDetails = {

    
      object_id: data[0]._id,
      primeNumber: data[0].primeNumber,
      receivedDateAtCAD: data[0].receivedDateAtCAD,
      businessSegment: data[0].businessSegment,
      region: data[0].region,
      branchCode: data[0].branchCode,
      branchName: data[0].branchName,
      nameOfBorrower: data[0].nameOfBorrower,
      collateralReference: data[0].collateralReference,
      collateralTypeDescription: data[0].collateralTypeDescription,
     // sBPApprovalLetterDate: data[0].sBPApprovalLetterDate,
      detailofCollateral: data[0].detailofCollateral,
      safeinDate: data[0].safeinDate,
      temporarySafeoutDate: data[0].temporarySafeoutDate,
      permanentSafeoutDate: data[0].permanentSafeoutDate,
      acknowledgementReceiptOfBorrower: data[0].acknowledgementReceiptOfBorrower,
      remarks: data[0].remarks,
      listofDocuments: data[0].listofDocuments,
      dataStatus: data[0].dataStatus,
      createdBy:data[0].createdBy,
      modifiedBy: data[0].modifiedBy,
      collateralType:data[0].collateralType,
     // createdBy : "",

  createdOn: data[0].createdOn,
  // modifiedBy:   data[0].modifiedBy,
   modifiedOn :   data[0].modifiedOn,
   deletedBy: data[0].deletedBy,
   deletedOn: data[0].deletedOn,

      active: data[0].active


    };
      console.log(this.safeInOutRegisterDetails);
    }



    else {
      console.log("here")
      console.log(this.safeInOutRegisterDetails.primeNumber)
      this.custService.cust(this.safeInOutRegisterDetails.primeNumber).subscribe((data: {}) => {
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

    
          this.safeInOutRegisterDetails = {

      object_id: "",
      primeNumber: this.safeInOutRegisterDetails.primeNumber,
      receivedDateAtCAD:  "",
      businessSegment:  "",
      region:  "",
      branchCode:  this.branchCodee,
      branchName:  this.branchNamee,
      nameOfBorrower: this.nameOfBorrower,
      collateralReference:  "",
      collateralTypeDescription:  "",
     // sBPApprovalLetterDate: data[0].sBPApprovalLetterDate,
      detailofCollateral: "",
            safeinDate: "",
      temporarySafeoutDate:  "",
      permanentSafeoutDate:  "",
      acknowledgementReceiptOfBorrower: "",
      remarks:  "",
      listofDocuments: "",
      dataStatus: "",
      createdBy : "",

      createdOn:"",
       modifiedBy:  "",
       modifiedOn : "",
       deletedBy: "",
       deletedOn:"",
      active: "",
      collateralType:"",

    
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

      console.log("hiiiiiiiiii", this.safeInOutRegisterDetails)
    }
    // console.log("Inside Focus");

    // var data = this.safeInOutRegisterService.getCustomerDemographicData()

    // console.log('data ka zero index : ', data[0]);

    // this.safeInOutRegisterDetails = {

    //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,
    //   receivedDateAtCAD: data[0].receivedDateAtCAD,
    //   businessSegment: data[0].businessSegment,
    //   region: data[0].region,
    //   branchCode: data[0].branchCode,
    //   branchName: data[0].branchName,
    //   nameOfBorrower: data[0].nameOfBorrower,
    //   collateralReference: data[0].collateralReference,
    //   collateralTypeDescription: data[0].collateralTypeDescription,
    //  // sBPApprovalLetterDate: data[0].sBPApprovalLetterDate,
    //   detailofCollateral: data[0].detailofCollateral,
    //   safeinDate: data[0].safeinDate,
    //   temporarySafeoutDate: data[0].temporarySafeoutDate,
    //   permanentSafeoutDate: data[0].permanentSafeoutDate,
    //   acknowledgementReceiptOfBorrower: data[0].acknowledgementReceiptOfBorrower,
    //   remarks: data[0].remarks,
    //   listofDocuments: data[0].listofDocuments,
    //   dataStatus: data[0].dataStatus,
    //   createdBy: data[0].createdBy,
    //   modifiedBy: data[0].modifiedBy,
    //   active: data[0].active



    // };

  }



  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.safeInOutRegisterService.getCustomerDemographic(this.safeInOutRegisterDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.safeInOutRegisterService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }



  loadCustomerDemographicData() {
 return this.safeInOutRegisterService.getCustomerDemographics().subscribe((data: {}) => {
      this.allsafeInOutRegisterDetails = data;
      console.log(data)
      this.dataSource = new MatTableDataSource(this.allsafeInOutRegisterDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }


  validaions(){

    // if(!this.safeInOutRegisterDetails.primeNumber ||!this.safeInOutRegisterDetails.businessSegment||
    //   !this.safeInOutRegisterDetails.permanentSafeoutDate || !this.safeInOutRegisterDetails.region
    //   || !this.safeInOutRegisterDetails.safeinDate || !this.safeInOutRegisterDetails.temporarySafeoutDate
    //   || !this.safeInOutRegisterDetails.acknowledgementReceiptOfBorrower || this.safeInOutRegisterDetails.collateralReference
    //   ||this.safeInOutRegisterDetails.nameOfBorrower){
      if(!this.safeInOutRegisterDetails.primeNumber){
        this.openSnackBar('please enter all the required fields','Sure');

    }
  else  if(!this.safeInOutRegisterDetails.businessSegment){
      this.openSnackBar('please enter all the required fields','Sure');

  }
 else if(!this.safeInOutRegisterDetails.region){
    this.openSnackBar('please enter all the required fields','Sure');

}
// else if(!this.safeInOutRegisterDetails.permanentSafeoutDate){
//   this.openSnackBar('please enter all the required fields','Sure');

// }
// else if(!this.safeInOutRegisterDetails.acknowledgementReceiptOfBorrower){
//   this.openSnackBar('please enter all the required fields','Sure');

// }
else if(!this.safeInOutRegisterDetails.collateralReference){
  this.openSnackBar('please enter all the required fields','Sure');

}
else if(!this.safeInOutRegisterDetails.collateralTypeDescription){
  this.openSnackBar('please enter all the required fields','Sure');

}
else if(!this.safeInOutRegisterDetails.safeinDate){
  this.openSnackBar('please enter all the required fields','Sure');

}
// else if(!this.safeInOutRegisterDetails.temporarySafeoutDate){
//   this.openSnackBar('please enter all the required fields','Sure');

// }
// else if(!this.safeInOutRegisterDetails.remarks){
//   this.openSnackBar('please enter all the required fields','Sure');

// }

    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
     if(this.safeInOutRegisterDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }
    return 0;
  }

  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  editCustomerDemographic(safeInOutRegisterData) {
    window.confirm('Are you sure, you want to edit?')
    this.onFocusOut();
    this.disable();
    this.safeInOutRegisterDetails = safeInOutRegisterData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.safeInOutRegisterDetails.primeNumber = "";

    this.safeInOutRegisterDetails.branchCode = "";
    this.safeInOutRegisterDetails.receivedDateAtCAD = "";
    this.safeInOutRegisterDetails.businessSegment = "";

    this.safeInOutRegisterDetails.region = "";

    this.safeInOutRegisterDetails.branchCode = "";

    this.safeInOutRegisterDetails.branchName = "";

    this.safeInOutRegisterDetails.nameOfBorrower = "";

    this.safeInOutRegisterDetails.collateralReference = "";

    this.safeInOutRegisterDetails.collateralTypeDescription = "";

    this.safeInOutRegisterDetails.detailofCollateral = "";

    this.safeInOutRegisterDetails.safeinDate = "";

    this.safeInOutRegisterDetails.temporarySafeoutDate = "";

    this.safeInOutRegisterDetails.permanentSafeoutDate = "";

    this.safeInOutRegisterDetails.remarks = "";

    this.safeInOutRegisterDetails.listofDocuments = "";


    this.safeInOutRegisterDetails.dataStatus = "";
    this.safeInOutRegisterDetails.createdBy = "";

    this.safeInOutRegisterDetails.createdOn= "";
    this.safeInOutRegisterDetails.modifiedBy= "";
    this.safeInOutRegisterDetails.modifiedOn = "";
    this.safeInOutRegisterDetails.deletedBy= "";
     this.safeInOutRegisterDetails.deletedOn= "";
     this.safeInOutRegisterDetails.collateralType="";

    // this.safeInOutRegisterDetails.dataStatus = "";

    // this.safeInOutRegisterDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.safeInOutRegisterService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allsafeInOutRegisterDetails = this.inputdata;

      this.safeInOutRegisterService.setCustomerDemographicData(data);

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
      this.safeInOutRegisterDetails.deletedBy = user;
      var today = new Date();
      this.safeInOutRegisterDetails.deletedOn =today.toString();
      this.safeInOutRegisterService.deleteCustomersdemographic(primeNumber).subscribe(data => {
      // this.toastr.success('Safein Register deleted Successfully');
      this.openSnackBar('Safein Register Updated Successfully','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }


}
