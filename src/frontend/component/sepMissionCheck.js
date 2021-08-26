import React from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Collapse, Button, Input, Tag, Avatar } from 'antd';
import { ComplierOptionTag } from './complierOptionTag.js'
import $ from 'jquery';

export class SEPMissionCheckContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
            isWindows : true,
            platform : "",
            arch : "",
            os : "",
            complier_option : 0,
            protocols : 0,
            modules : 0,
            mission_includes : "",
            mission_defines : "",
            mission_script : "",
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
        var protocols = this.BitmapArrayToInt(this.props.complier_module.protocols);
        var modules = this.BitmapArrayToInt(this.props.complier_module.modules);

        console.log("complier_option: " + complier_option);
        console.log("protocols: " + protocols);
        console.log("modules: " + modules);

        this.setState({
            complier_option : complier_option,
            protocols : protocols,
            modules : modules,
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

    CheckMapIdx(map, idx) {
        return (map & (0x1 << idx)) != 0;
    }

    GetFunctionStr(map)
    {
        var USBMAP_INDEX   = 0;
        var MMR_INDEX      = 1;
        var TWAIN_INDEX    = 2;
        var WEBCAM_INDEX   = 3;
        var VPORT_INDEX    = 4;
        var FLASHMAP_INDEX = 5;
        var DISKMAP_INDEX  = 6;
        var WEBCAM2_INDEX  = 7;
        var VPRINTER_INDEX = 8;
        var UPGRADE_INDEX  = 9;

        var tmp_str = "; 需要打包的模块\r\n";

        if (this.CheckMapIdx(map, USBMAP_INDEX)) {
            tmp_str += "#define USB\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define USB\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, MMR_INDEX)) {
            tmp_str += "#define MMR\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define MMR\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, TWAIN_INDEX)) {
            tmp_str += "#define TWAIN\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define TWAIN\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, WEBCAM_INDEX)) {
            tmp_str += "#define WEBCAM\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define WEBCAM\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, VPORT_INDEX)) {
            tmp_str += "#define VPORT\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define VPORT\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, FLASHMAP_INDEX)) {
            tmp_str += "#define FLASH\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define FLASH\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, DISKMAP_INDEX)) {
            tmp_str += "#define VDISK\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define VDISK\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, WEBCAM2_INDEX))
        {
            tmp_str += "#define WEBCAM2\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define WEBCAM2\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, UPGRADE_INDEX)) {
            tmp_str += "#define UPGRADE\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define UPGRADE\t\t\t\t0\r\n";
        }

        tmp_str += "#define CLIENT_PATCH\t\t\t\t0\r\n";

        tmp_str += "#define NEWINTERFACE\t\t\t\t1\r\n";

        if (this.CheckMapIdx(map, VPRINTER_INDEX)) {
            tmp_str += "#define VPRINTER\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define VPRINTER\t\t\t\t0\r\n";
        }
        
        return tmp_str;
    }

    GetProtocolStr(map)
    {
        var ICA_INDEX      = 0;
        var PCOIP_INDEX    = 1;
        var RDP_INDEX      = 2;
        var XRED_INDEX     = 3;
        var TCPIP_INDEX    = 4;
        
        var tmp_str = "; 需要打包的协议\r\n";

        if (this.CheckMapIdx(map, ICA_INDEX)) {
            tmp_str += "#define ICA\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define ICA\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, PCOIP_INDEX)) {
            tmp_str += "#define PCOIP\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define PCOIP\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, RDP_INDEX)) {
            tmp_str += "#define RDP\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define RDP\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, XRED_INDEX)) {
            tmp_str += "#define XRED\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define XRED\t\t\t\t0\r\n";
        }

        if (this.CheckMapIdx(map, TCPIP_INDEX)) {
            tmp_str += "#define SOCKET\t\t\t\t1\r\n";
        } else {
            tmp_str += "#define SOCKET\t\t\t\t0\r\n";
        }

        return tmp_str;
    }

    GetServerdefineString()
    {
        if (!this.state.isWindows) {
            return "";
        }

        return ("#define SVN_VERSION\t\t\t" + this.props.complier_option.svn_version + "\r\n"
               + "; 服务器\r\n"
               + "#if SEPSERVER\r\n"
               + "; 版本号\r\n"
               + "; 编译出来的安装包名字\r\n"
               + "#define MyAppName \"ViSEPServer\"\r\n"
               + "#define MyAppVersion \"" + this.props.complier_option.version + "\"\r\n"
               + "#define MyAppExeName \"ViSEPServer.exe\"\r\n"
               + "\r\n"
               + "#define UUID \"{384E44C2-B87C-46FC-A7AC-8A2FBE89BD98}\"\r\n"
               + "#endif\r\n"
               + "\r\n"
               + "; 客户端\r\n"
               + "#if SEPCLIENT\r\n"
               + "; 版本号\r\n"
               + "; 编译出来的安装包名字\r\n"
               + "#define MyAppName \"ViSEPClient\"\r\n"
               + "#define MyAppVersion \"" + this.props.complier_option.version + "\"\r\n"
               + "#define MyAppExeName \"ViSEPClient.exe\"\r\n"
               + "\r\n"
               + "#define UUID \"{00D3B543-9080-4EA9-BCA8-1A9E6346CCD2}\"\r\n"
               + "#endif\r\n"
               + "\r\n"
               + "#define MyAppPublisher \"Centerm Information Co., Ltd.\"\r\n"
               + "#define MyAppURL \"http://www.centerm.com.cn\"\r\n"
               + "\r\n"
               + "; 是否打包成CTSS版本的SEP\r\n"
               + "#define ASCTSS\t\t\t\t0\r\n"
               +"\r\n"
               + this.GetFunctionStr(this.state.modules)
               + "\r\n"
               + this.GetProtocolStr(this.state.protocols)
               + "\r\n"
               + "; 扩展功能\r\n"
               + "#define TWAIN2\t\t\t\t1\r\n"
               + "#define TWAIN2COMPRESSLEVEL\t\t\t\t80\r\n"
               + "\r\n"
               + "#define HIDISOLATE\t\t\t\t1\r\n"
               + "#define PRTINTERISOLATE\t\t\t\t1\r\n"
               + "#define SCISOLATE\t\t\t\t1\r\n"
               + "#define UDISKISOLATE\t\t\t\t1\r\n"
               + "#define USBISOLATE2008\t\t\t\t1\r\n"
               + ";通道代理\r\n"
               + "#define USB_CHANNELPROXY\t\t\t1\r\n"
               + ";磁盘加速\r\n"
               + "#define UDISK_ACCELERATE\t\t\t1\r\n"
               + ";自动安装驱动\r\n"
               + "#define DRVAUTOINSTALL\t\t\t\t0\r\n"
               + "\r\n"
               + "#define SEPUI3\t\t\t\t0\r\n"
               + "#define SEPUI4\t\t\t\t1\r\n");
    }

    GetIncludeDefineString()
    {
        if (!this.state.isWindows) {
            return "";
        }

        var licenseOptionStr = "";
        if (this.props.complier_module.license_option == 1) {
            licenseOptionStr = "#define CLIENT_LICENSE\r\n";
        } else if (this.props.complier_module.license_option == 2) {
            licenseOptionStr = "#define TEMP_LICENSE\r\n"
        }
       
        var usbproxyString = "#define USBPROXY\r\n";

        return "#pragma once\r\n"
             + "#ifndef __COMPILER_DEFINE_H__\r\n"
             + "#define __COMPILER_DEFINE_H__\r\n\r\n"
             + licenseOptionStr
             + usbproxyString
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
            Option += " -n SEPServer";
        } else {
            Option += " -n SEPClient";
        }
        Option += " -v " + this.props.complier_option.version;
        Option += " -sv " + this.props.complier_option.svn_version;

        if (forserver) {
            Option += " -forserver";
        } else {
            Option += " -twain2 -cl 80 -usbproxy -NEWINTERFACE";
            if (this.props.complier_module.license_option == 1)
            {
                Option += " -license";
            }
            else if (this.props.complier_module.license_option == 2)
            {
                Option += " -tmplicense";
                Option += " -LicenseTime 2";
            }
        }

        Option += (" " + this.props.complier_option.platform_node.param);

        if ((this.state.complier_option & 0x1) == 0)
        {
            Option += " -norebuild";
        }

		Option += " -module " + this.state.modules;

        var env_set = "";
        if (this.props.complier_option.platform_node.server_address == "192.168.12.124") {
            env_set = ". ~/.bash_profile\r\n";
        }
		
		//C91 C15
        if((this.props.complier_option.platform_node.param.indexOf("-C91") != -1) ||
            (this.props.complier_option.platform_node.param.indexOf("-C15") != -1) )
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
		if((this.props.complier_option.platform_node.param.indexOf("-X86_64 -arch x86_64 -os cos") != -1) )
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
        if((this.props.complier_option.platform_node.param.indexOf("-national -arch x86_64 -os ubuntu16.04") != -1) )
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

    getLicenseTag(license_option) {
        if (license_option == 0) {
            return (
                <Tag color="green">未授权</Tag>
            )
        } else if (license_option == 1) {
            return (
                <Tag color="red">永久授权</Tag>
            )
        } else if (license_option == 2) {
            return (
                <Tag color="blue">48小时缓存授权</Tag>
            )
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
        var path = "";
        var server_addr = "";
        var username = "";
        var password = "";

        var forserver = false;
        if (this.props.complier_module.packages.indexOf("0") > -1) {
            forserver = true;
        }

        const {complier_option, complier_module} = this.props;

        console.log("add_mission");

        if (this.state.isWindows) {
            path += "SEP@"
            path += complier_option.platform_values[0];
        } else {
            if (forserver) {
                path += "SEPServer@";
            } else {
                path += "SEPClient@";
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
                    <Descriptions title="任务信息" bordered layout="vertical" column={3} colon={1}>
                        <Descriptions.Item label="平台">{this.state.platform}</Descriptions.Item>
                        <Descriptions.Item label="CPU架构">{this.state.arch}</Descriptions.Item>
                        <Descriptions.Item label="操作系统">{this.state.os}</Descriptions.Item>

                        <Descriptions.Item label="SVN版本号">{complier_option.svn_version}</Descriptions.Item>
                        <Descriptions.Item label="编译版本号" span={2}>{complier_option.version}</Descriptions.Item>
                        
                        <Descriptions.Item label="安装包类型">{this.getModuleTag(complier_module.packages)}</Descriptions.Item>
                        <Descriptions.Item label="授权选项">{this.getLicenseTag(complier_module.license_option)}</Descriptions.Item>
                        <Descriptions.Item label="编译选项">{<ComplierOptionTag option={this.state.complier_option}/>}</Descriptions.Item>

                        <Descriptions.Item label="是否位OEM版本">{oem_option.oem_enable ? <Tag color="red">是</Tag> : <Tag color="blue">否</Tag>}</Descriptions.Item>
                        <Descriptions.Item label="OEM图标" span={2}><Avatar shape="square" size={32} src={oem_option.oem_enable ? oem_option.icon : "./image/sep.png"} /></Descriptions.Item>

                        <Descriptions.Item label="OEM厂家名称">{oem_option.oem_enable ? oem_option.vendor_name : "Centerm"}</Descriptions.Item>
                        <Descriptions.Item label="OEM产品名称">{oem_option.oem_enable ? oem_option.product_name : "SEP"}</Descriptions.Item>
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