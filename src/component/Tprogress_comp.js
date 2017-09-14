import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';

import { Header, Icon } from 'react-native-elements';

import Drawer from 'react-native-drawer';

import { Actions } from 'react-native-router-flux';

import Side_Menu from '../scene/Sidemenu_Scene';

import TnameList from './TnameList_comp';

import Documents from '../service/Documents';

import API from '../service/API';

const Window = Dimensions.get('window');

export default class Personprogress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            hostid: '',
            dataExcel: []
        }
    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    componentDidMount() {
        API.getUser((err, msg) => {
            this._getWeek();
        })
    }

    _getWeek() {
        API.getCredential((err, msg) => {
            if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง'[{ text: 'Ok', onPress: () => console.log('Ok pressed') }]);
            API.loadUserInfo(msg, (err, msg) => {
                if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง'[{ text: 'Ok', onPress: () => console.log('Ok pressed') }]);
                else {
                    const hostid = msg.profile.hostid
                    Documents.getWeek(hostid, (err, msg) => {
                        if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง',
                            [{ text: 'ตกลง', onPress: () => this._getData.bind(this) },
                            { text: 'ยกเลิก' }])
                        if (msg.length > 0) {
                            var week = [];
                            var maxWeek = 0;
                            for (let i = 0; i < msg.length; i++) {
                                week.push(msg[i].value.doc.week)
                            }
                            maxWeek = Math.max(...week)
                            this._getData(maxWeek, hostid)
                            this.setState({ hostid: hostid })
                        }
                    })
                }
            })
        })
    }

    _getData(maxWeek, hostid) {
        var dataArr = [];
        var dataExcel = [];
        var dataObj = {};
        var nameArr = [];
        var uniqName = [];
        var subname = [];
        var classname = [];
        Documents.getWeekDoc(hostid, maxWeek, maxWeek + 1, (err, msg) => {
            if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง',
                [{ text: 'ตกลง', onPress: () => this._getData.bind(this) },
                { text: 'ยกเลิก' }])
            else if (msg.length == 0) return this._getData.bind(this);
            else if (msg.length > 0) {
                dataExcel.push(msg[0].value.doc.dataexcel)
                for (let i = 0; i < msg[0].value.doc.dataexcel.length; i++) {
                    nameArr.push(msg[0].value.doc.dataexcel[i][0])
                }
                uniqName = [...new Set(nameArr)];
                uniqName.sort(function (a, b) {
                    return a.localeCompare(b)
                });
                for (let i = 0; i < uniqName.length; i++) {
                    dataObj = {
                        'tname': uniqName[i]
                    }
                    dataArr.push(dataObj)
                }
                this.setState({ dataArr: dataArr, dataExcel: dataExcel })
            }
        });

    }


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
                    centerComponent={{ text: 'ติดตามการทำงานรายบุคคล', style: { fontSize: 20, color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: '#A0522D' }}
                    leftComponent={<Icon
                        type="material icon"
                        name="dehaze"
                        color="#fff"
                        onPress={this.openControlPanel.bind(this)}
                    />}
                />
                <View style={{ backgroundColor: '#FFDEAD', flex: 1, marginTop: 60 }}>

                    <View style={styles.headerStyle}>
                        <Text style={styles.titleStyle}>ชื่อ-นามสกุล</Text>
                    </View>

                    <FlatList
                        data={this.state.dataArr}
                        extraData={this.state}
                        keyExtractor={item => item.tname}
                        renderItem={({ item }) => <TnameList data={item} dataexcel={this.state.dataExcel}/>}
                    />

                </View>

            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        width: Window.width - 15,
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ffbf61',
        padding: 10,
        marginLeft: 10,
    },

    titleStyle: {
        fontSize: 18,
        marginLeft: 10
    }
})