
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';


const DeletePage = () => {

    const uid = sessionStorage.getItem("uid");


    const [checked, setChecked] = useState(0);
    const [list, setList] = useState([]);
    const callAPI = async() => {
        const res = await axios.get(`/message/delete/list/${uid}`);
        console.log(res.data);
        const data = res.data.map(msg=>msg && {...msg, checked:false, type:uid===msg.sender?'send' : 'receive'});
        setList(data)
    }   


    const onChangeAll = (e) => {
        const data = list.map(msg=>msg && {...msg, checked:e.target.checked});
        setList(data);
    }

    const onChangeSingle = (e, mid) => {
        const data = list.map(msg => msg.mid===mid ? {...msg, checked:e.target.checked} : msg)
        setList(data);
    }


    const onReset = () => {
        if(checked===0){
            alert("복구할 메세지를 선택하세요");
            return;
        }
        if(!window.confirm("복구하시겠습니까?")) return;
        let cnt=0;
        list.forEach(async msg=>{
            if(msg.checked===true){ 
            await axios.post(`/message/reset/delete/${msg.mid}?type=${msg.type}`);
            cnt++;
        }
            if(cnt===checked) callAPI();
        });

    }








    //처음렌더링
    useEffect(()=>{
        callAPI();
    },[])
    
    //리스트바뀔때마다
    useEffect(()=>{
        let cnt=0;
        list.forEach(msg=>msg.checked && cnt++)
        setChecked(cnt);
    },[list])

  return (
    <Container>
        <h1>휴지통</h1>
        <Table>
            <thead>
                <tr>
                    <td><input type="checkbox"  onChange={onChangeAll} checked={list.length >0 && checked===list.length}/></td>
                    <td colSpan={3}><Button variant='outline-danger'>완전삭제</Button> <Button variant='outline-primary' onClick={onReset}>복구하기</Button></td>
                </tr>
            </thead>
            <tbody>
                {list.map(msg=>
                    <tr>
                        <td><input type="checkbox" checked={msg.checked} onChange={(e)=>onChangeSingle(e,msg.mid)}/></td>
                        <td>{msg.type}</td>
                        <td>{msg.mid}{msg.sendDelete===1 ? `To : ${msg.receiver}` : `From : ${msg.sender}`} </td>
                        <td>{msg.message}</td>
                        <td>{msg.sendDate}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </Container>
    
  )
}

export default DeletePage