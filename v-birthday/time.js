var Time = {
    // 获取当前时间戳
    getUnix: function () {
        var date = new Date();
        return date.getTime();
    },
    // 获取今天0点0分0秒的时间戳
    getTodayUnix: function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年1月1日0点0分0秒的时间戳
    getYearUnix: function () {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准年月日
    getLastDate: function(time) {
        var date = new Date(time);
        var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        return date.getFullYear()+'-'+month+"-"+day;
    },
    // 转换时间
    getFormatTime: function(timestamp) {
        var now = this.getUnix();               //当前时间戳
        var timer = (now - timestamp) / 1000;   //转换为秒级时间戳
        var tip = '';
        tip = '已出生'+Math.ceil(timer/86400)+'天';
        return tip;
    }
};
Vue.directive('birthday', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
    },
    unbind: function (el) {
	}
});