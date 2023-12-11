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
    getAge: function(days) {
		var datenow = new Date();
		var today = [datenow.getFullYear(), datenow.getMonth() + 1, datenow.getDate()];
		var datebirth = new Date(datenow - days*24*60*60*1000);
		var birthday = [datebirth.getFullYear(), datebirth.getMonth() + 1, datebirth.getDate()];
		var age = today.map((value, index) => { return value - birthday[index];});
		if (age[2] < 0) {
		  var lastMonth = new Date(today[0], today[1], 0);
		  age[1]--;
          age[2] += lastMonth.getDate();
		}
		if (age[1] < 0) {
			age[0]--;
			age[1] += 12;
		}
		var tip = '';
		tip = '已出生'+age[0]+'年'+age[1]+'月'+age[2]+'天';
		return tip;
		
    }
};
Vue.directive('ymd', {
    bind: function (el, binding) {
        el.innerHTML = Time.getAge(binding.value);
    },
    unbind: function (el) {
	}
});