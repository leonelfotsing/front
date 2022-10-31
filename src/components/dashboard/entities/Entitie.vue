<template>

   
  <div class="card ">
    <div class="card-content">
      <strong>
        {{entitieToDisplay.name}}
      </strong>
      <div>
        <Switch
          :status="entitieToDisplay.status"
          @changeState="handleChangeState" />
      </div>
    </div>
  </div>
    



</template>

<script>
import coreApi from "@/providers/core-api"
import { speech } from "@/utils/utils"
import Switch from "./Switch"

export default {
  name: "Entitie",
  components: { Switch },
  props: {
    entitie: {
      type: Object,
      required: true
    },

  },

  created() {
    this.getEntities()

  },
  mounted(){
    this.entitieToDisplay = this.entitie
  },
  data() {
    return {
      entities: [],
      entitieToDisplay: {},
      isLoading: false,
      isError: false
    }
  },
  methods: {

    handleChangeState(status){
      let newStatus = status ? "on": "off"
      let textSpeech = `${this.entitieToDisplay.name} ${newStatus}`
      speech(textSpeech)


      let data = {
        ...this.entitie,
        status: newStatus
      }
      coreApi.glados.setStatus(data)
        .then((updatedEntitie) => {
          this.entitieToDisplay = updatedEntitie
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {

        })

    },
    getEntities() {
      this.isLoading = true

      coreApi.glados.getEntities()
        .then((entities) => {
          this.entities = entities
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>

.card{
  border-radius: 25px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) ;
  padding: 10px;
  min-height: 100px;
  min-width: 200px;
}

.card-content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
</style>