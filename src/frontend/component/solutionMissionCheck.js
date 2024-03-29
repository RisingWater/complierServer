import React from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Collapse, Button, Input, Tag, Avatar } from 'antd';
import { ComplierOptionTag } from './complierOptionTag.js'
import { ComponentsTag } from './componentsTag.js'
import $ from 'jquery';

export class SolutionMissionCheckContent extends React.Component {
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
            components : 0,
            mission_includes : "",
            mission_defines : "",
            mission_script : "",
            include_define : "",
            sep_define : "",
            weixun_define : ""
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
        if ( (this.props.complier_option.platform_values[0] != 'Windows') && (this.props.complier_option.platform_values[0] != 'FiberhomeWindows') ) {
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
        var components = this.BitmapArrayToInt(this.props.complier_module.components);

        if ((components & 16) == 0) {
            complier_option |= 16;
        }

        console.log("complier_option: " + complier_option);
        console.log("protocols: " + protocols);
        console.log("modules: " + modules);
        console.log("components: " + components);

        this.setState({
            complier_option : complier_option,
            protocols : protocols,
            modules : modules,
            components : components,
        }, () => {
			this.setState({
			    include_define : this.GetIncludeDefineString(),
			    sep_define : this.GetSEPServerdefineString(),
			    weixun_define : this.GetWeixunServerdefineString()
        })
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
	
	ReplaceAll(str , replaceKey , replaceVal) {
        var reg = new RegExp(replaceKey , 'g');
        return str.replace(reg , replaceVal || '');
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

    GetSEPServerdefineString()
    {
        if (!this.state.isWindows) {
            return "";
        }

		if (!this.props.oem_option.oem_enable)
		{
            return ("#define SVN_VERSION\t\t\t" + this.props.complier_option.svn_version + "\r\n"
               + "; 服务器\r\n"
               + "#if SEPSERVER\r\n"
               + "; 版本号\r\n"
               + "; 编译出来的安装包名字\r\n"
               + "#define MyAppName \"ViSEPServer\"\r\n"
               + "#define MyAppVersion \"" + this.props.complier_option.sep_version + "\"\r\n"
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
               + "#define MyAppVersion \"" + this.props.complier_option.sep_version + "\"\r\n"
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
               + "#define SEPUI4\t\t\t\t1\r\n"
			   + "#define SHORTCUT_NAME      \"ViSEP\"\r\n");
		}
		else
		{
			return ("#define SVN_VERSION\t\t\t" + this.props.complier_option.svn_version + "\r\n"
               + "; 服务器\r\n"
               + "#if SEPSERVER\r\n"
               + "; 版本号\r\n"
               + "; 编译出来的安装包名字\r\n"
               + "#define MyAppName \"" + this.props.oem_option.product_name + "SEPServer\"\r\n"
               + "#define MyAppVersion \"" + this.props.complier_option.sep_version + "\"\r\n"
               + "#define MyAppExeName \"" + this.props.oem_option.product_name + "SEPServer.exe\"\r\n"
               + "\r\n"
               + "#define UUID \"{384E44C2-B87C-46FC-A7AC-8A2FBE89BD98}\"\r\n"
               + "#endif\r\n"
               + "\r\n"
               + "; 客户端\r\n"
               + "#if SEPCLIENT\r\n"
               + "; 版本号\r\n"
               + "; 编译出来的安装包名字\r\n"
               + "#define MyAppName \"" + this.props.oem_option.product_name + "SEPClient\"\r\n"
               + "#define MyAppVersion \"" + this.props.complier_option.sep_version + "\"\r\n"
               + "#define MyAppExeName \"" + this.props.oem_option.product_name + "SEPClient.exe\"\r\n"
               + "\r\n"
               + "#define UUID \"{00D3B543-9080-4EA9-BCA8-1A9E6346CCD2}\"\r\n"
               + "#endif\r\n"
               + "\r\n"
               + "#define MyAppPublisher \"" + this.props.oem_option.copyright +" \"\r\n"
               + "#define MyAppURL \" \"\r\n"
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
               + "#define SEPUI4\t\t\t\t1\r\n"
			   + "#define SHORTCUT_NAME      \"" + this.props.oem_option.product_name + "SEP\"\r\n");
		}
    }

    GetCCMPack()
    {
        if ((this.state.components & 16) != 0) {
            return "1";
        } else {
            return "0";
        }
    }

    GetWeixunServerdefineString()
    {
        if (!this.state.isWindows) {
            return "";
        }

		if (!this.props.oem_option.oem_enable)
		{
			return ("#define SVN_VERSION\t\t\t" + this.props.complier_option.svn_version + "\r\n"
            + "; 服务器\r\n"
            + "#if NEPTUNESERVER\r\n"
            + "; 版本号\r\n"
            + "; 编译出来的安装包名字\r\n"
            + "#define MyAppName \"ViServer\"\r\n"
            + "#define MyAppVersion \"" + this.props.complier_option.weixun_version + "\"\r\n"
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
            + "#define MyAppVersion \"" + this.props.complier_option.weixun_version + "\"\r\n"
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
            + "\r\n"
			+ "#define SHORTCUT_NAME_CN      \"威讯云桌面\"\r\n"
            + "#define APP_SHORTCUT_NAME_CN  \"威讯云应用\"\r\n"
            + "#define SHORTCUT_NAME_EN      \"ViClient\"\r\n"
            + "#define APP_SHORTCUT_NAME_EN  \"ViClientApp\"\r\n"
            + "#define PACK_CCM " + this.GetCCMPack() + "\r\n"
			+ "\r\n");
		}
		else
		{
			return ("#define SVN_VERSION\t\t\t" + this.props.complier_option.svn_version + "\r\n"
            + "; 服务器\r\n"
            + "#if NEPTUNESERVER\r\n"
            + "; 版本号\r\n"
            + "; 编译出来的安装包名字\r\n"
            + "#define MyAppName \"" + this.props.oem_option.product_name + "Server\"\r\n"
            + "#define MyAppVersion \"" + this.props.complier_option.weixun_version + "\"\r\n"
            + "#define MyAppExeName \"" + this.props.oem_option.product_name +"Server.exe\"\r\n"
            + "\r\n"
            + "#define UUID \"{5E3C4D90-5CED-4044-A1C6-7CCBBFBAC526}\"\r\n"
            + "#endif\r\n"
            + "\r\n"
            + "; 客户端\r\n"
            + "#if NEPTUNECLIENT\r\n"
            + "; 版本号\r\n"
            + "; 编译出来的安装包名字\r\n"
            + "#define MyAppName \"" + this.props.oem_option.product_name + "Client\"\r\n"
            + "#define MyAppVersion \"" + this.props.complier_option.weixun_version + "\"\r\n"
            + "#define MyAppExeName \"" + this.props.oem_option.product_name + "Client.exe\"\r\n"
            + "\r\n"
            + "#define UUID \"{9FB17268-DBD5-4B7C-8EEF-DCA48D852755}\"\r\n"
            + "#endif\r\n"
            + "\r\n"
			+ "#define MyAppPublisher \"" + this.props.oem_option.copyright +" \"\r\n"
            + "#define MyAppURL \" \"\r\n"
            + "\r\n"
            + "#define SBC_MODE\t\t\t\t1\r\n"
            + "#define VDI_MODE\t\t\t\t1\r\n"
            + "#define CREDENTIALS_PROVIDER\t\t\t\t1\r\n"
            + "\r\n"
            + "#define AD_OPTION\t\t\t\t0\r\n"
            + "#define WATERMARK_OPTION\t\t\t\t0\r\n" 
            + "\r\n"
			+ "#define SHORTCUT_NAME_CN      \"" + this.props.oem_option.desktop_name + "\"\r\n"
            + "#define APP_SHORTCUT_NAME_CN  \"" + this.props.oem_option.app_name + "\"\r\n"
            + "#define SHORTCUT_NAME_EN      \"" + this.props.oem_option.product_name + "Client\"\r\n"
            + "#define APP_SHORTCUT_NAME_EN  \"" + this.props.oem_option.product_name + "App\"\r\n"
            + "#define PACK_CCM " + this.GetCCMPack() + "\r\n"
			+ "\r\n")		
		}
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
        if (this.state.isWindows)
        {
		    if (!this.props.oem_option.oem_enable)
		    {
				return "no_oem";
			}
			else
			{
				var iconpath = this.ReplaceAll(this.props.oem_option.icon, "/", "\\")
				console.log(this.props.oem_option.icon);
				console.log(iconpath);
				var str = this.props.oem_option.product_name + "\r\n" + iconpath + "\r\n"
				console.log(str);
				return str;
			}
        }
    }
    
 onSEPDefineChange(e) {
        this.setState({
            sep_define : e.target.value
        });
    }

    onIncludeChange(e) {
        this.setState({
            include_define : e.target.value
        });
    }

    onWeixunDefineChange(e) {
        this.setState({
            weixun_define : e.target.value
        });
    }
    getCollapse() {
        return (
            <Collapse>
                <Collapse.Panel header="生成的SEP头文件" key="1">
                    <Input.TextArea style={{height: 200}} onChange={this.onIncludeChange.bind(this)}>
                        {this.state.include_define}
                    </Input.TextArea>
                </Collapse.Panel>
                <Collapse.Panel header="生成的SEP定义文件" key="2">
                    <Input.TextArea style={{height: 300}} onChange={this.onSEPDefineChange.bind(this)}>
                        {this.state.sep_define}
                    </Input.TextArea>
                </Collapse.Panel>
                <Collapse.Panel header="生成的Weixun定义文件" key="3">
                    <Input.TextArea style={{height: 300}} onChange={this.onWeixunDefineChange.bind(this)}>
                        {this.state.weixun_define}
                    </Input.TextArea>
                </Collapse.Panel>
            </Collapse>
            )
    }

    add_mission() {
        var path = "IVY&SEP@Windows";
        var server_addr = "";
        var username = "";
        var password = "";

        const {complier_option, complier_module} = this.props;

        console.log("add_mission");

        console.log(path);
       
        var json = JSON.stringify({
            path : path,
            version : complier_option.weixun_version,
            svn_version : complier_option.svn_version,
            desc: complier_module.readme,
            buildMap: this.state.complier_option,
            mailto: "",
            codepath : "D:\\code\\SEP4\\",
            server_addr : server_addr,
            username : username,
            password : password,
            script : complier_option.platform_node.script,
            filedata_readme : "",
            filedata_define_sep : this.state.sep_define,
            filedata_define_ivy : this.state.weixun_define,
            filedata_include : this.state.include_define,
            filedata_linuxbuild : this.GetLinuxBuildString(),
        })

        console.log(json);
        $.ajax({
            type: "post",
            url:  "/mission/addsolution",
            contentType: "application/json",
            data: json,
            success: (data, status) => {
                if (status == "success") {
                    this.props.onSubmit() 
                }
            }
        });
    }
	
	getBgImage(oem_option)
	{
		if (oem_option.oem_enable == true && oem_option.bgimage != "")
		{
			return (
				<div>
					<img width="320px" height="180px" src={oem_option.bgimage} />
				</div>
			)
		}
		else
		{
			return
			(
				<div>无</div>
			)
		}
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

                        <Descriptions.Item label="协议版本号">{complier_option.weixun_version}</Descriptions.Item>
                        <Descriptions.Item label="SEP版本号">{complier_option.sep_version}</Descriptions.Item>
                        <Descriptions.Item label="SVN版本号">{complier_option.svn_version}</Descriptions.Item>

                        <Descriptions.Item label="编译选项" span={3}>{<ComplierOptionTag option={this.state.complier_option}/>}</Descriptions.Item>
                        <Descriptions.Item label="组件选项" span={3}>{<ComponentsTag option={this.state.components}/>}</Descriptions.Item>
                        
                        <Descriptions.Item label="是否位OEM版本">{oem_option.oem_enable ? <Tag color="red">是</Tag> : <Tag color="blue">否</Tag>}</Descriptions.Item>
                        <Descriptions.Item label="OEM图标" span={2}><Avatar shape="square" size={32} src={oem_option.oem_enable ? oem_option.icon : "./image/weixunclient.png"} /></Descriptions.Item>

                        <Descriptions.Item label="OEM厂家名称">{oem_option.oem_enable ? oem_option.vendor_name : "Centerm"}</Descriptions.Item>
                        <Descriptions.Item label="OEM产品名称">{oem_option.oem_enable ? oem_option.product_name : "WeixunClient"}</Descriptions.Item>
                        <Descriptions.Item label="OEM版权信息">{oem_option.oem_enable ? oem_option.copyright : "Fujian Centerm Information Co., Ltd."}</Descriptions.Item>
						
						<Descriptions.Item label="OEM云桌面名称">{oem_option.oem_enable ? oem_option.desktop_name : "威讯云桌面"}</Descriptions.Item>
                        <Descriptions.Item label="OEM云应用名称">{oem_option.oem_enable ? oem_option.app_name : "威讯云应用"}</Descriptions.Item>
                        <Descriptions.Item label="OEM融易云信息">{oem_option.oem_enable ? oem_option.ryypc_name : "融易云PC版"}</Descriptions.Item>
						
						<Descriptions.Item label="OEM应用背景图片" span={3}>{this.getBgImage(oem_option)}</Descriptions.Item>

                        <Descriptions.Item label="编译脚本" span={3}>{complier_option.platform_node.script}</Descriptions.Item>
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