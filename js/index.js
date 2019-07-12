
$(function () {
    //数据
    var cdData = [
        {name: '锦江区',value: 2},
        {name: '青羊区',value: 2},
        {name: '金牛区',value: 2},
        {name: '武侯区',value: 2},
        {name: '成华区',value: 2},
        {name: '龙泉驿区',value: 2},
        {name: '青白江区',value: 2},
        {name: '新都区',value: 2},
        {name: '温江区',value: 2},
        {name: '双流区',value: 2},
        {name: '郫都区',value: 2},
        {name: '金堂县',value: 2},
        {name: '大邑县',value: 2},
        {name: '蒲江县',value: 2},
        {name: '新津县',value: 2},
        {name: '都江堰市',value: 2},
        {name: '彭州市',value: 2},
        {name: '邛崃市',value: 2},
        {name: '崇州市',value: 2},
        {name: '简阳市',value: 2},
    ];
    var scData = [
        { name: '阿坝藏族羌族自治州', value: 0 },
        { name: '巴中市', value: 0 },
        { name: '成都市', value: 0 },
        { name: '达州市', value: 0 },
        { name: '德阳市', value: 0 },
        { name: '甘孜藏族自治州', value: 0 },
        { name: '广安市', value: 0 },
        { name: '广元市', value: 0 },
        { name: '乐山市', value: 0 },
        { name: '凉山彝族自治州', value: 0 },
        { name: '泸州市', value: 0 },
        { name: '眉山市', value: 0 },
        { name: '绵阳市', value: 0 },
        { name: '内江市', value: 0 },
        { name: '南充市', value: 0 },
        { name: '攀枝花市', value: 0 },
        { name: '遂宁市', value: 0 },
        { name: '雅安市', value: 0 },
        { name: '宜宾市', value: 0 },
        { name: '资阳市', value: 0 },
        { name: '自贡市', value: 0 }
    ];
    //颜色切换
    var color = ['#ffff00', '#ff0000', '#33ffff'];
    var color1 = ['#efcc99', '#ffd942', '#ffff00'];

    //获取地区名称和经纬度
    var getGeoCoordMap = function(name) {
        /*获取地图数据*/
        var geoCoordMap = {};
        var mapFeatures = echarts.getMap(name).geoJson.features;
        mapFeatures.forEach(function(v) {
            var name = v.properties.name; // 地区名称
            geoCoordMap[name] = v.properties.cp; // 地区经纬度
        });
        return geoCoordMap;
    };

    //转化数据
    var convertData = function(data) { // 转换数据
        var geoCoordMap = getGeoCoordMap('四川');
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

    //地图初始化数据
    function initEcharts(){
        myChart = echarts.init(document.getElementById('mapshow'), 'shine');
        option = {
            backgroundColor: '#7babe8', //背景颜色
            geo3D: {
                show: true,
                map: '四川',
                roam: false,
                zoom: 5,
                environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#002094'
                }, {
                    offset: 0.7, color: '#0e69e9'
                }, {
                    offset: 1, color: '#0e69e9'
                }], false),
                boxHeight: 3,
                regionHeight: 3,
                // boxDepth: 500,
                // boxWidth: 100,
                // shading: 'color', //不受light影响
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        opacity: 1,
                        backgroundColor: 'rgba(0,0,0,0)',
                    },
                    distance: -1,
                    position: 'bottom',
                },
                itemStyle: {
                    // areaColor: '#002094',
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: '#031132' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#031132' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    opacity: 0.8,
                    borderWidth: 0.8,
                    borderColor: '#0e6aee',
                    // shadowColor: '#fff', //阴影
                    // shadowBlur: 100
                },
                emphasis:{
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                        }
                    },
                    itemStyle:{
                        areaColor: '#f2205f',
                        opacity: 1,
                        borderWidth: 0,
                        borderColor: '#f2205f'
                    }
                },
                zlevel: 4,
                light: { //光照阴影
                    main: {
                        color: '#fff', //光照颜色
                        intensity: 1.2, //光照强度
                        shadow: true, //是否显示阴影
                        alpha: 55,
                        beta: 10
                    },
                    ambient: {
                        intensity: 0.3
                    }
                },
            },
            series: [
               /* {
                    name: '四川',
                    type: 'map3D',//类型
                    coordinateSystem: 'geo3D',
                      itemStyle: {
                        areaColor: '#002094',
                        borderColor:'#0e69e9',
                        borderWidth: 2,
                          shadowColor: '#fff',
                          shadowBlur: 100
                       },
                    emphasis: {
                        show: true,
                        color: "#0060df",
                        areaColor: '#0060df',
                    },
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
                       zoom: 1.2,
                       showLegendSymbol:false, //显示地标
                     mapType: '四川',
                     roam: false,
                     aspectScale:1,//地图长宽比
                    zlevel: 8,
                     data: scData
                },*/
                {
                    name: '点',
                    type: 'scatter3D',
                    coordinateSystem: 'geo3D',
                    symbol: 'pin',
                    symbolSize: 16,
                    label: {
                        show: true,
                        formatter: function(params) {
                            return params.data.value[2] + '次';
                        },
                        textStyle: {
                            color: '#fcca99',
                            fontSize: 18,
                            opacity: 1,
                            backgroundColor: 'rgba(0,0,0,0)'
                        },
                        position: 'top',
                        opacity: 1,
                        distance: -5
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffff00', //标志颜色
                        }
                    },
                    zlevel: 10,
                    data: convertData(scData)
                }
            ]
        };
        myChart.setOption(option);
        //地图区域块点击事件
        myChart.off("click");
        myChart.on('click', function (params) {
            console.log(params)
            localStorage.setItem('address',params.name);
            location.href='view/province.html';
        });
    }

    //横向bar
    function initEchartsBar() {
        var myChart = echarts.init(document.getElementById('bar1'));
        option = {
            backgroundColor: '#7babe8', //背景颜色
            geo3D: {
                show: true,
                map: '四川',
                roam: false,
                environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#002094'
                }, {
                    offset: 0.7, color: '#0e69e9'
                }, {
                    offset: 1, color: '#0e69e9'
                }], false),
                boxHeight: 5,
                regionHeight: 3,
                // boxWidth: 100,
                shading: 'color', //不受light影响
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        opacity: 1,
                        backgroundColor: 'rgba(0,0,0,0)',
                    },
                    distance: -1,
                    position: 'bottom',
                },
                itemStyle: {
                    areaColor: '#002094',
                    opacity: 0.8,
                    borderWidth: 0.8,
                    borderColor: '#0e6aee',
                    // shadowColor: 'rgba(0,54,255, 1)',
                    // shadowBlur: 100
                },
                emphasis:{
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                        }
                    },
                    itemStyle:{
                        areaColor: '#f2205f',
                        opacity: 1,
                        borderWidth: 0,
                        borderColor: '#f2205f'
                    }
                },
                zlevel: 4,
                light: { //光照阴影
                    main: {
                        color: '#fff', //光照颜色
                        intensity: 1.2, //光照强度
                        shadow: false, //是否显示阴影
                        alpha: 55,
                        beta: 10
                    },
                    ambient: {
                        intensity: 0.3
                    }
                },
            },
            series: [
                /*{
                    name: '四川',
                    type: 'map3D',//类型
                    coordinateSystem: 'geo3D',
                      itemStyle: {
                        areaColor: '#002094',
                        borderColor:'#0e69e9',
                        borderWidth: 2,
                       },
                    emphasis: {
                        show: true,
                        color: "#0060df",
                        areaColor: '#0060df',
                    },
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
                       zoom: 1.2,
                       showLegendSymbol:false, //显示地标
                     mapType: '四川',
                     roam: false,
                     aspectScale:1,//地图长宽比
                    zlevel: 8,
                     data: scData
                },*/
                {
                    name: '点',
                    type: 'scatter3D',
                    coordinateSystem: 'geo3D',
                    symbol: 'pin',
                    symbolSize: 16,
                    label: {
                        show: true,
                        formatter: function(params) {
                            return params.data.value[2] + '次';
                        },
                        textStyle: {
                            color: '#fcca99',
                            fontSize: 18,
                            opacity: 1,
                            backgroundColor: 'rgba(0,0,0,0)'
                        },
                        position: 'top',
                        opacity: 1,
                        distance: -5
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffff00', //标志颜色
                        }
                    },
                    zlevel: 10,
                    data: convertData(scData)
                }
            ]
        };
        myChart.setOption(option);
        //地图区域块点击事件
        myChart.on('click', function (params) {
            console.log(params)
            localStorage.setItem('address',params.name)
            location.href='view/province.html'
        });
    }


    function showCity(pName, Chinese_) {
        //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
        loadBdScript('$' + pName + 'JS', './lib/map/province/' + pName + '.js', function() {
            initEcharts(Chinese_);
        });
    }



    initEcharts();
    // initEchartsBar();
    //项目总览,阳光审批,实时监管选中
    $('.noActive').click(function(){
        // $('.noActive').removeClass('active')
        if($(this).hasClass('active')){
            $(this).removeClass('active')
            option.series[0].label.show = false;
            option.series[0].symbolSize = 0;
        } else {
            $(this).addClass('active')
            option.series[0].label.show = true;
            option.series[0].symbolSize = 16;
        }
        myChart.setOption(option);
    })
    //搜索按钮
    $('.sudoBtn').click(function(){
        alert($('#sudoTxt').val());
    })
    //信息汇总弹窗
    $('.infBtn').click(function(){
        $('.infWrap').show();
    })
    //投诉举报
    $('.complaintReporting').click(function(){
        $('.wrap').show();
    })
    //关闭弹出的投诉举报
    $('.closeBtn').click(function(){
        $('.wrap').hide();
    })
    //关闭信息汇总弹窗
    $('.closeInf').click(function(){
        $('.infWrap').hide()
    })
    //切换显示样式
    $('.btn').click(function(){
        $('.btn').removeClass('btnActive')
        $(this).addClass('btnActive');
    })
    $('#changeTable').click(function(){
        $(".incircle").hide();
        $('.intable').show();
    })
    $('#changeCircle').click(function(){
        $('.intable').hide();
        $(".incircle").show();
    })

    $(window).resize(function() {
        myChart.resize();
    });

})






