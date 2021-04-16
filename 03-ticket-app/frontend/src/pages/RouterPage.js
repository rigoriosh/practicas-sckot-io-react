import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';

import {
    BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import IngresarPage from './IngresarPage';
import ColaPage from './ColaPage';
import CrearTicketPage from './CrearTicketPage';
import EscritorioPage from './EscritorioPage';
import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;


const RouterPage = () => {

    const {ocultarMenu} = useContext(UiContext);

    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <Sider collapsedWidth="0" breakpoint="md" hidden={ocultarMenu}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/ingresar">Ingresar</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/cola">Cola</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to="/crearticket">Crear Ticket</Link>
                            
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">            
                    <Content
                        className="site-layout-background"
                        style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}
                    >
                        <Switch>
                            <Route path="/cola" component={ColaPage}/>
                            <Route path="/crearticket" component={CrearTicketPage}/>
                            <Route path="/escritorio" component={EscritorioPage}/>
                            <Route path="/" component={IngresarPage}/>
                            <Redirect to="/"/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}

RouterPage.propTypes = {

}

export default RouterPage
