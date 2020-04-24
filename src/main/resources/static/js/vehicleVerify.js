layui.use(['table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var $ = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/vehicleVerify/list' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'vehicle_damage_id', title: '车辆定损编号', width:"10%",align:"center", sort: true}
            ,{field: 'fixed_loss_method',align:"center", title: '定损方式', width:"10%"}
            ,{field: 'fixed_loss_comment',align:"center", title: '定损备注', width:"10%"}
            ,{field: 'opinion_material_fee',align:"center", title: '定损费', width:"10%",templet:'<div>{{d.opinion_material_fee/100+".00"}}</div>'}
            ,{field: 'schedule_id',align:"center", title: '调度表', width: "10%"}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%"}
            ,{field: 'submit_time',align:"center", title: '定损提交时间', width:"10%",templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'op', title: '操作',align:"center", width: "20%",templet:"#barDemo"}
        ]]
    });



    /**********************监听工具条点击事件*************************************/
    //监听行工具事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'adopt'){
            /*layer.msg('通过审核');*/
            layer.open({
                type: 2,
                shade: true,
                area: ['500px', '400px'],
                maxmin: true,
                anim: 1,
                title: "修改信息",
                content: ['/forward/vehicleVerifyDetails', 'no'],
                zIndex: layer.zIndex, //重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                    //获得弹出层的主体
                    var body = layui.layer.getChildFrame("body");
                    var vehicle_damage_id = data.vehicle_damage_id;
                    /*alert(vehicle_damage_id);*/
                    //给主体赋值
                    $.ajax({
                        url: "http://api.insurance.com/api/item/vehicleVerify/getVerify?vehicle_damage_id="+vehicle_damage_id,
                        // data: params,
                        async: true,
                        dataType: "json",
                        success: function (data1, htmlData) {
                            console.log(data1);
                            for (var i = 0; i < data1.length; i++) {
                                console.log(data1[i].verify_id);
                                body.find("[name='Verify_id']").val(data1[i].verify_id);
                                body.find("[name='emp_id']").val(data1[i].emp_id);
                                body.find("[name='instance_id']").val(data1[i].instance_id);
                                body.find("[name='rescue_price']").val(data1[i].rescue_price);
                                body.find("[name='vehilce_damage_id']").val(data1[i].vehilce_damage_id);
                                body.find("[name='verify_id']").val(data1[i].verify_id);
                                body.find("[name='verify_labor_costs']").val(data1[i].verify_labor_costs);
                                body.find("[name='verify_loss_discount']").val(data1[i].verify_loss_discount);
                                body.find("[name='verify_manager_fee']").val(data1[i].verify_manager_fee);
                                body.find("[name='verify_material_fee']").val(data1[i].verify_material_fee);
                                body.find("[name='verify_residual_value']").val(data1[i].verify_residual_value);
                                body.find("[name='verify_sum_price']").val(data1[i].verify_sum_price);
                                var date = new Date();
                                /*date.toLocaleDateString();*/
                                body.find("[name='verify_time1']").val(date.toLocaleDateString());
                            }

                            layui.form.render();
                        }
                    });
                }
            });
        } else if(layEvent === 'refuse'){
            layer.msg('不通过审核');
            var body = layui.layer.getChildFrame("body");
            var vehicle_damage_id = data.vehicle_damage_id;
            $.ajax({
                url: "http://api.insurance.com/api/item/vehicleVerify/refuse?vehicle_damage_id="+vehicle_damage_id,
                // data: params,
                async: true,
                dataType: "json",
                success: function (data1, htmlData) {
                    layui.form.render();
                }
            });
            window.location.reload();
        }
    });


});