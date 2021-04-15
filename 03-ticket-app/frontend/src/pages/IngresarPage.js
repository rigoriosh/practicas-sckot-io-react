import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import PropTypes from 'prop-types'
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router';
import useHideMenu from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';


const {Title, Text } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 14,
  },
};

const IngresarPage = () => {

    const history = useHistory();
    useHideMenu(false);
    
    const [usuarioLocalStorage] = useState(getUserStorage());
    if(usuarioLocalStorage.agente && usuarioLocalStorage.escritorio) return <Redirect to="/escritorio"/>

    const onFinish = ({agente, escritorio}) => {
        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);
        history.push('/escritorio');
      };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Title level={2}>Ingresar</Title>
                <Text>Ingrese su nombre y número de escritorio</Text>
                <Divider/>
            <Form.Item
                label="Nombre del agente"
                name="agente"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Escritorio"
                name="escritorio"
                rules={[
                {
                    required: true,
                    message: 'Please input your descktop number!',
                },
                ]}
            >
                <InputNumber min={1} max={99}/>
            </Form.Item>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" shape="round">
                <SaveOutlined /> Ingresar
                </Button>
            </Form.Item>
        </Form>
    )
}

IngresarPage.propTypes = {

}

export default IngresarPage



/////////////////


