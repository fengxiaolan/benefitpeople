
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
    var color1 = ['#ffff00', '#ff0000', '#33ffff'];
    var color = ['#efcc99', '#ffd942', '#ffff00'];

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
    //地理位置name--显示与隐藏:show---请求过来的数据:data---控制颜色scatter:colorIdx
    function initEcharts(show,colorIdx){
        option = {
            backgroundColor: '#7babe8', //背景颜色
            geo3D: {
                show: true,
                map: '四川',
                roam: false,
                zoom: 1.2,
                environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#002094'
                }, {
                    offset: 0.7, color: '#0e69e9'
                }, {
                    offset: 1, color: '#0e69e9'
                }], false),
                boxHeight: 6,
                regionHeight: 2,
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
                    // areaColor: {
                    //     type: 'radial',
                    //     x: 1,
                    //     y: 1,
                    //     r: 1,
                    //     colorStops: [{
                    //         offset: 0,
                    //         color: 'rgba(147, 235, 248, .9)' // 0% 处的颜色
                    //     }, {
                    //         offset: 1,
                    //         color: 'rgba(147, 235, 248, .9)' // 100% 处的颜色
                    //     }],
                    //     globalCoord: false // 缺省为 false
                    // },
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
                // regions: [{
                //     name: '凉山彝族自治州',
                //     // regionHeight: 5,
                //     itemStyle: {
                //         color: '#0f0',
                //         borderWidth: 2,
                //         borderColor: '#f2205f',
                //         areaColor: '#f2205f'
                //     },
                //     emphasis: {
                //         label:{
                //           show: true,
                //           color: '#f00'
                //         },
                //         itemStyle: {
                //             color: '#f2205f',
                //             borderWidth: 0,
                //             borderColor: '#f2205f',
                //             // shadowColor: 'rgba(0, 0, 0, 0.5)',
                //             // shadowBlur: 10,
                //             // shadowOffsetX: 39,
                //             // shadowOffsetY: 40
                //         }
                //     }
                // }],
                zlevel: -10,
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
            // visualMap: {
            //     show: false,
            //     inRange: {
            //         color: ['#f00','#0f0']
            //     }
            // },
            series: [
                {
                    name: '省份',
                    mapType: '四川',
                    type: 'map3D',
                    coordinateSystem: 'geo3D',
                    environment: '#000',
                    regionHeight: 5,
                    itemStyle: {
                    areaColor: '#f2205f',
                    borderColor:'#f2205f',
                    borderWidth: 2,
                      shadowColor: '#fff',
                      shadowBlur: 100
                   },
                    emphasis: {
                        show: true,
                        color: "#0060df",
                        areaColor: '#f2205f',
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
                   roam: false,
                   aspectScale:1,//地图长宽比
                   zlevel: 10,
                   data: convertData(scData)
                },
                {
                    name: '点',
                    type: 'scatter3D',
                    coordinateSystem: 'geo3D',
                    symbol: 'pin',
                    symbolSize: show == true ? 16 : 0,
                    label: {
                        show: show == true ? true : false,
                        formatter: function(params) {
                            return params.data.value[2] + '次';
                        },
                        textStyle: {
                            color: color[colorIdx],
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
                            color: color1[colorIdx], //标志颜色
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
            //跳转到市请求
            console.log(params)
            localStorage.setItem('address',params.name);
            // location.href='view/province.html';
            $('.content_middle').load('view/province.html')

            // 重新渲染左右侧请求
            var num = 10000;
            // $('#specialnum').html(`<span>${num}</span><span>个</span>`)
            // $('#specialnum').text(`${num}`)
        });
    }

    //立体bar
    function initEchartsBar() {
        var myChart = echarts.init(document.getElementById('bar1'));
        var option = {
            backgroundColor: '#02165d',
            tooltip: {
                show: false,
                trigger: 'axis'
            },
            xAxis: {
                data: ["企业", "农专", "个体"],
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    margin: 15
                },

            },
            yAxis: {
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false,
                }
            },
            series: [
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [30, 15],
                    symbolOffset: [0, -10],
                    z: 12,
                    symbolPosition: 'end',
                    itemStyle: {
                        normal: {
                            color: '#f50161'
                        }
                    },
                    data:  [100, 50, 20]
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [30, 15],
                    symbolOffset: [0, 10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#f50161'

                        }
                    },
                    data: [100, 50, 20]
                },
                {
                    name: '实时监控',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#b11e50'
                        }
                    },
                    label:{
                        show: true,
                        position : 'top',
                        distance : 12,
                        color: '#ff0656',
                        fontSize: 16,
                    },
                    silent: true,
                    barWidth: 30,
                    barGap: '-100%',
                    data: [100, 50, 20]
                }
            ]
        };
        myChart.setOption(option);
    }

    //横向bar
    function initEchartsBar1() {
        var myChart = echarts.init(document.getElementById('bar2'));
        var myColor = ['#0743f2','#d15000','#009c9e','#f50161'];
        var option = {
            grid: {
                show: false,
                left: '12%',
                right: '30%',
            },
            backgroundColor: '#121B2C',        //背景色
            xAxis: {show: false},
            yAxis: [ {
                show: false,
                axisTick: 'none',
                axisLine: {
                    show: true
                },
                offset: '27',
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '16',
                    },
                    // margin: 8,
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                data: ['闽DZ0175']
            } ,
                {
                    axisTick: 'none',
                    axisLine: 'none',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '16',
                        }
                    },
                    data:  [11]
                }],

            series: [
                {
                    name: '数据内框',
                    type: 'bar',
                    itemStyle: {
                        barBorderRadius: 20,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#f7734e'
                        }, {
                            offset: 1,
                            color: '#e12945'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    },
                    barWidth: 20,
                    barMinHeight: 20,
                    data: [50]
                },
                {
                    name: '外框',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: 'rgba(255, 255, 255, 0.11)'
                        }
                    },
                    barGap: '-100%',
                    z: 0,
                    barWidth: 21,
                    data: [100]
                }
            ]
        };
        myChart.setOption(option);
    }


    //圆饼图
    function initHighPie() {
        var each = Highcharts.each,
            round = Math.round,
            cos = Math.cos,
            sin = Math.sin,
            deg2rad = Math.deg2rad;
        Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'translate', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            if (!this.chart.is3d()) {
                return;
            }
            var series = this,
                chart = series.chart,
                options = chart.options,
                seriesOptions = series.options,
                depth = seriesOptions.depth || 0,
                options3d = options.chart.options3d,
                alpha = options3d.alpha,
                beta = options3d.beta,
                z = seriesOptions.stacking ? (seriesOptions.stack || 0) * depth : series._i * depth;
            z += depth / 2;
            if (seriesOptions.grouping !== false) {
                z = 0;
            }
            each(series.data, function(point) {
                var shapeArgs = point.shapeArgs,
                    angle;
                point.shapeType = 'arc3d';
                var ran = point.options.h;
                shapeArgs.z = z;
                shapeArgs.depth = depth * 0.75 + ran;
                shapeArgs.alpha = alpha;
                shapeArgs.beta = beta;
                shapeArgs.center = series.center;
                shapeArgs.ran = ran;
                angle = (shapeArgs.end + shapeArgs.start) / 2;
                point.slicedTranslation = {
                    translateX: round(cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
                    translateY: round(sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad))
                };
            });
        });
        (function(H) {
            H.wrap(Highcharts.SVGRenderer.prototype, 'arc3dPath', function(proceed) {
                // Run original proceed method
                var ret = proceed.apply(this, [].slice.call(arguments, 1));
                ret.zTop = (ret.zOut + 0.5) / 100;
                return ret;
            });
        }(Highcharts));
        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                animation: false,
                events: {
                    load: function() {
                        var each = Highcharts.each,
                            points = this.series[0].points;
                        each(points, function(p, i) {
                            p.graphic.attr({
                                translateY: -p.shapeArgs.ran
                            });
                            p.graphic.side1.attr({
                                translateY: -p.shapeArgs.ran
                            });
                            p.graphic.side2.attr({
                                translateY: -p.shapeArgs.ran
                            });
                        });
                    }
                },
                options3d: {
                    enabled: true,
                    alpha: 75,
                    beta: 0
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [{
                    'name': 'Firefox',
                    y: 30.0,
                    h: 50
                }, {
                    name: 'IE',
                    y: 26.8,
                    h: 15
                }, {
                    name: 'Chrome',
                    y: 12.8,
                    h: 20
                }, {
                    'name': 'Safari',
                    y: 8.5,
                    h: 2
                }, {
                    'name': 'Opera',
                    y: 6.2,
                    h: 15
                }, {
                    'name': 'Others',
                    y: 0.7,
                    h: 30
                }]
            }]
        });
    }

    //显示对应城市
    function showCity(pName, Chinese_) {
        loadBdScript('$' + pName + 'JS', 'lib/map/province/' + pName + '.js', function() {
            initEcharts(Chinese_);
        });
    }

    // 加载对应的JS
    function loadBdScript(scriptId, url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        script.id = scriptId;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    //***********************************************************************************************
    //map
    var myChart = echarts.init(document.getElementById('mapshow'));
    var option = {};

    //bar



    initEcharts(true,0);
    // initHighPie();
    initEchartsBar();
    initEchartsBar1();
    // initEchartsBar();
    //项目总览,阳光审批,实时监管选中
    $('.noActive').click(function(){
        console.log("data-id",$(this).data("id"));
        if($(this).hasClass('active')){
            $(this).removeClass('active')
            // option.series[1].label.show = false;
            // option.series[1].symbolSize = 0;
            initEcharts(false, $(this).data("id"))
        } else {
            $('.main_body').find('.active').removeClass('active');
            $(this).addClass('active')
            // option.series[0].label.show = true;
            // option.series[0].symbolSize = 16;
            initEcharts(true, $(this).data("id"))
        }
        // myChart.setOption(option);
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






