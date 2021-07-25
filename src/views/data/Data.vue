<template>
<div>
     <div id="main" style="width: 600px;height:400px;"></div>
      <div id="pie" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:"datashow",
    data(){
      return{
        totalPrice:[],
        paylist:[]
      }
    },
    created(){
      let that=this
      that.$axios.get("/showPayType").then(
        res=>{
          console.log(res)
          let list=[]
          if(res.data.code==200){
            for(var i=0;i<res.data.data.length;i++){
              console.log(res.data.data[i])
              list.push({name:res.data.data[i].Paytype,
              value:res.data.data[i].Nums
              })
            }
            console.log(list)
            that.paylist=list
            that.darwPie()
          }
          },
        err=>{console.log(err)}
      )

      that.$axios.get("/showEveryMonthPrice",{params:{years:2021}}).then(
        res=>{
          console.log(res)
          let totalPrice=[]
          if(res.data.code==200){
            for(var i=0;i<res.data.data.length;i++){
              totalPrice.push(res.data.data[i].Totalprice)
            }
            console.log(totalPrice)
            that.totalPrice=totalPrice
            that.deawBar()
          }
          },
        err=>{console.log(err)}
      )
    },
    mounted(){
      this.deawBar()
      this.darwPie()
    },
    methods:{
      darwPie(){
               let that=this
        var chartDom = document.getElementById('pie');
      var myChart = echarts.init(chartDom);
      var option;
        option = {
    title: {
        text: '支付方式数据统计',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data:that.paylist,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
option && myChart.setOption(option);
      },
      deawBar(){
        let that=this
        var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
var option;

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '40%',
            data: that.totalPrice
        }
    ]
};

option && myChart.setOption(option);
      }
    }
}
</script>

<style scoped>

</style>