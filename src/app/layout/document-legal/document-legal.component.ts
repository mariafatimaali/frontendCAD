//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { CustService } from '../../_services/custdemo/custdemo.service';
// import {BranchService} from '../../_services/branches/branches.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { DocumentLegalService } from "../../_services/documentLegal/document-legal.service";
import { format } from 'url';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { documentLegal } from 'src/app/_models/documentLegal.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
// import { FormBuilder, Validators } from "@angular/forms";
interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface Account{
  value: string;
  viewValue: string;
}
interface legalReview{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-document-legal',
  templateUrl: './document-legal.component.html',
  styleUrls: ['./document-legal.component.scss'],
 // providers: [DateFormatPipe]
})
export class DocumentLegalComponent implements OnInit {
  durationInSeconds = 5;

  business: businessSegment[] = [
    { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Commercial', viewValue: 'Commercial' },
    { value: 'FI', viewValue: 'FI' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Retail', viewValue: 'Retail' },
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
  ];
  legalReview: legalReview[] = [
  { value: 'A. W. Butt & Associates', viewValue: 'A. W. Butt & Associates' },
  { value: 'Abdul Ghafoor Soomro', viewValue: 'Abdul Ghafoor Soomro' },
  { value: 'Abdul Rauf Arain', viewValue: 'Abdul Rauf Arain' },
  { value: 'Abdullah & Chaudhry', viewValue: 'Abdullah & Chaudhry' },
  { value: 'Adil & Bilal', viewValue: 'Adil & Bilal' },
  { value: 'Ahmed & Qazi Associates', viewValue: 'Ahmed & Qazi Associates' },
  { value: 'Ahmed Bashir & Associates', viewValue: 'Ahmed Bashir & Associates' },
  { value: 'Ahtsham Ajmal Sandhu', viewValue: 'Ahtsham Ajmal Sandhu' },
  { value: 'Ajmal Khan Kasi', viewValue: 'Ajmal Khan Kasi' },
  { value: 'AJURIS', viewValue: 'AJURIS' },
  { value: 'Akhtiar Ahmed', viewValue: 'Akhtiar Ahmed' },
  { value: 'Akhund Forbes', viewValue: 'Akhund Forbes' },
  { value: 'Alamzeb Khan', viewValue: 'Alamzeb Khan' },
  { value: 'Ali & Qazi', viewValue: 'Ali & Qazi' },
  { value: 'Ali Gohar Durrani', viewValue: 'Ali Gohar Durrani' },
  { value: 'Ali Law Associates', viewValue: 'Ali Law Associates' },
  { value: 'Ali Yawar Mirza', viewValue: 'Ali Yawar Mirza' },
  { value: 'Altaf Mahmood Qureshi', viewValue: 'Altaf Mahmood Qureshi' },
  { value: 'Aly Shah & Co.', viewValue: 'Aly Shah & Co.' },
  { value: 'Amjad Ali', viewValue: 'Amjad Ali' },
  { value: 'Ansari Law Chamber', viewValue: 'Ansari Law Chamber' },
  { value: 'Anwar Baig Mughal Law Associates', viewValue: 'Anwar Baig Mughal Law Associates' },
  { value: 'Asghar Ali', viewValue: 'Asghar Ali' },
  { value: 'Ashoke Kumar Jamba', viewValue: 'Ashoke Kumar Jamba' },
  { value: 'Ashraf, Shaheen & Zahid', viewValue: 'Ashraf, Shaheen & Zahid' },
  { value: 'Asif Imran Awan', viewValue: 'Asif Imran Awan' },
  { value: 'Asim Nazir & Co.', viewValue: 'Asim Nazir & Co.' },
  { value: 'Atif Ilyas Khan', viewValue: 'Atif Ilyas Khan' },
  { value: 'Atta Hussain', viewValue: 'Atta Hussain' },
  { value: 'Attaullah Jan', viewValue: 'Attaullah Jan' },
  { value: 'Attia Bano', viewValue: 'Attia Bano' },
  { value: 'Awan Raza Khalil', viewValue: 'Awan Raza Khalil' },
  { value: 'Axis Law Chambers', viewValue: 'Axis Law Chambers' },
  { value: 'Azam Lawyers & Consultants', viewValue: 'Azam Lawyers & Consultants' },
  { value: 'Azizuddin & Shahid Law Associates', viewValue: 'Azizuddin & Shahid Law Associates' },
  { value: 'Aziz-ur-Rehman Khan', viewValue: 'Aziz-ur-Rehman Khan' },
  { value: 'Azmatullah Warraich', viewValue: 'Azmatullah Warraich' },
  { value: 'Bari Law Associates', viewValue: 'Bari Law Associates' },
  { value: 'Barrister Babar Chambers', viewValue: 'Barrister Babar Chambers' },
  { value: 'Basharat Akhtar', viewValue: 'Basharat Akhtar' },
  { value: 'Bashr & Tayyeb Law', viewValue: 'Bashr & Tayyeb Law' },
  { value: 'Bokhari Law Associates', viewValue: 'Bokhari Law Associates' },
  { value: 'Burhan Consultants', viewValue: 'Burhan Consultants' },
  { value: 'Ch. Ahsan Qadeer', viewValue: 'Ch. Ahsan Qadeer' },
  { value: 'Ch. Asimullah Khan & Co.', viewValue: 'Ch. Asimullah Khan & Co.' },
  { value: 'Ch. Fayyaz Ahmed Lone', viewValue: 'Ch. Fayyaz Ahmed Lone' },
  { value: 'Ch. Habibullah', viewValue: 'Ch. Habibullah' },
  { value: 'Ch. Muhammad Asghar', viewValue: 'Ch. Muhammad Asghar' },
  { value: 'Ch. Muhammad Yasser Bhatti', viewValue: 'Ch. Muhammad Yasser Bhatti' },
  { value: 'Ch. Muzammal Hussain', viewValue: 'Ch. Muzammal Hussain' },
  { value: 'Ch. Naeem Ullah', viewValue: 'Ch. Naeem Ullah' },
  { value: 'Ch. Naveed Sana', viewValue: 'Ch. Naveed Sana' },
  { value: 'Ch. Sadaqat Ali', viewValue: 'Ch. Sadaqat Ali' },
  { value: 'Chaudhary Shaukat Aziz', viewValue: 'Chaudhary Shaukat Aziz' },

  { value: 'Chaudhry Abdul Rauf & Co.', viewValue: 'Chaudhry Abdul Rauf & Co.' },
  { value: 'Chima & Ibrahim Advocates', viewValue: 'Chima & Ibrahim Advocates' },
  { value: 'Chishti Law Associates', viewValue: 'Chishti Law Associates' },
  { value: 'CKR & Zia', viewValue: 'CKR & Zia' },
  { value: 'Co. Legal Care', viewValue: 'Co. Legal Care' },
  { value: 'Col. (Retd.) Muhammad Khalid Chattha', viewValue: 'Col. (Retd.) Muhammad Khalid Chattha' },
  { value: 'Essani Law Associates', viewValue: 'Essani Law Associates' },
  { value: 'Faqir Asfundyar Yousuf', viewValue: 'Faqir Asfundyar Yousuf' },
  { value: 'Farhat Abbas Ranjha', viewValue: 'Farhat Abbas Ranjha' },
  { value: 'Farouk Adam Khan & Associates', viewValue: 'Farouk Adam Khan & Associates' },
  { value: 'Farzana Latif', viewValue: 'Farzana Latif' },
  { value: 'Fayyaz Ahmed A. Soomro', viewValue: 'Fayyaz Ahmed A. Soomro' },
  { value: 'Friends Law Associates', viewValue: 'Friends Law Associates' },
  { value: 'Friends Law Chambers', viewValue: 'Friends Law Chambers' },
{ value: 'Ghauri Law Associates', viewValue: 'Ghauri Law Associates' },
{ value: 'Ghazanfar Ali Zafar', viewValue: 'Ghazanfar Ali Zafar' },
{ value: 'Ghazanfar Law Associates', viewValue: 'Ghazanfar Law Associates' },
{ value: 'Ghazi Law Associates', viewValue: 'Ghazi Law Associates' },
{ value: 'Ghulam Murtaza Awan', viewValue: 'Ghulam Murtaza Awan' },
{ value: 'Gillani & Gillani', viewValue: 'Gillani & Gillani' },
{ value: 'Gohar Rehman Khattak', viewValue: 'Gohar Rehman Khattak' },
{ value: 'Gul Murad Khan', viewValue: 'Gul Murad Khan' },
{ value: 'Gulzar Ahmed Khan', viewValue: 'Gulzar Ahmed Khan' },
{ value: 'H. A. Law Associates', viewValue: 'H. A. Law Associates' },
{ value: 'Habib Law Associates', viewValue: 'Habib Law Associates' },
{ value: 'Haidermot & Co.', viewValue: 'Haidermot & Co.' },
{ value: 'Hakim Ali Siddqiqui', viewValue: 'Hakim Ali Siddqiqui' },
{ value: 'Haq Law Associates', viewValue: 'Haq Law Associates' },
{ value: 'Hassan Kaunain Nafees', viewValue: 'Hassan Kaunain Nafees' },
{ value: 'Hazrat Munir Kamal', viewValue: 'Hazrat Munir Kamal' },
{ value: 'HS Law Associates', viewValue: 'HS Law Associates' },
{ value: 'Iftikhar-ul-Haq Khan Sherwani', viewValue: 'Iftikhar-ul-Haq Khan Sherwani' },
{ value: 'Ijaz Ahmed & Associates', viewValue: 'Ijaz Ahmed & Associates' },
{ value: 'Ijaz Iqbal Malik', viewValue:'Ijaz Iqbal Malik' },
{ value: 'Imran Ali Borano', viewValue:'Imran Ali Borano' },
{ value: 'Imran Malik', viewValue: 'Imran Malik' },
{ value: 'Imtiaz Ahmed Warraich', viewValue: 'Imtiaz Ahmed Warraich' },
{ value: 'Jauzer Q.  Pishori', viewValue: 'Jauzer Q.  Pishori' },
{ value: 'Javed Ali Khan', viewValue: 'Javed Ali Khan' },
{ value: 'Javed Najam Us Saqib', viewValue: 'Javed Najam Us Saqib' },
{ value: 'Jawad Dilawar', viewValue: 'Jawad Dilawar' },
{ value: 'Jehangir Khan Jadoon', viewValue: 'Jehangir Khan Jadoon' },
{ value: 'Junaid Ahmed', viewValue: 'Junaid Ahmed' },
{ value: 'Junaid Sattar Siddiqui', viewValue: 'Junaid Sattar Siddiqui' },
{ value: 'Kabraji & Talibuddin', viewValue: 'Kabraji & Talibuddin' },
{ value: 'Kamran Siyal', viewValue: 'Kamran Siyal' },
{ value: 'Kareem-ud-Din Khilji', viewValue: 'Kareem-ud-Din Khilji' },
{ value: 'Karim N. Noorani', viewValue: 'Karim N. Noorani' },
{ value: 'Kashif Paracha Law Associates', viewValue: 'Kashif Paracha Law Associates' },
{ value: 'Kazmiz', viewValue: 'Kazmiz' },
{ value: 'Khalid Mahmood', viewValue: 'Khalid Mahmood' },
{ value: 'Khalique Ahmed Khan', viewValue: 'Khalique Ahmed Khan' },
{ value: 'Khan & Khan', viewValue: 'Khan & Khan' },
{ value: 'Khawaja Afzaal Hussain Law Associates', viewValue: 'Khawaja Afzaal Hussain Law Associates' },
{ value: 'Khawaja Nasir Bashir Lone', viewValue: 'Khawaja Nasir Bashir Lone' },
{ value: 'Khawaja Shahid Hussain', viewValue: 'Khawaja Shahid Hussain' },
{ value: 'Khurram Law Associates', viewValue: 'Khurram Law Associates' },
{ value: 'Khursheed Ahmed Shaikh', viewValue: 'Khursheed Ahmed Shaikh' },
{ value: 'Khursheed Anwar Mughal', viewValue: 'Khursheed Anwar Mughal' },
{ value: 'KIH Law Associates', viewValue: 'KIH Law Associates' },
{ value: 'Laeeque Mahmood Aamer', viewValue: 'Laeeque Mahmood Aamer' },
{ value: 'Lawyers & Lawyers Professionals', viewValue: 'Lawyers & Lawyers Professionals' },
{ value: 'Legal & Corporate Consultants', viewValue: 'Legal & Corporate Consultants' },
{ value: 'Lex Firma', viewValue: 'Lex Firma' },
{ value: 'Lexicon Law Firm', viewValue: 'Lexicon Law Firm' },
{ value: 'Lexium', viewValue: 'Lexium' },
{ value: 'Liaquat Merchant-Ebrahim Hosain', viewValue: 'Liaquat Merchant-Ebrahim Hosain' },
{ value: 'Lincdus Lawyer', viewValue: 'Lincdus Lawyer' },
{ value: 'Luqman Law Firm', viewValue: 'Luqman Law Firm'},
{ value: 'M. Ishaq Ali & Co.', viewValue: 'M. Ishaq Ali & Co.' },
{ value: 'Malik & Company', viewValue: 'Malik & Company' },
{ value: 'Malik Muhammad Pervez', viewValue: 'Malik Muhammad Pervez' },
{ value: 'Malik Muhammad Shabbir', viewValue: 'Malik Muhammad Shabbir' },
{ value: 'Mandviwala & Zaffar ', viewValue: 'Mandviwala & Zaffar ' },
{ value: 'Martis', viewValue: 'Martis' },
{ value: 'Mazhar Ali Shah', viewValue: 'Mazhar Ali Shah' },
{ value: 'MCAS&W Law Associates', viewValue: 'MCAS&W Law Associates' },
{ value: 'Mian Khalid Mahmood Naseem', viewValue: 'Mian Khalid Mahmood Naseem' },
{ value: 'Mian Muhammad Mustafiz-ur-Rehman', viewValue: 'Mian Muhammad Mustafiz-ur-Rehman' },
{ value: 'Mir Dullah Jan', viewValue: 'Mir Dullah Jan' },
{ value: 'Mir Talal Rind', viewValue: 'Mir Talal Rind' },
{ value: 'Mirpur Law Associates', viewValue: 'Mirpur Law Associates' },
{ value: 'Mirza Akbar Baig', viewValue: 'Mirza Akbar Baig' },
{ value: 'Mohsin Ali Khan Pathan', viewValue: 'Mohsin Ali Khan Pathan' },
{ value: 'Mohsin Tayebaly & Co.', viewValue: 'Mohsin Tayebaly & Co.' },
{ value: 'Mughees Aslam Malik', viewValue: 'Mughees Aslam Malik' },
{ value: 'Muhammad & Muhammad', viewValue: 'Muhammad & Muhammad' },
{ value: 'Muhammad Aqeel Malik', viewValue: 'Muhammad Aqeel Malik' },
{ value: 'Muhammad Asghar', viewValue: 'Muhammad Asghar' },
{ value: 'Muhammad Aslam Chowdhry', viewValue: 'Muhammad Aslam Chowdhry' },
{ value: 'Muhammad Aslam Khan', viewValue: 'Muhammad Aslam Khan' },
{ value: 'Muhammad Aslam Khawaja', viewValue: 'Muhammad Aslam Khawaja' },
{ value: 'Muhammad Bakhtiar Khan', viewValue: 'Muhammad Bakhtiar Khan' },
{ value: 'Muhammad Bashir Tabassum', viewValue: 'Muhammad Bashir Tabassum' },
{ value: 'Muhammad Faizan Ullah', viewValue: 'Muhammad Faizan Ullah' },
{ value: 'Muhammad Fayaz', viewValue: 'Muhammad Fayaz' },
{ value: 'Muhammad Hashim Tatari', viewValue: 'Muhammad Hashim Tatari' },
{ value: 'Muhammad Ilyas Dars', viewValue: 'Muhammad Ilyas Dars' },
{ value: 'Muhammad Khawar Minhas', viewValue: 'Muhammad Khawar Minhas' },
{ value: 'Muhammad Latif Mirza', viewValue: 'Muhammad Latif Mirza' },
{ value: 'Muhammad Naveed Sheikh', viewValue: 'Muhammad Naveed Sheikh' },
{ value: 'Muhammad Nawaz', viewValue: 'Muhammad Nawaz' },
{ value: 'Muhammad Nawaz Soomro', viewValue: 'Muhammad Nawaz Soomro' },
{ value: 'Muhammad Siddique Deol', viewValue: 'Muhammad Siddique Deol' },
{ value: 'Muhammad Siddique Soomro', viewValue: 'Muhammad Siddique Soomro' },
{ value: 'Muhammad Zubair & Associates', viewValue: 'Muhammad Zubair & Associates' },
{ value: 'Muhammadans', viewValue: 'Muhammadans' },
{ value: 'Murad & Rafique', viewValue: 'Murad & Rafique' },
{ value: 'Mushtaq Law Associates', viewValue: 'Mushtaq Law Associates' },
{ value: 'Naeem & Company', viewValue: 'Naeem & Company' },
{ value: 'Nafees Siddiqi Law Associates', viewValue: 'Nafees Siddiqi Law Associates' },
{ value: 'Nasir Law Associates', viewValue: 'Nasir Law Associates' },
{ value: 'Nasreen Qadri', viewValue: 'Nasreen Qadri' },
{ value: 'Nawabzada Zulfiqar Ali Khan', viewValue: 'Nawabzada Zulfiqar Ali Khan' },
{ value: 'Qamaruddin Memon', viewValue: 'Qamaruddin Memon' },
{ value: 'Qasim Afridi', viewValue: 'Qasim Afridi' },
{ value: 'Qureshi Law Chamber', viewValue: 'Qureshi Law Chamber' },
{ value: 'Raja Muhammad Akram & Co.', viewValue: 'Raja Muhammad Akram & Co.' },
{ value: 'Raja Muhammad Taj Khan', viewValue: 'Raja Muhammad Taj Khan' },
{ value: 'Rajesh Kumar Khagaija', viewValue: 'Rajesh Kumar Khagaija' },
{ value: 'Rana Aamir Mahmood Khan', viewValue: 'Rana Aamir Mahmood Khan' },
{ value: 'Ranjha Law Associates', viewValue: 'Ranjha Law Associates' },
{ value: 'Rao Amer Faraz', viewValue: 'Rao Amer Faraz' },
{ value: 'Rao Amer Hayat Khan', viewValue: 'Rao Amer Hayat Khan' },
{ value: 'Rao Farhan Ali', viewValue: 'Rao Farhan Ali' },
{ value: 'Rashid Hafeez', viewValue: 'Rashid Hafeez' },
{ value: 'Rehan Kayani', viewValue: 'Rehan Kayani' },
{ value: 'Rehman Law Chamber', viewValue: 'Rehman Law Chamber' },
{ value: 'Saeed Raza', viewValue: 'Saeed Raza' },
{ value: 'Sajid Law Associates', viewValue: 'Sajid Law Associates' },
{ value: 'Sajjad Maitla Law Associates', viewValue: 'Sajjad Maitla Law Associates' },
{ value: 'Saleem Akhtar Warraich & Associates', viewValue: 'Saleem Akhtar Warraich & Associates' },
{ value: 'Salman Hamid Hussain', viewValue: 'Salman Hamid Hussain' },
{ value: 'Sardar Ali Khan', viewValue: 'Sardar Ali Khan' },
{ value: 'Sardar Khan', viewValue: 'Sardar Khan' },
{ value: 'Sardar Noor Ahmed Khan Malezai', viewValue: 'Sardar Noor Ahmed Khan Malezai' },
{ value: 'Sarfaraz Ali Abbasi', viewValue: 'Sarfaraz Ali Abbasi' },
{ value: 'Sayyed Inayat Shah Bacha', viewValue: 'Sayyed Inayat Shah Bacha' },
{ value: 'Shabana Law Associates', viewValue: 'Shabana Law Associates' },
{ value: 'Shahbaz Akhtar & Associates', viewValue: 'Shahbaz Akhtar & Associates' },
{ value: 'Shaista Kausar', viewValue: 'Shaista Kausar' },
{ value: 'Shalman Law Chamber', viewValue: 'Shalman Law Chamber' },
{ value: 'Sheeba & Associates', viewValue: 'Sheeba & Associates' },
{ value: 'Shuaib Sultan', viewValue: 'Shuaib Sultan' },
{ value: 'Sultan Muhammad Khan', viewValue: 'Sultan Muhammad Khan' },
{ value: 'Summara Ahmed Raza', viewValue: 'Summara Ahmed Raza' },
{ value: 'Syed Abdul Jalil Shah', viewValue: 'Syed Abdul Jalil Shah' },
{ value: 'Syed Anees-ul-Hassan Gillani', viewValue: 'Syed Anees-ul-Hassan Gillani' },
{ value: 'Syed Anwar Ali Shah', viewValue: 'Syed Anwar Ali Shah' },
{ value: 'Syed Asim Masood Gillani', viewValue: 'Syed Asim Masood Gillani' },
{ value: 'Syed Law Associates', viewValue: 'Syed Law Associates' },
{ value: 'Syed Muhammad Nabi Abid', viewValue: 'Syed Muhammad Nabi Abid' },
{ value: 'Syed Noman Zahid Ali & Associates', viewValue: 'Syed Noman Zahid Ali & Associates' },
{ value: 'Syed Sabz Ali Shah', viewValue: 'Syed Sabz Ali Shah' },
{ value: 'Syed Waseem Abbas Bukhari', viewValue: 'Syed Waseem Abbas Bukhari' },
{ value: 'Tabassum Naeem Ahmed', viewValue: 'Tabassum Naeem Ahme' },
{ value: 'Tanveer Syed Consultancy', viewValue: 'Tanveer Syed Consultancy' },
{ value: 'Tariq Law Associates', viewValue: 'Tanveer Syed Consultancy' },
{ value: 'Tariq Mahmood Bhalli', viewValue: 'Tariq Mahmood Bhalli' },
{ value: 'The Eastern Law Firm', viewValue: 'The Eastern Law Firm'},
{ value: 'Wajid Kabir Chughtai', viewValue: 'Wajid Kabir Chughtai' },
{ value: 'Waseem Ullah Solangi', viewValue: 'Waseem Ullah Solangi' },
{ value: 'Yasir Riaz', viewValue: 'Yasir Riaz' },
{ value: 'Yasir Tahseen Talpur & Associates', viewValue: 'Yasir Tahseen Talpur & Associates' },
{ value: 'Zafar Ali Khan Khawajakhel', viewValue: 'Zafar Ali Khan Khawajakhel' },
{ value: 'Zafar Iqbal', viewValue: 'Zafar Iqbal' },
{ value: 'Zahid Law Associates', viewValue: 'Zahid Law Associates' },
{ value: 'Zahid Mehmood Mughal', viewValue: 'Zahid Mehmood Mughal' },
{ value: 'Zaib Law Associates (Bahawalpur)', viewValue: 'Zaib Law Associates (Bahawalpur)' },
{ value: 'Zamman Law Associates', viewValue: 'Zamman Law Associates' },
];
  account: Account[] = [
    {value: 'Regular', viewValue: 'Regular'},
    {value: 'NPL', viewValue: 'NPL'},
    {value: 'Adjusted', viewValue: 'Adjusted'},
    {value: 'Write-off', viewValue: 'Write-offs'}
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
  tLFormControl = new FormControl('', [ Validators.required]);
  regionFormControl = new FormControl('', [ Validators.required]);
  dateLegalReviewFormControl = new FormControl('', [Validators.required]);
  dateNextLegalReviewDueFormControl = new FormControl('', [ Validators.required]);
  legalReviewDoneByControl = new FormControl('', [Validators.required]);
  accountStatusFormControl = new FormControl('', [ Validators.required]);
  remarkseFormControl = new FormControl('', [Validators.required]);
  rMFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
 // customerStatusFormControl = new FormControl('', [Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','primeNumber','businessSegment','region','branchCode','branchName','rM','tL',
'nameOfBorrower','dateLegalReview','dateNextLegalReviewDue','legalReviewDoneBy','accountStatus','remarks','createdBy','createdOn','modifiedBy','modifiedOn'];
dataSource = new MatTableDataSource();
places: Array<any> = [];
isDisabled: boolean = false;
  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
  // tableprimenumber: number;
  ///////////////////////////////////Pagination Veriables//////////////////////////////////
  pageSize = 5;
  page: any = 1;
  previousPage: any;
  totalRec: number;
  //////////////////////////////////Data Veriables////////////////////////////////////////
  inputdata: any = [];
  allCustomerDemographicDetails: any = [];
allBranchesDetails:any=[];
//selectedBranch :allBranchesDetails[];
selectedBranch: any ;
form: FormGroup;
BranchName: string;
tranList: any;
  isSubmitted = false;
  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////

  tableprimenumber: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  // pageSize = 5;
  // page: any = 1;
  // previousPage: any;
  // totalRec: number;

  // //////////////////////////////////Data Veriables////////////////////////////////////////

  // inputdata: any = [];
  alldocumentLegalDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////
  public VisiblitypNumb: boolean = false;
  public hideEditButton: boolean = false;
  public hideDeleteButton: boolean = false;
  public hideForm: boolean = false;
  public hideDataTable: boolean = false;

  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @Input() documentLegalDetails = {

    object_id: "",
    primeNumber: "",
    businessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    rM: "",
    tL:"",
    nameOfBorrower :"",
    dateLegalReview :"",
    dateNextLegalReviewDue :"",
    legalReviewDoneBy :"",
    accountStatus :"",
    remarks :"",
    dataStatus:"",
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
    private custService:CustService,
  //  private branchService : BranchService,
    private formBuilder: FormBuilder,
    private documentLegalService: DocumentLegalService,
    public actRoute: ActivatedRoute,
   // private toastr: ToastrService,
   private _snackBar: MatSnackBar,
    public router: Router,
  //  private _dateFormatPipe: DateFormatPipe,
    private restservice: RestService,
    public fb: FormBuilder

  ) { }
  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]]
  })
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
      'rM':this.rMFormControl,
      'tL':this.tLFormControl,
      'dateLegalReview':this.dateLegalReviewFormControl,
      'dateNextLegalReviewDue':this.dateNextLegalReviewDueFormControl,
      'legalReviewDoneBy':this.legalReviewDoneByControl,
      'ccountStatus':this.accountStatusFormControl,
      'REGION':this.regionFormControl,
      'BS':this.businessSegmentFormControl,

'REMARKS':this.remarkseFormControl,

          });
        //  this.loadCustomerDemographicData();
          this.onSubmit();
         // this.loadBranches();
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

  addCustomerDemographic() {
    // this.documentLegalDetails.dateLegalReview = this._dateFormatPipe.transform(this.documentLegalDetails.dateLegalReview);
    // this.documentLegalDetails.dateNextLegalReviewDue= this._dateFormatPipe.transform(this.documentLegalDetails.dateNextLegalReviewDue);


   // this.validaions()
   var user= localStorage.getItem('userFullName')
   this.documentLegalDetails.createdBy= user;
   var today = new Date();
    console.log(this.documentLegalDetails);

    if (this.documentLegalDetails.object_id == "") {
      this.documentLegalDetails.createdBy= user;
      this.documentLegalDetails.createdOn =today.toString();
      console.log(this.documentLegalDetails.createdOn)
      if (this.documentLegalDetails) {
        // var branch_code_id = this.documentLegalDetails.branchCode;
        // this.documentLegalDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.documentLegalService.createCustomerDemorgaphics(this.documentLegalDetails).subscribe((data: {}) => {
          this.documentLegalDetails.createdBy= user;
         // this.toastr.success('Document Legal Details Added Successfully');
         this.openSnackBar('Document Legal Details Added Successfully','Sure');
          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.documentLegalDetails.modifiedBy= user;
      //  this.customerDemographicDetails.modifiedBy= user;
        this.documentLegalDetails.modifiedOn =today.toString();
 var branch_code_id = this.documentLegalDetails.branchCode;
        this.documentLegalDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        
        this.documentLegalService.updateCustomerDemorgaphics(this.documentLegalDetails.primeNumber, this.documentLegalDetails).subscribe((data: {}) => {

          //this.toastr.success('Document Legal Details Updated Successfully');


    //  this.toastr.success('Document Legal Details deleted Successfully');
    this.openSnackBar('Document Legal Details Updated Successfully','Sure');
        })

        location.reload();

      }



    }

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
  findOne(){
    this.customerdemographicService.findOneCustomerDemographics(this.documentLegalDetails.primeNumber).subscribe((data :{})=>{
      console.log(this.documentLegalDetails.primeNumber)
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
        this.documentLegalDetails.region=findonedata[0].region
        console.log(this.documentLegalDetails.region)
        this.documentLegalDetails.businessSegment=findonedata[0].businessSegment
       // [0].customerStatus
        this.documentLegalDetails.accountStatus=findonedata[0].customerStatus
        console.log(this.documentLegalDetails.accountStatus)
      }
      
    })
    }
    
  fetchByTab() {

    if (!this.documentLegalDetails.primeNumber) {

      return this.documentLegalService.getCustomerDemographic(this.documentLegalDetails.primeNumber).subscribe((data: {}) => { })

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
  branchCodee;
  groupName;
  branchNamee;
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  onkeyup(){

    this.documentLegalService.findOneCustomerDemographics(this.documentLegalDetails.primeNumber).subscribe((data :{})=>{
    console.log("mariaaaa",data)
    console.log( Object.keys( data ).length ) ;
    var length = Object.keys( data ).length
    if(length==1){
      alert("Prime Number already exist in Document Legal Review")
     
    }
    else{
      this.onFocusOut();
    }
     })
  }
  onFocusOut() {






    this.documentLegalService.findOneCustomerDemographics(this.documentLegalDetails.primeNumber).subscribe(() => { })
    var data = this.documentLegalService.getCustomerDemographicData()


    if (data> 0) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      this.documentLegalDetails = {
        object_id: data[0]._id,
        primeNumber: data[0].primeNumber,
        businessSegment: data[0].businessSegment,
        region: data[0].region,
        branchCode: data[0].branchCode,
        branchName: data[0].branchName,
        rM:  data[0].rM,
        tL: data[0].tL,
        nameOfBorrower : data[0].nameOfBorrower,
        dateLegalReview : data[0].dateLegalReview,
        dateNextLegalReviewDue : data[0].dateNextLegalReviewDue,
        legalReviewDoneBy : data[0].legalReviewDoneBy,
        accountStatus : data[0].accountStatus,
        remarks : data[0].remarks,
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
      console.log(this.documentLegalDetails);
    }



    else {
      console.log("here")
      console.log(this.documentLegalDetails.primeNumber)
      this.custService.cust(this.documentLegalDetails.primeNumber).subscribe((data: {}) => {
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

    
          this.documentLegalDetails = {
            object_id: "",
              primeNumber: this.documentLegalDetails.primeNumber,
              businessSegment: "",
              region: "",
              branchCode:  this.branchCodee,
              branchName: this.branchNamee,
              rM:  "",
              tL: "",
              nameOfBorrower : this.nameOfBorrower,
              dateLegalReview : "",
              dateNextLegalReviewDue : "",
              legalReviewDoneBy : "",
              accountStatus : "",
              remarks : "",
              dataStatus: "",
              createdBy: "",
              createdOn:"",
              modifiedBy:  "",
              modifiedOn : "",
              deletedBy: "",
              deletedOn:"",
              active: ""
        

   };
   this.findOne();
      },
        error => {
          console.log("Error");
        }
      );

      console.log("Inside Focus");




    // console.log("Inside Focus");

    // var data = this.documentLegalService.getCustomerDemographicData()

    // console.log('data ka zero index : ', data[0]);

    // this.documentLegalDetails = {

    //   object_id: data[0]._id,
    //   primeNumber: data[0].primeNumber,
    //   businessSegment: data[0].businessSegment,
    //   region: data[0].region,
    //   branchCode: data[0].branchCode,
    //   branchName: data[0].branchName,
    //   rM:  data[0].rM,
    //   tL: data[0].tL,
    //   nameOfBorrower : data[0].nameOfBorrower,
    //   dateLegalReview : data[0].dateLegalReview,
    //   dateNextLegalReviewDue : data[0].dateNextLegalReviewDue,
    //   legalReviewDoneBy : data[0].legalReviewDoneBy,
    //   accountStatus : data[0].accountStatus,
    //   remarks : data[0].remarks,
    //   dataStatus: data[0].dataStatus,
    //   createdBy: data[0].createdBy,
    //   modifiedBy: data[0].modifiedBy,
    //   active: data[0].active



    // };

  }}


  enable() {
    this.isDisabled = false
  }

  disable() {
    this.isDisabled = true
  }
  onChange(){
    const records = [
      {id:1 , BranchName:'HBL Plaza',BranchCode:'0786'},
      {id:2 , BranchName:'Nisan',BranchCode:'0497'}
    ];
  }
first : Date;
sub : string;
onDateDue(){
  console.log("maria called");
var date= new Date(this.documentLegalDetails.dateLegalReview );
date.setFullYear(date.getFullYear() + 3);
this.first = date;


var dat = this.first.toString().substring(1,11)
console.log(dat)
console.log(this.first.getFullYear()); //this will give you full year eg : 1990
console.log(this.first.getDate()); //gives you the date from 1 to 31
console.log(this.first.getMonth() + 1); //getMonth will give month from 0 to 11 
var month =(this.first.getMonth() + 1);
this.documentLegalDetails.dateNextLegalReviewDue= this.first.getDate() +"-"+month+"-"+this.first.getFullYear();
//this.documentLegalDetails.dateNextLegalReviewDue = this.first.toString().substring(4,15);

// console.log('maria',date);
// console.log('D',this.first);
console.log('DS',this.documentLegalDetails.dateNextLegalReviewDue)
}

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }

  }

  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.documentLegalService.getCustomerDemographic(this.documentLegalDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.documentLegalService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangebranchCode(){
  this.selectedBranch = this.allBranchesDetails[0];
  console.log(this.selectedBranch);
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
   this.documentLegalDetails.branchName=this.allBranchesDetails[branchIndex].BranchName;
    ///this.documentLegalDetails.branchName=this.allBranchesDetails[searchValue].BranchName
   // this.documentLegalDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode
    console.log ("hiiiii",this.documentLegalDetails.branchName);
    localStorage.setItem("branchName",this.documentLegalDetails.branchName);

  }
  loadCustomerDemographicData() {
 return this.documentLegalService.getCustomerDemographics().subscribe((data: {}) => {
      this.alldocumentLegalDetails = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.alldocumentLegalDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
  validaions(){

    // if(this.documentLegalDetails.primeNumber=="" ||this.documentLegalDetails.businessSegment==""||
    //   this.documentLegalDetails.rM=="" || this.documentLegalDetails.region==""
    //   || this.documentLegalDetails.dateNextLegalReviewDue==="" || this.documentLegalDetails.legalReviewDoneBy==""){
    //    
console.log(this.documentLegalDetails)
    if(!this.documentLegalDetails.primeNumber){
     this.openSnackBar('please ennter all the required fields','Sure');
  
    }
    if(!this.documentLegalDetails.primeNumber){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if(!this.documentLegalDetails.region){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if (!this.documentLegalDetails.businessSegment){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if(!this.documentLegalDetails.dateNextLegalReviewDue){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if(!this.documentLegalDetails.legalReviewDoneBy){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if(!this.documentLegalDetails.accountStatus){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if(!this.documentLegalDetails.rM){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
     else if(!this.documentLegalDetails.tL){
      this.openSnackBar('please ennter all the required fields','Sure');
   
     }
    //  else if(!this.documentLegalDetails.remarks){
    //   this.openSnackBar('please ennter all the required fields','Sure');
   
    //  }
  

    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
    if(this.documentLegalDetails.primeNumber.length<6){
      this.openSnackBar('please enter primeNumber of 6 digits','Sure');
    
    }
    return 0;
    
  }

  editCustomerDemographic(documentLegalData) {
    var user= localStorage.getItem('userFullName')
    //this.limitfeedingDetails.createdBy= user;
    this.documentLegalDetails.modifiedBy= user;
    window.confirm('Are you sure, you want to edit?')
    this.disable();
    this.onFocusOut();
    this.documentLegalDetails = documentLegalData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.documentLegalDetails.primeNumber = "";
    this.documentLegalDetails.branchCode = "";
    this.documentLegalDetails.businessSegment = "";
    this.documentLegalDetails.region = "";
    this.documentLegalDetails.branchCode = "";
    this.documentLegalDetails.branchName = "";
    this.documentLegalDetails.nameOfBorrower="";
    this.documentLegalDetails.rM="";
    this.documentLegalDetails.tL="";
    this.documentLegalDetails.dateLegalReview ="",
    this.documentLegalDetails.dateNextLegalReviewDue ="",
    this.documentLegalDetails.legalReviewDoneBy ="",
    this.documentLegalDetails.accountStatus ="",
    this.documentLegalDetails.remarks ="",
    this.documentLegalDetails.dataStatus ="",
    this.documentLegalDetails.createdBy = "";

    this.documentLegalDetails.createdOn= "";
    this.documentLegalDetails.modifiedBy= "";
    this.documentLegalDetails.modifiedOn = "";
    this.documentLegalDetails.deletedBy= "";
     this.documentLegalDetails.deletedOn= "";


    // this.documentLegalDetails.dataStatus = "";

    // this.documentLegalDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.documentLegalService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.alldocumentLegalDetails = this.inputdata;

      this.documentLegalService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
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
      this.documentLegalDetails.deletedBy = user;
      var today = new Date();
      this.documentLegalDetails.createdOn =today.toString();
      this.documentLegalService.deleteCustomersdemographic(primeNumber).subscribe(data => {
     //  this.toastr.success('Document Legal Details deleted Successfully');
     this.openSnackBar('Document Legal Details deleted Successfully','Sure');
        this.loadCustomerDemographicData();

      })

    }

  }


}
