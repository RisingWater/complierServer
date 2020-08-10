import React from 'react';
import 'antd/dist/antd.css';
import { Divider, Typography, Input, Form, Button, Radio, Checkbox  } from 'antd';

export class AKSuitComplierModuleFormTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        var component = (
            <Form layout="vertical" onSubmit={this.onSubmit.bind(this)}>
                <Divider orientation="left"><Typography.Title level={4}>备注</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator('readme') (
                        <Input addonBefore="备注" style={{width: 700}} placeholder="请输入备注"/>  
                    )}
                </Form.Item>
                <Button style={{ marginRight: 8 }} onClick={() => { this.props.OnBackClick() }}>上一步</Button>
                <Button type="primary" htmlType="submit">下一步</Button>
            </Form>
        );
        return component;
    }
}