import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import StructList from '../component/Structclass_comp'

import AttendList from '../component/Attdantclass_comp'

import RatioList from '../component/Ratioclass_comp'

export default class Tab_View extends Component {
    render() {
        return (
            <ScrollableTabView
                style={{ marginTop: 20, backgroundColor:'#FFE4B5'}}
                initialPage={this.props.selectedTitle}
                renderTabBar={() => <ScrollableTabBar />}
            >

                <StructList tabLabel="โครงสร้างรายวิชา" data={{ doc: this.props.dataDi }} />

                <AttendList tabLabel="บันทึกการเข้าเรียน" data={{ doc: this.props.dataDi }} />

                <RatioList tabLabel="อัตราส่วนคะแนน" data={{ doc: this.props.dataDi }} />

            </ScrollableTabView>
        );
    }
}