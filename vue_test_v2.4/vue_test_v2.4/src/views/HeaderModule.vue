<template>
  <div class="module-box">
       
        <div style="flex: 0 1  15%">
          <dv-decoration-4 :color="['#EFBDB3','#EFBDB3']" :reverse="true" style="height:5px;" />
        </div>
        <div id="title" style="flex: 0 1  70%">
          <div class="d-flex">、
            <dv-decoration-8 :color="['#EFBDB3','#EFBDB3']" style="height: 50px; flex: 0.9" />
              <dv-decoration-11  :color="['#fff', '#EFBDB3']" style="height: 60px; flex: 1.2" >
                <div class="title">GitHub {{world}}开发者地理信息可视化</div>
              </dv-decoration-11 >
            <dv-decoration-8 :color="['#EFBDB3','#EFBDB3']" :reverse="true" style="height: 50px; flex: 0.9" />
           
          </div>
           
        </div>
        <div style="flex: 0 1  15%">
          <dv-decoration-4 :color="['#EFBDB3','#EFBDB3']" :reverse="true" style="height:5px;" />
        </div>
      </div>
</template>


<script>
export default {
  props:{
    titleRange:{
      type:String,
      default:() => '全球'
    }
  },
  
  data() {
    return{
      world:this.titleRange
    }
  }
}
</script>

<style>
.title{
  font-size: 36px;
  color: burlywood;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  }
</style>