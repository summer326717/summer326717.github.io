<template>
    <div class="ypagenation">
        <span v-if="currentpage==1"><</span>
        <span v-if="currentpage>1" @click="beforePage"><</span>
        <span v-for="i in indexs" :key="i" @click="toPage(i)">{{i}}</span>
        <span v-if="currentpage!=totalpage" @click="nextPage">></span>
        <span v-if="currentpage==totalpage">></span>
        <span>总共{{totalpage}}页</span>
        <input v-model="iptpage" type="text" placeholder="请输入页码数">
        <button @click="searchPage">查询</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            iptpage: '',
            currentpage: 1,
            totalpage: 10
        }
    },
    props: {
        cur: Number,
        all: Number
    },
    mounted(){
        this.currentpage = this.cur;
        this.totalpage = this.all;
    },
    methods: {
        beforePage(){
            this.currentpage--;
            this.iptpage = '';
        },
        toPage(i){
            this.currentpage = i;
            this.iptpage = '';
        },
        nextPage(){
            this.currentpage++;
            this.iptpage = '';
        },
        searchPage(){
            if (this.iptpage.trim() == '') {
                alert('请输入页码数');
                return;
            }
            if (isNaN(this.iptpage)) {
                alert('请输入正确的页码数');
                return;
            }
            if (parseInt(this.iptpage) > this.totalpage) {
                alert('输入的页码数不能大于总的页码数');
                return;
            }
            this.currentpage = parseInt(this.iptpage);
        }
    },
    watch:{
        currentpage(val,old){
            this.$emit('getpage',val);
        }
    },
    computed: {
        indexs: function() {
            var left = 1;
            var right = this.totalpage;
            var ar = [];
            if (this.totalpage >= 5) {
                if (this.currentpage > 3 && this.currentpage < this.totalpage - 2) {
                left = this.currentpage - 2;
                right = this.currentpage + 2;
                } else {
                if (this.currentpage <= 3) {
                    left = 1;
                    right = 5;
                } else {
                    right = this.totalpage;
                    left = this.totalpage - 4;
                }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        }
    }
}
</script>


<style scoped>
.ypagenation{
    font-size: 0;
    padding: 20px;
    text-align: right;
    user-select: none;
}
.ypagenation span {
    padding: 0px 15px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    display: inline-block;
    border-top: 1px solid #dcdee6;
    border-bottom: 1px solid #dcdee6;
    border-left: 1px solid #dcdee6;
    cursor: pointer;
}
.ypagenation input{
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border: 1px solid #dcdee6;
    vertical-align: top;
}
.ypagenation button{
    cursor: pointer;
    text-align: center;
    width: 42px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    vertical-align: top;
}
</style>
