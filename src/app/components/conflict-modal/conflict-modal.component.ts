import { Employer } from './../../models/employer.model';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs/Subject';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { debounce } from 'rxjs/operator/debounce';
import { EmployerSearch } from '../../models/employersearch.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-conflict-modal',
  templateUrl: './conflict-modal.component.html',
  styleUrls: ['./conflict-modal.component.css'],

})

export class ConflictModalComponent implements OnInit {

  parameters = new EmployerSearch();
  params = '';
  message = "";
  errorMsg = "";
  errormsg = false;
  hasOrganizationId = false;
  successtype = "success";
  submitDisable = false;

  @Input('myEmployer') data: Subject<any>;
  @Output('resEmployer') resEmployer = new EventEmitter<any>();
  @Output('viewEmployer') viewEmployer = new EventEmitter<any>();
  @Output('cancel') cancel = new EventEmitter<any>();
  closeResult: string;
  @ViewChild('content')
  private content: ElementRef;

  private saveData = [];
  searchdataResult = [];
  searchdataTotal = [];
  currentstates = [];
  conflictData = [];
  existingData = [];
  header = "Possible matches found in our system";
  confirmationBox = false;
  modelContent = null;
  isIE=false;
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, 
    private httpService: HttpService) {
      this.isIE=this.detectIE();
     }

  ngOnInit() {
    this.data.subscribe(event => {
      // console.log(event);
      this.modelContent = null;
      this.header = "Possible matches found in our system";
      this.confirmationBox = false;
      
      this.conflictData = [];
      this.saveData = [];
      this.existingData = [];
      this.searchemployers(event);

    });

  }

   detectIE():boolean {
    var ua = window.navigator.userAgent;
  
    // Test values; Uncomment to check result …
  
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
  
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return true;
    }
  
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return true;
    }
  
    // var edge = ua.indexOf('Edge/');
    // if (edge > 0) {
    //   // Edge (IE 12+) => return version number
    //   return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    // }
  
    // other browser
    return false;
  }

  continueCreate(data) {
    this.modelContent.close();
    this.resEmployer.emit(data);
  }

  open(content) {
    this.modelContent = this.modalService.open(content);

    setTimeout(() => {
      document.getElementsByClassName("modal-dialog")[0].setAttribute("style", "max-width:750px")
    });
    this.modelContent.result.then((result) => {

    }, (reason) => {
      if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        this.cancel.emit();
      }

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  existingSelect(data) {

    this.header = "Are you sure?";
    this.confirmationBox = true;
    this.existingData = data;
  }

  conflictBack() {
    this.header = "Possible matches found in our system";
    this.confirmationBox = false;
  }
  continueView(organizationId) {

    this.modelContent.close();
    this.viewEmployer.emit(organizationId);
  }
  cancelModal() {
    this.modelContent.close();
    this.cancel.emit();
  }

  searchemployers(event) {
    this.parameters.name = event.name;
   
    this.parameters.contactphonenumber = event.contactphonenumber;
    this.parameters.contactemail = event.contactemail;
    this.parameters.state = event.state;
    this.parameters.zip = event.zip;
    this.hasOrganizationId = event.organizationid === '' ? false : true;
    this.httpService.Get(this.httpService.SetUrl('partyrecord'), this.parameters).then(
      (response) => {
        let res = JSON.stringify(response.json())
        if (response.ok) {
          console.log("Response: " + res);
          this.errormsg = false;
          this.successtype = "success";
          this.searchdataResult = response.json();
          if (this.searchdataResult != null) {
            for (var v = 0; v < this.searchdataResult.length; v++) {
              var item = this.searchdataResult[v];
              if (item.organizationId !== event.organizationid) {
                item["nameMatch"] = false;
                item["zipMatch"] = false;
                item["cityMatch"] = false;
                item["stateMatch"] = false;
              }
              if (item["name"] == event.name) {
                item["nameMatch"] = true;
              }
              if (item["zip"] == event.zip) {
                item["zipMatch"] = true;
              }
              if (item["nameMatch"] && item["zipMatch"]) {
                this.conflictData.push(item);
              }
            }
            if (this.conflictData) {
              if (this.conflictData.length > 0) {
                this.saveData = event;
                this.open(this.content);
              }
              else {
                this.resEmployer.emit(event);
              }
            }
          }
          else {
            this.resEmployer.emit(event);
          }
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
}
















