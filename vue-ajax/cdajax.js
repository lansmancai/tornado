const install = function (Vue) {
    const Cajax = new Vue({
        methods: {
            ajax (options){
				var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
				var str = "";
				for(var key in options.data){
					str+="&"+key+"="+options.data[key];
				}
				str = str.slice(1);
				if(options.type === "get"){
					var url = options.url+"?"+str;
					xhr.open("get",url);
					xhr.send();
				}else if(options.type === "post"){
					xhr.open("post",options.url);
					xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
					xhr.send(str)
				}
				xhr.onreadystatechange = function(){
				//当请求成功的时候
				if(xhr.readyState === 4 && xhr.status === 200){
					var d = xhr.responseText;
					//将请求的数据传递给成功回调函数
					options.success&&options.success(d)
				}else if(xhr.status !== 200){
					//当失败的时候将服务器的状态传递给失败的回调函数
					options.error&&options.error(xhr.status);
				}
				}
            }
        }
    });
    Vue.prototype.$ajax = Cajax;
};
export default install;