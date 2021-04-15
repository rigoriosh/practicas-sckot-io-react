import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import useHideMenu from '../hooks/useHideMenu';

const {Title, Text } = Typography;

const CrearTicketPage = () => {

    useHideMenu(true);

    const nuevoClick = ()=>{}
    return (
        <>
            <Row>
                <Col span={14} offset={6} align="center">
                    <Title level={3}>Press to request a new ticket</Title>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large" onClick={nuevoClick}>New Ticket</Button>
                </Col>
            </Row>
            <Row style={{marginTop: 100}}>
                <Col span={14} offset={6} align="center">
                    <Text level={2}>Your number is</Text>
                    <br/>
                    <Text type="success" style={{fontSize: 55}}>55</Text>
                </Col>
            </Row>
        </>
    )
}

CrearTicketPage.propTypes = {

}

export default CrearTicketPage
