import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { States } from '../../utilities/states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  searchtype = 1;
  searchPlaceholder = "Search by organization's phone...";
  searchitem="";

  showError=false;
  public mask :any;

  currentstates=[];

  myState=new States();

  states=this.myState.getStateDetails();
  state=this.states[0];
  constructor(private router: Router) { }
  public zipmask= [/\d/, /\d/, /\d/, /\d/, /\d/];
  ngOnInit() {
    this.mask=false;
  }
  
  searchtypeselect(val) {
    this.searchitem="";
    this.searchtype = val;
    this.mask=false;
    this.showError=false;
    if (val == 1) {
      
    }
    else if (val == 2) {
        this.mask=[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
    }
    else if (val == 3) {
    }
    else if (val == 4) {
      this.mask=this.zipmask;
    }
    else if (val == 5) {
    }
  }

  changeState(state) {
    if(state.id=="")
    this.state=this.states[0];
    else
     this.state = state;
     
   }
  
  restrictNumeric(e) {
    if(this.searchtype!=1) 
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
  
  search() {
   
    
    if((this.searchtype==2||this.searchtype==4)&&this.searchitem){
      this.searchitem=this.replacingSpecialChars(this.searchitem);
    }
    if (this.searchtype && this.searchitem) {      
      this.router.navigate(['/search-result', this.getSearchUrl()]);
    } else {
      this.showError = true;
    }
  }

  getSearchUrl(){
    switch(this.searchtype){
      case 1:
      return {type:'name',name:this.searchitem};
      case 2:
      this.searchitem = this.searchitem.split('.').join('');
      return {type:'phone',phone:this.searchitem}

      case 3:
      return {type:'email',email:this.searchitem}
      case 4:
      return {type:'zip',zip:this.searchitem}
    }
  }

  replacingSpecialChars(val)
  {
    val=val.replace(/-/g , "");
    val=val.replace(/_/g , "");
    val=val.replace(".." , "");
    var len=val.length;
    if(String(val).substr(len-1,1)==".")
    {
      val=String(val).substr(0,len-1)
    }
return val;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      if(this.searchtype==2&&this.searchitem){
        this.searchitem=this.replacingSpecialChars(this.searchitem);
      }

      if (this.searchtype && this.searchitem) {
        this.router.navigate(['/search-result',this.getSearchUrl()]);
      } else {
        this.showError = true;
      }
    }
  }
}
