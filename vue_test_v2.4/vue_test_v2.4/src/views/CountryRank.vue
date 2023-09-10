<template>
  <dv-scroll-ranking-board :config="config_rank" style="width:500px;height:900px" />
</template>

<script>
export default {
  props:{
    dataChart:{
      type:Array,
      default:()=>[
      {
            name: '美国',
            value: 102481
          },
          {
            name: '印度',
            value: 39235
          },
          {
            name: '巴西',
            value: 31160
          },
          {
            name: '中国',
            value: 29501
          },
          {
            name: '英国',
            value: 20403
          },
          {
            name: '德国',
            value: 19689
          },
          {
            name: '加拿大',
            value: 15826
          },
          {
            name: '法国',
            value: 14924
          },
          {
            name: '俄罗斯',
            value: 12467
          },
          {
            name: '西班牙',
            value: 8494
          },
          {
            name: '波兰',
            value: 7666
          },
          {
            name: '乌克兰',
            value: 7526
          },
          {
            name: '澳大利亚',
            value: 7481
          },
          {
            name: '日本',
            value: 7343
          },
          {
            name: '荷兰',
            value: 7143
          },
          {
            name: '印度尼西亚',
            value: 6433
          },
          {
            name: '韩国',
            value: 6400
          },
      ]
    }
  },
  
  data(){
    return {
      config_rank:{
        data: this.dataChart,
        unit: '人',
        rowNum:	15,
          valueFormatter ({ value }) {
            console.warn(arguments)
            const reverseNumber = (value + '').split('').reverse()
            let valueStr = ''

            while (reverseNumber.length) {
              const seg = reverseNumber.splice(0, 3).join('')
              valueStr += seg
              if (seg.length === 3) valueStr += ','
            }

            return valueStr.split('').reverse().join('')
          }
      }
    }
  }
}
</script>

<style>

</style>