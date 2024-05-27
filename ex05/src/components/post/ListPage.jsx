import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { app } from '../../firebaseInit'
import { getFirestore, collection, onSnapshot, orderBy, query, getCountFromServer} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';
import Pagination from "react-js-pagination";
import '../Paging.css';

const ListPage = () => {
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(15);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const db = getFirestore(app);
    const email = sessionStorage.getItem("email");
    const navi = useNavigate();
    const callAPI = async () =>{
        setLoading(true);
        const snapshot = await getCountFromServer(collection(db, 'posts'));
        const totalCount = (snapshot.data().count);

        const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
        let count = 0;
        onSnapshot(q, res=>{
            let rows=[];
            res.forEach(row=>{
                count++;
                rows.push({seq:totalCount-count+1, no:count, id:row.id, ...row.data()});
            });
            setTotal(count);
            const start= (page-1) * size + 1;
            const end = (page * size);
            const data = rows.filter(row=>row.no>=start && row.no<=end);
            setPosts(data);
            setLoading(false);
            //console.log(rows)
        });
    }
    
    useEffect(()=>{
        callAPI();
    },[page])


    if(loading) return 
    <div className='my-5 text-center'> 
            <>
                <Spinner animation="border" variant="primary" />
                <Spinner animation="border" variant="secondary" />
                <Spinner animation="border" variant="success" />
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="warning" />
                <Spinner animation="border" variant="info" />
                <Spinner animation="border" variant="light" />
                <Spinner animation="border" variant="dark" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </>
        </div>


  return (
    <div className="my-5">
      <h1 className="text-center">자유게시판</h1>
        <Table striped bordered hover variant="dark" size="sm" className='text-center'>
            <thead>
                <tr className="text-center table-dark">
                    <td>No.</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일</td>
                </tr>
            </thead>
            <tbody>
                {posts.map(post=>
                    <tr>
                        <td>{post.seq}</td>
                        <td><a href={`/post/read/${post.id}`} style={{ textDecoration: 'none', color: 'white'}}>{post.title}</a></td>
                        <td>{post.email}</td>
                        <td>{post.date}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {email && 
            <div className="text-end">
            <Button onClick={()=>navi('/post/insert')} variant="outline-dark">글쓰기</Button>
            </div>
        }
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default ListPage;
