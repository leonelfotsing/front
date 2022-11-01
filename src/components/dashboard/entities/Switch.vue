<template>


  <div>


    <div v-if="status === 'off' || status === 'on' ">

      <label class="switch">
        <input
          type="checkbox"
          :value="swictchStatus"
          :checked="checked"
          @change="onStateChange">
        <span class="slider round"></span>
      </label>
    </div>
    

    <div v-else>
      <i class="fa-regular fa-square-xmark unavailable "></i>
    </div>

    <div> <small>{{`${this.swictchStatus ? 'on' : 'off' }`}}</small> </div>
  </div>



</template>

<script>


export default {
  name: "Switch",
  props: {
    status: {
      type: String,
      required: true
    },


  },

  mounted(){
    this.swictchStatus = this.status === "on" ? true : false
  },
  computed: {
    checked(){
      return this.status === "on" ? true : false
    }
  },
  data() {
    return { swictchStatus: false }
  },
  methods: {
    onStateChange(){
      this.swictchStatus = !this.swictchStatus
      this.$emit("changeState", this.swictchStatus )
      console.log("state ",this.swictchStatus)
    }
  }
}
</script>

<style scoped>

/* The switch - the box around the slider */
.unavailable{
  color: red;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  border-color: red;

}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}


input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>