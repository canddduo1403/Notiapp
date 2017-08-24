import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import { Icon } from 'react-native-elements';

import Documents from '../service/Documents';

import API from '../service/API';

const Window = Dimensions.get('window');

export default class Calweek_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: null,
            weekArray: [],
            dataSum: [],
            dataSumLastWeek: [],
            maxWeek: 0,

            perStruct: 0,
            perAttend: 0,
            perScoreRatio: 0,
            sumdata: 0,

            lastPerSumdata: 0,

            isLoading: true,

        }

        this._getWeek = this._getWeek.bind(this)
        this._getWeekDoc = this._getWeekDoc.bind(this)
        this._calProgress = this._calProgress.bind(this)
    }

    componentWillMount() {
        this._getWeek();
    }

    _getWeek() {
        var doc = this.props.docs;
        var weekArray = [];
        var maxWeek = 0;
        Documents.getWeekdata(doc.hostid, (err, msg) => {
            if (err)
                return API.alert('ผิดพลาด', msg);
            else {
                for (var i = 0; i < msg.length; i++) {
                    if (msg[i].value.doc.hostid == doc.hostid) {
                        weekArray.push(msg[i].value.doc.week)
                    }
                }

                maxWeek = Math.max(...weekArray)
                this._getWeekDoc(maxWeek, doc.hostid)
                this.setState({ maxWeek: maxWeek })
            }
        })
    }

    _getWeekDoc(maxWeek, hostid) {

        var dataSumLastWeek = [];

        var dataSum = [];

        var lastFull = 0;
        var lastSumstruct = 0;
        var lastSumRatio = 0;
        var lastSumAttend = 0;

        var lastSumPer = 0;

        Documents.getWeekDoc(hostid, maxWeek - 1, maxWeek, (err, msg) => {

            if (err) return API.alert('ผิดพลาด', msg);

            else {
                for (var i = 0; i < msg.length; i++) {
                    if (hostid == msg[i].value.doc.hostid) {
                        for (var j = 0; j < msg[i].value.doc.datasummary.length; j++) {
                            dataSumLastWeek.push(msg[i].value.doc.datasummary[j])
                        }
                    }
                }

                for (var k = 0; k < (dataSumLastWeek.length) / 2; k++) {
                    lastSumstruct += dataSumLastWeek[k][1];
                    lastSumRatio += dataSumLastWeek[k][2];
                    lastSumAttend += dataSumLastWeek[k][3];
                    lastFull += dataSumLastWeek[k][4];
                }

                var lastPerStruct = Math.floor(((lastSumstruct / lastFull) * 100));
                var lastPerRatio = Math.floor(((lastSumRatio / lastFull) * 100));
                var lastPerAttend = Math.floor(((lastSumAttend / lastFull) * 100));

                var lastPerSumdata = Math.floor(((lastPerStruct + lastPerRatio + lastPerAttend) / 300) * 100)

                this.setState({ lastPerSumdata: lastPerSumdata })
            }

        })


        Documents.getWeekDoc(hostid, maxWeek, maxWeek + 1, (err, msg) => {

            if (err) return API.alert('ผิดพลาด', msg);

            else {
                for (var i = 0; i < msg.length; i++) {
                    if (hostid == msg[i].value.doc.hostid) {
                        for (var j = 0; j < msg[i].value.doc.datasummary.length; j++) {
                            dataSum.push(msg[i].value.doc.datasummary[j])
                        }
                    }
                }
                this._calProgress(dataSum)
            }
        })
    }

    _calProgress(dataSum) {

        var full = 0;
        var sumStruct = 0;
        var sumScoreRatio = 0;
        var sumAttend = 0;
        for (var i = 0; i < ((dataSum.length) / 2); i++) {
            sumStruct += dataSum[i][1];
            sumScoreRatio += dataSum[i][2];
            sumAttend += dataSum[i][3];
            full += dataSum[i][4];
        }

        var perStruct = Math.floor((sumStruct * 100) / full);
        var perScoreRatio = Math.floor((sumScoreRatio * 100) / full);
        var perAttend = Math.floor((sumAttend * 100) / full);

        var sumdata = Math.floor(((perStruct + perScoreRatio + perAttend) / 300) * 100)

        this.setState({
            perStruct: perStruct,
            perScoreRatio: perScoreRatio,
            perAttend: perAttend,
            sumdata: sumdata,
            isLoading: !this.state.isLoading
        })

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>Load</Text>
                </View>
            );
        }
        else {
            const lastWeek = this.state.lastPerSumdata;
            return (
                <View>
                    <View style={styles.header}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.textHeaderStyle}>โรงเรียน</Text>
                        </View>
                        <View style={styles.boxContainer}>
                            <Text style={styles.textHeaderStyle}>สัปดาห์ที่</Text>
                        </View>
                        <View style={styles.boxContainer}>
                            <Text style={styles.textHeaderStyle}>ภาพรวมการทำงาน</Text>
                        </View>
                        <View style={styles.boxContainer}>
                            <Text style={styles.textHeaderStyle}>หมายเหตุ</Text>
                        </View>
                    </View>
                </View>
            );

        }

    }
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        marginTop: 10,
        backgroundColor: '#F4A460',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20

    },

    boxContainer: {
        padding: 3,
        height: 50,
        width: Window.length / 4,
        alignItems: 'center',
        marginTop: 20
    },

    bodyContainer: {
        padding: 10,
        marginTop: 10,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAEBD7',
    },

    bodyBoxContainer: {
        width: Window.length / 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textHeaderStyle: {
        fontWeight: 'bold',
        fontSize: 15
    }
})