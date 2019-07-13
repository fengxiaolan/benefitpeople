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

var citys = ['aba','bazhong','chengdu','dazhou','deyang','ganzi',
    'guangan','leshan','liangshan','luzhou','meishan', 'mianyang','nanchong',
    'neijiang','panzhihua','suining','yaan','yibin','yaan','zigong','ziyang'];
var citytext = ['阿坝藏族羌族自治州','巴中市','成都市','达州市','德阳市','甘孜藏族自治州',
    '广安市','乐山市','凉山彝族自治州','泸州市','眉山市','绵阳市','南充市',
    '内江市','攀枝花市','遂宁市','宜宾市','雅安市','自贡市','资阳市'];


//获取地区名称和经纬度
var getGeoCoordMap = function(pname) {
    /*获取地图数据*/
    var geoCoordMap = {};
    var mapFeatures = echarts.getMap(pname).geoJson.features;
    mapFeatures.forEach(function(v) {
        var name = v.properties.name; // 地区名称
        geoCoordMap[name] = pname == '四川' ? v.properties.cp : v.properties.centroid; // 地区经纬度
    });
    return geoCoordMap;
};

//转化数据
var convertData = function(data) { // 转换数据
    var geoCoordMap = getGeoCoordMap(mapName);
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

//地理名称name--显示与隐藏:show---请求过来的数据:data---控制颜色scatter:colorIdx
function initEcharts(pName,isshow,colorIdx){
    var myChart = echarts.init(document.getElementById('mapshow'));
    var data = [];
    if(pName == '四川'){
        data = scData;
    } else {
        var cData = echarts.getMap(pName).geoJson.features.map(item => {
            return {
                name: item.properties.name,
                value: 10
            }
        });
        data = cData;
    }
    var option = {
        backgroundColor: 'rgba(0,0,0,0)',
        grid: {
            top: '2%',
        },
        geo3D: {
            show: true,
            map: pName,
            roam: false,
            zoom: 1.2,
            environment: 'rgba(0,0,0,0)',
            // environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //     offset: 0, color: 'rgba(0,0,0,0)'
            // }, {
            //     offset: 1, color: 'rgba(0,0,0,0)'
            // }], false),
            // boxHeight: 6,
            // regionHeight: 2,
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
        series: [
            /* {
                 name: 'map',
                 mapType: pName,
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
                data: convertData(data)
             },*/
            {
                name: '点',
                type: 'scatter3D',
                coordinateSystem: 'geo3D',
                symbol: 'pin',
                symbolSize: isshow == true ? 16 : 0,
                label: {
                    show: isshow == true ? true : false,
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
                data: convertData(data)
            }
        ]
    };
    myChart.setOption(option);
    //地图区域块点击事件
    myChart.off("click");
    if(pName == '四川'){
        myChart.on('click', function (params) {
            //跳转到市请求
            localStorage.setItem('address',params.name);
            // $('.content_middle').load('view/province.html');
            mapName = params.name;
            for (var i = 0; i < citytext.length; i++) {
                if (params.name === citytext[i]) {
                    showCity(citys[i], citytext[i]);
                    break;
                }
            }
        });
    } else {
        mapName = '四川';
        myChart.on('dblclick', function (params) {
            initEcharts(mapName, false, 0)
        });
    }

}

function initEcharts1(pName,show,colorIdx){
    var myChart = echarts.init(document.getElementById('mapshow'));
    option = {
        backgroundColor: 'transparent', //背景颜色
        geo: {
            show: true,
            map: '四川',
            roam: false,
            label: {
                normal: {
                    show: true
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
        ]
    };
    myChart.setOption(option);
    //拿到当前点击区域的去域名
    myChart.on('click', function (params) {
        alert(params.name)
    });
}

//项目总览
function initProjectAll(num, num1) {
    // 申报人次reportnum
    var res = PrefixZero(num,6);
    var arrval = res.split('');
    for(var i=0; i < arrval.length; i++){
        var html = `<div class="numitem">${arrval[i]}</div>`;
        $('.reportnum').append(html);
    }
    if(num.toString().length > 3){
        $('.reportnum').children('.numitem').eq(2).after(`<span class="comma">,</span>`)
    }
    $('.reportnum').append(`<div class="unititem">个</div>`);

    //发放补贴总金额
    var res1 = PrefixZero(num1,6);
    var arrval1 = res1.split('');
    for(var i=0; i < arrval1.length; i++){
        var html = `<div class="numitem">${arrval1[i]}</div>`;
        $('.subside').append(html);
    }
    if(num1.toString().length > 3){
        $('.subside').children('.numitem').eq(2).after(`<span class="comma">,</span>`)
    }
    $('.subside').append(`<div class="unititem">万</div><div class="unititem">元</div>`);
}

//立体bar
function initEchartsBar() {
    var myChart = echarts.init(document.getElementById('bar1'));
    var option = {
        // backgroundColor: '#02165d',
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
                    formatter: function (params) {
                        return (params.data).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                    }
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
function initEchartsBar1(id,data,idx) {
    var myChart = echarts.init(document.getElementById(id));
    var myColor = ['#0743f2','#d15000','#009c9e','#f50161'];
    var myColor1 = ['#3698fd','#efa604','#00cfd1','#ff613d'];
    var option = {
        grid: {
            show: false,
            left: '1%',
            right: '20%',
        },
        // backgroundColor: '#121B2C',        //背景色
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
                formatter: function (params) {
                    return (params.data).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: myColor1[idx-2]
                    }, {
                        offset: 1,
                        color: myColor[idx-2]
                    }]),
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
                        fontSize: '20',
                    },
                    formatter: function (params) {
                        return (params).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                    }
                },
                data:  data
            }],

        series: [
            {
                name: '数据内框',
                type: 'bar',
                itemStyle: {
                    barBorderRadius: [0, 15, 15, 0] ,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: myColor[idx-2]
                    }, {
                        offset: 1,
                        color: myColor1[idx-2]
                    }]),
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                },
                barWidth: 18,
                barMinHeight: 20,
                data: data
            },
            {
                name: '外框',
                type: 'bar',
                itemStyle: {
                    normal: {
                        barBorderRadius: [0, 15, 15, 0],
                        color: '#051a51',
                        borderColor: '#032784'
                    }
                },
                barGap: '-100%',
                z: 0,
                barWidth: 20,
                data: [100]
            }
        ]
    };
    myChart.setOption(option);
}

//圆饼图
function initHighPie(id, data) {
    var num = 343524;
    var res = splitNum(num);
    //大标题
    $('.comall').text(res);
    //小标题
    $('.dealcom').text(res);
    $('.currcom').text(res);

    //颜色处理
    var colors = [['#2155f4','#f50860'],['#2155f4','#00c5c7']]

    //图形处理
    var datas = data.map((item,idx) => {
        item.h = 10 + idx * 10;
        return item;
    })
    var each = Highcharts.each,
        round = Math.round,
        cos = Math.cos,
        sin = Math.sin,
        deg2rad = Math.deg2rad;
    Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'translate', function(proceed) {
        proceed.apply(this, [].slice.call(arguments, 1));
        // Do not do this if the chart is not 3D
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
    Highcharts.chart(id, {
        title: {
            text: ' '
        },
        tooltip: {
            enabled: false,
        },
        chart: {
            type: 'pie',
            animation: false,
            backgroundColor: 'transparent',
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
                alpha: 65,
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
            name: '投诉',
            colors: id == 'container1' ? colors[0] : colors[1],
            data: datas
        }]
    });

}

//公众服务
function initPublic(pubnum1,pubnum2,pubnum3) {
    var num1 = splitNum(pubnum1);
    var num2 = splitNum(pubnum2);
    var num3 = splitNum(pubnum3);
    $('.pubnum1').text(num1);
    $('.pubnum2').text(num2);
    $('.pubnum3').text(num3);
}

//信息汇总
function infocount() {
    //总信息
    $('.infonum1').text(126)
    $('.infonum2').text(126)
    $('.infonum3').text(126)
    //表格

    //饼图
};

//显示对应城市
function showCity(pid,pName) {
    loadBdScript('$' + pid + 'JS', './lib/map/' + pid + '.js', function() {
        initEcharts(pName, false, 0);
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

//遇三隔断
function splitNum(value) {
    //先替换到所有的除了小数点以外的非数值数值
    value = value.toString().replace(/[^(\d.)]*/g,'');
    //字符串没有反转方法，故需要先转成数组
    value = value.split('').reverse().join('');
    //可以尝试不加正则后面的(?=\d),在输入的数字刚好是3的整数倍时就会出现问题
    value = value.replace(/(\d{3})(?=\d)/g,'$1,');
    value = value.split('').reverse().join('');
    return value;
}

//数字补零当前数字num,多少位数n
function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}



$(function () {
    //全局地图名字
    mapName = '四川';
    //地图
    initEcharts(mapName,true,0);
    //项目总览
    initProjectAll(456,23658);
    //立体园饼图
    initHighPie('container1', [{
        name: 'Firefox',
        y: 30.0,
    }, {
        name: 'IE',
        y: 26.8,
    }]);
    initHighPie('container2',[{
        name: 'Firefox',
        y: 40.0,
    }, {
        name: 'IE',
        y: 66.8,
    }]);
    //竖向bar
    initEchartsBar();
    //横向bar
    initEchartsBar1('bar2',[11], 2);
    initEchartsBar1('bar3',[20], 3);
    initEchartsBar1('bar4',[60], 4);
    initEchartsBar1('bar5',[20], 5);
    //公众服务
    initPublic(7265,85,569);

    //日历
    $("#calendar").showCalendar({
        bgColor: "#021156",
        topColor: "#021156",
        weekBgColor: "#021156",
        weekFontColor: "#FFFFFF",
        innerBorder: "1px solid #FFFFFF",
        ymFontColor: '#FFFFFF',
        ymBgColor: '#021156',
        ymHoverBgColor: '#00CCCC',
        arrowColor: "#FFFFFF",
        noThisMonthFontColor: '#9F9F9F',
        thisMonthFontColor: '#FFFFFF',
        thisMonthBgColor: '#021156',
        dateHoverFontColor: '#FFFFFF',
        dateHoverBgColor: '#00CCCC',
        tableBorder: '1px solid #FFFFFF',
        btnBorder: '0',
        btnBgColor: '#021156',
        btnFontColor: '#FFFFFF',
        btnHoverBgColor: '#00CCCC',
        btnHoverFontColor: '#FFFFFF'
    });
    $('#calendar').val('2019-07-12');


    //项目总览,阳光审批,实时监管选中
    $('.noActive').click(function(){
        console.log("data-id",$(this).data("id"));
        if($(this).hasClass('active')){
            $(this).removeClass('active')
            initEcharts(mapName, false, $(this).data("id"))
        } else {
            $('.main_body').find('.active').removeClass('active');
            $(this).addClass('active')
            initEcharts(mapName, true, $(this).data("id"))
        }
    });

    //搜索按钮
    $('.sudoBtn').click(function(){
        console.log($('#sudoTxt').val());
    });


    //信息汇总弹窗
    $('.infBtn').click(function(){
        $('.infWrap').show();
        infocount();
    });
    //关闭信息汇总弹窗
    $('.closeInf').click(function(){
        $('.infWrap').hide()
    });
    //表格和饼图切换显示样式
    $('.btnshow').click(function(){
        $('.btnshow').removeClass('btnActive')
        $(this).addClass('btnActive');
    });
    $('#changeTable').click(function(){
        $(".incircle").hide();
        $('.intable').show();
    });
    $('#changeCircle').click(function(){
        $('.intable').hide();
        $(".incircle").show();
    });


    //投诉举报
    $('.complaintReporting').click(function(){
        $('.wrap').show();
    });
    //关闭弹出的投诉举报
    $('.closeBtn').click(function(){
        $('.wrap').hide();
    });
    $('.dealshow').click(function(){
        $('.dealshow').removeClass('dealActive')
        $(this).addClass('dealActive');
    });


    //输入框autoComplete
    var projects = [
        {
            value: "这是jquery",
            label: "JQuery",
            desc: "NO",
            icon: "jquery_32x32.png"
        },
        {
            value: "这是javascript",
            label: "JavaScript",
            desc: "Yes",
            icon: "javascript_32x32.png"
        },
        {
            value: "这是PHP",
            label: "PHP",
            desc: "Yes && NO",
            icon: "php_32x32.png"
        }
    ];
    $("#sudoTxt").autocomplete({
        minLength : 0,
        source : projects,
        focus : function(event, ui){
            $("#sudoTxt").val(ui.item.label);
            return false;
        },
        select : function (event, ui){
            $("#sudoTxt").val(ui.item.label);;
            return false;
        }
    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
            .append( "<a>" + item.label + "</a>" )
            .appendTo( ul );
    };

});






