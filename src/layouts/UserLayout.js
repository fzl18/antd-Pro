import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';


const copyright = <div>Copyright <Icon type="copyright" /> 2017 慧方科技</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { getRouteData, location } = this.props;
    const { pathname } = location;
    let title = '微信后台管理';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - 微信后台管理`;
      }
    });
    return title;
  }
  render() {
    const { getRouteData } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              {/* <Link to="/"> */}
                {/* <img alt="" className={styles.logo} src={require('../assets/logo.svg')}/> */}
                <span className={styles.title}>微信后台管理</span>
              {/* </Link> */}
            </div>
            {/* <div className={styles.desc}>微信后台管理</div> */}
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          <GlobalFooter className={styles.footer} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;