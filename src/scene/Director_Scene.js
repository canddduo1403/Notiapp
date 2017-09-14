import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { Header, Icon } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import Drawer from 'react-native-drawer';

import Documents from '../service/Documents';

import API from '../service/API';

import Side_Menu from './Sidemenu_Scene';

const Window = Dimensions.get('window');

export default class Director_Scene extends Component {

    constructor(props) {
        super(props)
        this.state = {
            result: null,
            doc: null
        }
    }

    componentDidMount() {
        API.getUser((err, msg) => {
            this._getWeek();
        })
    }

    _getWeek() {
        API.getCredential((err, msg) => {
            if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง'[{ text: 'Ok', onPress: () => console.log('Ok pressed') }]);
            API.loadUserInfo(msg, (err, msg) => {
                console.log(msg)
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
                        }
                    })
                }
            })
        })
    }

    _getData(maxWeek, hostid) {
        var doc = {};
        var result = {};
        var full = 0;
        var struct = 0;
        var attendant = 0;
        var ratio = 0;
        Documents.getWeekDoc(hostid, maxWeek, maxWeek + 1, (err, msg) => {
            if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง',
                [{ text: 'ตกลง', onPress: () => this._getData.bind(this) },
                { text: 'ยกเลิก' }])
            else if (msg.length == 0) return this._getData.bind(this);
            else if (msg.length > 0) {
                doc = msg[0].value.doc
                for (let i = 0; i < doc.datasummary.length; i++) {
                    full += doc.datasummary[i][4];
                    struct += doc.datasummary[i][1];
                    ratio += doc.datasummary[i][2];
                    attendant += doc.datasummary[i][3];
                }
                result.full = full;
                result.struct = Math.floor((struct / full) * 100);
                result.ratio = Math.floor((ratio / full) * 100);
                result.attendant = Math.floor((attendant / full) * 100);

                this.setState({ result: result, doc: doc })

            }
        })

    }

    _onPresshandeler(selectedTitle) {
        Actions.Tab_Scene({ dataDi: this.state.doc, selectedTitle })

    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };


    render() {
        if (this.state.result != null) {
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    content={<Side_Menu />}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    closedDrawerOffset={-3}
                    acceptTap={true}
                >
                    <View style={styles.backgroundStyle}>

                        <Header
                            centerComponent={{ text: 'ติดตามการทำงาน', style: { fontSize: 20, color: '#fff' } }}
                            outerContainerStyles={{ backgroundColor: '#A0522D' }}
                            leftComponent={<Icon
                                type="material icon"
                                name="dehaze"
                                color="#fff"
                                onPress={this.openControlPanel.bind(this)}
                            />}
                        />


                        <View style={styles.headerStyle}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.textheaderStyle}>รายการ</Text>
                                <Text style={styles.textheaderStyle}>ความก้าวหน้า</Text>
                            </View>

                            <TouchableOpacity style={styles.listStyle}
                                onPress={() => this._onPresshandeler(0)}
                            >
                                <View style={styles.listContainer}>
                                    <Text>โครงสร้างรายวิชา</Text>
                                    {
                                        this.state.result.struct >= 0 && this.state.result.struct < 30 ?
                                            <Icon name='emoticon-sad'
                                                type='material-community'
                                                color='#FF0000'
                                            />
                                            : this.state.result.struct >= 30 && this.state.result.struct < 60 ?
                                                <Icon name='emoticon-neutral'
                                                    type='material-community'
                                                    color='#FF8C00' />
                                                : this.state.result.struct >= 60 && this.state.result.struct <= 100 ?
                                                    <Icon name='emoticon-happy'
                                                        type='material-community'
                                                        color='#006400' />
                                                    : null
                                    }
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listStyle}
                                onPress={() => this._onPresshandeler(1)}
                            >
                                <View style={styles.listContainer}>
                                    <Text>บันทึกการเข้าเรียน</Text>

                                    {
                                        this.state.result.attendant >= 0 && this.state.result.attendant < 30 ?

                                            <Icon name='emoticon-sad'
                                                type='material-community'
                                                color='#FF0000' />

                                            : this.state.result.attendant >= 30 && this.state.result.attendant < 60 ?
                                                <Icon name='emoticon-neutral'
                                                    type='material-community'
                                                    color='#FF8C00' />

                                                : this.state.result.attendant >= 60 && this.state.result.attendant <= 100 ?
                                                    <Icon name='emoticon-happy'
                                                        type='material-community'
                                                        color='#006400' />
                                                    : null
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listStyle}
                                onPress={() => this._onPresshandeler(2)}
                            >
                                <View style={styles.listContainer}>
                                    <Text>อัตราส่วนคะแนน</Text>
                                    {
                                        this.state.result.ratio >= 0 && this.state.result.ratio < 30 ?
                                            <Icon name='emoticon-sad'
                                                type='material-community'
                                                color='#FF0000'
                                            />
                                            : this.state.result.ratio >= 30 && this.state.result.ratio < 60 ?
                                                <Icon name='emoticon-neutral'
                                                    type='material-community'
                                                    color='#FF8C00' />
                                                : this.state.result.ratio >= 60 && this.state.result.ratio <= 100 ?
                                                    <Icon name='emoticon-happy'
                                                        type='material-community'
                                                        color='#006400' />
                                                    : null
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View >
                </Drawer>
            );

        }

        return null;


    }

}

const styles = StyleSheet.create({

    backgroundStyle: {
        flex: 1,
        backgroundColor: '#FFEBCD'
    },

    headerStyle: {
        marginTop: 80,
        backgroundColor: '#F4A460',
        height: 100
    },

    headerContainer: {
        width: Window / 2,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    textheaderStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    listStyle: {
        padding: 10,
        height: 60,
        backgroundColor: '#FFDEAD',
        marginTop: 20
    },

    listContainer: {
        width: Window / 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

});