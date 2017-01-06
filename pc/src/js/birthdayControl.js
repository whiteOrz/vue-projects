function datademo(opt, callback) {

    var currentTime = opt.currentDate.split(" ")[0];

    if ("PRESELL" == opt.sale_mode) { //预售时间
        currentTime = opt.startDate.split(" ")[0];
        opt.maxdate.d = -30;
        opt.mindate.d = 1;
    }

    var maxDate; //30天前
    var minDate; //最大不能大于或等于14岁，这是到这个日期的天数
    var startDate;

    currentTime = currentTime.replace(new RegExp('-', 'gm'), '/');
    minDate = new Date(currentTime);
    maxDate = new Date(currentTime);
    startDate = new Date(currentTime);

    var minDateString = '';
    var maxDateString = '';
    var startDateString = '';

    if (opt.min) {
        minDateString = opt.min;
    } else {
        if (opt.mindate && opt.mindate.y) {
            minDate.setFullYear(minDate.getFullYear() + opt.mindate.y);
        }
        if (opt.mindate && opt.mindate.m) {
            minDate.setFullYear(minDate.getMonth() + opt.mindate.m);
        }
        if (opt.mindate && opt.mindate.d) {
            minDate.setDate(minDate.getDate() + opt.mindate.d);
        }
        minDateString = newDate(minDate);
    }

    if (opt.max) {
        maxDateString = opt.max;
    } else {
        if (opt.maxdate && opt.maxdate.y) {
            maxDate.setFullYear(maxDate.getFullYear() + opt.maxdate.y);
        }
        if (opt.maxdate && opt.maxdate.m) {
            maxDate.setFullYear(maxDate.getMonth() + opt.maxdate.m);
        }
        if (opt.maxdate && opt.maxdate.d) {
            maxDate.setDate(maxDate.getDate() + opt.maxdate.d);
        }
        maxDateString = newDate(maxDate);
    }

    if (opt.startdate) {
        if (opt.startdate.y) {
            startDate.setFullYear(startDate.getFullYear() + opt.startdate.y);
        } else {
            startDate.setFullYear(startDate.getFullYear() + 0);
        }
        if (opt.startdate.m) {
            startDateString += startDate.getFullYear() + '-' + opt.startdate.m;
        } else {
            startDateString += startDate.getFullYear() + '-05';
        }
        if (opt.startdate.d) {
            startDateString += '-' + opt.startdate.d;
        } else {
            startDateString += '-01';
        }
    } else {
        startDate.setDate(startDate.getDate() + 1);
        startDateString = newDate(startDate);
    }

    laydate.skin('default');
    laydate({
        elem: opt.id,
        min: minDateString, //-1代表昨天，-2代表前天，以此类推
        max: maxDateString, //+1代表明天，+2代表后天，以此类推
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true, //显示节日
        start: startDateString,
        choose: function(data) { //选择日期完毕的回调
            //调用点击日历控件按钮后的操作
            $(opt.id).attr('date', data);
            $(opt.id).val(data);
            $(opt.id).blur();
            callback();
        }
    });
}
