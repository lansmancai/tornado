function isValueNumber (value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}

Vue.component('input-number', {
    template: '\
        <div class="input-number"> \
            <input \
                type="text" \
                :value="currentValue" \
                @change="handleChange" \
				@keyup.up="handleUp" \
				@keyup.down="handleDown" > \
            <button \
                @click="handleDown" \
                :disabled="currentValue <= min">-</button> \
            <button \
                @click="handleUp" \
                :disabled="currentValue >= max">+</button> \
        </div>',
    props: {
        max: {
            type: Number,
			default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        },
		step: {
			type: Number,
			default: 1
		}	
    },
    data: function () {
		var val = this.value;
        if (val > this.max) val = this.max;
        if (val < this.min) val = this.min;

        return {
            currentValue: val
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
		handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue+= this.step;
        },
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();

            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;

                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        }
    }
});
