import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm, Input, Icon, Badge, Pagination, Tag, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import { ComplierOptionTag } from './complierOptionTag.js'
import $ from 'jquery';

const outputDir = "http://10.17.17.16:8080/output/bin/"
const logDir = "http://10.17.17.16:8080/output/log/"

export class MissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [] , searchText: '',
            loading : true};
    }

getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={node => {
                    this.searchInput = node;
                }}
                placeholder={`在 ${dataIndex} 中搜索`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
        <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };    

    getPagination() {
        return (
            <Pagination size="small" defaultPageSize="30" showQuickJumper/>
        )
    }

    getColumns() {
        return (
            [
                {
                    title: '分支',
                    dataIndex: '分支',
                    ...this.getColumnSearchProps('分支'),
                },
                {
                    title: '版本号',
                    dataIndex: '版本号',
                    ...this.getColumnSearchProps('版本号'),
                },
                {
                    title: 'svn版本号',
                    dataIndex: 'svn版本号',
                    ...this.getColumnSearchProps('svn版本号'),
                },
                {
                    title: '编译时间',
                    dataIndex: '编译时间',
                },
                {
                    title: '编译选项',
                    dataIndex: '编译选项',
                    render: (text, record) => (
                        <ComplierOptionTag option={record.编译选项} />
                    )
                },
                {
                    title: '任务状态',
                    dataIndex: '任务状态',
                    render: (text, record) => (
                        <span>
                            { record.任务状态 == "已完成" ? <Badge status="success" /> : (record.任务状态 == "正在编译" ? <Badge status="processing" /> : <Badge status="error"/>) }
                            { record.任务状态 }
                        </span>
                    ),
                },
                {
                    title: '输出目录',
                    key: '输出目录',
                    render: (text, record) => (
                        <Button type="primary" icon="download" href={outputDir + record.输出目录} target="_blank" size="small">下载</Button>
                    ),
                },
                {
                    title: '日志目录',
                    key: '日志目录',
                    render: (text, record) => (
                        <Button type="primary" icon="search" href={logDir + record.输出目录} target="_blank" size="small">查看</Button>
                    ),
                },
                {
                    title: '备注',
                    dataIndex: '备注',
                    ...this.getColumnSearchProps('备注'),
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Popconfirm title="确认删除" onConfirm={() => this.DeleteData(record.任务编号)}>
                            <Button type='danger' icon="delete" size="small">删除</Button>
                            </Popconfirm>
                        </span>
                    ),
                },
            ]
        );
    }

    RefreshData() {
        console.log("RefreshData");
        $.ajax({
            type: "get",
            url:  "mission/list",
            contentType: "application/json",
            success: (data, status) => {
                if (status == "success") {
                    this.setState({loading : false});
                    if (data.result == 0) {
                        this.setState({ dataSource : data.data });
                        console.log("ajax ok");
                    } else {
                        console.log("ajax failed");
                    }
                }
            }
        });
    }

    DeleteData(key) {
        var json = { "id": key };
        this.setState({loading : true});
        $.ajax({
            type: "post",
            url:  "mission/del",
            contentType: "application/json",
            data: JSON.stringify(json),
            success: (data, status) => {
                if (status == "success") {
                    this.RefreshData();
                }
            }
        });
    };

    onTimer() {
        this.RefreshData();
    }

    componentDidMount() {
        this.RefreshData();
        setInterval(this.onTimer.bind(this), 10000);
    }

    render() {
        return (
            <div>
                <Table 
                    size="middle"
                    columns = {this.getColumns()}
                    dataSource = {this.state.dataSource}
                    pagination = {{size:"default", position :"both", defaultPageSize : 20, showQuickJumper : true}}
                    loading = {this.state.loading}/>
            </div>
        );
    }
}
