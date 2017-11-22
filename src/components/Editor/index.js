import React, { PureComponent } from 'react';
import E from 'wangeditor'

export default class Editor extends PureComponent {
    constructor(props) {
        super(props);
        const value = this.props.value || {};
        this.state = {
            editorContent:value.editorContent || '',
        };
    }

    componentDidMount() {
      const elem = this.editorElem
      const editor = new E(elem)
      editor.customConfig.menus = this.props.menus || [
        'head',
        'bold',
        'italic',
        'underline',
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
    ]
      editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
      editor.customConfig.onchange = html => {
        // if (!('value' in this.props)) {
            this.setState({
                editorContent: html
            },()=>{
                const onChange = this.props.onChange;
                if (onChange) {
                  onChange(Object.assign({}, this.state));
                }
            });
        // }        
      }
      editor.create()
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
          const value = nextProps.value;
          this.setState(value);
        }
      }
  
    render() {
      return (             
        <div ref={el => this.editorElem = el} style={this.props.style} />
      );
    }
  }
  