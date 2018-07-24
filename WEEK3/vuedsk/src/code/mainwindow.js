// import required libraries
import libui from 'libui-node';
import Vue from 'vuido';
import Vuex from 'vuex';
import crud from '../database/crud';

Vue.use(Vuex);

export default {
  data() {
    return {
      // List of properties
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
      isrollback: false,
      readonly:true,
      district: 25
    };
  },
  computed: {
        counter: function(){
        // Transfer counter value through Vuex Store.
          return this.$store.state.counter;
        },
        stitle:function(){
        // Change search's fields group title of the selected types.
        return " Search by " + this.stypes[this.rtype] + " ";
        },
        cmode:function(){
        // Change contact's fields group title of the specific mode.
          let title='';
          if (this.isnewcontact) {
            title = ' New contact ';
          } else {
            title = ' Contact details ';
          }
          return title;
        },
        days:function(){
        // Fill up a day's array with a range of month's days
        let dd=[31,29,31,30,31,30,31,31,30,31,30,31];
            let days=[];
             for (let i=1;i<=31;i++){
              days.push(i);
            }
          return days;
        },
        years:function(){
        // Fill up a year's array with a range of years
          let cdt = new Date();
          let years =[];
          let year=cdt.getFullYear();
          for(let i=year-80;i<=year;i++) {
            years.push(i);
          }
          return years;
        },
        dob:function(){
        // Compute the day of birth from the three fields.
          return this.days[this.day]+' '+this.months[this.month]+' '+this.years[this.year];
        },
        districts:function(){
        // Select Auckland's districts from database.
        return crud.getTable('districts');
        },
        months:function(){
        // Select names of months from database.
        return crud.getTable('months');
        },
        stypes:function(){
        // Select Search types from database.
        return crud.getTable('stypes');
        },
        issearch:function(){
        // Enable or disable Search mode.
          return (this.search.length>0);
        },
        isvalid: function () {
        // Enable or disable Save mode.
          return this.validIt(this.name) && this.validIt(this.phone,0) && this.validIt(this.email,1);
        }
  },
  methods: {
    save(){
        if (this.isvalid){
          if (this.id==0){
              // Check if contact already exist.
              let fcontact = crud.findByVal('contacts', 'phone', this.phone);
              if (fcontact==undefined){
                // Create and save a new contact.
                let contact = {
                  name: this.name,
                  dob: this.dob,
                  phone: this.phone,
                  email: this.email,
                  district:this.districts[this.district],
                  id: Date.now()
                };
                // Save a new contact.
                if (crud.newRecord("contacts",contact)!=undefined){
                  this.init();
                  this.message='Info: Contact details saved successfully!';
                  } else {
                    this.message='Error: Contact details cannot saved!';
                  }
              }else{
                  this.message='Warning: This contact already exists!';
                  this.isedit = !this.isedit;
              }
            } else {
              // Update existing contact
              let contact = {
                name: this.name,
                dob: this.dob,
                phone: this.phone,
                email: this.email,
                district:this.districts[this.district],
                id: this.id
              };
              if (crud.updateRecord('contacts',this.id,contact)!=undefined){
                this.init();
                this.message='Info: Contact details updated successfully!';
              }else{
                this.message='Error: Contact details cannot be updated!';
                this.isedit = !this.isedit;
              }
            }
      } else {
        this.message='Error: Please, fill up all contact details!';
      }
    },
    init(){
        // Initialization all properties
        let cdt    = new Date();
        this.day   = cdt.getDate()-1;
        this.month = cdt.getMonth();
        this.year  = 80;
        this.name = this.phone = this.email = this.search = this.message = '';
        this.district = this.rtype = this.id = 0,
        this.readonly = true;
        this.isnewcontact = this.isedit = this.issave = this.isrollback = false;
    },
    newcontact(){
      // Turn on New contact mode.
        this.init();
        this.readonly = false;
        this.isnewcontact = !this.isnewcontact;
        this.issave=true;
        this.id = 0;
    },
    searchit(){
      // Contact search with selected type. 
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
          let dmy = contact.dob.split(' ');
          this.day=this.days.indexOf(parseInt(dmy[0]));
          this.month=this.months.indexOf(dmy[1]);
          this.year=this.years.indexOf(parseInt(dmy[2]));
          this.id= contact.id;
          this.isedit = true;
          }
    },
    validIt: function (field,type) {
      // Form validation with specific fields
      if (field===undefined || field==='' || field.length==0){
        return false;
      }
      let regexp ='';
      switch (type){
        // Phone
        case 0:
          regexp =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
          break;
        // Email
        case 1:
          regexp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        // All other fields
        default:
           regexp = /^[a-zA-Z0-9-\s\.]*$/;
      }
      return regexp.test(field);
    },
    show(){
      // Event before show the main window.
      this.init();
    },
    edit(){
      // Turn on Edit mode
      this.isedit = !this.isedit;
      this.readonly = !this.readonly;
      this.issave = true;
    },
    remove(){
      // Remove contact.
      this.isedit = !this.isedit;
      this.isrollback = !this.isrollback;
      if (crud.removeRecord('contacts',this.id)!=undefined){
        this.message='Info: Contact with name '+this.name+' removed successfully!';
      } else {
        this.message='Error: Contact with name '+this.name+' already removed!';
      }
    },
    rollback(){
      // Rollback deleted contact
      let contact = {
        name: this.name,
        dob: this.dob,
        phone: this.phone,
        email: this.email,
        district:this.districts[this.district],
        id: this.id
      };
      if (crud.newRecord("contacts",contact)!=undefined){
        this.message='Contact restored successfully!';
      } else {
        this.message='Error: Cannot restore this contact!';
      }
      this.isedit = !this.isedit;
      this.isrollback = !this.isrollback;
    },
    exit() {
      // Exit and close main window.
      libui.stopLoop();
    }
  }
};
