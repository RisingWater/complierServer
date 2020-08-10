import React from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Collapse, Button, Input, Tag, Avatar } from 'antd';
import { ComplierOptionTag } from './complierOptionTag.js'
import $ from 'jquery';

export class AKSuitClientMissionCheckContent  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
            platform : "",
            arch : "",
            os : "",
            complier_option : 0,
            mission_includes : "",
            mission_defines : "",
            mission_script : ""
        };
    }
    
    RefreshDataSource() {
        $.ajax({
            type: "get",
            url:  "/path/" + this.props.software + "/list",
            contentType: "application/json",
            success: (data, status) => {
                if (status == "success") {
                    console.log("fuck success");
                    this.setState({ dataSource : data.platform });
                    this.InitWithplatform(data.platform);
                }
            }
        });
    }

    InitWithplatform(dataSource) {
        var node = dataSource;

        node.some(item => {
            if (item.name == this.props.complier_option.platform_values[0]) {
                node = item.children;
                this.setState({platform: item.description});
                return true;
            }
        });
            
        node.some(item => {
            if (item.name == this.props.complier_option.platform_values[1]) {
                node = item.children;
                console.log(item.description);
                this.setState({arch: item.description});
                return true;
            }
        });

        node.some(item => {
            if (item.name == this.props.complier_option.platform_values[2]) {
                node = item.children;
                console.log(item.description);
                this.setState({os: item.description});
                return true;
            }
        }); 
    }

    componentDidMount() {
        this.RefreshDataSource();

        var complier_option = this.BitmapArrayToInt(this.props.complier_option.complier_option);

        console.log("complier_option: " + complier_option);

        this.setState({
            complier_option : complier_option
        })
    }

    BitmapArrayToInt(array) {
        var option = 0;
        array.every((element) => {
            option += (1 << parseInt(element));
            return true;
        })

        return option;
    }

    GetLinuxBuildString()
    {   
        var Option = "";
        
        Option += " -v " + this.props.complier_option.version;
        Option += " -sv " + this.props.complier_option.svn_version;
        
        Option += (" " + this.props.complier_option.platform_node.param);

        if ((this.state.complier_option & 0x1) == 0)
        {
            Option += " -norebuild";
        }

        var env_set = "";

		//Ubuntu 18.04 X86_64
		if((this.props.complier_option.platform_node.param.indexOf("-national -arch x86_64 -os ubuntu18.04") != -1) )
        {
            return ("#! /bin/bash\r\n"
               +"export LC_CTYPE=\"zh_CN.UTF-8\"\r\n"
               + env_set
               +"docker exec wangxu /bin/bash -c \"cd  " + this.props.complier_option.codepath
               + " && ./onebuild.sh"
               + Option
               + "\"\r\n"
               );
        }
		//Ubuntu 16.04 aarch64
		if((this.props.complier_option.platform_node.param.indexOf("-national -arch aarch64 -os ubuntu16.04") != -1) )
        {
            return ("#! /bin/bash\r\n"
               +"export LC_CTYPE=\"zh_CN.UTF-8\"\r\n"
               + env_set
               +"docker exec wangxu /bin/bash -c \"cd  " + this.props.complier_option.codepath
               + " && echo centerm | sudo -S ./chroot_build.sh"
               + Option
               + "\"\r\n"
               );
        }
		//Ubuntu 18.04 aarch64
		if((this.props.complier_option.platform_node.param.indexOf("-national -arch aarch64 -os ubuntu18.04") != -1) )
        {
            return ("#! /bin/bash\r\n"
               +"export LC_CTYPE=\"zh_CN.UTF-8\"\r\n"
               + env_set
               +"docker exec wangxu /bin/bash -c \"cd  " + this.props.complier_option.codepath
               + " && echo centerm | sudo -S ./chroot_build.sh"
               + Option
               + "\"\r\n"
               );
        }

        		
		//Ubuntu 18.04 mips64el
		if((this.props.complier_option.platform_node.param.indexOf("-national -arch mips64el -os ubuntu18.04") != -1) )
        {
            return ("#! /bin/bash\r\n"
               +"export LC_CTYPE=\"zh_CN.UTF-8\"\r\n"
               + env_set
               +"docker exec wangxu /bin/bash -c \"cd  " + this.props.complier_option.codepath
               + " && echo centerm | sudo -S ./chroot_build.sh"
               + Option
               + "\"\r\n"
               );
        }

        return ("#! /bin/bash\r\n"
               +"export LC_CTYPE=\"zh_CN.UTF-8\"\r\n"
               + env_set
               +"cd  " + this.props.complier_option.codepath + "\r\n"
               + "./onebuild.sh"
               + Option
               + "\r\n"
               );
    }

    getCollapse() {
        return (
            <Collapse>
                <Collapse.Panel header="生成的编译脚本" key="1">
                    <Input.TextArea readonly="true" style={{height: 200}}>
                        {this.GetLinuxBuildString()}
                    </Input.TextArea>
                </Collapse.Panel>
            </Collapse>
        );       
    }

    add_mission() {
        var path = "";
        var server_addr = "";
        var username = "";
        var password = "";

        const {complier_option, complier_module} = this.props;

        console.log("add_mission");
        path += "AKSuit@";

        path += (complier_option.platform_values[0] 
             + "_" + complier_option.platform_values[1]
             + "_" + complier_option.platform_values[2]);
            
        server_addr = complier_option.platform_node.server_address;
        username = complier_option.platform_node.username;
        password = complier_option.platform_node.password;
        
        console.log(path);
       
        var json = JSON.stringify({
            path : path,
            version : complier_option.version,
            svn_version : complier_option.svn_version,
            desc: complier_module.readme,
            buildMap: this.state.complier_option,
            mailto: "",
            codepath : complier_option.codepath,
            server_addr : server_addr,
            username : username,
            password : password,
            script : complier_option.platform_node.script,
            filedata_readme : "",
            filedata_define : this.GetServerdefineString(),
            filedata_include : this.GetIncludeDefineString(),
            filedata_linuxbuild : this.GetLinuxBuildString(),
        })

        console.log(json);
        $.ajax({
            type: "post",
            url:  "/mission/add",
            contentType: "application/json",
            data: json,
            success: (data, status) => {
                if (status == "success") {
                    this.props.onSubmit() 
                }
            }
        });
    }

    render() {
        const {complier_option, complier_module, oem_option} = this.props;
        
        return (
            <div>
                <div className="mission_from">
                    <Descriptions title="任务信息" bordered layout="vertical">
                        <Descriptions.Item label="平台">{this.state.platform}</Descriptions.Item>
                        <Descriptions.Item label="CPU架构">{this.state.arch}</Descriptions.Item>
                        <Descriptions.Item label="操作系统">{this.state.os}</Descriptions.Item>

                        <Descriptions.Item label="SVN版本号">{complier_option.svn_version}</Descriptions.Item>
                        <Descriptions.Item label="编译版本号">{complier_option.version}</Descriptions.Item>
                        <Descriptions.Item label="编译选项">{<ComplierOptionTag option={this.state.complier_option}/>}</Descriptions.Item>

                        <Descriptions.Item label="远程编译服务器">{complier_option.platform_node.server_address}</Descriptions.Item>
                        <Descriptions.Item label="编译脚本">{complier_option.platform_node.script}</Descriptions.Item>
                        <Descriptions.Item label="代码路径">{complier_option.codepath}</Descriptions.Item>

                        <Descriptions.Item label="备注" span={3}>{complier_module.readme}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div className="mission_from">
                    {this.getCollapse()}
                </div>
                <div>
                    <Button style={{ marginRight: 8 }} onClick={() => { this.props.OnBackClick() }}>上一步</Button>
                    <Button type="primary" onClick={() => { 
                        this.add_mission();
                    }}>添加任务</Button>
                </div>
            </div>
        )
    }
}