<script setup>


</script>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: { 
  },
  data() {
    return {

    };
  },
  methods: {

  },
});
</script>
<template>
<div class="loader-panel-bg"></div>
<div class="loader-panel">
<div class="loader-contents">
<h2>Load</h2>
<hr/>
 <p>Session Flow diagrams which change the activity of the Virtual Coach</p>

 
  <div class="container">

    <div class="row" v-for="(singleT, index) in treelinkData" :key="index">
      

      <div class="col-sm-3">
        <div class="card mb-3">
          <div> Screenshot to go here... </div>
          <div class="card-body">
            <p class="card-title">{{singleT.Title}}</p>
            <p class="card-text">{{singleT.Description}}</p>
            <button class="btn-primary" @click="onClickButton($event, index)">Edit Tree</button>
          </div>
        </div>
      </div>


  </div>

</div>
</div>
</div>
</template>

<style>
.loader-panel{
  background-color:#ffffff;
  border-radius:10px;
  border: solid 1px #f2f2f2;
  width:80vw;
  height:80vh;
  position:absolute;
  z-index:1010;
  top:10vh;
  left:10vw;
}
.loader-panel-bg{
  background-color:rgba(220,220,220,0.5);
  width:100vw;
  height:100vh;
  position:absolute;
  z-index:1005;
  top:0;
  left:0;
}

.loader-contents{
  text-align:left;
  padding:20px 30px;
}
</style>
