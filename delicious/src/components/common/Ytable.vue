<template>
    <div class="ytable">
        <table>
            <tr>
                <th>名称</th>
                <th>名称</th>
                <th>名称</th>
                <th>名称</th>
                <th>名称</th>
                <th>名称</th>
                <th>名称</th>
                <th>名称</th>
            </tr>
            <tr v-for="(item,i) in dataList" :key="i">
                <td><div>内容内容内容内容内容内容内容内容</div></td>
                <td><div>内容容</div></td>
                <td><div>内容容内容</div></td>
                <td><div>内容内容内容</div></td>
                <td><div>内容内容内容内容</div></td>
                <td><div>内容容内容</div></td>
                <td><div>内容内容容内容内容</div></td>
                <td><div>内容内容内容内容内内容</div></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Ytable',
    data(){
        return {
            dataList: [1,2,3,4,5,1,2,3,4,5]
        }
    }
}
</script>


<style>
.container .right-container .bottom-container .ytable table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border: 1px solid #dcdee6;
}
.container .right-container .bottom-container .ytable table th {
    font-weight: normal;
    padding: 12px 0;
    line-height: 26px;
    background: #eef0f7;
}
.container .right-container .bottom-container .ytable table td{
    height: 46px;
    line-height: 46px;
    border-top: 1px solid #dcdee6;
}
</style>
