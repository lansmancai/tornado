<template>
    <div>
	    <button @click="handleClick">用力</button>
    </div>
</template>
<script>
    export default {
	        methods: {
            handleClick (e) {
				this.$ajax.ajax({
					type:'get',
					url:'http://localhost/p.php',
					data:{},
					success:function (data) {
						console.log(data)
					}
				})
            }
        } 
    }
</script>