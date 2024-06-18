import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SendPage = () => {


    const [list, setList] = useState([]);

    const [checked, setChecked] = useState(0);
    useEffect(()=>{
        let cnt=0;
        list.forEach(msg=>msg.checked && cnt++);
        setChecked(cnt);
    },[list])


    const callAPI = async () => {
        const url=`/message/send.json/${sessionStorage.getItem('uid')}`;
        const res = await axios.get(url);
        const data = res.data.map(msg=>msg && {...msg, checked:false});
        console.log(data);
        setList(data);
    }


    const onChangeAll = (e) => {
        const data=list.map(msg=>msg && {...msg, checked:e.target.checked});
        setList(data);
    }

    const onChangeSingle = (e, mid) => {
        const data = list.map(msg => msg.mid===mid ? {...msg, checked:e.target.checked} : msg);
        setList(data);
    }

    const onDelete = () => {
        if(checked===0){
            alert("삭제할 메세지를 선택하세요")
            return;
        }
        if(!window.confirm("삭제하시겠습니까?")) return;
        let cnt=0;
        list.forEach(async(msg)=>{
            if(msg.checked){   
            await axios.post(`/message/send/delete/${msg.mid}`);
            cnt++;
            }
            if(cnt===checked) callAPI();
        });
    }


    useEffect(() => {
        callAPI();
    },[])


  return (
    <Container>
        <div className='text-center my-5'>
                <h1>보낸거</h1>
        </div>
        <div>
        <Button onClick={onDelete} >선택삭제</Button>
            <Table striped="columns">
                
                <thead >
                    <tr className='text-center'>
                        <td><input type="checkbox" onChange={onChangeAll} checked={checked===list.length} /></td>
                        <td>id</td>
                        <td>받은이</td>
                        <td>내용</td>
                        <td>발신일</td>
                        <td>수신일</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(msg=>
                        <tr key = {msg.mid} className='text-center' >
                            <td><input type="checkbox" checked={msg.checked} onChange={(e)=>onChangeSingle(e, msg.mid)}/></td>
                            <td>{msg.mid}</td>
                            <td>{msg.receiver}({msg.uname})</td>
                            <td><div className='ellipsis1' style={{textDecoration: 'none', color:"black"}}><Link to={`/message/send/${msg.mid}`}>{msg.message}</Link></div></td>
                            <td>{msg.sendDate}</td>
                            <td>{msg.readDate || "수신대기중"}</td>
                        </tr>
                    )}
                </tbody>

            </Table>
        </div>
    </Container>
  )
}

export default SendPage