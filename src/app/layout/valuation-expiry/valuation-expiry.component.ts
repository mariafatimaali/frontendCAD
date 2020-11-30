import { CplogbookDraftService } from "../../_services/cplogbookDraft/cplogbook-draft.service";
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { CustService } from '../../_services/custdemo/custdemo.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { valuationExpiryService } from '../../_services/valuationExpiry/valuationExpiry.service';
import { format } from 'url';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { valuationExpiry } from 'src/app/_models/valuationExpiry.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
//import { TablesModule } from '../tables/tables.module';
import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import {BranchService} from '../../_services/branches/branches.service';
import {MatSnackBar} from '@angular/material/snack-bar';
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
interface accountstatus {
  value: string;
  viewValue: string;
}
interface outSource{
  value :string;
  viewValue :string;
}
@Component({
  selector: 'app-valuation-expiry',
  templateUrl: './valuation-expiry.component.html',
  styleUrls: ['./valuation-expiry.component.scss'],
  providers: [DateFormatPipe]
})


export class ValuationExpiryComponent implements OnInit {
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
  account: accountstatus[] = [   
     { value: 'Adjusted', viewValue: 'Adjusted' },
     
  { value: 'Litigation', viewValue: 'Litigation' },

  { value: 'NPL', viewValue: 'NPL' },
  { value: 'Regular', viewValue: 'Regular' },
  { value: 'Write-off', viewValue: 'Write-off' },

 

    
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
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
 primeFormControl = new FormControl('', [ Validators.required,Validators.minLength(6)]);
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [ Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required]);
  nameofInsuranceCoFormControl = new FormControl('', [Validators.required]);
  valuationReferenceFormControl = new FormControl('', [ Validators.required]);
  descriptionOfPropertyFormControl = new FormControl('', [Validators.required]);
 // nameofInsuranceCoFormControl = new FormControl('', [ Validators.required]);
 dateofLatestValuationFormControl = new FormControl('', [Validators.required]);
 valuationConductedByFormControl = new FormControl('', [ Validators.required]);
 businessSegmentFormControl = new FormControl('', [Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
 mVlandFormControl = new FormControl('', [Validators.required]);
 mVbuildingFormControl = new FormControl('', [ Validators.required]);
 // pPRStausFormControl = new FormControl('', [Validators.required]);
 mVplantMachineryFormControl = new FormControl('', [ Validators.required]);
 mVotherFormControl = new FormControl('', [Validators.required]);
 mVtotalFormControl = new FormControl('', [ Validators.required]);
otherFormControl = new FormControl('', [Validators.required]);
landFormControl = new FormControl('', [ Validators.required]);
fSValuebuildingFormControl = new FormControl('', [Validators.required]);
fSplantMachineryFormControl = new FormControl('', [ Validators.required]);
  fSotherFormControl = new FormControl('', [Validators.required]);
  fStotalFormControl = new FormControl('', [Validators.required]);
  duedateofNextValuationFormControl = new FormControl('', [ Validators.required]);
  accountStatusFormControl = new FormControl('', [ Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','nameOfBorrower','collateralReference',
'valuationReference','descriptionOfProperty','dateofLatestValuation','valuationConductedBy','mVland','mVbuilding','mVplantMachinery','mVother','mVtotal'
, 'land', 'fSValuebuilding', 'fSplantMachinery','fSother','fStotal','duedateofNextValuation','accountStatus','createdBy','modifiedBy'];
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

  allvaluationExpiryDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////



  public VisiblitypNumb: boolean = false;

  public hideEditButton: boolean = false;

  public hideDeleteButton: boolean = false;

  public hideForm: boolean = false;

  public hideDataTable: boolean = false;


  totalSum;     
  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""
  
  };


  @ViewChild('TABLE', { static: false }) table: ElementRef;

  @Input() valuationExpiryDetails = {

    object_id: "",

    primeNumber: "",
    businessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfBorrower: "",
    collateralReference: "",
    valuationReference: "",
    descriptionOfProperty: "",
    dateofLatestValuation: "",
    valuationConductedBy: "",
    mVland: "",
    mVbuilding: "",
    mVplantMachinery: "",
    mVother: "",
    
    mVtotal: "",
    
    land: "",
    
    fSValuebuilding: "",
    
    fSplantMachinery: "",
    
    fSother: "",
    
    fStotal: "",
    
    duedateofNextValuation: "",
    
    accountStatus: "",
    dataStatus: "",
    createdBy: "",
    modifiedBy: "",
    active: ""
  };

  constructor(
    private custService:CustService,
    private valuationExpiryService: valuationExpiryService,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
    private userIdle: UserIdleService,
    private _snackBar: MatSnackBar,
    private branchService : BranchService,
   // private toastr: ToastrService,
   private _dateFormatPipe: DateFormatPipe,
    public router: Router,
    private customerdemographicService: CustomerDemographicService,
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
      'PRIMEFORM':this.primeFormControl,
   'BRANCHCODE':this.BranchCodeFormControl ,
   'BRANCHNAME':this.branchNameControl ,
   'NAMEOFBORROWER':this.nameOfBorrowerFormControl ,
   'NAMEOFINSURANCE':this.nameofInsuranceCoFormControl ,
   'valuationReference':this.valuationReferenceFormControl ,
   'DOP':this.descriptionOfPropertyFormControl,
  
    'DOLV':this.dateofLatestValuationFormControl ,
    'VALUATIONCONDUCTEDBY':this.valuationConductedByFormControl ,
    'MVLAND':this.mVlandFormControl ,
    'MVBUILDING':this.mVbuildingFormControl ,
    // pPRStausFormControl = new FormControl('', [Validators.required]);
    'MYPLANTMACHINE':this.mVplantMachineryFormControl ,
    'MVOTHER':this.mVotherFormControl ,
    'MVTOTAL':this.mVtotalFormControl ,
    'OTHER':this.otherFormControl,
    'Land':this.landFormControl ,
    'BUILDING':this.fSValuebuildingFormControl,
    'PLANTMACHINERY':this.fSplantMachineryFormControl,
    'FSOTHER':this.fSotherFormControl,
    'FSVTOTAL':this.fStotalFormControl,
    'REGION':this.regionFormControl,
    'BS':this.businessSegmentFormControl,
     
     'AC':this.accountStatusFormControl,
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
displayTotal(){

 var mVland=parseInt(this.valuationExpiryDetails.mVland)
 var mVbuilding =parseInt(this.valuationExpiryDetails.mVbuilding)
 var mVother= parseInt(this.valuationExpiryDetails.mVother)
 var plantMachineray= parseInt(this.valuationExpiryDetails.mVplantMachinery)
 console.log(mVland)
 console.log(mVbuilding)
 console.log(mVother)
 console.log(plantMachineray)
 var sum = parseInt(this.totalSum)
 sum= parseInt(this.valuationExpiryDetails.mVland)+parseInt(this.valuationExpiryDetails.mVbuilding)+parseInt(this.valuationExpiryDetails.mVother)+parseInt(this.valuationExpiryDetails.mVplantMachinery)
console.log(sum)
this.valuationExpiryDetails.mVtotal= sum.toString();

console.log(this.allvaluationExpiryDetails.mVtotal);

}
totalSum1;
displayTotal2(){

  var mVland=parseInt(this.valuationExpiryDetails.land)
  var mVbuilding =parseInt(this.valuationExpiryDetails.fSValuebuilding)
  var mVother= parseInt(this.valuationExpiryDetails.fSother)
  var plantMachineray= parseInt(this.valuationExpiryDetails.fSplantMachinery)
  console.log(mVland)
  console.log(mVbuilding)
  console.log(mVother)
  console.log(plantMachineray)
  var sum = parseInt(this.totalSum1)
  sum= parseInt(this.valuationExpiryDetails.land)+parseInt(this.valuationExpiryDetails.fSother)+parseInt(this.valuationExpiryDetails.fSValuebuilding)+parseInt(this.valuationExpiryDetails.fSplantMachinery)
 console.log(sum)
 this.valuationExpiryDetails.fStotal= sum.toString();
 
 console.log(this.allvaluationExpiryDetails.fStotal);
 
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
enable() {
  this.isDisabled = false
}

disable() {
  this.isDisabled = true
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
    ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
findOne(){
  this.customerdemographicService.findOneCustomerDemographics(this.valuationExpiryDetails.primeNumber).subscribe((data :{})=>{
    console.log(this.valuationExpiryDetails.primeNumber)
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
      this.valuationExpiryDetails.region=findonedata[0].region
      console.log(this.valuationExpiryDetails.region)
      this.valuationExpiryDetails.businessSegment=findonedata[0].businessSegment
    }
    
  })
  }
  
onSearchChangeBranch(searchValue){
  console.log("hi mariaaaaa");
  console.log("hi maria",searchValue);
   var branchIndex = -1;
  for(var i =0;i < this.allBranchesDetails.length; i++){
    if(this.allBranchesDetails[i].BranchCode == searchValue)
   { branchIndex = i;}
  }
   this.valuationExpiryDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
 // this.valuationExpiryDetails.branchName=this.allBranchesDetails[searchValue].BranchName
 // this.valuationExpiryDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
  console.log ("hiiiii",this.valuationExpiryDetails.branchName);
  localStorage.setItem("branchName",this.valuationExpiryDetails.branchName);
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
    // this.valuationExpiryDetails.dateofLatestValuation = this._dateFormatPipe.transform(this.valuationExpiryDetails.dateofLatestValuation);
    // this.valuationExpiryDetails.duedateofNextValuation = this._dateFormatPipe.transform(this.valuationExpiryDetails.duedateofNextValuation);
    console.log("A");
    console.log(this.valuationExpiryDetails.primeNumber);
    console.log("B");
    var user= localStorage.getItem('userFullName')
    this.valuationExpiryDetails.createdBy= user;
    if (this.valuationExpiryDetails.object_id == "") {

      if (this.valuationExpiryDetails) {
        // var branch_code_id = this.valuationExpiryDetails.branchCode;
        // this.valuationExpiryDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.valuationExpiryDetails.createdBy= user;
        this.valuationExpiryService.createCustomerDemorgaphics(this.valuationExpiryDetails).subscribe((data: {}) => {
          this.valuationExpiryDetails.createdBy= user;
         // this.toastr.success('Customer Added Successfully');
         this.openSnackBar('Valuation Expiry Added Successfully','Sure');
          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.valuationExpiryDetails.modifiedBy= user;
//  var branch_code_id = this.valuationExpiryDetails.branchCode;
//         this.valuationExpiryDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.valuationExpiryService.updateCustomerDemorgaphics(this.valuationExpiryDetails.primeNumber, this.valuationExpiryDetails).subscribe((data: {}) => {

         // this.toastr.success('Customer Updated Successfully');
         this.openSnackBar('Valuation Expiry Updated Successfully','Sure');


        })

        location.reload();

      }



    }

  }

first : Date;
sub : string;
onDateDue(){
  console.log(this.valuationExpiryDetails.dateofLatestValuation);
var date= new Date(this.valuationExpiryDetails.dateofLatestValuation);
date.setFullYear(date.getFullYear() + 3);
this.first = date;

this.valuationExpiryDetails.duedateofNextValuation = this.first.toString().substring(4,15);
var d  =this.valuationExpiryDetails.duedateofNextValuation;
var e =new Date(d)
this.valuationExpiryDetails.duedateofNextValuation= e.toString();
this.valuationExpiryDetails.duedateofNextValuation= dat;
var dat = e.toString().substring(1,11)
console.log(dat)
console.log(e.getFullYear()); //this will give you full year eg : 1990
console.log(e.getDate()); //gives you the date from 1 to 31
console.log(e.getMonth() + 1); //getMonth will give month from 0 to 11 
var month =(e.getMonth() + 1);
this.valuationExpiryDetails.duedateofNextValuation= e.getDate() +"-"+month+"-"+e.getFullYear();
// console.log('maria',date);
// console.log('D',this.first);
console.log('DS',this.valuationExpiryDetails.duedateofNextValuation)
}

  fetchByTab() {

    if (!this.valuationExpiryDetails.primeNumber) {

      return this.valuationExpiryService.getCustomerDemographic(this.valuationExpiryDetails.primeNumber).subscribe((data: {}) => { })

    }

  }



  validaions(){

    // if(!this.valuationExpiryDetails.primeNumber ||!this.valuationExpiryDetails.businessSegment||
    //   !this.valuationExpiryDetails.duedateofNextValuation || !this.valuationExpiryDetails.region
    //   || !this.valuationExpiryDetails.valuationReference || !this.valuationExpiryDetails.valuationConductedBy
    //   || !this.valuationExpiryDetails.accountStatus || this.valuationExpiryDetails.collateralReference||this.valuationExpiryDetails.descriptionOfProperty){
      
      if(!this.valuationExpiryDetails.primeNumber){
    this.openSnackBar('please enter all the required fields','Sure');
    }
   else if(!this.valuationExpiryDetails.businessSegment){
      this.openSnackBar('please enter all the required fields','Sure');
      }
      else if(!this.valuationExpiryDetails.region){
        this.openSnackBar('please enter all the required fields','Sure');
        }
        else if(!this.valuationExpiryDetails.collateralReference){
          this.openSnackBar('please enter all the required fields','Sure');
          }
          else if(!this.valuationExpiryDetails.valuationReference){
            this.openSnackBar('please enter all the required fields','Sure');
            }
            else if(!this.valuationExpiryDetails.descriptionOfProperty){
              this.openSnackBar('please enter all the required fields','Sure');
              }
              else if(!this.valuationExpiryDetails.dateofLatestValuation){
                this.openSnackBar('please enter all the required fields','Sure');
                }
                else if(!this.valuationExpiryDetails.valuationConductedBy){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
                  
                else if(!this.valuationExpiryDetails.land){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
                  else if(!this.valuationExpiryDetails.mVbuilding){
                    this.openSnackBar('please enter all the required fields','Sure');
                    }
                    
                else if(!this.valuationExpiryDetails.mVplantMachinery){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
                  
                else if(!this.valuationExpiryDetails.mVplantMachinery){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
                  
                else if(!this.valuationExpiryDetails.fSValuebuilding){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
                  
                else if(!this.valuationExpiryDetails.fSother){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
                  
                else if(!this.valuationExpiryDetails.accountStatus){
                  this.openSnackBar('please enter all the required fields','Sure');
                  }
// if(this.valuationExpiryDetails.primeNumber.length<6){
//   this.openSnackBar('please enter primeNumber of 6 digits','Sure');

// }
    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    if(this.valuationExpiryDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }    
    return 0;
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
  onFocusOut() {






    this.valuationExpiryService.getCustomerDemographic(this.valuationExpiryDetails.primeNumber).subscribe(() => { })
    var data = this.valuationExpiryService.getCustomerDemographicData()


    if (data > 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.valuationExpiryDetails = {

      object_id: data[0]._id,

      primeNumber: data[0].primeNumber,
      businessSegment: data[0].businessSegment,
      region: data[0].region,
      branchCode: data[0].branchCode,
      branchName: data[0].branchName,
      nameOfBorrower: data[0].nameOfBorrower,
      collateralReference: data[0].collateralReference,
      valuationReference: data[0].valuationReference,
      descriptionOfProperty: data[0].descriptionOfProperty,
      dateofLatestValuation: data[0].dateofLatestValuation,
      valuationConductedBy: data[0].valuationConductedBy,
      mVland: data[0].mVland,
      mVbuilding: data[0].mVbuilding,
      mVplantMachinery: data[0].mVplantMachinery,
      mVother: data[0].mVother,
     mVtotal: data[0].mVtotal,
      land: data[0].land,
       fSValuebuilding: data[0].fSValuebuilding,
       fSplantMachinery: data[0].fSplantMachinery,
       fSother: data[0].fSother,
      fStotal: data[0].fStotal,
      duedateofNextValuation: data[0].duedateofNextValuation,
      accountStatus: data[0].accountStatus,
      dataStatus: data[0].dataStatus,
      createdBy: data[0].createdBy,
      modifiedBy: data[0].modifiedBy,
      active: data[0].active



    };
    this.findOne();
      console.log(this.valuationExpiryDetails);
    }



    else {
      console.log("here")
      console.log(this.valuationExpiryDetails.primeNumber)
      this.custService.cust(this.valuationExpiryDetails.primeNumber).subscribe((data: {}) => {
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

    
          this.valuationExpiryDetails = {

     
      object_id: "",
      primeNumber: this.valuationExpiryDetails.primeNumber,
  //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,
      businessSegment: "",
      region: "",
      branchCode:this.branchCodee,
      branchName: this.branchNamee,
      nameOfBorrower: this.nameOfBorrower,
      collateralReference: "",
      valuationReference: "",
      descriptionOfProperty:"",
      dateofLatestValuation: "",
      valuationConductedBy: "",
      mVland: "",
      mVbuilding: "",
      mVplantMachinery: "",
      mVother: "",
     mVtotal: "",
      land: "",
       fSValuebuilding: "",
       fSplantMachinery: "",
       fSother:"",
      fStotal: "",
      duedateofNextValuation: "",
      accountStatus: "",
      dataStatus: "",
      createdBy: "",
      modifiedBy: "",
      active: "",



   };
      },
        error => {
          console.log("Error");
        }
      );

      console.log("Inside Focus");



    // console.log("Inside Focus");

    // var data = this.valuationExpiryService.getCustomerDemographicData()

    // console.log('data ka zero index : ', data[0]);

    // this.valuationExpiryDetails = {

    //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,
    //   businessSegment: data[0].businessSegment,
    //   region: data[0].region,
    //   branchCode: data[0].branchCode,
    //   branchName: data[0].branchName,
    //   nameOfBorrower: data[0].nameOfBorrower,
    //   collateralReference: data[0].collateralReference,
    //   valuationReference: data[0].valuationReference,
    //   descriptionOfProperty: data[0].descriptionOfProperty,
    //   dateofLatestValuation: data[0].dateofLatestValuation,
    //   valuationConductedBy: data[0].valuationConductedBy,
    //   mVland: data[0].mVland,
    //   mVbuilding: data[0].mVbuilding,
    //   mVplantMachinery: data[0].mVplantMachinery,
    //   mVother: data[0].mVother,
    //  mVtotal: data[0].mVtotal,
    //   land: data[0].land,
    //    fSValuebuilding: data[0].fSValuebuilding,
    //    fSplantMachinery: data[0].fSplantMachinery,
    //    fSother: data[0].fSother,
    //   fStotal: data[0].fStotal,
    //   duedateofNextValuation: data[0].duedateofNextValuation,
    //   accountStatus: data[0].accountStatus,
    //   dataStatus: data[0].dataStatus,
    //   createdBy: data[0].createdBy,
    //   modifiedBy: data[0].modifiedBy,
    //   active: data[0].active



    // };

  }}

  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }

  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.valuationExpiryService.getCustomerDemographic(this.valuationExpiryDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.valuationExpiryService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }



  loadCustomerDemographicData() {
 return this.valuationExpiryService.getCustomerDemographics().subscribe((data: {}) => {
      this.allvaluationExpiryDetails = data;
      this.dataSource = new MatTableDataSource(this.allvaluationExpiryDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  editCustomerDemographic(valuationExpiryData) {
    window.confirm('Are you sure, you want to edit?')
    this.disable();
    this.valuationExpiryDetails = valuationExpiryData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.valuationExpiryDetails.primeNumber = "";
    this.valuationExpiryDetails.branchCode = "";
    this.valuationExpiryDetails.businessSegment = "";
    this.valuationExpiryDetails.region = "";
    this.valuationExpiryDetails.branchCode = "";
    this.valuationExpiryDetails.branchName = "";
    this.valuationExpiryDetails.nameOfBorrower = "";
    this.valuationExpiryDetails.collateralReference= "";
    this.valuationExpiryDetails.valuationReference= "";
    this.valuationExpiryDetails.descriptionOfProperty= "";
    this.valuationExpiryDetails.dateofLatestValuation= "";
    this.valuationExpiryDetails.valuationConductedBy= "";
    this.valuationExpiryDetails.mVland= "";
    this.valuationExpiryDetails.mVbuilding= "";
    this.valuationExpiryDetails.mVplantMachinery= "";
    this.valuationExpiryDetails.mVother= "";
    this.valuationExpiryDetails.mVtotal= "";
    this.valuationExpiryDetails.land= "";
    this.valuationExpiryDetails.fSValuebuilding= "";
    this.valuationExpiryDetails.fSplantMachinery= "";
    this.valuationExpiryDetails.fSother= "";
    this.valuationExpiryDetails.fStotal= "";
    this.valuationExpiryDetails.duedateofNextValuation= "";
    this.valuationExpiryDetails.accountStatus= "";
    this.valuationExpiryDetails.dataStatus= "";
    // this.valuationExpiryDetails.fSother= "";
    // this.valuationExpiryDetails.fStotal= "";
    // this.valuationExpiryDetails.dataStatus = "";

    // this.valuationExpiryDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.valuationExpiryService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allvaluationExpiryDetails = this.inputdata;

      this.valuationExpiryService.setCustomerDemographicData(data);

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
      this.valuationExpiryService.deleteCustomersdemographic(primeNumber).subscribe(data => {
       //this.toastr.success('Customer deleted Successfully');
       this.openSnackBar('Valuation Expiry deleted Successfully','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }


}
