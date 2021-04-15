import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import useHideMenu from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';
import { Redirect, useHistory } from 'react-router';

const {Title, Text } = Typography;

const EscritorioPage = () => {

    useHideMenu(false);
    const history = useHistory();

    const [usuarioLocalStorage] = useState(getUserStorage());
    if(!usuarioLocalStorage.agente || !usuarioLocalStorage.escritorio) return <Redirect to="/ingresar"/>

    const salir = () => {
        localStorage.clear();
        history.push('/ingresar')
    }

    const ticketSiguiente = () => {

    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuarioLocalStorage.agente}</Title>
                    <Text>Usted esta trabajando en el escritorio No: </Text>
                    <Text type="success">{usuarioLocalStorage.escritorio}</Text>
                </Col>
                <Col span={4} align="right">
                    <Button shape="round" type="danger" onClick={salir}>
                        <CloseCircleOutlined /> Salir
                    </Button>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col>
                <Text>Está atendiendo el ticket No: </Text>
                <Text style={{fontSize: 30}} type="danger">55</Text>
                </Col>
            </Row>
            <Row>
                <Col offset={18} span={6} align="right">
                    <Button onClick={ticketSiguiente} shape="round" type="primary">Siguiente<RightOutlined /></Button>
                </Col>
            </Row>
        </>
    )
}

EscritorioPage.propTypes = {

}

export default EscritorioPage
