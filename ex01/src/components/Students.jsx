import React, { useState } from 'react'
import { Table } from 'react-bootstrap';

const Students = () => {
    const [Students, setStudents] = useState([
        {no:100, name:"장원영", address : "서울 관악구 관악로30길", phone:"010-0000-0000"},
        {no:111, name:"김태연", address : "서울 마포구 토정로31길", phone:"010-1111-1111"},
        {no:122, name:"안유진", address : "서울 광진구 능동로4길", phone:"010-2222-2222"},
        {no:133, name:"김민정", address : "서울 중구 청구로 64", phone:"010-3333-3333"},
        {no:144, name:"유지민", address : "서울 마포구 망원로2길", phone:"010-4444-4444"},
    ]);
  return (
    <div className='m-5'>
        <h1>학생목록</h1>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <td>학생번호</td>
                    <td>학생이름</td>
                    <td>학생주소</td>
                    <td>학생전화</td>
                </tr>
            </thead>
            <tbody>
                {Students.map(s=>
                    <tr key={s.no}>
                        <td>{s.no}</td>
                        <td>{s.name}</td>
                        <td>{s.address}</td>
                        <td>{s.phone}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}

export default Students