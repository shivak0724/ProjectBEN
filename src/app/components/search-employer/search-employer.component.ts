import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpService } from '../../services/http.service';
import {Employer,EmployerNew} from '../../models/employer.model';
import { States } from '../../utilities/states';
import {EmployerSearch} from '../../models/EmployerSearch.model';

@Component({
  selector: 'app-search-employer',
  templateUrl: './search-employer.component.html',
  styleUrls: ['./search-employer.component.css', '../home/home.component.css'],

})
export class SearchEmployerComponent implements OnInit {
  SelectedItem = "Employer Name";
 
  p: number = 1;
  itemsPerPage = 5;
  searchitem = '';
  startitem = 1;
  lastitem = 5;
  parameters = {};

  displayState = true;
  showNodata = false;
  errorMsg = "";
  statechange = false;
  mystates = new States();
  states = this.mystates.getStateDetails();
  state =this.states[0];
  currentstates = [];
  public mask: any;
  successtype="";
  public zipmask = [/\d/, /\d/, /\d/, /\d/, /\d/];

  //Actual variables 
  searchdataResult:EmployerNew[] = [];
  employerSearch:EmployerSearch={};
  filterType:string="";

  constructor(private route: ActivatedRoute,private router:Router,private httpService: HttpService) {
   
  }

  ngOnInit() {
    this.mask = false;
    if (window.location.pathname.indexOf("/add-employer") > -1
      || window.location.pathname.indexOf("/view-employer") > -1) {
      this.displayState = false;
    }
    this.route.params.subscribe(params => this.parameters = params);
    this.mask =false;
    this.searchitem = "";
    if (this.parameters["type"]) {
      this.mask = false;
      let searchType:string=this.parameters["type"];
      switch(searchType){
        case "name":
          this.SelectedItem='Employer Name';
          break;     
        case "phone":
            this.SelectedItem='Phone Number';
            this.mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
            break;
        case "email":
          this.SelectedItem='Email';
          break; 
        case "zip":
         this.SelectedItem='Zip Code';
            this.mask = this.zipmask;
            break;
      }
      this.searchitem=this.parameters[searchType];
      this.setparameters();
      this.getsearchdata();
    }
  }

  setparameters() {
var type="";

    if (this.searchitem !== ""){
      this.employerSearch={
      contactemail:'',
      name:'',
      contactphonenumber:'',
      state:'',
      zip:'',
    };
   
    switch (this.SelectedItem){
        case "Employer Name":{
          type="name";
          this.employerSearch.name=this.searchitem;
          break;
        }
        case "Phone Number":{
          type="phone";
          this.searchitem = this.searchitem.split('.').join('');
          this.employerSearch.contactphonenumber=this.searchitem;
          break;
        }
        case "Email":{
          type="email";
          this.employerSearch.contactemail=this.searchitem;
          break;
        }
        case "Zip Code":{
          type="name";
          this.employerSearch.zip=this.searchitem;
          break;
        }
      }
     
    }else{
      this.showNodata = true;
      this.displayState = false;
      this.searchdataResult = [];
      this.searchitem = ""; 
      this.errorMsg = "Please enter search criteria";   
    }
  }


  selectdata(organizationId) {
    if (String(organizationId) != "") {
      this.router.navigate(['/view-employer', { organizationId: organizationId }]);
    }
  }
  replacingSpecialChars(val) {
    val = val.replace(/-/g, "");
    val = val.replace(/_/g, "");
    val = val.replace("..", "");
    var len = val.length;
    if (String(val).substr(len - 1, 1) == ".") {
      val = String(val).substr(0, len - 1)
    }
    return val;
  }
  errormessage:boolean=false;
  getsearchdata() {

   this.searchdataResult = [];
    this.displayState = false;   
    this.httpService.Get(this.httpService.SetUrl('partyrecord'),this.employerSearch).then( 
    //this.httpService.Get(this.httpService.SetUrl('api/party/search'),this.employerSearch).then(
      (response) => {
        this.searchdataResult = response.json(); 
        if(this.searchdataResult==null){
          this.searchdataResult=[];
        }
        this.errormessage = false;
        this.successtype = "success";
        if(this.searchdataResult.length<1){
            this.showNodata = true;
            this.errorMsg = "No Employer found. Please search by different criteria or create a new Employer.";
        }

        if (response.ok) {
          this.errorMsg = "";
          this.successtype = "success";
          var tmp = response.json();
        }
      },
      err => {
        this.errormessage = true;
        this.successtype = "error";
        //Checking if service is up or not, if not then showing message
        if (err.status === 0) {
          this.errorMsg = "Error in processing the request, Service is down !";
        }
        //Checking if there is some error occured in service method, if yes then showing message
        else if (err.status === 500) {
          console.log(err);
          this.errorMsg = "There was an issue with your request.Please try again later.";
        }
      }
    ).catch(error => {
      console.log(error);
      this.successtype = "error";
      this.errorMsg = "errors.status";
    })

  }
  searchselect(item) {
    this.mask = false;
    this.searchitem="";
    this.showNodata = false;
    this.SelectedItem = item;    
    if (this.SelectedItem === "Phone Number") {
      this.mask=[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];      
    }
    if(this.SelectedItem === "Zip Code") {
      this.mask=this.zipmask;
    }   
    
    this.searchdataResult=[];
  }

  pagechange(eve) {
    this.p = eve;
    this.startitem = (eve * 5) - 4;
    this.lastitem = (eve * 5);
  }

  restrictNumeric(e) {
    if (this.SelectedItem != '1')
      return true;

    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.onScreenSearchData();
    }
  }


  onScreenSearchData() {
   
    if((this.SelectedItem=="Phone Number"||this.SelectedItem=="Zip Code")&&this.searchitem){
      this.searchitem=this.replacingSpecialChars(this.searchitem);
    }
    if (this.searchitem) {      
      this.router.navigate(['/search-result', this.getSearchUrl()]);
      this.setparameters();
      this.getsearchdata();
    } else {
      this.searchdataResult=[];
        this.showNodata = true;
        this.errorMsg = "Please enter search criteria";
        this.displayState = false;
    }
  }

  getSearchUrl(){
    switch(this.SelectedItem){
      case "Employer Name":
      return {type:'name',name:this.searchitem};
      case"Phone Number":
      return {type:'phone',phone:this.searchitem}
      case "Email":
      return {type:'email',email:this.searchitem}
      case "Zip Code":
      return {type:'zip',zip:this.searchitem}
    }
  }

  getUserAddress(data):string{
    let address:string="";
    if(data.addressLine1 && data.addressLine1!=''){
      address+=data.addressLine1+", "
    }
    if(data.addressLine2 && data.addressLine2!=''){
      address+=data.addressLine2+", "
    }
    if(data.city && data.city!=''){
      address+=data.city+", "
    }
    if(data.state && data.state!=''){
      address+=data.state+", "
    }
    if(data.zip && data.zip!=''){
      address+=data.zip;
    }

    return address;

  }


}
