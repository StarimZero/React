import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Chart } from "react-google-charts";




const Chart2 = () => {

    const [data, setData] = useState("");

    const callAPI = async () => {
        const res = await axios.get(`/avg/scode`)
        console.log(res.data);
        let array = [];
        array.push(['학생이름', '평균점수'])
        res.data.forEach(row=>
            array.push([`${row.sname}(${row.scode})`, parseFloat(row.avg)])
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
        title: "학생별 평균 점수 ",
        chartArea: { width: "50%" },
        colors: ["#b0120a", "#ffab91"],
        hAxis: {
          title: "점수",
          minValue: 0,
        },
        vAxis: {
          title: "이름",
        },
      };




  return (
    <Container>
        <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        />
    </Container>
  )
}

export default Chart2