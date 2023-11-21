var app = new Vue({
    el: '#app',
    data: {
		list:[
            {    
                title_name: '电子产品',
                content: [
                    {  id: 1,  name: '小米9',  price: 3099,  count: 9,  check: false,
                    },
                    {  id: 2,  name: '华为30',  price: 4888,  count: 1,  check: false,
                    },
                    {  id: 3,  name: 'Vivo20',  price: 3199,  count: 1,  check: false,
                    },
                ]
            },
            {
                title_name: '日常用品',
                content: [
                    {  id: 1,  name: '牙刷',  price: 88,  count: 1,  check: false,
                    },
                    {  id: 2,  name: '毛巾',  price: 58,  count: 1,  check: false,
                    },
                    {  id: 3,  name: '口杯',  price: 28,  count: 1,  check: false,
                    },
                ]
            },
            {
                title_name: '果蔬',
                content: [
                    {  id: 1,  name: '苹果',  price: 18,  count: 1,  check: false,
                    },
                    {  id: 2,  name: '香梨',  price: 8,  count: 1,  check: false,
                    },
                    {  id: 3,  name: '西红柿',  price: 2,  count: 1,  check: false,
                    },
                ]
            },
        ],
		checkAll: false
    },
    computed: {
        totalPrice: function () {
            var total = 0;
			for (var i = 0; i < this.list.length; i++) {
				var item = this.list[i].content;;
				for(var j = 0; j < item.length; j++) {
					if (item[j].check == true) {
						total += item[j].price * item[j].count;
					}
				}
			}
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        },
		totalGood: function () {
			var total = [];
			for (var i = 0; i < this.list.length; i++) {
				var item = this.list[i].content;
				for(var j = 0; j < item.length; j++) {
					if (item[j].check == true) {
						total.push(item[j].name + " * " + item[j].count);
					}
				}
			}
			return total;
		}
    },
    methods: {
        handleReduce: function (index1, index2) {
            if (this.list[index1].content[index2].count == 1) return;
            this.list[index1].content[index2].count--;
        },
        handleAdd: function (index1, index2) {
            this.list[index1].content[index2].count++;
        },
        handleRemove: function (index1, index2) {
            this.list[index1].content.splice(index2, 1);
        },
		handleChecked: function (index1, index2) {
			this.list[index1].content[index2].check = !this.list[index1].content[index2].check;
		},
		handleAllChecked: function() {
			if (this.checkAll === false) {
				for (var i = 0; i < this.list.length; i++) {
					var item = this.list[i].content;
					for(var j = 0; j < item.length; j++) {
						item[j].check = true;
					}
				}
				this.checkAll = true;
			}
			else if (this.checkAll === true) {
				for (var i = 0; i < this.list.length; i++) {
					var item = this.list[i].content;
					for(var j = 0; j < item.length; j++) {
						item[j].check = false;
					}
				}
				this.checkAll = false;
			}
		}
	}
});
