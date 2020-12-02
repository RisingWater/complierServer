import React from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Collapse, Button, Input, Tag, Avatar } from 'antd';
import { ComplierOptionTag } from './complierOptionTag.js'
import $ from 'jquery';

export class WeixunClientMissionCheckContent  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
            isWindows : true,
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
        if (this.props.complier_option.platform_values[0] != 'Windows') {
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
            
            this.setState({
                isWindows : false
            });
        } else {
            this.setState({
                isWindows : true,
                platform : "Windows平台",
                arch : "x86 32位与64位指令集",
                os : "Windows操作系统",
            })
        }
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

    GetServerdefineString()
    {
        if (!this.state.isWindows) {
            return "";
        }

        return ("#define SVN_VERSION\t\t\t" + this.props.complier_option.svn_version + "\r\n"
            + "; 服务器\r\n"
            + "#if NEPTUNESERVER\r\n"
            + "; 版本号\r\n"
            + "; 编译出来的安装包名字\r\n"
            + "#define MyAppName \"ViServer\"\r\n"
            + "#define MyAppVersion \"" + this.props.complier_option.version + "\"\r\n"
            + "#define MyAppExeName \"ViServer.exe\"\r\n"
            + "\r\n"
            + "#define UUID \"{5E3C4D90-5CED-4044-A1C6-7CCBBFBAC526}\"\r\n"
            + "#endif\r\n"
            + "\r\n"
            + "; 客户端\r\n"
            + "#if NEPTUNECLIENT\r\n"
            + "; 版本号\r\n"
            + "; 编译出来的安装包名字\r\n"
            + "#define MyAppName \"ViClient\"\r\n"
            + "#define MyAppVersion \"" + this.props.complier_option.version + "\"\r\n"
            + "#define MyAppExeName \"ViClient.exe\"\r\n"
            + "\r\n"
            + "#define UUID \"{9FB17268-DBD5-4B7C-8EEF-DCA48D852755}\"\r\n"
            + "#endif\r\n"
            + "\r\n"
            + "#define MyAppPublisher \"Centerm Information Co., Ltd.\"\r\n"
            + "#define MyAppURL \"http://www.centerm.com.cn\"\r\n"
            + "\r\n"
            + "#define SBC_MODE\t\t\t\t1\r\n"
            + "#define VDI_MODE\t\t\t\t1\r\n"
            + "#define CREDENTIALS_PROVIDER\t\t\t\t1\r\n"
            + "\r\n"
            + "#define AD_OPTION\t\t\t\t0\r\n"
            + "#define WATERMARK_OPTION\t\t\t\t0\r\n" 
            + "\r\n");
    }

    GetIncludeDefineString()
    {
        if (!this.state.isWindows) {
            return "";
        }

        return "#pragma once\r\n"
             + "#ifndef __COMPILER_DEFINE_H__\r\n"
             + "#define __COMPILER_DEFINE_H__\r\n\r\n"
             + "\r\n"
             + "#endif\r\n\r\n";
    }

    GetLinuxBuildString()
    {
        if (this.state.isWindows) {
            return "";
        }
        
        var forserver = false;
        if (this.props.complier_module.packages.indexOf("0") > -1) {
            forserver = true;
        }

        var Option = "";
        if (forserver) {
            Option += " -n ViServer";
        } else {
            Option += " -n ViClient";
        }
        Option += " -v " + this.props.complier_option.version;
        Option += " -sv " + this.props.complier_option.svn_version;
        
        Option += (" " + this.props.complier_option.platform_node.param);

        if ((this.state.complier_option & 0x1) == 0)
        {
            Option += " -norebuild";
        }

        if (forserver) {
            Option += " -forserver";
        } else {
            Option += "  -noAd -defaultCT 1 -defaultPT 0 -titlebar";
        }
		
		if(this.props.oem_option.oem_enable)
		{
			Option += " -oem";
			if(this.props.oem_option.vendor_name != "")
			{
				Option += " -oem_vendor " + this.props.oem_option.vendor_name;
			}
			
			if(this.props.oem_option.product_name != "")
			{
				Option += " -oem_product " + this.props.oem_option.product_name;
			}
			
			if(this.props.oem_option.copyright != "")
			{
				Option += " -oem_copyright " + this.props.oem_option.copyright;
			}
			if(this.props.oem_option.icon != "")
			{
				Option += " -oem_logo http://192.168.12.127/" + this.props.oem_option.icon;
			}
			
		}
		
        
        var env_set = "";
        if (this.props.complier_option.platform_node.server_address == "192.168.12.124") {
            env_set = ". ~/.bash_profile\r\n";
        }

        if((this.props.complier_option.platform_node.param.indexOf("-C91") != -1) ||
            (this.props.complier_option.platform_node.param.indexOf("-C10V3") != -1) )
        {
            return ("#! /bin/bash\r\n"
               +"export LC_CTYPE=\"zh_CN.UTF-8\"\r\n"
               + env_set
               +"docker exec c91-armhf /bin/bash -c \"cd  " + this.props.complier_option.codepath
               + " && ./onebuild.sh"
               + Option
               + "\"\r\n"
               );
        }
		//COS 18.04 X86_64
		if((this.props.complier_option.platform_node.param.indexOf("-arch x86_64 -os cos") != -1) )
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
		
		//Ubuntu 16.04 mips64el
		if((this.props.complier_option.platform_node.param.indexOf("-national -arch mips64el -os ubuntu16.04") != -1) )
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
        if (this.state.isWindows) {
            return (
                <Collapse>
                    <Collapse.Panel header="生成的头文件" key="1">
                        <Input.TextArea readonly="true" style={{height: 200}}>
                            {this.GetIncludeDefineString()}
                        </Input.TextArea>
                    </Collapse.Panel>
                    <Collapse.Panel header="生成的定义文件" key="2">
                        <Input.TextArea readonly="true" style={{height: 300}}>
                            {this.GetServerdefineString()}
                        </Input.TextArea>
                    </Collapse.Panel>
                </Collapse>
            )
        } else {
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
    }

    getModuleTag(packages) {
        return (
            packages.map((element) => {
                console.log(element);
                if (element == "0") {
                    return (<Tag color="blue">服务端</Tag>);
                } else if (element == "1") {
                    return (<Tag color="green">客户端</Tag>);
                }
            })
        )
    }

    add_mission() {
        var forserver = false;
        if (this.props.complier_module.packages.indexOf("0") > -1) {
            forserver = true;
        }
        
        var path = "";
        var server_addr = "";
        var username = "";
        var password = "";

        const {complier_option, complier_module} = this.props;

        console.log("add_mission");

        if (this.state.isWindows) {
            path = "Weixun@"
            path += complier_option.platform_values[0];
        } else {
            if (forserver) {
                path += "WeixunServer@";
            } else {
                path += "WeixunClient@";
            }

            path += (complier_option.platform_values[0] 
                + "_" + complier_option.platform_values[1]
                + "_" + complier_option.platform_values[2]);
            
            server_addr = complier_option.platform_node.server_address;
            username = complier_option.platform_node.username;
            password = complier_option.platform_node.password;
        } 

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
        
        var forserver = false;
        if (complier_module.packages.indexOf("0") > -1) {
            forserver = true;
        }

        return (
            <div>
                <div className="mission_from">
                    <Descriptions title="任务信息" bordered layout="vertical">
                        <Descriptions.Item label="平台">{this.state.platform}</Descriptions.Item>
                        <Descriptions.Item label="CPU架构">{this.state.arch}</Descriptions.Item>
                        <Descriptions.Item label="操作系统">{this.state.os}</Descriptions.Item>

                        <Descriptions.Item label="SVN版本号">{complier_option.svn_version}</Descriptions.Item>
                        <Descriptions.Item label="编译版本号" span={2}>{complier_option.version}</Descriptions.Item>

                        <Descriptions.Item label="安装包类型">{this.getModuleTag(complier_module.packages)}</Descriptions.Item>
                        <Descriptions.Item label="编译选项" span={2}>{<ComplierOptionTag option={this.state.complier_option}/>}</Descriptions.Item>

                        <Descriptions.Item label="是否位OEM版本">{oem_option.oem_enable ? <Tag color="red">是</Tag> : <Tag color="blue">否</Tag>}</Descriptions.Item>
                        <Descriptions.Item label="OEM图标" span={2}><Avatar shape="square" size={32} src={oem_option.oem_enable ? oem_option.icon : "./image/weixunclient.png"} /></Descriptions.Item>

                        <Descriptions.Item label="OEM厂家名称">{oem_option.oem_enable ? oem_option.vendor_name : "Centerm"}</Descriptions.Item>
                        <Descriptions.Item label="OEM产品名称">{oem_option.oem_enable ? oem_option.product_name : forserver ? "WeixunServer" : "WeixunClient"}</Descriptions.Item>
                        <Descriptions.Item label="OEM版权信息">{oem_option.oem_enable ? oem_option.copyright : "Fujian Centerm Information Co., Ltd."}</Descriptions.Item>

                        <Descriptions.Item label="远程编译服务器">{ this.state.isWindows ? "无" : complier_option.platform_node.server_address}</Descriptions.Item>
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