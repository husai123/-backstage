layui.use(['table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var $ = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/robbery/list' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'robbery_damage_id', title: '定损编号', width:"10%",align:"center", sort: true}
            ,{field: 'car_number',align:"center", title: '车牌号码', width:"15%"}
            ,{field: 'license_plate_color',align:"center", title: '车牌颜色', width:"10%"}
            ,{field: 'car_brand',align:"center", title: '车辆品牌', width:"15%"}
            ,{field: 'car_type',align:"center", title: '车型', width:"10%"}
            ,{field: 'pay_price',align:"center", title: '新车购置价', width:"10%"}
            ,{field: 'driving_kilometre',align:"center", title: '已行驶公里数', width:"10%"}
            ,{field: 'service_life',align:"center", title: '实际使用年限', width:"10%"}
            ,{field: 'fixed_loss_comment',align:"center", title: '定损备注', width: "10%"}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%"}
            ,{field: 'submit_time',align:"center", title: '定损提交时间', width:"10%",templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'schedule_id',align:"center", title: '调度表', width: "10%"}
            ,{field: 'instance_id',align:"center", title: '流程实例编号', width: "10%"}
            ,{field: 'op', title: '操作',align:"center", width: "20%",templet:"#barDemo"}
        ]]
    });


});