import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
// import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Admin from '../../pages/Admin/Admin';
import PrivateRouter from '../../shared/route/private-route';
// import DetailCard from '../DetailCard/DetailCard';

const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard'))
const Login = lazy(() => import('../../components/Login/Login'))

const Routing = () => {

    return (
        <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Dashboard />} />
                {/* <Route element={<PrivateRouter />}> */}
                    <Route path='/admin' element={<Admin />} />
                {/* </Route> */}
                <Route path='/login' element={<Login />} />
                {/* <Route  path='/dashboard' element={<Dashboard />} /> */}
                {/* <Route path="/detail/:uuid" element={<DetailCard/>} /> */}
            </Route>
        </Routes>
    );
};

export default Routing;