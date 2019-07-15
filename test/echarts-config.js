// 1.隐藏坐标轴 2.颜色渐变
option = {
    // xAxis: {
    //     type: 'category',
    //     data: ['Mon', '', '', '', '', '', 'Sun']
    // },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['Mon', '', '', '', '', '', 'Sun'],
        splitLine: {
            show: false
        }, //去除网格线
        splitArea: {
            show: false
        }, //保留网格区域
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: '#F3F3F3', //左边线的颜色
                width: '2' //坐标线的宽度
            }
        },
        axisLabel: {
            textStyle: {
                color: '#F3F3F3', //坐标值得具体的颜色

            }
        }
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: false
        }, //去除网格线
        splitArea: {
            show: false
        }, //保留网格区域
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: '#F3F3F3',
                width: '1'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#F3F3F3'
            }
        }
    }],
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {
            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#d7f4f8' // 0% 处的颜色
                }, {
                    offset: 0.5,
                    color: '#eefcfd' // 100% 处的颜色
                }, {
                    offset: 1,
                    color: '#fff' // 100% 处的颜色
                }]), //背景渐变色 
                lineStyle: { // 系列级个性化折线样式  
                    width: 3,
                    type: 'solid',
                    color: "#4fd6d2"
                }
            },
            emphasis: {
                color: '#4fd6d2',
                lineStyle: { // 系列级个性化折线样式  
                    width: 2,
                    type: 'dotted',
                    color: "#4fd6d2" //折线的颜色
                }
            }
        }
    }]
};