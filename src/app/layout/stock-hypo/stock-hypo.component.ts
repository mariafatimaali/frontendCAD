import * as XLSX from 'xlsx';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { CustService } from '../../_services/custdemo/custdemo.service';
import { UserIdleService } from 'angular-user-idle';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stockInspectionService } from "../../_services/stockInspection/stock-Inspection.service";
import { format } from 'url';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { stockInspection } from 'src/app/_models/stockInspection.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import {BranchService} from '../../_services/branches/branches.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface conductedBy{
  value: string;
  viewValue:string;
}

interface frequency{
  value: string;
  viewValue: string;
}
interface outSource{
  value :string;
  viewValue :string;
}
interface year{
  value :string;
  viewValue :string;
}
@Component({
  selector: 'app-stock-hypo',
  templateUrl: './stock-hypo.component.html',
  styleUrls: ['./stock-hypo.component.scss'],
  //providers: [DateFormatPipe]
})
export class StockHypoComponent implements OnInit {
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
  Conductedby: conductedBy[] = [
    {value: '', viewValue: ''},
    {value: 'By RCAD', viewValue: 'By RCAD'},
    {value: 'By BU', viewValue:  'By BU'},
    {value: 'By Audit', viewValue: 'By Audit'},
    {value: 'By RCAD & BU', viewValue: 'By RCAD & BU'},
    {value: 'Outsource', viewValue: 'Outsource'},
    {value: ' Joint Inspection with Other Banks', viewValue: 'Joint Inspection with Other Banks'},




  ];
    Outsource: outSource[] = [
  {value:'Al-Hadi Financial & Legal Consultants',viewValue :'Al-Hadi Financial & Legal Consultants'},
  {value:'Aman Intl',viewValue:'Aman Intl'},
    {value:'Asrem Pvt Ltd' ,viewValue:'Asrem Pvt Ltd'},
      {value:'Atlantic Surveyors Private Ltd',viewValue:'Atlantic Surveyors Private Ltd'},
        {value:'Commodity Resource ',viewValue:'Commodity Resource '},
          {value: 'Dimensions',viewValue:'Dimensions',},
            {value:'Commodity Resource ',viewValue:'Commodity Resource'},
              {value:'Ghurzang Management Pvt Ltd',viewValue:'Ghurzang Management Pvt Ltd'},

                {value:'Commodity Resource ',viewValue:'Commodity Resource '},
                  {value: 'Harvester Services Pvt Ltd',viewValue:'Harvester Services Pvt Ltd'},
                  {value:   'Imtech Pvt Ltd',viewValue:'Imtech Pvt Ltd'},
                  {value:  'K.G.Traders Pvt Ltd',viewValue:'K.G.Traders Pvt Ltd'},                                   
                  {value:  'Luckhiya Associates Pvt Ltd',viewValue:'Luckhiya Associates Pvt Ltd'},
                  {value: 'Matertials & Design Services (Pvt.) Ltd',viewValue:'Matertials & Design Services (Pvt.) Ltd'},
                  {value: 'MYK Associates Pvt Ltd ',viewValue:'MYK Associates Pvt Ltd'},
                  {value: 'Oriental Engineering Services',viewValue:'Oriental Engineering Services'},
                  {value: 'PIFCO Enterprises',viewValue:'PIFCO Enterprises'},
                     {value:'Professional Associates',viewValue:'Professional Associates'},
                     {value:'Tanveer Syed Consultancy',viewValue:'Tanveer Syed Consultancy'},
                     {value:'Tristar International Consultant Pvt Ltd',viewValue:'Tristar International Consultant Pvt Ltd'},
    ];

  Frequency: frequency[] = [

    // {value: 'Daily', viewValue: 'Daily'},
    // {value: 'Weekly', viewValue: 'Weekly'},
    // {value: 'Fortnightly', viewValue: 'Fortnightly'},
    {value: 'Monthly', viewValue: 'Monthly'},
    {value: 'Quarterly', viewValue: 'Quarterly'},
    {value: 'Semi-annualy', viewValue: 'Semi-annualy'},
    {value: 'Annualy', viewValue: 'Annualy'}

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
  frequencyFormControl = new FormControl('', [ Validators.required]);
  all1QTRConductedByFormControl = new FormControl('', [ Validators.required]);
  all1QTRConductedDateFormControl = new FormControl('', [ Validators.required]);
  all2QTRConductedByFormControl = new FormControl('', [ Validators.required]);
  all2QTRConductedDateFormControl = new FormControl('', [ Validators.required]);
  all3QTRConductedByFormControl = new FormControl('', [ Validators.required]);
  all3QTRConductedDateFormControl = new FormControl('', [ Validators.required]);
  all4QTRConductedByFormControl = new FormControl('', [ Validators.required]);
  all4QTRConductedDateFormControl = new FormControl('', [ Validators.required]);
  remarksFormControl = new FormControl('', [ Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
  yearFormControl = new FormControl('', [ Validators.required]);
//
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','rMCreditHub',
'limit','frequency','year','all1QTRConductedBy','all1QTRConductedDate','all2QTRConductedBy','all2QTRConductedDate','all3QTRConductedBy','all3QTRConductedDate','all4QTRConductedBy'
, 'all4QTRConductedDate', 'remarks','createdBy','createdOn','modifiedBy','modifiedOn'];
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

   allstockInspectionDetails: any = [];

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

   @Input() stockInspectionDetails = {

     object_id: "",
     primeNumber: "",
     businessSegment: "",
     region: "",
     branchCode: "",
     branchName: "",
     nameOfBorrower: "",
     rMCreditHub: "",
     limit: "",
     frequency: "",
     all1QTRConductedBy: "",
     all1QTRConductedByOutsource: "",
     all1QTRConductedDate: "",
     all2QTRConductedBy: "",
     all2QTRConductedByOutsource: "",
     all2QTRConductedDate: "",
     all3QTRConductedBy: "",
     all3QTRConductedByOutsource: "",
     all3QTRConductedDate:"",
     all4QTRConductedBy: "",
     all4QTRConductedByOutsoruce: "",
     all4QTRConductedDate: "",
     remarks: "",
     dataStatus: "",
     createdBy : "",

     createdOn: "",
      modifiedBy:   "",
      modifiedOn :   "",
      deletedBy:  "",
      deletedOn: "",
 
     active: "",
     year:"",
   };

   constructor(
    private userIdle: UserIdleService,
    private custService:CustService,
    private customerdemographicService:CustomerDemographicService,
     private stockInspectionService: stockInspectionService,
     private formBuilder: FormBuilder,
     public actRoute: ActivatedRoute,
     private branchService : BranchService,
    // private toastr: ToastrService,
    private _snackBar: MatSnackBar,
     public router: Router,
   //  private _dateFormatPipe: DateFormatPipe,
     private restservice: RestService

   ) { }



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
  
 
    this.formGroup= this.formBuilder.group({
      'PRIMENUMBER':this.primeFormControl,
   'BRANCHCODE':this.BranchCodeFormControl ,
   'BRANCHNAME':this.branchNameControl ,
   'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
   'RMCREDITHUB':this.rMCreditHubFormControl ,
   'LIMIT':this.limitFormControl ,
   'FREQUENCY':this.frequencyFormControl,
   '1QTR':this.all1QTRConductedByFormControl,
   '1QTRDATE':this.all1QTRConductedDateFormControl,
   '2QTR':this.all2QTRConductedByFormControl,
   '2QTRDATE':this.all2QTRConductedDateFormControl,
   '3QTR':this.all3QTRConductedByFormControl,
   '3QTRDATE':this.all3QTRConductedDateFormControl,
  '4QTR':this.all4QTRConductedByFormControl,
  '4QTRDATE':this.all4QTRConductedDateFormControl,
  'REMARKS':this.remarksFormControl,
  'REGION':this.regionFormControl,
  'BS':this.businessSegmentFormControl,
'year':this.yearFormControl
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
  ExportTOExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }

   addCustomerDemographic() {
    // this.stockInspectionDetails.all1QTRConductedDate = this._dateFormatPipe.transform(this.stockInspectionDetails.all1QTRConductedDate);
    // this.stockInspectionDetails.all2QTRConductedDate = this._dateFormatPipe.transform(this.stockInspectionDetails.all2QTRConductedDate);
    // this.stockInspectionDetails.all3QTRConductedDate = this._dateFormatPipe.transform(this.stockInspectionDetails.all3QTRConductedDate);
    // this.stockInspectionDetails.all4QTRConductedDate = this._dateFormatPipe.transform(this.stockInspectionDetails.all4QTRConductedDate);
     console.log(this.stockInspectionDetails);
     var user= localStorage.getItem('userFullName')
     this.stockInspectionDetails.createdBy= user;
     if (this.stockInspectionDetails.object_id == "") {
      console.log(this.stockInspectionDetails);
      var today = new Date();
       if (this.stockInspectionDetails) {
        // var branch_code_id = this.stockInspectionDetails.branchCode;
        // this.stockInspectionDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.stockInspectionDetails.createdBy= user;
        
     // this.stockInspectionPledgeDetails.createdBy= user;
      this.stockInspectionDetails.createdOn =today.toString();
      console.log(this.stockInspectionDetails.createdOn)
         this.stockInspectionService.createCustomerDemorgaphics(this.stockInspectionDetails).subscribe((data: {}) => {
          this.stockInspectionDetails.createdBy= user;
          this.stockInspectionDetails.modifiedOn =today.toString();
         //  this.toastr.success('Stock Hypo Details Added Successfully');
         this.openSnackBar('Stock Hypo Added Successfully','Sure');

           this.clearform();

           this.loadCustomerDemographicData();

         })

       }

     }

     else {

       if (window.confirm('Are you sure, you want to update?')) {
        this.stockInspectionDetails.modifiedBy= user;
        //   var branch_code_id = this.stockInspectionDetails.branchCode;
        // this.stockInspectionDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
         this.stockInspectionService.updateCustomerDemorgaphics(this.stockInspectionDetails.primeNumber, this.stockInspectionDetails).subscribe((data: {}) => {

        //   this.toastr.success('Stock Hypo Details Updated Successfully');

        this.openSnackBar('Stock Hypo Updated Successfully','Sure');

         })

         location.reload();

       }



     }

   }

   fetchByTab() {

     if (!this.stockInspectionDetails.primeNumber) {

       return this.stockInspectionService.getCustomerDemographic(this.stockInspectionDetails.primeNumber).subscribe((data: {}) => { })

     }

   }
   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }

  // loadBranches(){
  //   return this.branchService.getCustomerDemographics().subscribe((data:{})=>{
  //     this.allBranchesDetails = data;
  //     console.log(this.allBranchesDetails);
  //     this.selectedBranch = this.allBranchesDetails[0];
  // console.log("hiiiiii",this.selectedBranch);

  //    // onChangebranchCode();
  //   });
  // }
  onSearchChangeBranch(searchValue){
    console.log("hi mariaaaaa");
    console.log("hi maria",searchValue);

    var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.stockInspectionDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
    //this.stockInspectionDetails.branchName=this.allBranchesDetails[searchValue].BranchName
    //this.stockInspectionDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
    console.log ("hiiiii",this.stockInspectionDetails.branchName);
    localStorage.setItem("branchName",this.stockInspectionDetails.branchName);

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

  branchCodee;
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;
  onkeyup(){

    this.stockInspectionService.findOneCustomerDemographics(this.stockInspectionDetails.primeNumber).subscribe((data :{})=>{
    console.log("mariaaaa",data)
    console.log( Object.keys( data ).length ) ;
    var length = Object.keys( data ).length
    if(length==1){
      alert("Prime Number already exist")
     
    }
    else{
      this.onFocusOut();
    }
    })
  }
  
   onFocusOut() {

    
    this.stockInspectionService.findOneCustomerDemographics(this.stockInspectionDetails.primeNumber).subscribe(() => { })
    var data = this.stockInspectionService.getCustomerDemographicData()
  
  
    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);
  
      this.stockInspectionDetails = {
  
      
       object_id: data[0]._id,
       primeNumber: data[0].primeNumber,
       businessSegment: data[0].businessSegment,
       region: data[0].region,
       branchCode: data[0].branchCode,
       branchName: data[0].branchName,
       nameOfBorrower: data[0].nameOfBorrower,
       rMCreditHub: data[0].rMCreditHub,
     limit: data[0].limit,
     frequency: data[0].frequency,
     all1QTRConductedBy: data[0].all1QTRConductedBy,
     all1QTRConductedByOutsource: data[0].all1QTRConductedByOutsource,
     all1QTRConductedDate: data[0].all1QTRConductedDate,
     all2QTRConductedBy: data[0].all2QTRConductedBy,
     all2QTRConductedByOutsource: data[0].all2QTRConductedByOutsource,
     all2QTRConductedDate: data[0].all2QTRConductedDate,
     all3QTRConductedBy: data[0].all3QTRConductedBy,
     all3QTRConductedByOutsource: data[0].all3QTRConductedByOutsource,
     all3QTRConductedDate:data[0].all3QTRConductedDate,
     all4QTRConductedBy: data[0].all4QTRConductedBy,
     all4QTRConductedByOutsoruce: data[0].all4QTRConductedByOutsoruce,
     all4QTRConductedDate: data[0].all4QTRConductedDate,
     remarks: data[0].remarks,

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
       year:data[0].year
    };
    //this.findOne();
      console.log(this.stockInspectionDetails);
    }
  
  
  
    else {
      console.log("here")
      console.log(this.stockInspectionDetails.primeNumber)
      this.custService.cust(this.stockInspectionDetails.primeNumber).subscribe((data: {}) => {
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
  
    
          this.stockInspectionDetails = {
  
           
     
       object_id: "",
       primeNumber: this.stockInspectionDetails.primeNumber,
       businessSegment: "",
       region:"",
       branchCode:this.branchCodee,
       branchName: this.branchNamee,
       nameOfBorrower: this.nameOfBorrower,
       rMCreditHub: "",
     limit: this.totalLimit,
     frequency:"",
     all1QTRConductedBy: "",
     all1QTRConductedByOutsource: "",
     all1QTRConductedDate: "",
     all2QTRConductedBy: "",
     all2QTRConductedByOutsource: "",
     all2QTRConductedDate: "",
     all3QTRConductedBy: "",
     all3QTRConductedByOutsource: "",
     all3QTRConductedDate:"",
     all4QTRConductedBy: "",
     all4QTRConductedByOutsoruce: "",
     all4QTRConductedDate: "",
     remarks: "",

       dataStatus: "",
       createdBy : "",

       createdOn:"",
        modifiedBy:  "",
        modifiedOn : "",
        deletedBy: "",
        deletedOn:"",
          
       active: "",
    year:""
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
  
      console.log("hiiiiiiiiii", this.stockInspectionDetails)
    }
  
   }

   disable() {
    this.isDisabled = true
  }
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  selectedType = '';
  selectedType2 = 'opentype';
  selectedType3= 'opentype';
  selectedType4= 'opentype';
  onChange(searchValue) {
    this.selectedType = searchValue;
    console.log(this.selectedType)
  }
 

  onChange2(searchValue) {
    this.selectedType2= searchValue;
    console.log(this.selectedType2)
  }
 

  onChange3(searchValue) {
    this.selectedType3 = searchValue;
    console.log(this.selectedType3)
  }
 

  onChange4(searchValue) {
    this.selectedType4 = searchValue;
    console.log(this.selectedType4)
  }
  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.stockInspectionDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.stockInspectionDetails.primeNumber)
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
        this.stockInspectionDetails.region=findonedata[0].region
        console.log(this.stockInspectionDetails.region)
        this.stockInspectionDetails.businessSegment=findonedata[0].businessSegment
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
   onSearchChange(searchValue: string) {

     console.log(searchValue);

     return this.stockInspectionService.getCustomerDemographic(this.stockInspectionDetails.primeNumber).subscribe((data: {}) => {

       this.inputdata = data

       console.log(this.inputdata);

       this.stockInspectionService.setCustomerDemographicData(data);

       //  this.restservice.setCustomerDemographicData(data);



     });



   }



   loadCustomerDemographicData() {
  return this.stockInspectionService.getCustomerDemographics().subscribe((data: {}) => {
       this.allstockInspectionDetails = data;
       this.dataSource = new MatTableDataSource(this.allstockInspectionDetails);
       this.dataSource.paginator = this.paginator;
       console.log(this.dataSource);
     });
   }
   validaions(){

//     if(!this.stockInspectionDetails.primeNumber ||!this.stockInspectionDetails.businessSegment||
//       !this.stockInspectionDetails.rMCreditHub || !this.stockInspectionDetails.region
//       || !this.stockInspectionDetails.limit || !this.stockInspectionDetails.all1QTRConductedBy
//       || !this.stockInspectionDetails.frequency || this.stockInspectionDetails.all2QTRConductedBy
//       ||this.stockInspectionDetails.all3QTRConductedBy ||this.stockInspectionDetails.all4QTRConductedBy
//       ||this.stockInspectionDetails.all3QTRConductedDate ||this.stockInspectionDetails.all1QTRConductedDate
//       ||this.stockInspectionDetails.all4QTRConductedDate){
//         this.openSnackBar('please enter all the required fields','Sure');

//     }
// if(this.stockInspectionDetails.primeNumber.length<6){
//   this.openSnackBar('please enter primeNumber of 6 digits','Sure');

// }
//     else{
//       this.addCustomerDemographic();
//       console.log('hiii')
//       return 0;
//     };
   
//     return 0;
if(!this.stockInspectionDetails.primeNumber){
  this.openSnackBar('please enter all the required fields','Sure');

 }
 else if(!this.stockInspectionDetails.rMCreditHub){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.stockInspectionDetails.frequency){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.stockInspectionDetails.businessSegment){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  else if(!this.stockInspectionDetails.region){
   this.openSnackBar('please enter all the required fields','Sure');

  }
  // else if(!this.stockInspectionDetails.all1QTRConductedDate){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  //  else if(!this.stockInspectionDetails.all1QTRConductedBy){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  
  //  else if(!this.stockInspectionDetails.remarks){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
   
  
  //  else if(!this.stockInspectionDetails.all2QTRConductedBy){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  
  //  else if(!this.stockInspectionDetails.all2QTRConductedDate){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  
  //  else if(!this.stockInspectionDetails.all3QTRConductedBy){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  
  //  else if(!this.stockInspectionDetails.all3QTRConductedDate){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  //  else if(!this.stockInspectionDetails.all4QTRConductedBy){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  
  //  else if(!this.stockInspectionDetails.all4QTRConductedDate){
  //   this.openSnackBar('please enter all the required fields','Sure');
 
  //  }
  
   

 else{
   this.addCustomerDemographic();
   console.log('hiii')
   return 0;
 };
 if(this.stockInspectionDetails.primeNumber.length<6){
    this.openSnackBar('please enter primeNumber of 6 digits','Sure');
  
   }
  }


   editCustomerDemographic(stockInspectionData) {
    window.confirm('Are you sure, you want to edit?')
   // this.onFocusOut();
    this.disable();
     this.stockInspectionDetails = stockInspectionData;



     this.VisiblitypNumb = true

   }



   clearform() {

     this.stockInspectionDetails.primeNumber = "";

     this.stockInspectionDetails.branchCode = "";

     this.stockInspectionDetails.businessSegment = "";
     this.stockInspectionDetails.region = "";
     this.stockInspectionDetails.branchCode = "";
     this.stockInspectionDetails.branchName = "";
     this.stockInspectionDetails.nameOfBorrower = "";
     this.stockInspectionDetails.rMCreditHub= "";
     this.stockInspectionDetails.limit= "";
     this.stockInspectionDetails.frequency= "";
     this.stockInspectionDetails.all1QTRConductedBy= "";
     this.stockInspectionDetails.all1QTRConductedByOutsource= "";
     this.stockInspectionDetails.all1QTRConductedDate= "";
     this.stockInspectionDetails.all2QTRConductedBy= "";
     this.stockInspectionDetails.all2QTRConductedByOutsource= "";
     this.stockInspectionDetails.all2QTRConductedDate= "";
     this.stockInspectionDetails.all3QTRConductedBy="";
     this.stockInspectionDetails.all3QTRConductedByOutsource="";
     this.stockInspectionDetails.all3QTRConductedDate="";
     this.stockInspectionDetails.all4QTRConductedBy="";
     this.stockInspectionDetails.all4QTRConductedByOutsoruce="";
     this.stockInspectionDetails.all4QTRConductedDate="";
     this.stockInspectionDetails.remarks= "";
this.stockInspectionDetails.year="";
this.stockInspectionDetails.createdBy = "";

     this.stockInspectionDetails.createdOn= "";
     this.stockInspectionDetails.modifiedBy= "";
     this.stockInspectionDetails.modifiedOn = "";
     this.stockInspectionDetails.deletedBy= "";
      this.stockInspectionDetails.deletedOn= "";
     // this.stockInspectionDetails.dataStatus = "";

     // this.stockInspectionDetails.customerType = "";

   }

   searchTableData(searchValue: string) {

     console.log(searchValue);

     return this.stockInspectionService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

       this.inputdata = data

       console.log(this.inputdata);

       this.allstockInspectionDetails = this.inputdata;

       this.stockInspectionService.setCustomerDemographicData(data);

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
        this.stockInspectionDetails.deletedBy = user;
        var today = new Date();
        this.stockInspectionDetails.deletedOn =today.toString();
       this.stockInspectionService.deleteCustomersdemographic(primeNumber).subscribe(data => {
       // this.toastr.success('Stock Hypo deleted Successfully');
       this.openSnackBar('Stock Hypo deleted Successfully','Sure');

         this.loadCustomerDemographicData();

       })

     }

   }


}
