import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';

const {Title, Text } = Typography;

const CrearTicketPage = () => {

    useHideMenu(true);
    const {socket} = useContext(SocketContext);
    const [ticket, setTicket] = useState(null);

    const nuevoClick = ()=>{
        const payload = null; //solo por fines educativos
        socket.emit('crearTicket',payload, (ticket)=>{ // emit con funcion de retorno
            setTicket(ticket) // ticket es la respuesta desde el backed
        });
    }
    return (
        <>
            <Row>
                <Col span={14} offset={6} align="center">
                    <Title level={3}>Press to request a new ticket</Title>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large" onClick={nuevoClick}>New Ticket</Button>
                </Col>
            </Row>
            {
                ticket && (
                    <Row style={{marginTop: 100}}>
                        <Col span={14} offset={6} align="center">
                            <Text level={2}>Your Ticket is</Text>
                            <br/>
                            <Text type="success" style={{fontSize: 55}}>{ticket.numero}</Text>
                        </Col>
                    </Row>
                )
            }
            
        </>
    )
}

CrearTicketPage.propTypes = {

}

export default CrearTicketPage
