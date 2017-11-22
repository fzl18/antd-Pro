import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Alert, Badge, Divider,Popconfirm } from 'antd';
import styles from './News.less';

@connect(state => ({
  rule: state.rule,
}))

class News extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    const { data: { list, pagination }, loading, dispatch } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'num',
      },
      {
        title: '动态标题',
        dataIndex: 'title',
      },
      {
        title: '创建时间',
        dataIndex: 'CreatTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,     
      },      
      {
        title: '发布时间',
        dataIndex: 'updateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text,record,index) => (
          <div>
            <a href="javascript:;" onClick={this.props.onEdit.bind(this,record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm title="确定要删除吗？" onConfirm={()=>{dispatch({type:'rule/remove',payload:record})}} okText="是" cancelText="否">
            <a href="javascript:;" >删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      // getCheckboxProps: record => ({
      //   disabled: record.disabled,
      // }),
    };

    return (
      <div className={styles.standardTable}>

        <Table
          loading={loading}
          rowKey={record => record.num}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default News;
