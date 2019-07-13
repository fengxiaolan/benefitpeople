$(function () {
    var citys = ['aba','bazhong','chengdu','dazhou','deyang','ganzi',
        'guangan','leshan','liangeshan','luzhou','meishan', 'mianyang','nanchong',
        'neijiang','panzhihua','suining','yaan','yibin','yaan','zigong','ziyang'];
    var citytext = ['阿坝藏族羌族自治州','巴中市','成都市','达州市','德阳市','甘孜藏族自治州',
        '广安市','乐山市','凉山彝族自治州','泸州市','眉山市','绵阳市','南充市',
        '内江市','攀枝花市','遂宁市','宜宾市','雅安市','自贡市','资阳市'];
    //数据
    var names = echarts.getMap(localStorage.getItem('address')).geoJson.features.map(item => {
        return {
            name: item.properties.name,
            value: 10
        }
    });

    //获取地区名称和经纬度
    var getGeoCoordMap = function(name) {
        /*获取地图数据*/
        var geoCoordMap = {};
        var mapFeatures = echarts.getMap(name).geoJson.features;
        mapFeatures.forEach(function(v) {
            var name = v.properties.name; // 地区名称
            geoCoordMap[name] = v.properties.centroid; // 地区经纬度
        });
        return geoCoordMap;
    };

    //转换数据
    var convertData = function(data) { // 转换数据
        var geoCoordMap = getGeoCoordMap(localStorage.getItem('address'));
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name]; // 数据的名字对应的经纬度
            if (geoCoord) { // 如果数据data对应上，
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };

    //初始化数据
    function initEcharts(){
        myChart1 = echarts.init(document.getElementById('mapshowcity'));
        option1 = {
            backgroundColor: 'transparent', //背景颜色
            geo: {
                show: true,
                map: localStorage.getItem('address'),
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#3c8dbc', // 没有值得时候颜色
                        borderColor: '#097bba',
                    },
                    emphasis: {
                        areaColor: '#0060df', // 鼠标滑过选中的颜色
                    }
                }
            },
            series: [
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: '1',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            position: 'bottom'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#895139' // 字体颜色
                        }
                    }
                },
                {
                    name: '市级',
                    itemStyle: {
                        normal: {
                            areaColor: '#002094',
                            borderColor:'#0e69e9',
                            borderWidth: 1,
                            // color: {
                            // 	type: 'radial',
                            // 	x: 0.5,
                            // 	y: 0.5,
                            // 	r: 0.5,
                            // 	colorStops: [{
                            // 		offset: 0, color: 'red' // 0% 处的颜色
                            // 	}, {
                            // 		offset: 1, color: 'blue' // 100% 处的颜色
                            // 	}],
                            // 	global: false
                            // }
                        },
                        emphasis: {
                            show: true,
                            color: "#0060df",
                            areaColor: '#0060df',
                        },
                    },
                    zoom: 1.2,
                    type: 'map',
                    mapType: localStorage.getItem('address'),
                    showLegendSymbol:true, //显示地标
                    roam: false,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    data: []
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: 25,
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params) {
                                return params.data.value[2] + '次';
                            },
                            textStyle: {
                                color: '#fcca99',
                                fontSize: 16,
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffff00', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(names)
                }
            ]
        };
        myChart1.setOption(option1);
        //拿到当前点击区域的去域名
        myChart1.on('click', function (params) {
            alert(params.name)
        });
        myChart1.on('dbClick', function (params) {
            window.location.reload();
        });
    }


    initEcharts();
    //项目总览,阳光审批,实时监管选中
    $('.noActive').click(function(){
        $('.noActive').removeClass('active')
        $(this).addClass('active')
        option1.series[0].label.normal.show=true
        myChart1.setOption(option1);
    })
    //信息汇总弹窗
    $('.infBtn').click(function(){
        $('.infWrap').show()
    })
    //投诉举报
    $('.complaintReporting').click(function(){
        $('.wrap').show()
    })
    //关闭弹出的投诉举报
    $('.closeBtn').click(function(){
        $('.wrap').hide()
    })
    //关闭信息汇总弹窗
    $('.closeInf').click(function(){
        $('.infWrap').hide()
    })




    myChart1.on("dblclick", function() {

    });
})
