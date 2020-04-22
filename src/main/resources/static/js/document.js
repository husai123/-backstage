/*$.ajax({
    url:"http://api.insurance.com/api/item/document/list",
    type:"get",
    data:{"documents_id":"359c27d9-7b03-11ea-8ca6-c85b76b0bf1c"},
    dataType:"json",
    success:function (data) {
        //注意，此时，代码会出错，因为会存在一个ajax请求跨域的问题
        //此时,data即为商品微服务返回的json--------List
        $.each(data,function (index,k) { //k:即为集合，存放的category
            //把数据追加到ol中
            $("<li>"+k.documents_name+"</li>").appendTo("#myol");
        })
    }
});*/




layui.use(['form','table','layer','jquery'], function(){
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var $ = layui.$;

    /************************ 动态加载下拉框 *************************/
    $(function getTypeList() {
        $.ajax({
            url: "http://api.insurance.com/api/item/insurance/getType",
            // data: params,
            async: true,
            dataType: "json",
            success: function (data, htmlData) {

                for (var i = 0; i < data.length; i++) {
                    /*console.log(data);*/
                    var value = data[i].insurance_id;
                    var lable = data[i].insurance_name;
                    $('#insurance_id').append("<option value="+value+">"+lable+"</option>");
                }
                layui.form.render();
            },
            error: function (data) {
                $.gridUnLoading({message: "下拉框数据加载失败"});
            }
        });
    })

    $(function getTypeList2() {
        $.ajax({
            url: "http://api.insurance.com/api/item/Date_dictionary/getType",
            // data: params,
            async: true,
            dataType: "json",
            success: function (data, htmlData) {

                for (var i = 0; i < data.length; i++) {
                    /*console.log(data);*/
                    var value = data[i].id;
                    var lable = data[i].show_value;
                    $('#type_id').append("<option value="+value+">"+lable+"</option>");
                }
                layui.form.render();
            },
            error: function (data) {
                $.gridUnLoading({message: "下拉框数据加载失败"});
            }
        });
    })

    $("#find").click(function () {
        alert($("#frm").serialize());
        console.log($("#frm").serialize());
        table.render({
            elem: '#demo'
            ,url: 'http://api.insurance.com/api/item/document/FindByInsurance?'+ $("#frm").serialize()//数据接口
           /* ,url: 'http://api.insurance.com/api/item/document/All'//数据接口*/
            /*,data:$("#frm").serialize()*/
            ,page: true //开启分页
            ,limit:5 //每一页显示5条数据
            ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
            ,toolbar:"default" //显示工具头信息
            ,cols: [[ //表头
                {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
                ,{field: 'documents_id', title: '单证编号', width:"0%",align:"center",hide:true }
                ,{field: 'documents_name', title: '单证名称', width:"20%",align:"center", sort: true}
                ,{field: 'insurance_id', title: '险种类别id', width:"0%",align:"center",hide:true }
                ,{field: 'insurance_name',align:"center", title: '险种类别', width:"20%"}
                ,{field: 'type_id', title: '损失类型id', width:"0%",align:"center",hide:true }
                ,{field: 'type_name',align:"center", title: '损失类型', width:"20%"}
                ,{field: 'is_requried',align:"center", title: '是否必须(数字)', width:"0%",hide: true}
                ,{field: 'is_requriedView',align:"center", title: '是否必须', width:"15%"}
                ,{field: 'op', title: '操作',align:"center", width: "15%",templet:"#barDemo"}
            ]]
        });
    })

    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/document/All' //数据接口
        ,page: true //开启分页
        ,limit:5 //每一页显示5条数据
        ,limits:[1,2,3,5,10,20,30,50] //列表显示的每一页显示的条数
        ,toolbar:"default" //显示工具头信息
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:"10%", sort: true, fixed: 'left'}
            ,{field: 'documents_id', title: '单证编号', width:"0%",align:"center",hide:true }
            ,{field: 'documents_name', title: '单证名称', width:"20%",align:"center", sort: true}
            ,{field: 'insurance_id', title: '险种类别id', width:"0%",align:"center",hide:true }
            ,{field: 'insurance_name',align:"center", title: '险种类别', width:"20%"}
            ,{field: 'type_id', title: '损失类型id', width:"0%",align:"center",hide:true }
            ,{field: 'type_name',align:"center", title: '损失类型', width:"20%"}
            ,{field: 'is_requried',align:"center", title: '是否必须(数字)', width:"0%",hide: true}
            ,{field: 'is_requriedView',align:"center", title: '是否必须', width:"15%"}
            ,{field: 'op', title: '操作',align:"center", width: "15%",templet:"#barDemo"}
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
                var id=data.documents_id;
                /*alert(id);*/
                //通过异步请求删除
                $.ajax({
                    url:"http://api.insurance.com/api/item/document/del",
                    data:{"documents_id":id},
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
                area: ['500px', '400px'],
                maxmin: true,
                anim: 1,
                title: "修改信息",
                content: ['/forward/documentUpdate', 'no'],
                zIndex: layer.zIndex, //重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                    //获得弹出层的主体
                    var body = layui.layer.getChildFrame("body");
                    //给主体赋值
                    body.find("[name='documents_id']").val(data.documents_id);
                    body.find("[name='documents_name']").val(data.documents_name);
                    var select1 = 'dd[lay-value=' + data.insurance_id + ']';
                    body.find("[id='insurance_type']").find(select1).click();
                    var select2 = 'dd[lay-value=' + data.type_id + ']';
                    body.find("[id='type_type']").find(select2).click();
                    var select3 = 'dd[lay-value=' + data.is_requried + ']';
                    body.find("[id='is_requried_type']").find(select3).click();
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
                    area: ['500px','400px'],
                    maxmin: false,
                    anim:1,
                    title:"添加数据",
                    content: ['/forward/documentAdd','no'],
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