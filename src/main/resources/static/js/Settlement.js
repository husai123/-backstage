layui.use(['table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var $ = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/Comprehensive_adjustmentVerify/list' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'verify_id', title: '定损编号', width:"20%",align:"center", sort: true}
            ,{field: 'verify_time', title: '核赔时间', width:"10%",align:"center", sort: true,templet:'<div>{{layui.util.toDateString(d.case_closed_time,"yyyy-MM-dd")}}</div>'}
            ,{field: 'is_adopt', title: '是否通过', width:"10%",align:"center", sort: true,hide:true}
            ,{field: 'adjustment_id', title: '所属全面理算编号', width:"10%",align:"center", sort: true,hide:true}
            ,{field: 'cross_strength_sum', title: '交强赔款合计', width:"10%",align:"center", sort: true}
            ,{field: 'business_sum', title: '商业赔款合计', width:"10%",align:"center", sort: true}
            ,{field: 'sum', title: '赔款总额', width:"10%",align:"center", sort: true}
            ,{field: 'verify_comment',align:"center", title: '备注', width: "20%"}
            ,{field: 'emp_id',align:"center", title: '定损员编号', width: "10%",hide:true}
            ,{field: 'instance_id',align:"center", title: '流程实例编号', width: "10%",hide:true}
            ,{field: 'op', title: '操作',align:"center", width: "10%",templet:"#barDemo"}
        ]]
    });



    /**********************监听工具条点击事件*************************************/
    //监听行工具事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        var verify_id = data.verify_id;
        if(layEvent === 'adopt'){
            layer.msg('结算完成');
            $.ajax({
                url: "http://api.insurance.com/api/item/Comprehensive_adjustmentVerify/settlement?verify_id="+verify_id,
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