<template>
    <div class="left-menu">
        <p class="menu-title">Delicious</p>
        <ul>
            <li v-for="(item,i) in menuList" :key="i">
                <a @click="openMenu(i,item.menuItem.length)">{{item.menuName}}<i v-if="item.menuItem.length > 0" class="i-arrow"></i></a>
                <div class="second-menu">
                    <router-link v-for="(seconditem,index) in item.menuItem" :key="index" :to="seconditem.menuLink">{{seconditem.menuName}}</router-link>
                </div>
            </li>            
        </ul>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            menuList: [
                {
                    menuName: '组件规范',
                    menuItem: [
                        {
                            menuName: 'DemoPage',
                            menuLink: '/DemoPage'
                        },
                        {
                            menuName: 'HomePage',
                            menuLink: '/HomePage'
                        },
                        {
                            menuName: 'HomePage',
                            menuLink: '/HomePage'
                        },
                        {
                            menuName: 'HomePage',
                            menuLink: '/HomePage'
                        },
                        {
                            menuName: 'HomePage',
                            menuLink: '/HomePage'
                        },
                        {
                            menuName: 'HomePage',
                            menuLink: '/HomePage'
                        }
                    ]
                },
                {
                    menuName: '用户管理',
                    menuItem: [
                        {
                            menuName: 'UserManage',
                            menuLink: '/UserManage'
                        }
                    ]
                },
                {
                    menuName: '代理人管理',
                    menuItem: [
                        {
                            menuName: 'AgentManage',
                            menuLink: '/AgentManage'
                        }
                    ]
                },
                {
                    menuName: '财务管理',
                    menuItem: [
                        {
                            menuName: 'FinanceManage',
                            menuLink: '/FinanceManage'
                        }
                    ]
                },
                {
                    menuName: '系统管理',
                    menuItem: [
                        {
                            menuName: 'SystemManage',
                            menuLink: '/SystemManage'
                        }
                    ]
                }               
            ]
        }
    },
    mounted() {
        let element = document.getElementsByClassName('router-link-active')[0];
        if (element) {
            let h = element.parentElement.children[0].clientHeight;
            let count = element.parentElement.childElementCount;
            element.parentElement.style.height = h * count + 'px';
            element.parentNode.previousElementSibling.children[0].style.transform = 'rotate(-180deg)';
        }
    },
    methods: {
        openMenu(i,totalnum){
            if (totalnum > 0) {
                let height = document.getElementsByClassName('second-menu')[i].children[0].clientHeight;
                let num = document.getElementsByClassName('second-menu')[i].children.length;
                let parentHeight = document.getElementsByClassName('second-menu')[i].clientHeight;            
                if (parentHeight == 0) {
                    document.getElementsByClassName('i-arrow')[i].style.transform = 'rotate(-180deg)';
                    document.getElementsByClassName('second-menu')[i].style.height = (height * num) + 'px';
                } else {
                    document.getElementsByClassName('i-arrow')[i].style.transform = '';
                    document.getElementsByClassName('second-menu')[i].style.height = '0px';
                }
            } else {
                console.log('没有二级菜单');
            }                        
        }
    },
    computed: {
        // 当前路由名称
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    }
}
</script>


<style>
.container .left-menu {
    position: absolute;
    width: 250px;
    height: 100%;
    top: 0;
    left: 0;
    background: #555a79;    
}
.container .left-menu .menu-title{
    text-align: center;
    color: #555a79;
    height: 80px;
    line-height: 80px;
    background: #eef0f7;
    font-size: 3em;
    font-family: 'Pirata One', cursive;
}
.container .left-menu ul {
    overflow-y: scroll;
    height: calc(100% - 80px);
}
.container .left-menu ul::-webkit-scrollbar{
    display: none;
}
.container .left-menu ul::-webkit-scrollbar-track{
    display: none;
}
.container .left-menu ul::-webkit-scrollbar-thumb{
    display: none;
}
.container .left-menu ul li a {
    padding-left: 20px;
    color: #dadae8;
    height: 56px;
    line-height: 56px;
    display: block;
    transition: all 0.4s ease-in-out;
}
.container .left-menu ul li a:hover {
    color: #ffffff;
    background-color: #484d69;
    box-shadow: 3px 0 0 #ffffff inset;
}
.container .left-menu ul li .i-arrow {
    float: right;
    width: 16px;
    height: 16px;
    margin: 20px 20px 0 0;
    background: url('../../assets/menu-open.png') no-repeat 90% 50%;
    background-size: 16px 16px;
    transition: transform 0.4s ease-in-out;
}
.container .left-menu .second-menu{
    height: 0;
    overflow: hidden;
    transition: height 0.4s ease-in-out;
}
.container .left-menu .second-menu a{
    padding-left: 40px;
}
</style>
