import libui from 'libui-node';
import Vue from 'vuido';
import Vuex from 'vuex';
import crud from '../database/crud';

Vue.use(Vuex);

export default {
  data() {
    return {
      title:'Address Book',
      id:0,
      name: '',
      phone:'',
      email:'',
      day:1,
      month:1,
      year:80,
      search: '',
      message:'',
      rtype:0,
      visible: false,
      isedit: false,
      isnewcontact: false,
      issave: false,
      readonly:true,
      district: 25
    };
  },
  computed: {
        counter: function(){
          return this.$store.state.counter;
        },
        stitle:function(){
          return " Search by " + this.stypes[this.rtype] + " ";
        },
        cmode:function(){
          let title='';
          if (this.isnewcontact) {
            title = ' New contact ';
          } else {
            title = ' Contact details ';
          }
          return title;
        },
        days:function(){
            let dd=[31,29,31,30,31,30,31,31,30,31,30,31];
            let days=[];
             for (let i=1;i<=31;i++){
              days.push(i);
            }
          return days;
        },
        years:function(){
          let cdt = new Date();
          let years =[];
          let year=cdt.getFullYear();
          for(let i=year-80;i<=year;i++) {
            years.push(i);
          }
          return years;
        },
        dob:function(){
          return this.days[this.day]+' '+this.months[this.month]+' '+this.years[this.year];
        },
        districts:function(){
          return crud.getTable('districts');
        },
        months:function(){
          return crud.getTable('months');
        },
        stypes:function(){
          return crud.getTable('stypes');
        },
        issearch:function(){
          return (this.search.length>0);
        },
        isvalid: function () {
          let valid= this.validIt(this.name) && this.validIt(this.phone,0) && this.validIt(this.email,1);
          console.log (this.name,this.phone,this.email);
          console.log(this.validIt(this.name) , this.validIt(this.phone,0) , this.validIt(this.email,1));
          return valid;
        }
  },
  methods: {
    save(){
        if (this.isvalid){
          let fcontact = crud.findByVal('contacts', 'phone', this.phone);
          if (fcontact==undefined){
            let contact = {
              name: this.name,
              dob: this.dob,
              phone: this.phone,
              email: this.email,
              district:this.districts[this.district],
              date: Date.now()
            };
            crud.newRecord("contacts",contact);
            this.message='Contact details saved successfull!';
            this.init();
          }else{
            this.message='Warning: This contact already exists!';
          }
      } else {
        this.message='Error: Please, fill up all contact details!';
      }
    },
    init(){
        let cdt    = new Date();
        this.day   = cdt.getDate()-1;
        this.month = cdt.getMonth();
        this.year  = 80;
        this.name = this.phone = this.email = this.search = this.message = '';
        this.district = this.rtype = this.id = 0,
        this.readonly = true;
        this.isnewcontact = this.isedit = this.issave = false;
    },
    newcontact(){
        this.init();
        this.readonly = false;
        this.isnewcontact = !this.isnewcontact;
        this.issave=true;
        this.id = 0;
    },
    searchit(){
      this.readonly = true;
      this.isnewcontact = this.isedit = this.issave = false;
      let contact = crud.findByVal('contacts', this.stypes[this.rtype], this.search);
        if (contact===undefined){
          this.message='Error: Contact with '+ this.stypes[this.rtype] + ' = "' + this.search + '" is not available!!!';
        } else {
          this.message='Success: Contact with '+ this.stypes[this.rtype] + ' = "'+ this.search + '" has been found!!!';
          this.name=contact.name;
          this.phone=contact.phone;
          this.email=contact.email;
          this.district=this.districts.indexOf(contact.district);
          this.id= contact.date;
          this.isedit = true;
          console.log(this.id);
          }
    },
    validIt: function (field,type) {
      if (field===undefined || field==='' || field.length==0){
        return false;
      }
      let re ='';
      switch (type){
        // Phone
        case 0:
          re =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
          break;
        // Email
        case 1:
          re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        default:
          re = /^[a-zA-Z0-9-\s\.]*$/;
      }
      return re.test(field);
    },
    show(){
      this.init();
    },
    edit(){
      this.isedit = !this.isedit;
      this.readonly = !this.readonly;
      this.issave = true;
    },
    exit() {
      libui.stopLoop();
    }
  }
};
