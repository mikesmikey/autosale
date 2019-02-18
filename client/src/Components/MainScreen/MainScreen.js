import React, { Component } from "react";
import {
    Route
} from 'react-router-dom';

//mainscreen component
import MainNavBar from './MainNavBar';
import MainMenuBar from './MainMenuBar';

//all pages
import Home from '../Home/Home';
import Plate from '../Plate/Plate';
import CarBuy from '../CarBuy/CarBuy';
import CarSell from '../CarSell/CarSell';
import CarFix from '../CarFix/CarFix';
import CarPart from '../CarPart/CarPart';
import PartOrderManage from "../PartOrderManage/PartOrderManage";
import CustomerManage from "../CustomerManage/CustomerManage";
import PartCompanyManage from "../PartCompanyManage/PartCompanyManage";

import '../../StyleSheets/mainScreen.css';
import '../../StyleSheets/pageHelper.css';

class MainScreen extends Component {

    render() {
        return (
            <div className="main-screen">
                <MainNavBar
                    mockLogout={this.props.mockLogout}
                    username={this.props.username}
                />
                <MainMenuBar />
                <div className="main-subcontent">
                    <Route exact path="/" render={(props) =>
                        <Home />
                    } />
                    <Route path="/plate_license" render={(props) =>
                        <Plate />
                    } />
                    <Route path="/car_buy" render={(props) =>
                        <CarBuy />
                    } />
                    <Route path="/car_sell" render={(props) =>
                        <CarSell />
                    } />
                    <Route path="/car_fix" render={(props) =>
                        <CarFix />
                    } />
                    <Route path="/car_part" render={(props) =>
                        <CarPart />
                    } />
                    <Route path="/part_order" render={(props) =>
                        <PartOrderManage />
                    } />
                    <Route path="/part_company" render={(props) =>
                        <PartCompanyManage />
                    } />
                    <Route path="/customer_manage" render={(props) =>
                        <CustomerManage />
                    } />
                </div>

            </div>
        );
    }
}

export default MainScreen;