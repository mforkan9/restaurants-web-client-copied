import React, { useEffect, useState } from 'react';
import './PieChart.scss'
import ReactApexChart from 'react-apexcharts';



const PieChart = () => {
    const [categoryChart,setCategoryChart] = useState([])

    useEffect(() => {
        fetch('https://boiling-badlands-11783.herokuapp.com/showCategories')
            .then(res => res.json())
            .then(data => setCategoryChart(data))
    }, [])


    const pieChartState = {

        series: [44, 55, 13, 43, 22,45,45,45],
        options: {
            chart: {
                width: 380,
                type: 'pie',

            },
            labels: categoryChart.map(ps => ps.categories),
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }

    return (
        <div className='conatiner'>
            <div id="chart" className='pie-chart bg-white '>
                <ReactApexChart options={pieChartState.options} series={pieChartState.series} type="pie" width={380} />
            </div>
        </div>
    );
};

export default PieChart;