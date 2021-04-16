import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd'
import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimosTickets } from '../helpers/getUltimos';


const {Title, Text } = Typography;

/* 
const data = [{
    ticketNo: 33,
    escritorio: 3,
    agente: 'Fernando Herrera'
},
{
    ticketNo: 34,
    escritorio: 4,
    agente: 'Melissa Flores'
},
{
    ticketNo: 35,
    escritorio: 5,
    agente: 'Carlos Castro'
},
{
    ticketNo: 36,
    escritorio: 3,
    agente: 'Fernando Herrera'
},
{
    ticketNo: 37,
    escritorio: 3,
    agente: 'Fernando Herrera'
},
{
    ticketNo: 38,
    escritorio: 2,
    agente: 'Melissa Flores'
},
{
    ticketNo: 39,
    escritorio: 5,
    agente: 'Carlos Castro'
},
]; */

const ColaPage = props => {

    useHideMenu(true);

    const {socket} = useContext(SocketContext);
    const [ultimos13, setUltimos13] = useState([]);

    useEffect(() => {
        socket.on('ultimos13', (data)=> {
            console.log(data)
            setUltimos13(data)
        })
        return () => {socket.off('ultimos13')}
    }, [socket])

    useEffect(() => {

        getUltimosTickets().then(setUltimos13);

        return () => {}
    }, [])
    return (
        <>
            <Title level={1}>Serving the client</Title>
            <Row>
                <Col span={12}>
                    <List dataSource={ultimos13.slice(0,3)}
                        renderItem={ item => (
                            <List.Item>
                                <Card style={{width:300, marginTop: 16}} actions={[
                                <Tag color="volcano">{item.agente}</Tag>,
                                <Tag color="magenta">Descktop: {item.escritorio}</Tag>
                                ]}>
                                    <Title>No. {item.numero}</Title>
                                </Card>
                            </List.Item>
                        )}
                            />
                </Col>
                <Col span={12}>
                    <Divider>Record</Divider>
                    <List dataSource={ultimos13.slice(3)} renderItem={item => (
                        <List.Item>
                            <List.Item.Meta title={`Ticket No. ${item.numero}`} description={
                                <>
                                    <Text type="secondary">On descktop </Text>
                                    <Tag color="magenta">{item.escritorio}</Tag>
                                    <Text type="secondary">Agent </Text>
                                    <Tag color="volcano">{item.agente}</Tag>
                                </>
                            }/>
                        </List.Item>
                    )}/>
                </Col>
            </Row>
        </>
    )
}

export default ColaPage
