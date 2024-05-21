import React, { useState } from 'react'
import {Button, Card} from 'react-bootstrap'


const Counter = () => {
    const [count, setCount] = useState(100);
    const style={
        fontSize:"25px",
        color : "dodgerblue"
    };


  return (
        <Card className="m-3">
        <Card.Header>
            <h1>카운터</h1>
        </Card.Header>
        <Card.Body>
            <Button onClick={()=>setCount(count-1)} variant="outline-danger">감소</Button>
            <span className="mx-3" style={style}>{count}</span>
            <Button onClick={()=>setCount(count+1)} variant="outline-primary">증가</Button>
        </Card.Body>
    </Card>
  )
}

export default Counter