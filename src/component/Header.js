import { Col, Row } from 'antd'
import React, { Fragment } from 'react'

export default function Header({name}) {
  return (
    <Fragment>
        <Row style={{justifyContent: "space-between"}}>
            <Col span={4}>
            <h1 >home</h1>
           
            </Col>
            <Col span={4}>
                <Row>
                <h1 >about </h1>
                <h1 >contact </h1>
                <h1 >{name}</h1>  
                </Row>
            
            </Col>
        </Row>
       
    </Fragment>
  )
}

