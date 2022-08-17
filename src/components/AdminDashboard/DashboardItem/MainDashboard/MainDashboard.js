import React from 'react';
import './MainDashboard.scss'
import DashHeader from './MainDashboardField/DashHeader/DashHeader';
import LineChart from './MainDashboardField/LineChart/LineChart';
import PieChart from './MainDashboardField/PieChart/PieChart';
import RecentOrder from './MainDashboardField/RecentOrderChart/RecentOrder';

const MainDashboard = () => {

    
    return (
        <div>
            <h4>Dashboard</h4>
            <div className='row m-1'>
                <DashHeader></DashHeader>
                <div className='col-md-12 row mt-3'>
                    <div className='col-md-7 col-12 mb-2'>
                        <LineChart></LineChart>
                    </div>
                    <div className='col-md-5 col-12 container' >
                        <PieChart></PieChart>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12 col-12' >
                <RecentOrder></RecentOrder>
                </div>

                
            </div>

        </div>
    );
};

export default MainDashboard;