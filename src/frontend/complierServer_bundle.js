import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, PageHeader } from 'antd';
import { HeaderBar } from './component/headerbar.js'
import { SideMenu  } from './component/sideMenu.js'
import { MissionList } from './component/missionList.js'
import { PublishPage } from './component/publish.js'
import { SepForm } from './component/sepform.js'
import { WeixunClientForm } from './component/weixunform.js'
import { SolutionForm} from "./component/solutionform.js"
import $ from 'jquery';

function getCookie(name)
{
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}


class RootContext extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            menuSelectedkey : "publish",
            path : [ "publish" ],
            title : "发布版本",
            isLogin : false,
            user : {
                result : -1,
                userid : "",
                username : "",
                isAdmin : false,
                subscribe: "",
            },
            dataSource : [
                {
                    name: "发布版本",
                    icon: "global",
                    key: "publish",
                    children: [],
                },
                {
                    name: "编译任务列表",
                    icon: "unordered-list",
                    key: "mission_list",
                    children: [],
                },
                {
                    name: "新建编译任务",
                    icon: "plus-circle",
                    key: "sub_newmission",
                    children: [
                        {
                            name: "新建SEP任务",
                            icon: "",
                            key: "new_sep",
                            children: [],
                        },
                        {
                            name: "新建WeixunClient任务",
                            icon: "",
                            key: "new_weixun",
                            children: [],
                        },
                        {
                            name: "新建整合包任务",
                            icon: "",
                            key: "new_solution",
                            children: [],
                        }
                    ]
                }
            ]
        }
    }

    onMenuSelectChange(key, path, title){
        var state = {menuSelectedkey : key, path : path, title : title};
        console.log(state);
        this.setState(state);
    }

    onSaveRef(ref) {
        this.sideMenu = ref;
    }

    jumpToMissionList() {
        this.sideMenu.jumpToKey("mission_list");
    }

    getTable() {
        if (this.state.menuSelectedkey == "publish") {
            return (<PublishPage/>)
        } else if (this.state.menuSelectedkey == "mission_list") {
            return (<MissionList/>);
        } else if (this.state.menuSelectedkey == "new_sep") {
            return (<SepForm jumpToMissionList={this.jumpToMissionList.bind(this)}/>);
        } else if (this.state.menuSelectedkey == "new_weixun") {
            return (<WeixunClientForm jumpToMissionList={this.jumpToMissionList.bind(this)}/>);
        } else if (this.state.menuSelectedkey == "new_solution") {  
            return (<SolutionForm jumpToMissionList={this.jumpToMissionList.bind(this)}/>);
        } else {  
            return (<div></div>);
        }
    }

    getTitle() {
        return (
            <div>
                <PageHeader title={this.state.title}/>
            </div>
        );
    }

    componentWillMount() {
        var userid = getCookie("userid");
        if (userid == null) {
            this.setState({isLogin : false});
            window.location.href = "./Signin.html"
        }

        var user = null;

        $.ajax({
            type: "get",
            url:  "user/check",
            contentType: "application/json",
            async: false,
            success: (data, status) => {
                if (status == "success") {
                    if (data.result == 0) {
                        user = data;
                        console.log("ajax ok");
                    } else {
                        console.log("ajax failed");
                    }
                }
            }
        });

        if (user != null) {
            this.setState({ user : data });
        } else {
            window.location.href = "./Signin.html"
        }
    }

    render() {
        var height = $(window).height() - 64;
        return (
            <Layout>
                <HeaderBar title="编译服务平台" userlogin={true}/>
                <Layout>
                    <SideMenu dataSource={this.state.dataSource}
                        menuSelectedChange={this.onMenuSelectChange.bind(this)}
                        defaultSelectedKeys={this.state.menuSelectedkey}
                        onSaveRef={this.onSaveRef.bind(this)}/>
                    <Layout>
                        <Layout.Content style={{background: '#fff', paddingLeft: 24, paddingRight: 24, margin: 0, minHeight: height,}}>
                            {this.getTitle()}
                            {this.getTable()}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(
    <RootContext/>,
    document.getElementById("root")
);