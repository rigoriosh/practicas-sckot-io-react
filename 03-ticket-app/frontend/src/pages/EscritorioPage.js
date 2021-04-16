import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import useHideMenu from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';
import { Redirect, useHistory } from 'react-router';
import { SocketContext } from '../context/SocketContext';

const {Title, Text } = Typography;

const EscritorioPage = () => {

    useHideMenu(false);
    const history = useHistory();
    const {socket} = useContext(SocketContext)
    const [siguienteTicket, setSiguienteTicket] = useState();

    const [usuarioLocalStorage] = useState(getUserStorage());
    if(!usuarioLocalStorage.agente || !usuarioLocalStorage.escritorio) return <Redirect to="/ingresar"/>

    const salir = () => {
        localStorage.clear();
        history.push('/ingresar')
    }

    const ticketSiguiente = () => {
        
        socket.emit('asignarTicket', usuarioLocalStorage, (siguienteTicket) => {
            setSiguienteTicket(siguienteTicket)
        });
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuarioLocalStorage.agente}</Title>
                    <Text>you are working on descktop No: </Text>
                    <Text type="success">{usuarioLocalStorage.escritorio}</Text>
                </Col>
                <Col span={4} align="right">
                    <Button shape="round" type="danger" onClick={salir}>
                        <CloseCircleOutlined /> Out
                    </Button>
                </Col>
            </Row>
            <Divider/>
            {
                siguienteTicket ? (
                    <Row>
                        <Col>
                        <Text>You're attending ticket No: </Text>
                        <Text style={{fontSize: 30}} type="danger">{siguienteTicket.numero}</Text>
                        </Col>
                    </Row>
                )
                : <Text>Without tickets to attend </Text>
            }
            
            <Row>
                <Col offset={18} span={6} align="right">
                    <Button onClick={ticketSiguiente} shape="round" type="primary">Next<RightOutlined /></Button>
                </Col>
            </Row>
        </>
    )
}

EscritorioPage.propTypes = {

}

export default EscritorioPage
