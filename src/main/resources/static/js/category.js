layui.use('table', function(){
    var table = layui.table;
    //第一个实例
    table.render({
        elem: '#demo'
        ,url: 'http://api.insurance.com/api/item/category/list' //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {field: 'no', type:"checkbox", width:80, sort: true, fixed: 'left'}
            ,{field: 'case_closed_id', title: '销案编号', width:"20%", sort: true}
            ,{field: 'emp_id', title: '销案员编号', width:"20%", sort: true}
            ,{field: 'case_closed_time', title: '销案时间', width:"20%"}
            ,{field: 'case_closed_reason', title: '销案原因', width: "20%"}
            ,{field: 'case_closed_comment', title: '销案备注', width: "20%", sort: true}
            ,{field: 'compensate_case_id', title: '销案对应赔案', width: "20%", sort: true}
        ]]
    });

});