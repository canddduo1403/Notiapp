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

import Documents from '../service/Documents';

import { Actions } from 'react-native-router-flux';

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
        this._getWeek();
    }

    _getWeek() {
        const hostid = this.props.data.profile.hostid
        const week = [];
        var maxWeek = 0;

        Documents.getWeek(hostid, (err, msg) => {
            if (err) return Alert.alert('ผิดพลาด', 'โปรดลองอีกครั้ง',
                [{ text: 'ตกลง', onPress: () => this._getData.bind(this) },
                { text: 'ยกเลิก' }])
            else if (msg.length == 0) return this._getData.bind(this);
            else if (msg.length > 0) {
                for (let i = 0; i < msg.length; i++) {
                    week.push(msg[i].value.doc.week)
                }
                maxWeek = Math.max(...week)
                this._getData(maxWeek, hostid)
            }
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

    render() {
        if (this.state.result != null) {
            return (
                <View style={styles.backgroundStyle}>
                    <Header
                        centerComponent={{ text: 'ติดตามการทำงาน', style: { fontSize: 20, color: '#fff' } }}
                        outerContainerStyles={{ backgroundColor: '#A0522D' }}
                    >
                    </Header>

                    <View style={styles.headerStyle}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.textheaderStyle}>รายการ</Text>
                            <Text style={styles.textheaderStyle}>ความก้าวหน้า</Text>
                        </View>

                        <TouchableOpacity style={styles.listStyle}
                            onPress={() => this._onPresshandeler(0)}
                        >
                            <View style={styles.listContainer}>
                                <Text>แผนการสอน</Text>
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