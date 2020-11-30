import * as XLSX from 'xlsx';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stockInspectionPledgeService } from "../../_services/stockInspectionPledge/stockInspectionPledge.service";
import { format } from 'url';
import { UserIdleService } from 'angular-user-idle';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { stockInspectionPledge } from 'src/app/_models/stockInspectionPledge.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';
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
interface outSource{
  value :string;
  viewValue :string;
}
interface year{
  value :string;
  viewValue :string;
}
@Component({
  selector: 'app-stock-pledge',
  templateUrl: './stock-pledge.component.html',
  styleUrls: ['./stock-pledge.component.scss'],
  //providers: [DateFormatPipe]
})
export class StockPledgeComponent implements OnInit {
    business: businessSegment[] = [
      { value: 'Corporate', viewValue: 'Corporate' },
      { value: 'Commercial', viewValue: 'Commercial' },
      { value: 'FI', viewValue: 'FI' },
      { value: 'Islamic', viewValue: 'Islamic' },
      { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
      { value: 'Retail', viewValue: 'Retail' },
      { value: 'Structured Credit', viewValue: 'Structured Credit' },
      ];
      // year: year[] = [
      //   { value: '2017', viewValue: '2017' },
      //   { value: '2018', viewValue: '2018' },
      //   { value: '2019', viewValue: '2019' },
      //   { value: '2020', viewValue: '2020' },
      //   { value: '2021', viewValue: '2021' },
      //   { value: '2022', viewValue: '2022' }
      //   ];
      Joint: joint[] = [
        // {value: 'Joint Inspection', viewValue: 'Joint Inspection'},
        {value: 'Applicable As per SBP PR.', viewValue:  'Applicable As per SBP PR.'},
        {value: 'Applicable As per Bank Policy.', viewValue: 'Applicable As per Bank Policy.'},
     
        {value: 'Not Applicable.', viewValue: 'Not Applicable.'},
    
    
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

  Conductedby: conductedby[] = [
    {value: '', viewValue: ''},
    {value: 'By RCAD', viewValue: 'By RCAD'},
    {value: 'By BU', viewValue:  'By BU'},
    {value: 'By Audit', viewValue: 'By Audit'},
    {value: 'By RCAD & BU', viewValue: 'By RCAD & BU'},
    {value: 'Out-source', viewValue: 'Out-source'},
    {value: ' Joint Inspection with Other Bank', viewValue: ' Joint Inspection with Other Bank'},
   

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
  // marchConductedByFormControl = new FormControl('', [Validators.required]);
  // marchConductedDateFormControl = new FormControl('', [ Validators.required]);
  // juneConductedByFormControl = new FormControl('', [Validators.required]);
  // juneConductedDateFormControl = new FormControl('', [Validators.required]);

  // sepConductedByFormControl = new FormControl('', [Validators.required]);
  // sepConductedDateFormControl = new FormControl('', [ Validators.required]);
  // decConductedByControl = new FormControl('', [Validators.required]);
  // decConductedDateFormControl = new FormControl('', [ Validators.required]);
  remarksFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
  jointInspectionFormControl = new FormControl('', [ Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','rMCreditHub',
'limit','frequency','jointInspection','janConductedBy','janDate','febConductedBy','febDate','marchConductedBy','marchDate','aprilConductedBy','aprilDate',
'mayConductedBy',
'mayDate',
'juneConductedBy','juneDate','julyConductedBy','julyDate','augustConductedBy','augustDate','septemberConductedBy','septemberDate','octoberConductedBy',
'octoberDate','novemberConductedBy','novemberDate',
'decemberConductedBy','decemberDate','createdBy','createdOn','modifiedBy','modifiedOn'];




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

   allstockInspectionPledgeDetails: any = [];

   //////////////////////////////////Visiblity Veriables///////////////////////////////////



   public VisiblitypNumb: boolean = false;

   public hideEditButton: boolean = false;

   public hideDeleteButton: boolean = false;

   public hideForm: boolean = false;

   public hideDataTable: boolean = false;





   @ViewChild('TABLE', { static: false }) table: ElementRef;

   @Input() stockInspectionPledgeDetails = {

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
     jointInspection:"",
     janConductedBy: "",
     
     janConductedByOutsource: "",
     janDate: "",
     febConductedBy: "",
     febConductedByOutsource: "",
     febDate: "",
     marchConductedBy: "",
     marchConductedByOutsoruce: "",
     marchDate: "",
     aprilConductedBy: "",
     aprilConductedByOutsource: "",
     aprilDate: "",
     mayConductedBy: "",
     mayConductedByOutsource: "",
     mayDate: "",
     juneConductedBy: "",
     juneConductedByOutsource: "",
     juneDate: "",
     julyConductedBy: "",
     julyConductedByOutsource: "",
     julyDate:"",
     augustConductedBy: "",
     augustConductedByOutsource: "",
     augustDate:"",
     septemberConductedBy: "",
     septemberConductedByOutsource: "",
     septemberDate: "",
     octoberConductedBy: "",
     octoberConductedByOutSource: "",
     octoberDate: "",
     novemberConductedBy:"",
     novemberConductedByOutSource: "",
     novemberDate:"",
     decemberConductedBy: "",
     decemberConductedByOutSource: "",
     decemberDate: "",
     dataStatus: "",
     createdBy : "",

     createdOn: "",
      modifiedBy:   "",
      modifiedOn :   "",
      deletedBy:  "",
      deletedOn: "",
 
     active: "",
     year:"",
     yearly : "",
     yearlyDate  :"",
     yearlyOutsource : "",
     st1quater :  "",
     st1quaterOutsource :  "",
     st1quaterDate :  "",
     nd2qauter:  "",
     nd2qauterOutsource:  "",
     nd2qauterDate:  "",
     rd3quater:  "",
     rd3quaterOutsource:  "",
     rd3quaterDate:  "",
     th4quater:"",
     th4quaterOutsource:"",
     th4quaterDate:"",
     stsemianually :"",
     stsemianuallyOutsource :"",
     stsemianuallyDate :"",
     ndsemianually:"",
     ndsemianuallyOutsource:"",
     ndsemianuallyDate:"",
    
   };
   @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };
   constructor(
    private formBuilder: FormBuilder,
    private customerdemographicService:CustomerDemographicService,
    private userIdle: UserIdleService,
     private stockInspectionPledgeService: stockInspectionPledgeService,
     private branchService : BranchService,
     public actRoute: ActivatedRoute,
     private custService:CustService,
     private _snackBar: MatSnackBar,
    // private toastr: ToastrService,

     public router: Router,
    // private _dateFormatPipe: DateFormatPipe,


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
      'BRANCHCODE':this.BranchCodeFormControl,
      'BRANCHNAME':this.branchNameControl,
      'NAMEOFBORROWER':this.nameOfBorrowerFormControl,
      'RMCREDIT':this.rMCreditHubFormControl,
      'LIMIT':this.limitFormControl,
      'FREQUENCY':this.frequencyFormControl,
      // 'MARCHCONDUCTEd':this.marchConductedByFormControl,
      // 'MARCHDATE':this.marchConductedDateFormControl,
      // 'JUNECONDUCTED':this.juneConductedByFormControl,
      // 'JUNEDATE': this.juneConductedDateFormControl,
      // 'SEPBY':this.sepConductedByFormControl,
      // 'SEPDATE':this.sepConductedDateFormControl,
      // 'DECBY':this.decConductedByControl,
      // 'DECDATE':this.decConductedDateFormControl,
      'REMARKS':this.remarksFormControl,
      'REGION':this.regionFormControl,
'BS':this.businessSegmentFormControl,
'JI':this.jointInspectionFormControl




          });
  //  this.loadCustomerDemographicData();
    //this.loadBranches();

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
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.stockInspectionPledgeDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.stockInspectionPledgeDetails.primeNumber)
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
        this.stockInspectionPledgeDetails.region=findonedata[0].region
        console.log(this.stockInspectionPledgeDetails.region)
        this.stockInspectionPledgeDetails.businessSegment=findonedata[0].businessSegment
      }
      
    })
    }

    selectedType1 = 'opentype';

onChange1(searchValue) {
  this.selectedType1 = searchValue;
  //console.log(this.selectedType)
}
selectedType2 = 'opentype';

onChange2(searchValue) {
  this.selectedType2 = searchValue;
  console.log(this.selectedType2)
}
selectedType3 = 'opentype';

onChange3(searchValue) {
  this.selectedType3 = searchValue;
  ///console.log(this.selectedType)
}
selectedType4 = 'opentype';

onChange4(searchValue) {
  this.selectedType4 = searchValue;
 /// console.log(this.selectedType)
}
selectedType5 = 'opentype';

onChange5(searchValue) {
  this.selectedType5 = searchValue;
 /// console.log(this.selectedType)
}
selectedType6 = 'opentype';

onChange6(searchValue) {
  this.selectedType6 = searchValue;
 // console.log(this.selectedType)
}
selectedType7 = 'opentype';

onChange7(searchValue) {
  this.selectedType7 = searchValue;
  ///console.log(this.selectedType)
}
selectedType8 = 'opentype';

onChange8(searchValue) {
  this.selectedType8 = searchValue;
  // console.log(this.selectedType)
}
selectedType9 = 'opentype';

onChange9(searchValue) {
  this.selectedType9 = searchValue;
  //console.log(this.selectedType)
}
selectedType10 = 'opentype';

onChange10(searchValue) {
  this.selectedType10 = searchValue;
  //console.log(this.selectedType)
}
selectedType11 = 'opentype';

onChange11(searchValue) {
  this.selectedType11 = searchValue;
  //console.log(this.selectedType)
}

selectedType12 = 'opentype';

onChange12(searchValue) {
  this.selectedType12 = searchValue;
 // console.log(this.selectedType)
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
   this.stockInspectionPledgeDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;

 // this.stockInspectionPledgeDetails.branchName=this.allBranchesDetails[searchValue].BranchName
 // this.stockInspectionPledgeDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.stockInspectionPledgeDetails.branchName);
  localStorage.setItem("branchName",this.stockInspectionPledgeDetails.branchName);
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


    // this.stockInspectionPledgeDetails.janDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.janDate);
    // this.stockInspectionPledgeDetails.febDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.febDate);
    // this.stockInspectionPledgeDetails.marchDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.marchDate);
    // this.stockInspectionPledgeDetails.aprilDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.aprilDate);

    // this.stockInspectionPledgeDetails.mayDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.mayDate);
    // this.stockInspectionPledgeDetails.juneDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.juneDate);
    // this.stockInspectionPledgeDetails.julyDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.julyDate);
    // this.stockInspectionPledgeDetails.augustDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.augustDate);

    // this.stockInspectionPledgeDetails.septemberDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.septemberDate);
    // this.stockInspectionPledgeDetails.octoberDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.octoberDate);
    // this.stockInspectionPledgeDetails.novemberDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.novemberDate);
    // this.stockInspectionPledgeDetails.decemberDate = this._dateFormatPipe.transform(this.stockInspectionPledgeDetails.decemberDate);




    var user= localStorage.getItem('userFullName')
    this.stockInspectionPledgeDetails.createdBy= user;
     console.log(this.stockInspectionPledgeDetails);
     var today = new Date();
     if (this.stockInspectionPledgeDetails.object_id == "") {
      this.stockInspectionPledgeDetails.createdBy= user;
      this.stockInspectionPledgeDetails.createdOn =today.toString();
      console.log(this.stockInspectionPledgeDetails.createdOn)
       if (this.stockInspectionPledgeDetails) {
        this.stockInspectionPledgeDetails.createdBy= user;
        
        // var branch_code_id = this.stockInspectionPledgeDetails.branchCode;
        // this.stockInspectionPledgeDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
         this.stockInspectionPledgeService.createCustomerDemorgaphics(this.stockInspectionPledgeDetails).subscribe((data: {}) => {

        //   this.toastr.success('Customer Added Successfully');
        this.openSnackBar('Stock Inspection Pledge Added Successfully','Sure');
           this.clearform();

           this.loadCustomerDemographicData();

         })

       }

     }

     else {

       if (window.confirm('Are you sure, you want to update?')) {
        this.stockInspectionPledgeDetails.modifiedBy= user;
       // this.stockInspectionPledgeDetails.modifiedBy= user;
        this.stockInspectionPledgeDetails.modifiedOn =today.toString();
  // var branch_code_id = this.stockInspectionPledgeDetails.branchCode;
  //       this.stockInspectionPledgeDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
      
         this.stockInspectionPledgeService.updateCustomerDemorgaphics(this.stockInspectionPledgeDetails.primeNumber, this.stockInspectionPledgeDetails).subscribe((data: {}) => {

          // this.toastr.success('Customer Updated Successfully');

          this.openSnackBar('Stock Inspection Pledge Updated Successfully','Sure');

         })

         location.reload();

       }



     }

   }

   fetchByTab() {

     if (!this.stockInspectionPledgeDetails.primeNumber) {

       return this.stockInspectionPledgeService.getCustomerDemographic(this.stockInspectionPledgeDetails.primeNumber).subscribe((data: {}) => { })

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
   branchNamee;

   branchCodee;
   //var sbpCode = '"sbpcode "'';
   nameOfBorrower;
   onFocusOut() {

    //  console.log("Inside Focus");

    //  var data = this.stockInspectionPledgeService.getCustomerDemographicData()

    //  console.log('data ka zero index : ', data[0]);

    //  this.stockInspectionPledgeDetails = {

    //    object_id: data[0]._id,
    //    primeNumber: data[0].primeNumber,
    //    businessSegment: data[0].businessSegment,
    //    region: data[0].region,
    //    branchCode: data[0].branchCode,
    //    branchName: data[0].branchName,
    //    nameOfBorrower: data[0].nameOfBorrower,
    //    rMCreditHub: data[0].rMCreditHub,
    //    limit: data[0].limit,
    //  frequency: data[0].frequency,

    //  janConductedBy: data[0].janConductedBy,
    //  janDate:data[0].janDate,
    //  febConductedBy: data[0].febConductedBy,
    //  febDate: data[0].febDate,
    //  marchConductedBy: data[0].marchConductedBy,
    //  marchDate: data[0].marchDate,
    //  aprilConductedBy: data[0].aprilConductedBy,
    //  aprilDate: data[0].aprilDate,
    //  mayConductedBy: data[0].mayConductedBy,
    //  mayDate: data[0].mayDate,
    //  juneConductedBy: data[0].juneConductedBy,
    //  juneDate: data[0].juneDate,
    //  julyConductedBy: data[0].julyConductedBy,
    //  julyDate: data[0].julyDate,
    //  augustConductedBy: data[0].augustConductedBy,
    //  augustDate: data[0].augustDate,
    //  septemberConductedBy: data[0].septemberConductedBy,
    //  septemberDate: data[0].septemberDate,
    //  octoberConductedBy: data[0].octoberConductedBy,
    //  octoberDate: data[0].octoberDate,
    //  novemberConductedBy:data[0].novemberConductedBy,
    //  novemberDate: data[0].novemberDate,
    //  decemberConductedBy: data[0].decemberConductedBy,
    //  decemberDate: data[0].decemberDate,


    //    dataStatus: data[0].dataStatus,
    //    createdBy: data[0].createdBy,
    //    modifiedBy: data[0].modifiedBy,
    //    active: data[0].active



    //  };
    this.stockInspectionPledgeService.getCustomerDemographic(this.stockInspectionPledgeDetails.primeNumber).subscribe(() => { })
    var data = this.stockInspectionPledgeService.getCustomerDemographicData()
  
  
    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);
  
      this.stockInspectionPledgeDetails = {
  
    
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
     jointInspection:data[0].jointInspection,
     janConductedBy: data[0].janConductedBy,

     janConductedByOutsource: data[0].janConductedByOutsource,
     janDate:data[0].janDate,
     febConductedBy: data[0].febConductedBy,
     febConductedByOutsource: data[0].febConductedByOutsource,
     febDate: data[0].febDate,
     marchConductedBy: data[0].marchConductedBy,
     marchConductedByOutsoruce: data[0].marchConductedByOutsoruce,
     marchDate: data[0].marchDate,
     aprilConductedBy: data[0].aprilConductedBy,
     aprilConductedByOutsource: data[0].aprilConductedByOutsource,
     aprilDate: data[0].aprilDate,
     mayConductedBy: data[0].mayConductedBy,
     mayConductedByOutsource: data[0].mayConductedByOutsource,
     mayDate: data[0].mayDate,
     juneConductedBy: data[0].juneConductedBy,
     juneConductedByOutsource: data[0].juneConductedByOutsource,
     juneDate: data[0].juneDate,
     julyConductedBy: data[0].julyConductedBy,
     julyConductedByOutsource: data[0].julyConductedByOutsource,
     julyDate: data[0].julyDate,
     augustConductedBy: data[0].augustConductedBy,
     augustConductedByOutsource: data[0].augustConductedByOutsource,
     augustDate: data[0].augustDate,
     septemberConductedBy: data[0].septemberConductedBy,
     septemberConductedByOutsource: data[0].septemberConductedByOutsource,
     septemberDate: data[0].septemberDate,
     octoberConductedBy: data[0].octoberConductedBy,
     octoberConductedByOutSource: data[0].octoberConductedByOutSource,
     octoberDate: data[0].octoberDate,
     novemberConductedBy:data[0].novemberConductedBy,
     novemberConductedByOutSource:data[0].novemberConductedByOutSource,
     novemberDate: data[0].novemberDate,
     decemberConductedBy: data[0].decemberConductedBy,
     decemberConductedByOutSource: data[0].decemberConductedByOutSource,
     decemberDate: data[0].decemberDate,

    year :  data[0].year,
     
     yearly : data[0].yearly,
     yearlyDate  :data[0].yearlyDate,
     yearlyOutsource : data[0].yearlyOutsource,
     st1quater :  data[0].st1quater,
     st1quaterOutsource :  data[0].st1quaterOutsource,
     st1quaterDate : data[0].st1quaterDate,
     nd2qauter:  data[0].nd2qauter,
     nd2qauterOutsource:  data[0].nd2qauterOutsource,
     nd2qauterDate:  data[0].nd2qauterDate,
     rd3quater:  data[0].rd3quater,
     rd3quaterOutsource:  data[0].rd3quaterOutsource,
     rd3quaterDate:  data[0].rd3quaterDate,
     th4quater:data[0].th4quater,
     th4quaterOutsource:data[0].th4quaterOutsource,
     th4quaterDate:data[0].th4quaterDate,
     stsemianually :data[0].stsemianually,
     stsemianuallyOutsource :data[0].stsemianuallyOutsource,
     stsemianuallyDate :data[0].stsemianuallyDate,
     ndsemianually:data[0].ndsemianually,
     ndsemianuallyOutsource:data[0].ndsemianuallyOutsource,
     ndsemianuallyDate:data[0].ndsemianuallyDate,
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
      console.log(this.stockInspectionPledgeDetails);
    }
  
  
  
    else {
      console.log("here")
      console.log(this.stockInspectionPledgeDetails.primeNumber)
      this.custService.cust(this.stockInspectionPledgeDetails.primeNumber).subscribe((data: {}) => {
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
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
        this.branchNamee=this.custdata.data.basicDetail.branchName;
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
  
    
          this.stockInspectionPledgeDetails = {
  
           
     
       object_id: "",
       primeNumber:  this.stockInspectionPledgeDetails.primeNumber,
       businessSegment: "",
       region: "",
       branchCode:this.branchCodee,
       branchName: this.branchNamee,
       nameOfBorrower: this.nameOfBorrower,
       rMCreditHub: "",
       limit: this.totalLimit,
     frequency:  "",
     jointInspection:"",
    
     janConductedBy: "",
     
     janConductedByOutsource: "",
     janDate: "",
     febConductedBy: "",
     febConductedByOutsource: "",
     febDate: "",
     marchConductedBy: "",
     marchConductedByOutsoruce: "",
     marchDate: "",
     aprilConductedBy: "",
     aprilConductedByOutsource: "",
     aprilDate: "",
     mayConductedBy: "",
     mayConductedByOutsource: "",
     mayDate: "",
     juneConductedBy: "",
     juneConductedByOutsource: "",
     juneDate: "",
     julyConductedBy: "",
     julyConductedByOutsource: "",
     julyDate:"",
     augustConductedBy: "",
     augustConductedByOutsource: "",
     augustDate:"",
     septemberConductedBy: "",
     septemberConductedByOutsource: "",
     septemberDate: "",
     octoberConductedBy: "",
     octoberConductedByOutSource: "",
     octoberDate: "",
     novemberConductedBy:"",
     novemberConductedByOutSource: "",
     novemberDate:"",
     decemberConductedBy: "",
     decemberConductedByOutSource: "",
     decemberDate: "",
     dataStatus: "",
     createdBy : "",

      createdOn:"",
       modifiedBy:  "",
       modifiedOn : "",
       deletedBy: "",
       deletedOn:"",
         
     active: "",
     year : "",
     yearly : "",
     yearlyDate  :"",
     yearlyOutsource : "",
     st1quater :  "",
     st1quaterOutsource :  "",
     st1quaterDate :  "",
     nd2qauter:  "",
     nd2qauterOutsource:  "",
     nd2qauterDate:  "",
     rd3quater:  "",
     rd3quaterOutsource:  "",
     rd3quaterDate:  "",
     th4quater:"",
     th4quaterOutsource:"",
     th4quaterDate:"",
     stsemianually :"",
     stsemianuallyOutsource :"",
     stsemianuallyDate :"",
     ndsemianually:"",
     ndsemianuallyOutsource:"",
     ndsemianuallyDate:"",
    
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
  
      console.log("hiiiiiiiiii", this.stockInspectionPledgeDetails)
    }
  
   }



   onSearchChange(searchValue: string) {

     console.log(searchValue);

     return this.stockInspectionPledgeService.getCustomerDemographic(this.stockInspectionPledgeDetails.primeNumber).subscribe((data: {}) => {

       this.inputdata = data

       console.log(this.inputdata);

       this.stockInspectionPledgeService.setCustomerDemographicData(data);

       //  this.restservice.setCustomerDemographicData(data);



     });



   }



   isDisabled: boolean = false;
   disable() {
    this.isDisabled = true
  }
  selectedType = 'opentype';

onChange(searchValue) {
  this.selectedType = searchValue;
  console.log(this.selectedType)
}
   validaions(){

    // if(!this.stockInspectionPledgeDetails.primeNumber ||!this.stockInspectionPledgeDetails.businessSegment||
    //   !this.stockInspectionPledgeDetails.rMCreditHub || !this.stockInspectionPledgeDetails.limit
    //   || !this.stockInspectionPledgeDetails.frequency || !this.stockInspectionPledgeDetails.nameOfBorrower
    //   || !this.stockInspectionPledgeDetails.branchCode || this.stockInspectionPledgeDetails.branchName){
    //    
    if(!this.stockInspectionPledgeDetails.primeNumber){
     this.openSnackBar('please enter all the required fields','Sure');

    }
    else if(!this.stockInspectionPledgeDetails.rMCreditHub){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else if(!this.stockInspectionPledgeDetails.frequency){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else if(!this.stockInspectionPledgeDetails.businessSegment){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }
     else if(!this.stockInspectionPledgeDetails.region){
      this.openSnackBar('please enter all the required fields','Sure');
 
     }

    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    if(this.stockInspectionPledgeDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }
   
    return 0;
  }
   loadCustomerDemographicData() {
  return this.stockInspectionPledgeService.getCustomerDemographics().subscribe((data: {}) => {
       this.allstockInspectionPledgeDetails = data;
       console.log(data);
       this.dataSource = new MatTableDataSource(this.allstockInspectionPledgeDetails);
       this.dataSource.paginator = this.paginator;
       console.log(this.dataSource);
     });
   }

   editCustomerDemographic(stockInspectionPledgeData) {
    window.confirm('Are you sure, you want to edit?')
    //this.onFocusOut();
    this.disable();
     this.stockInspectionPledgeDetails = stockInspectionPledgeData;



     this.VisiblitypNumb = true

   }



   clearform() {

     this.stockInspectionPledgeDetails.primeNumber = "";

     this.stockInspectionPledgeDetails.branchCode = "";

     this.stockInspectionPledgeDetails.businessSegment = "";
     this.stockInspectionPledgeDetails.region = "";
     this.stockInspectionPledgeDetails.branchCode = "";
     this.stockInspectionPledgeDetails.branchName = "";
     this.stockInspectionPledgeDetails.nameOfBorrower = "";
     this.stockInspectionPledgeDetails.rMCreditHub= "";
     this.stockInspectionPledgeDetails.limit= "";
     this.stockInspectionPledgeDetails.frequency= "";
     this.stockInspectionPledgeDetails.jointInspection="";
     this.stockInspectionPledgeDetails.janConductedBy= "";
     
     this.stockInspectionPledgeDetails.janConductedByOutsource= "";
     this.stockInspectionPledgeDetails.janDate= "";
     this.stockInspectionPledgeDetails.febConductedBy= "";
     this.stockInspectionPledgeDetails.febConductedByOutsource= "";
     this.stockInspectionPledgeDetails.febDate= "";
     this.stockInspectionPledgeDetails.marchConductedBy= "";
     this.stockInspectionPledgeDetails.marchConductedByOutsoruce= "";
     this.stockInspectionPledgeDetails.marchDate= "";
     this.stockInspectionPledgeDetails.aprilConductedBy= "";
     this.stockInspectionPledgeDetails.aprilConductedByOutsource= "";
     this.stockInspectionPledgeDetails.aprilDate= "";
     this.stockInspectionPledgeDetails.mayConductedBy= "";
     this.stockInspectionPledgeDetails.mayConductedByOutsource= "";
     this.stockInspectionPledgeDetails.mayDate= "";
     this.stockInspectionPledgeDetails.juneConductedBy= "";
     this.stockInspectionPledgeDetails.juneConductedByOutsource= "";
     this.stockInspectionPledgeDetails.juneDate= "";
     this.stockInspectionPledgeDetails.julyConductedBy= "";
     this.stockInspectionPledgeDetails.julyConductedByOutsource= "";
     this.stockInspectionPledgeDetails.julyDate="";
     this.stockInspectionPledgeDetails.augustConductedBy= "";
     this.stockInspectionPledgeDetails.augustConductedByOutsource= "";
     this.stockInspectionPledgeDetails.augustDate="";
     this.stockInspectionPledgeDetails.septemberConductedBy= "";
     this.stockInspectionPledgeDetails.septemberConductedByOutsource= "";
     this.stockInspectionPledgeDetails.septemberDate= "";
     this.stockInspectionPledgeDetails.octoberConductedBy= "";
     this.stockInspectionPledgeDetails.octoberConductedByOutSource= "";
     this.stockInspectionPledgeDetails.octoberDate= "";
     this.stockInspectionPledgeDetails.novemberConductedBy="";
     this.stockInspectionPledgeDetails.novemberConductedByOutSource= "";
     this.stockInspectionPledgeDetails.novemberDate="";
     this.stockInspectionPledgeDetails.decemberConductedBy= "";
     this.stockInspectionPledgeDetails.decemberConductedByOutSource= "";
     this.stockInspectionPledgeDetails.decemberDate= "";
     this.stockInspectionPledgeDetails.dataStatus= "";
     this.stockInspectionPledgeDetails.createdBy = "";

     this.stockInspectionPledgeDetails.createdOn= "";
     this.stockInspectionPledgeDetails.modifiedBy= "";
     this.stockInspectionPledgeDetails.modifiedOn = "";
     this.stockInspectionPledgeDetails.deletedBy= "";
      this.stockInspectionPledgeDetails.deletedOn= "";
     this.stockInspectionPledgeDetails.active= "";
     this.stockInspectionPledgeDetails.year = "";
     this.stockInspectionPledgeDetails.yearly = "";
     this.stockInspectionPledgeDetails.yearlyDate  ="";
     this.stockInspectionPledgeDetails.yearlyOutsource = "";
     this.stockInspectionPledgeDetails.st1quater =  "";
     this.stockInspectionPledgeDetails.st1quaterOutsource =  "";
     this.stockInspectionPledgeDetails.st1quaterDate =  "";
     this.stockInspectionPledgeDetails.nd2qauter=  "";
     this.stockInspectionPledgeDetails.nd2qauterOutsource=  "";
     this.stockInspectionPledgeDetails.nd2qauterDate=  "";
     this.stockInspectionPledgeDetails.rd3quater=  "";
     this.stockInspectionPledgeDetails.rd3quaterOutsource=  "";
     this.stockInspectionPledgeDetails.rd3quaterDate=  "";
     this.stockInspectionPledgeDetails.th4quater="";
     this.stockInspectionPledgeDetails.th4quaterOutsource="";
     this.stockInspectionPledgeDetails.th4quaterDate="";
     this.stockInspectionPledgeDetails.stsemianually ="";
     this.stockInspectionPledgeDetails.stsemianuallyOutsource ="";
     this.stockInspectionPledgeDetails.stsemianuallyDate ="";
     this.stockInspectionPledgeDetails.ndsemianually="";
     this.stockInspectionPledgeDetails.ndsemianuallyOutsource="";
     this.stockInspectionPledgeDetails.ndsemianuallyDate="";
         // this.stockInspectionPledgeDetails.customerType = "";

   }

   searchTableData(searchValue: string) {

     console.log(searchValue);

     return this.stockInspectionPledgeService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

       this.inputdata = data

       console.log(this.inputdata);

       this.allstockInspectionPledgeDetails = this.inputdata;

       this.stockInspectionPledgeService.setCustomerDemographicData(data);

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
       this.stockInspectionPledgeService.deleteCustomersdemographic(primeNumber).subscribe(data => {
      //  this.toastr.success('Customer deleted Successfully');
      var user= localStorage.getItem('userFullName')
      this.stockInspectionPledgeDetails.deletedBy = user;
      var today = new Date();
      this.stockInspectionPledgeDetails.deletedOn =today.toString();
      this.openSnackBar('Stock Inspection Pledge Updated Successfully','Sure');
         this.loadCustomerDemographicData();

       })

     }

   }
}
