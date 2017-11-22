import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Upload, Modal
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import E from 'wangeditor'
import Editor from '../Editor'
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  dataList: state.rule,
}))
@Form.create()
export default class NewsForms extends PureComponent {
  state = {
    submitting:false,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
    editorContent:'',
  };

  handleCancel = () => this.setState({ previewVisible: false })  
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,      
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  render() {
    console.log(this.props)
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { previewVisible, previewImage, fileList, submitting } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      // <PageHeaderLayout>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="动态标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="请输入标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="动态主图"
            >
              {getFieldDecorator('pic', {
                rules: [{
                  required: true, message: '请添加图片',
                }],
              })(
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>              
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="发布时间"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '请选择日期',
                }],
              })(
                <DatePicker style={{ width: '100%' }} placeholder={'选择日期'} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: '请输入内容',
                }],
              })(
                <Editor style={{width:460}}/>
              )}              
            </FormItem>            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.props.onCancel}>取消</Button>
            </FormItem>
          </Form>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Card>
      // </PageHeaderLayout>
    );
  }
}
