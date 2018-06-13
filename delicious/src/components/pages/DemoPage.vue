<template>
    <div class="index">
        <div class="flex-item">
            <button class="y-info-button">info</button>
            <button class="y-normal-button">normal</button>
            <button class="y-warn-button">warn</button>
        </div>
        <div class="flex-item">
            <button class="y-info-button" @click="clickMethod">加载</button>
            <yloading v-if='isShowLoading'></yloading>
        </div>
        <div class="flex-item">
            <span>{{addressItem.address}}{{addressItem.title}}</span>
            <button @click="selectAddr">选择地址</button>
            <ydialog v-if="isShowMap">
                <!-- solt插槽，用于组件内容分发，在父组件中放入已被 `slot` 标记的内容，
                这些内容的顺序可以随意。之后这些内容被分发到子组件的特殊元素 `slot` 
                中，根据 `name` 属性在子组件中重新组合。 -->
                <ybaidumap @baidumap='getAddress'></ybaidumap>
            </ydialog>
        </div>
        <div class="flex-item">
            <ypagenation :cur='cur' :all='total' @getpage='getpage'></ypagenation>
        </div>
        <div class="flex-item">
            <ytable></ytable>
        </div>
    </div>
</template>

<script>
import yloading from '../common/Yloading'
import ydialog from '../common/Ydialog'
import ybaidumap from '../common/Ybaidumap'
import ypagenation from '../common/Ypagenation'
import ytable from '../common/Ytable'
export default {
    data() {
        return {
            isShowLoading: false,
            isShowMap: false,
            addressItem: '',
            total: 10,
            cur: 1
        }
    },
    components: {
        yloading,
        ydialog,
        ybaidumap,
        ypagenation,
        ytable
    },
    methods: {
        selectAddr(){
            this.isShowMap = true;
        },
        getAddress(item){
            this.isShowMap = false;
            this.addressItem = item;
            console.log(item);
        },
        clickMethod() {
            this.isShowLoading = true;
            setTimeout(() => {
                this.isShowLoading = false;
            }, 3000);
        },
        getpage(i){
            console.log(i);//打印页码数
        }
    }
}
</script>

<style>
.flex-item{
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    border: 1px solid #dedede;
    box-shadow: 0 0 10px #dedede;
}
</style>
