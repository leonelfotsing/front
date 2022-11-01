<template>
  <div class="flex flex-col gap-5">

    <div class="flex flex-wrap justify-between">
      <div>
        <span class="text-indigo-600 font-bold text-2xl">Dashboard</span>
      </div>
      <div>
        <select
          id="cars"
          v-model="selectType"
          @change="changeSelected">
          <option :value="1">select a type</option>

          <option
            v-for="(type, index) in types"
            :key="index"
            :value="type.value">{{ type.label }}</option>

        </select>
      </div>
      <div>

        <select
          id="cars"
          v-model="selectStatus"
          @change="changeSelectedRoom">
          <option :value="1">select a status</option>

          <option
            v-for="(type, index) in rooms"
            :key="index"
            :value="type.value">{{ type.label }}</option>

        </select>
      </div>

      <div>

        <select
          id="cars"
          v-model="selectRoom"
          @change="changeSelectedStatus">
          <option :value="1">select a Room</option>

          <option
            v-for="(type, index) in status"
            :key="index"
            :value="type.value">{{ type.label }}</option>

        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search.."
          v-model="keyWord"/>
      </div>
    </div>

    <div class="flex flex-wrap">


      <div
        class="mx-2 my-2"
        v-for="entitie in entitieToDisplay"
        :key="entitie.id">
        <Entitie :entitie="entitie" />
      </div>
      <div v-if="entitieToDisplay.length < 1">
        {{entitieToDisplay.length}}
        result found </div>

    </div>
  </div>

</template>

<script>
import coreApi from "@/providers/core-api"
import Entitie from "./entities/Entitie"

export default {
  name: "Dashboard",
  components: { Entitie },
  created() {
    //this.getEntities()
    this.entitieToDisplay = this.entities
  },
  data() {
    return {
      keyWord: "",
      selectType: "1",
      selectRoom: "1",
      selectStatus: "1",
      types: [
        {
          label: "all",
          value: "all"
        },
        {
          label: "sensor",
          value: "sensor"
        },{
          label: "light",
          value: "light"
        },{
          label: "Television",
          value: "Television"
        }, {
          label: "switch",
          value: "switch"
        }, {
          label: "air_conditioner",
          value: "air_conditioner"
        } ],
      rooms: [
        {
          label: "all",
          value: "all"
        },

        {
          label: "room",
          value: "room"
        },
        {
          label: "bedroom",
          value: "sensor"
        } ],
      status: [
        {
          label: "all",
          value: "all"
        },

        {
          label: "on",
          value: "on"
        },
        {
          label: "off",
          value: "off"
        } ],
      entities: [
        {
          id: "25c1fdc7-ead9-4e17-bf33-a370e6f4199e",
          name: "Thermometer",
          type: "sensor",
          status: "on",
          value: "34.2",
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "5d727d9d-dd6d-41d3-9dff-ed7f5dab6805",
          name: "Kitchen light 1",
          type: "light",
          status: "off",
          value: null,
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "343771c8-c71b-4ae1-ac03-ce55476b41cd",
          name: "Living room light 1",
          type: "light",
          status: "on",
          value: "255",
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "ff56ef48-4daa-407a-9794-9d88e9bf4b0c",
          name: "Living room light 2",
          type: "light",
          status: "off",
          value: null,
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "847caf9c-25bc-40eb-9974-b8efa4659fc6",
          name: "Television",
          type: "multimedia",
          status: "on",
          value: "TF1",
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "cd9bd2c5-0c40-4184-957f-e0086d8520c6",
          name: "Bedroom switch 1",
          type: "switch",
          status: "on",
          value: "1",
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "5047654a-6778-4bb2-ac2d-9ae94b558f81",
          name: "Bedroom light 1",
          type: "light",
          status: "unavailable",
          value: null,
          created_at: "2020-01-01T00:00:00",
        },
        {
          id: "2c75554b-02e8-4e6e-b97b-92974452b883",
          name: "Air conditioner",
          type: "air_conditioner",
          status: "on",
          value: "24",
          created_at: "2020-01-01T00:00:00",
        },
      ],
      entitieToDisplay: [],
      isLoading: false,
      isError: false,
    }
  },
  methods: {
    filterType(type){
      if(type === "all"){
        this.entitieToDisplay = this.entities
      }else
        this.entitieToDisplay = this.entities.filter((entitie) => entitie.type === type)
    },

    handleSearch(keyWord){
      this.entitieToDisplay = this.entities.filter((entitie) => entitie.name.toLowerCase().includes(keyWord.toLowerCase()))
    },

    changeSelected(){

      console.log("eeeee ", this.selectType)
      this.filterType(this.selectType)
    },

    getEntities() {
      this.isLoading = true

      coreApi.glados
        .getEntities()
        .then((entities) => {
          this.entities = entities
          this.entitieToDisplay = entities
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    changeSelectedRoom(){

    },
    changeSelectedStatus(){
      this.entitieToDisplay = this.entities.filter((entitie) => entitie.status === this.selectStatus)
    },
  },

  watch: {
    keyWord: function (val) {
      this.handleSearch(val)
    },

  }
}
</script>

<style scoped>

 input[type="text"] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
input[type="text"] {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type="text"] {
    border: 1px solid #ccc;
  }
}

 select{
   float: right;
   padding: 6px;
   border-radius: 5px;
   margin-top: 8px;
   margin-right: 16px;
   font-size: 17px;

 }
</style>
