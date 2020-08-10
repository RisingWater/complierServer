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
import { AKSuitForm} from "./component/aksuitform.js"
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
            guest : true,
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
                    needAdmin: false,
                    children: [],
                },
                {
                    name: "编译任务列表",
                    icon: "unordered-list",
                    key: "mission_list",
                    needAdmin: true,
                    children: [],
                },
                {
                    name: "新建编译任务",
                    icon: "plus-circle",
                    key: "sub_newmission",
                    needAdmin: true,
                    children: [
                        {
                            name: "新建SEP任务",
                            icon: "",
                            key: "new_sep",
                            needAdmin: true,
                            children: [],
                        },
                        {
                            name: "新建WeixunClient任务",
                            icon: "",
                            key: "new_weixun",
                            needAdmin: true,
                            children: [],
                        },
                        {
                            name: "新建AK三件套任务",
                            icon: "",
                            key: "new_aksuit",
                            needAdmin: true,
                            children: [],
                        },
                        {
                            name: "新建整合包任务",
                            icon: "",
                            key: "new_solution",
                            needAdmin: true,
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
            return (<PublishPage user={this.state.user} reload_user={this.reload_user.bind(this)}/>)
        } else if (this.state.menuSelectedkey == "mission_list") {
            return (<MissionList/>);
        } else if (this.state.menuSelectedkey == "new_sep") {
            return (<SepForm jumpToMissionList={this.jumpToMissionList.bind(this)} user={this.state.user}/>);
        } else if (this.state.menuSelectedkey == "new_weixun") {
            return (<WeixunClientForm jumpToMissionList={this.jumpToMissionList.bind(this)} user={this.state.user}/>);
        } else if (this.state.menuSelectedkey == "new_solution") {  
            return (<SolutionForm jumpToMissionList={this.jumpToMissionList.bind(this)} user={this.state.user}/>);
        } else if (this.state.menuSelectedkey == "new_aksuit") {
            return (<AKSuitForm jumpToMissionList={this.jumpToMissionList.bind(this)} user={this.state.user}/>);
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

    reload_user() {
        var userid = getCookie("userid");
        var user = null;

        if (userid == null) {
            return null;
        }

        var json = JSON.stringify({
            userid : userid,
        })

        console.log(json);

        $.ajax({
            type: "post",
            url:  "user/check",
            contentType: "application/json",
            data: json,
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
            this.setState({ user : user });
            if (user.username == "guest") {
                this.setState({ guest : true});
            } else {
                this.setState({ guest : false});
            }
        }

        return user;
    }

    componentWillMount() {
        var user = this.reload_user();

        if (user == null) {
            window.location.href = "./user_operation.html?op=login"
        }
    }

    render() {
        var height = $(window).height() - 64;
        return (
            <Layout>
                <HeaderBar title="编译服务平台" user={this.state.user}/>
                <Layout>
                    <SideMenu dataSource={this.state.dataSource}
                        menuSelectedChange={this.onMenuSelectChange.bind(this)}
                        defaultSelectedKeys={this.state.menuSelectedkey}
                        onSaveRef={this.onSaveRef.bind(this)}
                        isAdmin={this.state.user.isAdmin}/>
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