layui.use(['table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var $ = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/human/list' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'human_injury_damage_id', title: '人伤定损编号', width:"10%",align:"center", sort: true}
            ,{field: 'name',align:"center", title: '病人姓名', width:"10%"}
            ,{field: 'sex',align:"center", title: '性别', width:"10%"}
            ,{field: 'age',align:"center", title: '年龄', width:"10%"}
            ,{field: 'visiting_hospital',align:"center", title: '就诊医院', width:"10%"}
            ,{field: 'degree_of_injury',align:"center", title: '伤势程度', width:"10%"}
            ,{field: 'disability_grade',align:"center", title: '伤残等级', width:"10%"}
            ,{field: 'category_of_injury',align:"center", title: '伤情类别', width:"10%"}
            ,{field: 'contact_information',align:"center", title: '联系情况', width: "10%"}
            ,{field: 'schedule_id',align:"center", title: '调度表', width: "10%"}
            ,{field: 'car_number',align:"center", title: '车辆车牌号', width: "10%"}
            ,{field: 'fixed_loss_remarks',align:"center", title: '定损备注', width: "10%"}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%"}
            ,{field: 'submit_time',align:"center", title: '定损提交时间', width:"10%",templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'instance_id',align:"center", title: '流程实例编号', width: "10%"}
            ,{field: 'op', title: '操作',align:"center", width: "20%",templet:"#barDemo"}
        ]]
    });


});
