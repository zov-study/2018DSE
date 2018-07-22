import libui from 'libui-node';
import Vue from 'vuido';
import Vuex from 'vuex';
import crud from '../database/crud';

Vue.use(Vuex);

export default {
  data() {
    return {
      title:'Address Book',
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
            let dd=[31,28,31,30,31,30,31,31,30,31,30,31];
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
        }
  },
  methods: {
    save(){
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
    },
    init(){
        let cdt    = new Date();
        this.day   = cdt.getDate()-1;
        this.month = cdt.getMonth();
        this.year  = 80;
        this.name = this.phone = this.email = this.search = this.message = '';
        this.district = this.rtype = 0,
        this.readonly = true;
        this.isnewcontact = this.isedit = this.issave = false;
    },
    newcontact(){
        this.init();
        this.readonly = false;
        this.isnewcontact = !this.isnewcontact;
        this.issave=true;
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
          this.isedit = true;
          }
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
