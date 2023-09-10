<template>
  <div class="bottom"  >
        <div style="flex:0 1 100% ;">
          
            <LineChart :totalData="totalData" :lineTitle="lineTitle"/>
         
        </div>
      </div> 
</template>

<script>
import LineChart from './LineChart.vue';
export default {

  components:{
    LineChart,
  },

  props:{
    totalData:{
      type:Array,
      default:() => []
    } ,
    lineTitle:{
      type:String,
      default:() =>'全球'
    }

  },
  data(){
    return {}
}
}
</script>

<style>
.bottom{
  height: 100vh;
}
</style>