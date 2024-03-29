import React from 'react';
import 'antd/dist/antd.css';
import { Select, Divider, Typography, Input, Form, Button, Switch, Upload, Icon, Avatar } from 'antd';
import $ from 'jquery';

export class OEMOptionFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oem_enable : false,
            dataSource : [],
            oemid : "new_oem",
            oem_imageUrl : "",
			oem_bgimage : "",
        };
    }

    RefreshDataSource() {
        $.ajax({
            type: "get",
            url:  "/oem/list",
            contentType: "application/json",
            success: (data, status) => {
                if (status == "success") {
                    console.log("/oem/list");
                    console.log(data);
                    this.setState({ dataSource : data });
                }
            }
        });
    }

    componentDidMount() {
        this.RefreshDataSource();
        console.log(this.props.mission_oem_option);
        this.setState({
            oemid : this.props.mission_oem_option.oemid == "" ? "new_oem" : this.props.mission_oem_option.oemid,
            oem_enable : this.props.mission_oem_option.oem_enable,
            oem_imageUrl : this.props.mission_oem_option.icon,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.oem_enable) {
                    var json = { 
                        "oemid" : this.state.oemid,
                        "vendor" : values.vendor_name,
                        "product" : values.product_name,
						"desktop_name" : values.desktop_name,
						"app_name" : values.app_name,
						"ryypc_name" : values.ryypc_name,
                        "copyright" : values.copyright,
                        "icon" : this.state.oem_imageUrl,
						"bgimage" : this.state.oem_bgimage,
                    };
                    var oemid = this.state.oemid;

                    console.log(json);

                    if (this.state.oemid == "new_oem") {
                        $.ajax({
                            type: "post",
                            url:  "/oem/add",
                            contentType: "application/json",
                            async: false,
                            data: JSON.stringify(json),
                            success: (data, status) => {
                                if (status == "success") {
                                    if (data.result == 0) {
                                        oemid = data.oemid;
                                    }
                                }
                            }
                        });
                    } else {
                        $.ajax({
                            type: "post",
                            url:  "/oem/update",
                            contentType: "application/json",
                            async: false,
                            data: JSON.stringify(json),
                            success: (data, status) => {
                                if (status == "success") {
                                    if (data.result == 0) {
                                        oemid = data.oemid;
                                    }
                                }
                            }
                        });
                    }
                }

                this.props.onSubmit(values, oemid, this.state.oem_imageUrl, this.state.oem_bgimage);
            }
        });
    };

    onOEMSwitchChange(value) {
        console.log(value);
        this.setState({ oem_enable :value })
        if (!value) {
            this.setState({
                oem_imageUrl : "",
				oem_bgimage : "",
            });
        }
    }

    onOEMSelectChange(value) {
        console.log("onOEMSelectChange");
        console.log(value);
        const { form } = this.props;

        var oem = null;
        this.state.dataSource.some((element) => {
            if (element.oemid == value) {
                oem = element;
            }
        })
        this.setState({oemid: value});
		
		if (oem.desktop_name == undefined) {
			oem.desktop_name = oem.product;
		}
		
		if (oem.app_name == undefined) {
			oem.app_name = oem.product;
		}
		
		if (oem.ryypc_name == undefined) {
			oem.ryypc_name = oem.product;
		}
		
		if (oem.bgimage == undefined) {
			oem.bgimage = "";
		}
		
        if (oem) {
            form.setFieldsValue({
                vendor_name : oem.vendor,
                product_name : oem.product,
				desktop_name : oem.desktop_name,
				app_name : oem.app_name,
				ryypc_name : oem.ryypc_name,
                copyright : oem.copyright
            });

            this.setState({
                oem_imageUrl : oem.icon,
				oem_bgimage : oem.bgimage,
            });
        } else {
            form.setFieldsValue({
                vendor_name : "",
                product_name : "",
				desktop_name : "",
				app_name : "",
				ryypc_name : "",
                copyright : ""
            });

            this.setState({
                oem_imageUrl : "",
				oem_bgimage : "",
            });
        }
    }

    normFile(e) {
        console.log(e);
        if (Array.isArray(e)) {
            return e;
        }

        if (e.file.status == 'done') {
            this.setState({
                oem_imageUrl : e.file.response.url,
            });
        } 

        return e && e.fileList;
    };
	
	normFile2(e) {
        console.log(e);
        if (Array.isArray(e)) {
            return e;
        }

        if (e.file.status == 'done') {
            this.setState({
                oem_bgimage : e.file.response.url,
            });
        } 

        return e && e.fileList;
    };

    getSelectItem() {
        return (
            this.state.dataSource.map((element) => {
                return (
                    <Select.Option value={element.oemid}>
                        {element.vendor + '_' + element.product}
                    </Select.Option>
                )
            })
        )
    }

    SelectRender(menuNode, props) {
        menuNode.props.menuItems.some((element) => {
            if (element.key != "new_oem") {
                var oem = null;
                this.state.dataSource.some((element2) => {
                    if (element2.oemid == element.key) {
                        oem = element2;
                    }
                })
                if (oem != null) {
                    element.props.children = (
                        <div>
                            {oem.vendor + '_' + oem.product}
                            <Button shape="circle" icon="delete" style={{float:"right"}} size="small" type="danger" onClick={() => {
                                console.log("delete oem");
                                var json = { 
                                    "oemid" : element.key,
                                };
                                $.ajax({
                                    type: "post",
                                    url:  "/oem/del",
                                    contentType: "application/json",
                                    async: false,
                                    data: JSON.stringify(json),
                                    success: (data, status) => {
                                        if (status == "success") {
                                            if (data.result == 0) {
                                                console.log("del oem ok");
                                                this.RefreshDataSource();
                                            }
                                        }
                                    }
                                });
                            }}/>
                        </div>
                    )
                }
            }
        })
        return menuNode;
    }
	
	getAddonBefore(string)
	{
		return (
			<div style={{width : 150}}>
				{string}
			</div>
		)
	}

    render () {
        const { getFieldDecorator } = this.props.form;
        var component = (
            <Form layout="vertical" onSubmit={this.onSubmit.bind(this)}>
               <Divider orientation="left"><Typography.Title level={4}>OEM定制</Typography.Title></Divider>
                <Form.Item label="启用OEM定制">
                    {getFieldDecorator('oem_enable', [ {valuePropName: "checked"} ]) (
                        <Switch onChange={this.onOEMSwitchChange.bind(this)} checked={this.state.oem_enable}></Switch>
                    )}
                </Form.Item>
                <Form.Item label="选择现有的OEM选项">
                    <Select 
                        style={{ width: 400 }}
                        placeholder="选择一个现有的OEM选项"
                        disabled={!this.state.oem_enable}
                        value={this.state.oemid}
                        onChange={this.onOEMSelectChange.bind(this)}
                        dropdownRender={this.SelectRender.bind(this)}>
                        {this.getSelectItem()}
                        <Select.Option value="new_oem">创建新的OEM选项</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('vendor_name') (
                        <Input addonBefore={this.getAddonBefore("厂家名称")} style={{width: 700}} placeholder="请输入厂家名称，只能为英文字符" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('product_name') (
                        <Input addonBefore={this.getAddonBefore("产品名称")} style={{width: 700}} placeholder="请输入产品名称，只能为英文字符" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>
				<Form.Item>
                    {getFieldDecorator('desktop_name') (
                        <Input addonBefore={this.getAddonBefore("云桌面产品名称")} style={{width: 700}} placeholder="请输入云桌面产品名称，可以是中文" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>
				<Form.Item>
                    {getFieldDecorator('app_name') (
                        <Input addonBefore={this.getAddonBefore("云应用产品名称")} style={{width: 700}} placeholder="请输入云应用产品名称，可以是中文" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>
				<Form.Item>
                    {getFieldDecorator('ryypc_name') (
                        <Input addonBefore={this.getAddonBefore("融易云PC版产品名称")} style={{width: 700}} placeholder="请输入融易云PC版产品名称，可以是中文" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>  	  				
                <Form.Item>
                    {getFieldDecorator('copyright') (
                        <Input addonBefore={this.getAddonBefore("版权信息")} style={{width: 700}} placeholder="请输入版权信息，可以使中文" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>   
                <Form.Item label="上传OEM版本的Logo">
                    {getFieldDecorator('icon', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile.bind(this)})(
                        <Upload
                            name="icon"
                            action="/upload"
                            listType="picture-card"
                            showUploadList={false}
                            disabled={!this.state.oem_enable}
                            style={{width: 128, height: 128}}>
                            {this.state.oem_imageUrl == "" ? 
                                <div><Icon type='plus'/><div>点击上传</div></div> :
                                <img src={this.state.oem_imageUrl} alt="Logo" style={{ width: '100%' }}/>}
                        </Upload>
                    )}
                </Form.Item>
				<Form.Item label="上传OEM版本的背景图片">
                    {getFieldDecorator('bgimage', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile2.bind(this)})(
                        <Upload
                            name="icon"
                            action="/upload"
                            listType="picture-card"
                            showUploadList={false}
                            disabled={!this.state.oem_enable}
                            style={{width: 128, height: 96}}>
                            {this.state.oem_bgimage == "" ? 
                                <div><Icon type='plus'/><div>点击上传</div></div> :
                                <img src={this.state.oem_bgimage} alt="Logo" style={{ width: '100%' }}/>}
                        </Upload>
                    )}
                </Form.Item>
                <Button style={{ marginRight: 8 }} onClick={() => { this.props.OnBackClick() }}>上一步</Button>
                <Button type="primary" htmlType="submit">下一步</Button>
            </Form>
        );
        return component;
    }
}