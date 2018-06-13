<template>
    <div class="container">
        <div class="right-container">
            <leftmenu></leftmenu>
            <div class="top-menu">
                <span class="login-name">张阿三</span>
                <button class="y-info-button">退出</button>
            </div>
            <div class="bottom-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import leftmenu from './public/Leftmenu'
    export default {
        name: "Home",
        data(){
            return {
                
            }
        },
        components: {
            leftmenu
        },
        methods: {
            
        }
    }
</script>

<style scoped>
.container {
    position: relative;
    height: 100%;
}
.container .right-container {
    padding-left: 250px;
    height: 100%;
}
.container .right-container .top-menu {
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    text-align: right;
    background: #eef0f7;
    border-bottom: 1px solid #dcdee6;
}
.container .right-container .top-menu .login-name {
    padding-right: 20px;
}
.container .right-container .bottom-container {
    padding: 30px;
    height: calc(100% - 141px);
    overflow-y: scroll;
}
</style>
