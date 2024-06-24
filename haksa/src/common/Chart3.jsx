import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Chart } from "react-google-charts";




const Chart3 = () => {

    const [data, setData] = useState("");

    const callAPI = async () => {
        const res = await axios.get(`/count/dept`)
        console.log(res.data);
        let array = [];
        array.push(['학생이름', '평균점수'])
        res.data.forEach(row=>
            array.push([`${row.dept}`, parseFloat(row.count)])
        );
        setData(array);
    }

    useEffect(()=>{
        callAPI();
    },[])

    // const data = [
    //     ["Year", "Sales", "Expenses", "Profit"],
    //     ["2014", 1000, 400, 200],
    //     ["2015", 1170, 460, 250],
    //     ["2016", 660, 1120, 300],
    //     ["2017", 1030, 540, 350],
    //   ];
    
    const options = {
      title: "과목별 학생수",
      pieHole: 0.4,
      is3D: false,
    };




  return (
    <Container>
        <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        />
    </Container>
  )
}

export default Chart3