import React, { useEffect, useState } from 'react';
import './LineChart.scss'
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
    const [allData,setAllData] = useState([])
    const [chartData,setChartData] = useState([])
    const [date,setDate] = useState([])

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/orderAllShow`)
        .then(res => res.json())
        .then(data => setAllData(data.allOrderData))
    }, [])

    useEffect(() => {
        let dataMap = {};
        allData.forEach((el) => {
          let tempUser = el.createdAt
          const month = new Date(tempUser).getMonth()
          if (month in dataMap) {
            dataMap[month].value.push(el);
          } else {
            dataMap[month] = {
              // name:el.loggedInUser.displayName,
              date: month,
              value: [el],
              //register: new Date(parseInt(el.loggedInUser.createdAt)).toLocaleDateString()
            };
          }
        });
    
        const data = [];
    
        // Fill the data
        Object.keys(dataMap).forEach((el) => data.push(dataMap[el]));
        setChartData(data.map(ps => ps))
        setDate(data.map(dt => dt.date))

       
      }, [allData])



    const lineChartState = {

        series: [{
            name: 'Sales',
            data: chartData.map(pd => pd.value.length)
          }],
          options: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: date.map(pd => pd),
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
            title: {
              text: `Monthly Sales ${new Date().getFullYear()}`,
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
          }, 
        
    }

    return (
        <div>
            <div id="chart" className='line-chart bg-white'>
                <ReactApexChart options={lineChartState.options} series={lineChartState.series} type="bar" height={350} />
            </div>
        </div>
    );
};

export default LineChart;