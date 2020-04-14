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
            ,{field: 'opinion_material_fee',align:"center", title: '定损费', width:"10%",templet:'<div>{{d.opinion_material_fee/100+".00"}}</div>'}
            ,{field: 'schedule_id',align:"center", title: '调度表', width: "10%"}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%"}
            ,{field: 'submit_time',align:"center", title: '定损提交时间', width:"10%",templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'instance_id',align:"center", title: '流程实例编号', width: "10%"}
            ,{field: 'op', title: '操作',align:"center", width: "20%",templet:"#barDemo"}
        ]]
    });



    /**********************监听工具条点击事件*************************************/
    //监听行工具事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'detail'){
            layer.msg('查看操作');
        } else if(layEvent === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
                var id=data.vehicle_damage_id;

                //通过异步请求删除
                $.ajax({
                    url:"http://api.insurance.com/api/item/vehicle/del",
                    data:{"vehicle_damage_id":id},
                    type:"delete",//delete请求，用于执行删除"
                    success:function () {
                        layer.msg("删除成功！");
                    }
                })
            });
        } else if(layEvent === 'edit'){
            layer.open({
                type: 2,
                shade: true,
                area: ['800px','500px'],
                maxmin: true,
                anim: 1,
                title: "修改信息",
                content: ['/forward/vehicleUpdate', 'no'],
                zIndex: layer.zIndex, //重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                    //获得弹出层的主体
                    var body = layui.layer.getChildFrame("body");
                    //给主体赋值
                    body.find("[name='vehicle_damage_id']").val(data.vehicle_damage_id);
                    body.find("[name='repair_depot_name']").val(data.repair_depot_name);
                    body.find("[name='repair_depot_phone']").val(data.repair_depot_phone);
                    body.find("[name='repair_depot_linkman']").val(data.repair_depot_linkman);
                    body.find("[name='repair_depot_address']").val(data.repair_depot_address);
                    body.find("[name='fixed_loss_method']").val(data.fixed_loss_method);
                    body.find("[name='fixed_loss_comment']").val(data.fixed_loss_comment);
                    body.find("[name='opinion_material_fee']").val(data.opinion_material_fee);
                    body.find("[name='schedule_id']").val(data.schedule_id);
                    body.find("[name='emp_id']").val(data.emp_id);
                    body.find("[name='submit_time']").val(data.submit_time);
                    body.find("[name='instance_id']").val(data.instance_id);
                    // body.find("[name='case_closed_time']").val(format(data.case_closed_time,'yyyy-MM-dd'));
                    // body.find("[name='bir']").val(format(data.bir, 'yyyy-MM-dd'));
                }
            });
        }
    });




    /**********************监听工具栏点击事件*************************************/
    //监听头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        switch(obj.event){
            case 'add':
                //通过这种方式弹出的层，每当它被选择，就会置顶。
                layer.open({
                    type: 2,
                    shade: true,
                    area: ['800px','500px'],
                    maxmin: false,
                    anim:1,
                    title:"添加数据",
                    content: ['/forward/vehicleAdd','no'],
                    zIndex: layer.zIndex, //重点1
                    success: function(layero){
                        layer.setTop(layero); //重点2
                    }
                });




                break;
            case 'update':
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else if(data.length > 1){
                    layer.msg('只能同时编辑一个');
                } else {
                    layer.alert('编辑 [id]：'+ checkStatus.data[0].id);
                }
                break;
            case 'delete':
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else {
                    layer.msg('删除');
                }
                break;
        };
    });












});
