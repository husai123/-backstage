layui.use(['table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var $ = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/humanVerify/list' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'human_injury_damage_id', title: '人伤定损编号', width:"10%",align:"center", sort: true ,hide:true}
            ,{field: 'name',align:"center", title: '病人姓名', width:"10%"}
            ,{field: 'sex',align:"center", title: '性别', width:"10%"}
            ,{field: 'age',align:"center", title: '年龄', width:"10%"}
            ,{field: 'visiting_hospital',align:"center", title: '就诊医院', width:"10%",hide:true}
            ,{field: 'degree_of_injury',align:"center", title: '伤势程度', width:"10%"}
            ,{field: 'disability_grade',align:"center", title: '伤残等级', width:"10%",hide:true}
            ,{field: 'category_of_injury',align:"center", title: '伤情类别', width:"10%"}
            ,{field: 'contact_information',align:"center", title: '联系情况', width: "10%",hide:true}
            ,{field: 'schedule_id',align:"center", title: '调度表', width: "10%",hide:true}
            ,{field: 'car_number',align:"center", title: '车辆车牌号', width: "10%"}
            ,{field: 'fixed_loss_remarks',align:"center", title: '定损备注', width: "10%",hide:true}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%",hide:true}
            ,{field: 'submit_time',align:"center", title: '定损提交时间', width:"10%",templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'instance_id',align:"center", title: '流程实例编号', width: "10%",hide:true}
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
                content: ['/forward/damageVerifyDetails', 'no'],
                zIndex: layer.zIndex, //重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                    //获得弹出层的主体
                    var body = layui.layer.getChildFrame("body");
                    var human_injury_damage_id = data.human_injury_damage_id;
                    /*alert(vehicle_damage_id);*/
                    //给主体赋值
                    $.ajax({
                        url: "http://api.insurance.com/api/item/humanVerify/getVerify?Human_injury_damage_id="+human_injury_damage_id,
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
                                body.find("[name='human_injury_damage_id']").val(data1[i].human_injury_damage_id);
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
        }
    });


});