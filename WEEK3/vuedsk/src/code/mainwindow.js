import libui from 'libui-node'
import Vue from 'vuido'
import Vuex from 'vuex';
import WaitWindow from '../ui/WaitWindow'
import crud from '../database/crud'

Vue.use(Vuex);

export default {
  data() {
    return {
      title:'Address Book',
      text: 'Text input',
      fname: '',
      lname: '',
      phone:'',
      email:'',
      day:1,
      month:1,
      year:80,
      search: '',
      message:'',
      searchtypes: ['by Name', 'by Phone', 'by Email'],
      titlegr:'New contact',
      radio:0,
      visible: false,
      isedit: false,
      isnewuser: false,
      issave: false,
      readonly:true,
      districts: ['Arch Hill',
                'Auckland CBD',
                'Avondale',
                'Blockhouse Bay',
                'Balmoral',
                'Eden Terrace',
                'Eden Valley',
                'Ellerslie',
                'Epsom',
                'Freemans Bay',
                'Glendowie',
                'Glen Innes',
                'Grafton',
                'Greenlane',
                'Greenwoods Corner',
                'Grey Lynn',
                'Herne Bay',
                'Hillsborough',
                'Kingsland',
                'Kohimarama',
                'Lynfield',
                'Meadowbank',
                'Mission Bay',
                'Morningside',
                'Mount Albert',
                'Mount Eden',
                'Mount Roskill',
                'Mount Wellington',
                'Newmarket',
                'Newton',
                'New Windsor',
                'Onehunga',
                'One Tree Hill',
                'Orakei',
                'Oranga',
                'Owairaka',
                'Panmure',
                'Parnell',
                'Penrose',
                'Point England',
                'Point Chevalier',
                'Ponsonby',
                'Remuera',
                'Royal Oak',
                'Saint Heliers',
                'Saint Johns',
                'Saint Marys Bay',
                'Sandringham',
                'Stonefields',
                'Tamaki',
                'Te Papapa',
                'Three Kings',
                'Waikowhai',
                'Waterview',
                'Western Springs',
                'Westfield',
                'Westmere'],
      months:[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'],
      item: 25
    };
  },
  computed: {
        counter: function(){
          return this.$store.state.counter
        },
        searchtitle:function(){
          let title=''
          if (this.isnewuser) {
            title = 'New contact';
          } else {
            title = "Search "+this.searchtypes[this.radio];
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
        } 
  },
  methods: {
    save(){
        let customer = {
          fname: this.fname,
          lname: this.lname,
          dob: this.dob,
          phone: this.phone,
          email: this.email,
          district:this.districts[this.item],
          date: Date.now()
        };
        crud.newCustomer(customer);
        this.message='Contact details saved successfull!';
        this.init();
    },
    init(){
      let cdt = new Date();
      this.day = cdt.getDate()-1;
      this.month=cdt.getMonth();
      this.year=80;
      this.fname=this.lname=this.phone=this.email='';
      this.item=0,
      this.readonly=true;
      this.isnewuser=false;
      this.issave=false;
    },
    newuser(){
          this.name=this.phone=this.email='';
          this.item=0,
          this.readonly=!this.readonly;
          this.isnewuser=!this.isnewuser;
          this.issave=true;
    },
    searchit(){
      console.log("Search click");
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
}
