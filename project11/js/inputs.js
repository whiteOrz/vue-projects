$(function() {
    openConfig();
    eventInit();
});

function eventInit(){
    $("#configOK").click(function(event) {
        var checkBoxs = $("#configPanel").find("input:checked");
        checkBoxs.each(function(index, el) {
            var $input = $(el);
            var targetId = $input.parents(".optionPanel").attr("id");
            var $targetTable = $("#" + targetId +"Table");
            var label =  $input.next().text();
            var componentId = $input.attr("componentId");

            if(!$targetTable.find('tr[componentId="'+componentId+'"]').length){
                var row = getNewRow(label,componentId,targetId=="tkOtherInfo");
                if(row){
                    $targetTable.append(row);
                }
            }
        });

        //$("#configPanel").hide();
    });

    $("#configCancel").click(function(event) {
        $("#configPanel").hide();
    });

    $("#configOpen").click(function(event) {
        $("#configPanel").show();
    });

    $("#configSelect").change(function(event) {
        $(".optionPanel").hide();
        var value = $(this).find(":selected").val();
        $("#"+value).show();
    });




}

function getNewRow(label,componentId,isOther){
    // <tr>
    //     <th>ID</th>
    //     <th>字段名称</th>
    //     <th>初始值</th>
    //     <th>数据字典（以，分开）</th>
    //     <th>必填</th>
    //     <th>提示文字</th>
    //     <th>排序</th>
    // </tr>
    var str="";

    if(isOther){
        str = '<tr componentId="'+componentId+'">';
        str+="<td>1</td>";
        str+="<td>" + label + "</td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="</tr>";
    }else{
        str = '<tr componentId="'+componentId+'">';
        str+="<td>1</td>";
        str+="<td>" + label + "</td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="<td></td>";
        str+="</tr>";
    }
    return str;
}

function openConfig() {
    var configData = getAllInputs();

    $.each(configData.inputs, function(index, el) {
        console.log(el.componentId);
        var arr = (function(el) {
            for (var key in el) {
                if ($.isArray(el[key])) {
                    return el[key];
                }
            }
            return [];
        })(el);

        if (!arr.length) {
            return;
        }

        var innerHTML = createConfigOptions(arr);
        var table = $("#" + el.componentId).find("table");
        table.html(innerHTML);
    });
}

function createConfigOptions(arr) {
    var str = "";
    var colCount = 5;
    var lineCount = Math.ceil(arr.length / colCount);
    for (var i = 0; i < lineCount; i++) {
        str += "<tr>";
        for (var j = 0; j < colCount; j++) {
            var index = (i * colCount) + j;
            var el = arr[index];
            if (el) {
                str += "<td>";
                str += '<input type="checkbox" id="' + el.tkId + '" componentId ="' + el.componentId + '" />';
                str += '<label for="' + el.tkId + '">' + el.tkLable + '</label>';
                str += "</td>";
            } else {
                str += "<td></td>";
            }
        }

        str += "</tr>";
    }
    return str;
}
