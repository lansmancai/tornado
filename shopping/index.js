var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1
            }
        ],
		chose: [],
		checkAll: false
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            for (var i = 0; i < this.chose.length; i++) {
                var item = this.chose[i];
                total+= item.price * item.count;
            }
            
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        },
		totalGood: function () {
			var total = [];
			for (var i = 0; i < this.chose.length; i++) {
                total.push(this.chose[i].name);
            }
			return total;
		}
    },
    methods: {
        handleReduce: function (index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
        },
		checkChange(){
            if(this.checkAll){
                this.chose = this.list
            } else{
                this.chose = []
            }
        }
    }
});
