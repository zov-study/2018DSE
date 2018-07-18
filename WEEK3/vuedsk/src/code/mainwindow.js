import libui from 'libui-node';
import Vue from 'vuido';
import Vuex from 'vuex';
import WaitWindow from '../ui/WaitWindow';
import crud from '../database/crud';

Vue.use(Vuex);

export default {
  data() {
    return {
      title:'Address Book',
      fname: '',
      lname: '',
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
          let title='';
          if (this.isnewuser) {
            title = 'New contact';
          } else {
            title = "Search "+this.stypes[this.rtype];
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
          fname: this.fname,
          lname: this.lname,
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
      this.fname = this.lname=this.phone=this.email='';
      this.item = 0,
      this.readonly = true;
      this.isnewuser = false;
      this.issave = false;
    },
    newcontact(){
          this.name = this.phone=this.email='';
          this.item = 0,
          this.readonly = !this.readonly;
          this.isnewuser = !this.isnewuser;
          this.issave=true;
    },
    searchit(){
      switch (this.rtype){
        case 2:
          console.log("Search by eMail");
          break;
        case 1:
          console.log("Search by Phone");
          break;
        default:
          console.log("Search by Name");
          
      }
    },
    show(){
      this.init();
    },
    edit(){
      console.log("Main window");
    },
    showModal(){
      this.$store.commit('setcustomer', crud.findByPhone(this.phone));
      let ww = new Vue({
          render: h=>h(WaitWindow),
          store: this.$store
      });      
      ww.$mount();
      console.log("Click");
    },
    showTemplate(){
      console.log(this.$store.state.counter);
    },
    exit() {
      libui.stopLoop();
    }
  }
};
