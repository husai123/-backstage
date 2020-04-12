layui.use(['table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var $ = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/vehicle/list' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'vehicle_damage_id', title: '车辆定损编号', width:"10%",align:"center", sort: true}
            ,{field: 'repair_depot_name',align:"center", title: '修理厂名称', width:"15%"}
            ,{field: 'repair_depot_phone',align:"center", title: '修理厂电话', width:"10%"}
            ,{field: 'repair_depot_linkman',align:"center", title: '修理厂联系人', width:"15%"}
            ,{field: 'repair_depot_address',align:"center", title: '修理厂地址', width:"10%"}
            ,{field: 'fixed_loss_method',align:"center", title: '定损方式', width:"10%"}
            ,{field: 'fixed_loss_comment',align:"center", title: '定损备注', width:"10%"}
            ,{field: 'opinion_material_fee',align:"center", title: '定损费', width:"10%"}
            ,{field: 'schedule_id',align:"center", title: '调度表', width: "10%"}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%"}
            ,{field: 'submit_time',align:"center", title: '定损提交时间', width:"10%",templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'instance_id',align:"center", title: '流程实例编号', width: "10%"}
            ,{field: 'op', title: '操作',align:"center", width: "20%",templet:"#barDemo"}
        ]]
    });


});
