import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card,Table, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import StandardTable from '../../components/Index/News';
import NewsForm from '../../components/Index/NewsForm';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './News.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  rule: state.rule,
}))
@Form.create()
export default class News extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    isEdit:false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    const arr=[]
    rows.map(d => {
      arr.push(d.num)
    })
    console.log(arr)
    this.setState({
      selectedRows: arr,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag,type) => {
    this.setState({
      modalVisible: !!flag,
      isEdit:type =='add' ? false : true,
    });
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  handleEdit =(record)=>{
    this.setState({
      isEdit:true,
    })
    this.handleModalVisible(true)
    console.log(record)
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const { selectedRows } = this.state;    
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 2, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="动态标题">
              {getFieldDecorator('title')(
                <Input placeholder="请输入标题" />
              )}
            </FormItem>
          </Col>         
          <Col md={4} sm={24} pull={1}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>              
            </span>
          </Col>
          <Col md={3} sm={24} push={2}>
            {
              selectedRows.length > 0 && (
                <span>
                  <Button type="danger" onClick={()=>{this.props.dispatch({type:'rule/remove',payload:this.state.selectedRows});console.log(this.state.selectedRows)}}> 批量删除</Button>
                </span>
              )
            }
          </Col>
          <Col md={3} sm={24} push={2}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true,'add')}>新建</Button>
          </Col>   
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { rule: { loading, data } } = this.props;
    const { selectedRows, modalVisible, addInputValue, isEdit } = this.state;

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onEdit={this.handleEdit}
            />

          </div>
        </Card>
        <Modal
          title={isEdit?'修改动态':'新建动态'}
          visible={modalVisible}
          width={800}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
          footer={null}
        >
          <NewsForm onCancel={() => this.handleModalVisible()}/>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
