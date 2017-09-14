import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import { Header, Icon } from 'react-native-elements';

import Drawer from 'react-native-drawer';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import StructList from '../component/Structclass_comp';

import AttendList from '../component/Attdantclass_comp';

import RatioList from '../component/Ratioclass_comp';

import Side_Menu from './Sidemenu_Scene';

import { Actions } from 'react-native-router-flux';


export default class Tab_View extends Component {

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    render() {

        return (

            <Drawer
                ref={(ref) => this._drawer = ref}
                content={<Side_Menu />}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                closedDrawerOffset={-3}
                acceptTap={true}
            >
                <Header
                    centerComponent={{ text: 'รายงานความก้าวหน้าระดับชั้น', style: { fontSize: 20, color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: '#A0522D' }}
                    leftComponent={<Icon
                        type="material icon"
                        name="dehaze"
                        color="#fff"
                        onPress={this.openControlPanel.bind(this)}
                    />}
                />

                <ScrollableTabView
                    style={{ marginTop: 60, backgroundColor: '#cd764d' }}
                    initialPage={this.props.selectedTitle}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <StructList tabLabel="โครงสร้างรายวิชา" data={{ doc: this.props.dataDi }} />

                    <AttendList tabLabel="บันทึกการเข้าเรียน" data={{ doc: this.props.dataDi }} />

                    <RatioList tabLabel="อัตราส่วนคะแนน" data={{ doc: this.props.dataDi }} />

                </ScrollableTabView>

            </Drawer>

        );
    }
}