<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌：</span>
                <span
                    class="list-control-filter-item"
                    :class="{on: filterBrand.includes(item)}"
                    v-for="item in brands"
                    @click="handleFilterBrand(item)">{{ item }}</span>
            </div>
            <div class="list-control-filter">
                <span>颜色：</span>
                <span
                    class="list-control-filter-item"
                    :class="{on: filterColor.includes(item)}"
                    v-for="item in colors"
                    @click="handleFilterColor(item)">{{ item }}</span>
            </div>
            <div class="list-control-order">
                <span>排序：</span>
                <span
                    class="list-control-order-item"
                    :class="{on: order === ''}"
                    @click="handleOrderDefault">默认</span>
                <span
                    class="list-control-order-item"
                    :class="{on: order === 'sales'}"
                    @click="handleOrderSales">
                    销量
                    <template v-if="order === 'sales'">↓</template>
                </span>
                <span
                    class="list-control-order-item"
                    :class="{on: order.indexOf('cost') > -1}"
                    @click="handleOrderCost">
                    价格
                    <template v-if="order === 'cost-asc'">↑</template>
                    <template v-if="order === 'cost-desc'">↓</template>
                </span>
            </div>
        </div>
        <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
        <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
    </div>
</template>
<script>
    import Product from '../components/product.vue';
    export default {
        components: { Product },
        computed: {
            list () {
                return this.$store.state.productList;
            },
            brands () {
                return this.$store.getters.brands;
            },
            colors () {
                return this.$store.getters.colors;
            },
            filteredAndOrderedList () {
                let list = [...this.list];
                // 按品牌过滤
                if (this.filterBrand.length !== 0) {
                    list = list.filter(item =>  this.filterBrand.includes(item.brand));
                }
                // 按颜色过滤
                if (this.filterColor.length !== 0) {
                    list = list.filter(item => this.filterColor.includes(item.color));
                }
                // 排序
                if (this.order !== '') {
                    if (this.order === 'sales') {
                        list = list.sort((a, b) => b.sales - a.sales);
                    } else if (this.order === 'cost-desc') {
                        list = list.sort((a, b) => b.cost - a.cost);
                    } else if (this.order === 'cost-asc') {
                        list = list.sort((a, b) => a.cost - b.cost);
                    }
                }
                return list;
            }
        },
        data () {
            return {
                filterBrand: [],
                filterColor: [],
                order: ''
            }
        },
        methods: {
            handleFilterBrand (brand) {
                //if (this.filterBrand === brand) {
                    //this.filterBrand = '';
                //} else {
                    //this.filterBrand = brand;
                //}
				if (this.filterBrand.find(branditem => branditem===brand)) {
					this.filterBrand = this.filterBrand.filter(function(item) {
					return item!==brand;
					});
				}else {
					this.filterBrand.push(brand);
				}
            },
            handleFilterColor (color) {
                //if (this.filterColor === color) {
                    //this.filterColor = '';
                //} else {
                    //this.filterColor = color;
                //}
				if (this.filterColor.find(coloritem => coloritem === color)) {
					this.filterColor = this.filterColor.filter(function(item) {
					return item!==color;
					});
				}else {
					this.filterColor.push(color);
				}
            },
            handleOrderDefault () {
                this.order = '';
            },
            handleOrderSales () {
                this.order = 'sales';
            },
            handleOrderCost () {
                if (this.order === 'cost-desc') {
                    this.order = 'cost-asc';
                } else {
                    this.order = 'cost-desc';
                }
            }
        },
        mounted () {
            this.$store.dispatch('getProductList');
			this.$store.commit('updateCartList');
        }
    }
</script>
<style scoped>
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>