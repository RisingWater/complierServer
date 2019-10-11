import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm, Input, Icon, Divider, Pagination } from 'antd';
import Highlighter from 'react-highlight-words';
import $ from 'jquery';

export class MissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [] , searchText: ''};
    }

getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={node => {
                    this.searchInput = node;
                }}
                placeholder={`Search ${dataIndex}`}
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
                    title: '任务编号',
                    dataIndex: '任务编号',
                },
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
                },
                {
                    title: '任务状态',
                    dataIndex: '任务状态',
                },
                {
                    title: '输出目录',
                    key: '输出目录',
                    render: (text, record) => (
                        <span>
                            <a href={"http://192.168.12.127/output/bin/" + record.输出目录}>点击打开</a>
                        </span>
                    ),
                },
                {
                    title: '日志目录',
                    key: '日志目录',
                    render: (text, record) => (
                        <span>
                            <a href={}>点击打开</a>
                        </span>
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
                            <Button type='danger'>删除</Button>
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
                    console.log(data);
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
        $.ajax({
            type: "post",
            url:  "adminPortal/user/del",
            contentType: "application/json",
            data: JSON.stringify(json),
            success: (data, status) => {
                if (status == "success") {
                    this.RefreshData();
                }
            }
        });
    };

    componentDidMount() {
        this.RefreshData();
    }

    render() {
        return (
            <div>
                <Table size="middle" columns = {this.getColumns()} dataSource = {this.state.dataSource} pagination = {{size:"default", position :"both", defaultPageSize : 20, showQuickJumper : true}}/>
            </div>
        );
    }
}
