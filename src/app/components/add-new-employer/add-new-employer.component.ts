import { Component, OnInit } from '@angular/core';

import { Employer } from '../../models/employer.model';
import { Contact } from '../../models/contact.model';
// import {Creator} from '../../models/creator.model';
import { Address } from '../../models/address.model';

import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';
import { States } from '../../utilities/states';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployerSearch } from '../../models/employersearch.model';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-employer',
  templateUrl: './add-new-employer.component.html',
  styleUrls: ['./add-new-employer.component.css']
})
export class AddNewEmployerComponent implements OnInit {
  employerparams = new EmployerSearch();
  employerForm: FormGroup;
  public model: Employer;
  //getting states from array
  mystates = new States();
  states = this.mystates.getStateDetails();
  stateab = this.mystates.getStates();
  //get response times from array
  myresponsetimes = new States();
  responsetimes = this.myresponsetimes.getResponseTimeDetails();
  responsetimeab = this.myresponsetimes.getResponseTimes();
  // to get bools from states for Cert and Auth
  mycanda = new States();
  candas = this.mycanda.getBoolDetails();
  candaab = this.mycanda.getBools();
  // to get bools from states for eligible for contactemail
  myefore = new States();
  efores = this.myefore.getBoolDetails();
  eforeab = this.myefore.getBools();
  state = "";
  responsetime = "";
  certandauthrequired = "";
  emailrequesteligible = "";
  statename = "--Select state--";
  responsetimename = "--Select Response Time--";
  candaname = "--Select--"; // to check  Cert and Auth required
  eforename = "--Select--";// to check  eligilble for contactemail required
  candachange = false;
  eforechange = false;
  statechange = false;
  responsetimechange = false;
  public mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
  phonepattern = '^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$';
  // public zipmask= [/\d/, /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/];
  public zipmask = [/\d/, /\d/, /\d/, /\d/, /\d/];
  public zipplus4mask = [/\d/, /\d/, /\d/, /\d/];
  zippattern='^\d{5}$';
  EmailRegex = '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$';
  // searchdataTotal = [];
  parameters = {};
  editedId = "";
  name = "";
  // resptimes=["2 business days","4 business days","6 business daya","8 business days","10 business days","12 business days"];
  bool = ["No", "Yes"];
  submitDisable = false;
  errormsg = false;
  message = "";
  closeResult: string;
  successtype = "success";
  currentstates = [];
  currentresponsetimes = [];
  candaRequired = [];
  eforeRequired = [];
  myEmployerNew = new Subject<any>();
  saveProcess = false;

  constructor(private httpService: HttpService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) {
    route.params.forEach(params => {
      // //getting states from array
      // this.mystates = new States();
      // this.states = this.mystates.getStateDetails();
      // this.stateab = this.mystates.getStates();

      // //get response times from array
      // this.myresponsetimes = new States();
      // this.responsetimes = this.myresponsetimes.getResponseTimeDetails();
      // this.responsetimeab = this.myresponsetimes.getResponseTimes();

      // // to get bools from states for Cert and Auth
      // this.mycanda = new States();
      // this.candas = this.mycanda.getBoolDetails();
      // this.candaab = this.mycanda.getBools();

      // // to get bools from states for eligible for contactemail
      // this.myefore = new States();
      // this.efores = this.myefore.getBoolDetails();
      // this.eforeab = this.myefore.getBools();
      this.saveProcess = false;
      this.errormsg = false;
      this.submitDisable = false;
      this.parameters = {};
      this.editedId = "";
      this.name = "";
      this.message = "";
      this.successtype = "success";
      this.statename = "--Select State--";
      this.responsetimename = "--Select Response Time--";
      this.candaname = "--Select--";
      this.eforename = "--Select--";
      this.route.params.subscribe(params => this.parameters = params);
      var organizationid = "",
        name = "",
        addressline1 = "",
        addressline2 = "",
        city = "",
        zip = "",
        plus4 = "",
        contactfirstname = "",
        contactlastname = "",
        contacttitle = "",
        contactphonenumber = "",
        contactphoneextension = "",
        contactfaxnumber = "",
        contactemail = "",
        state = "",
        responsetime = "",
        comments = "",
        createddate = "",
        creatorid = "",
        lastupdateddate = "",
        lastupdatedby = "",
        ein = "",
        certandauthrequired = "",
        emailrequesteligible = "",
        phoneverifiedby = "";


      if (this.parameters["organizationId"]) {
        this.editedId = this.parameters["organizationId"];
        organizationid = this.editedId;

        this.httpService.GetEmployerById(this.httpService.SetUrl('api/organizations/' + this.parameters["organizationId"])).then(
          (response) => {
            this.submitDisable = false;
            if (response.ok) {
              var employer = response.json();
              // console.log(employer);
              name = employer.name;
              organizationid = employer.organizationId;
              this.statename = this.stateab[employer.state]; //state
              this.responsetimename = this.responsetimeab[employer.responseTime];//Response time
              this.candaname = this.candaab[employer.certAndAuthRequired];//Cert and Auth Reqauired
              this.eforename = this.eforeab[employer.emailRequestEligible]; //Eligible for contactemail
              this.employerForm = this.formBuilder.group({
                organizationid: organizationid,
                name: [employer.name, Validators.required],
                addressline1: [employer.addressLine1, Validators.required],
                addressline2: [employer.addressLine2],
                city: [employer.city, Validators.required],
                state: [this.nullcheck(employer.state), Validators.required],
                // zip: [(this.nullcheck(employer.zip) != "0") ? employer.zip.trim() : "" , [Validators.required,Validators.pattern(this.zippattern)]],
                zip: [employer.zip.trim(), [Validators.required], this.validateZip.bind(this)],
                plus4: employer.plus4,
                contactfirstname: [employer.contactFirstName, Validators.required],
                contactlastname: [employer.contactLastName, Validators.required],
                contacttitle: [employer.contactTitle, Validators.required],
                contactphonenumber: [(this.nullcheck(employer.contactPhoneNumber) != "0") ? employer.contactPhoneNumber : "", [Validators.required, Validators.pattern(this.phonepattern)]],
                contactphoneextension: employer.contactPhoneExtension,
                // contactfaxnumber: [(this.nullcheck(employer.contactFaxNumber) != "0") ? employer.contactFaxNumber : "", Validators.compose([Validators.pattern(this.phonepattern)])],
                contactfaxnumber: employer.contactFaxNumber,
                contactemail: [employer.contactEmail.trim(), [Validators.required], this.validateEmail.bind(this)],
                responsetime: [employer.responseTime],
                comments: employer.comments,
                createddate: employer.createdDate,
                creatorid: employer.creatorId,
                lastupdateddate: employer.lastUpdatedDate,
                lastupdatedby: employer.lastUpdatedBy,
                ein: employer.employerIdentificationNumber,
                certandauthrequired: employer.certAndAuthRequired,
                emailrequesteligible: employer.emailRequestEligible,
                phoneverifiedby: employer.phoneVerifiedBy,
              })
            }
          },
          err => {
            this.errormsg = true;
            this.successtype = "error";
            this.submitDisable = false;
            //Checking if service is up or not, if not then showing message
            if (err.status === 0) {
              this.message = "Error in processing the request, Service is down !";
            }
            //Checking if there is some error occured in service method, if yes then showing message
            else if (err.status === 500) {
              console.log(err);
              this.message = "There was an issue with your request.Please try again later.";
            }
          }
        ).catch(error => {
          console.log(error);
          this.successtype = "error";
          this.message = "errors.status";
        })
      }

      this.employerForm = this.formBuilder.group({
        organizationid: organizationid,
        name: [name, Validators.required],
        addressline1: addressline1,
        addressline2: addressline2,
        zip: [zip,[Validators.required],this.validateZip.bind(this)],
        plus4: plus4,
        city: city,
        state: [state, Validators.required],
        contactfirstname: [contactfirstname, Validators.required],
        contactlastname: [contactlastname, Validators.required],
        contacttitle: [contacttitle, Validators.required],
        contactphonenumber: [contactphonenumber, [Validators.required], this.validatePhone.bind(this)],
        contactphoneextension: contactphoneextension,
        contactfaxnumber: contactfaxnumber,
        contactemail: [contactemail, [Validators.required], this.validateEmail.bind(this)],
        responsetime: [responsetime, Validators.required],
        ein: ein,
        certandauthrequired: [certandauthrequired,Validators.required],
        emailrequesteligible: [emailrequesteligible,Validators.required],
        phoneverifiedby: [phoneverifiedby,Validators.required],
        comments: comments,
      })

    });

  }

  nullcheck(val) {
    return (val != null) ? val : "";
  }
  changeState(statename, stateid) {
    this.statechange = true;
    this.state = stateid;
    this.statename = statename;
  }

  changeRespTime(responsetimename, responsetimeid) {

    this.responsetimechange = true;
    this.responsetime = responsetimeid;
    this.responsetimename = responsetimename;
  }

  changeCertAndAuthrequired(candaname, cnadaid) {

    this.candachange = true;
    this.certandauthrequired = cnadaid;
    this.candaname = candaname;
  }
  changeEligibleForEmailRequest(eforename, eforeid) {
    this.eforechange = true;
    this.emailrequesteligible = eforeid;
    this.eforename = eforename;
  }



  ngOnInit() {

    this.model = new Employer();
    this.model.organizationid = "";
    this.model.name = "";
    this.model.addressline1 = "";
    this.model.addressline2 = "";
    this.model.city = "";
    this.model.plus4 = "";
    this.model.zip = "";
    this.model.state = "";
    this.model.contactfirstname = "";
    this.model.contactlastname = "";
    this.model.contacttitle = "";
    this.model.contactemail = "";
    this.model.contactphonenumber = "";
    this.model.contactphoneextension = "";
    this.model.contactfaxnumber = "";
    this.model.responsetime = "";
    this.model.employeridentificationnumber = "";
    this.model.certandauthrequired = false;
    this.model.emailrequesteligible = false;
    this.model.comments = "";
    this.model.phoneverifiedby = "";

  }

  resEmployerNew(data) {
    this.dataSubmit(data);
  }

  viewEmployerNew(organizationId) {
    this.router.navigate(['/view-employer', { organizationId: organizationId }])
  }

  cancelNew() {
    this.saveProcess = false;
    this.submitDisable = false;
  }

  public postEmployer() {
    this.saveProcess = false;
    window.scrollTo(0, 0);
    console.log(JSON.stringify(this.buildEmployer()));
    this.alertService.clear();
    if (this.employerForm.valid) {
      this.submitDisable = false;
      let employer = this.buildEmployer();
      // console.log(employer)
      this.myEmployerNew.next(employer);
    } else {
      this.validateAllFormFields(this.employerForm);
    }
  }

  public dataSubmit(employer) {
    this.saveProcess = true;
    let organizationid = employer.organizationid;
    this.httpService.Post(employer, organizationid, this.httpService.SetUrl('api/organizations')).then(
      (response) => {
        //Returning the service response when employer is saved successfully
        this.submitDisable = false;
        if (response.ok) {
          var temp = response.json();
          this.saveProcess = false;
          this.errormsg = true;
          this.message = "Your information has been successfully saved to database";
          this.successtype = "success";
          if (organizationid != undefined && organizationid != '') {
            this.router.navigate(['/view-employer', { organizationId: organizationid }]);
          }
          else {
            let generatedorganizationid = temp.organizationId;
            if (generatedorganizationid !== undefined && generatedorganizationid !== '') {
              this.router.navigate(['/view-employer', { organizationId: generatedorganizationid }]);
            }
          }

        }
      },
      err => {
        this.saveProcess = false;
        this.errormsg = true;
        this.message = "";

        this.errormsg = true;
        this.successtype = "error";
        this.submitDisable = false;
        var errortext = err.json();
        //Checking if service is up or not, if not then showing message
        if (err.status === 0) {

          this.message = "Error in processing the request, Service is down !";
        }
        else if (errortext.exceptionMessage == 'Organization Email Address already exists , please use unique Email Address.') {
          console.log(err);
          this.saveProcess = false;
          this.message = "Organization Email Address already exists , please use unique Email Address.";
        }
        //Checking if there is some error occured in service method, if yes then showing message
        else if (err.status === 500) {
          console.log(err);
          this.saveProcess = false;
          this.message = "There was an issue with your request.Please try again later.";
        }
      }
    ).catch(error => {
      console.log(error);
      this.successtype = "error";
      this.saveProcess = false;
      this.message = "errors.status";
    })

  }

  public buildEmployer(): Employer {

    if (this.parameters["organizationId"]) {
      this.model.organizationid = this.parameters["organizationId"];
    }

    this.model.name = (this.employerForm.value.name != null) ? this.employerForm.value.name.trim() : "";
    this.model.addressline1 = (this.employerForm.value.addressline1 != null) ? this.employerForm.value.addressline1.trim() : "";
    this.model.addressline2 = (this.employerForm.value.addressline2 != null) ? this.employerForm.value.addressline2.trim() : "";
    this.model.city = this.employerForm.value.city.trim();
    this.model.plus4 = (this.employerForm.value.plus4 != null) ? this.employerForm.value.plus4.trim() : "";
    // this.model.zip = String(this.employerForm.value.zip).substring(0, 5).trim();

    if (this.employerForm.value.zip != null && this.employerForm.value.zip != undefined) {
      this.model.zip = String(this.employerForm.value.zip).substring(0, 5).trim();
    }

    this.model.state = this.employerForm.value.state;
    this.model.contactfirstname = this.employerForm.value.contactfirstname.trim();
    this.model.contactlastname = this.employerForm.value.contactlastname.trim();
    this.model.contacttitle = this.employerForm.value.contacttitle.trim();
    this.model.contactemail = this.employerForm.value.contactemail.trim();

    if (this.employerForm.value.contactphonenumber != null && this.employerForm.value.contactphonenumber != undefined) {
      this.model.contactphonenumber = String(this.employerForm.value.contactphonenumber).split('.').join('').trim();
    }

    if (this.employerForm.value.contactfaxnumber != null && this.employerForm.value.contactfaxnumber != undefined) {
      this.model.contactfaxnumber = (this.employerForm.value.contactfaxnumber != null) ? String(this.employerForm.value.contactfaxnumber).split('.').join('').trim() : "";
    }

    this.model.contactphoneextension = (this.employerForm.value.contactphoneextension != null) ? this.employerForm.value.contactphoneextension.trim() : "";
    // this.model.contactfaxnumber = this.employerForm.value.contactfaxnumber;
    this.model.responsetime = (this.employerForm.value.responsetime != 0) ? this.employerForm.value.responsetime : 0;
    this.model.employeridentificationnumber = (this.employerForm.value.ein != 0) ? this.employerForm.value.ein : 0;
    this.model.certandauthrequired = this.employerForm.value.certandauthrequired;
    this.model.emailrequesteligible = this.employerForm.value.emailrequesteligible;
    this.model.comments = (this.employerForm.value.comments != null) ? this.employerForm.value.comments.trim() : "";
    this.model.phoneverifiedby = this.employerForm.value.phoneverifiedby.trim();

    return this.model;
  }

  restrictNumeric(e) {
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


  restrictCharacter(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return true;
    }
    if (e.which === 0) {
      return true;
    }

    if(e.which === 39)
    {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return /^[a-zA-Z()]+$/.test(input);
  }

  blockSpecialChar(e) {  //blocks special charecters except
    var k = e.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  validateAllFormFields_Save(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      if (!this.employerForm.get(field).valid) {
        return false;
      }
      return true;
    });
  }




  isFieldValid(field: string) {
    var v = !this.employerForm.get(field).valid && this.employerForm.get(field).touched;
    return v;
  }

  validateZip(control: AbstractControl) {
    var str = String(control.value);
    var re = /^\d{5}$/;

    return Observable
      .of(re.test(str))
      .map(result => !!result ? null : { invalid: true });
  }


  validatePhone(control: AbstractControl) {
    var str = String(control.value);
    var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;

    return Observable
      .of(re.test(str))
      .map(result => !!result ? null : { invalid: true });
  }

  validateEmail(control: AbstractControl) {
    var str = String(control.value);
    var re = /^([\w-\.'+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return Observable
      .of(re.test(str))
      .map(result => !!result ? null : { invalid: true });
  }
}





