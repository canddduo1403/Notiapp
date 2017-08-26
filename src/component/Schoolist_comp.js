import React, { Component } from 'react';

import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';

import School_Detail from './Schooldetail_comp';

import API from '../service/API';

import Mapping from '../service/Testuser';

import Documents from '../service/Documents';

import { Actions } from 'react-native-router-flux';

import { Button, Header } from 'react-native-elements';

import Spinner from 'react-native-spinkit';


const Window = Dimensions.get('window');

export default class Schoolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: [],
            res: [],
            maxWeek: 0,
            lastWeekprogress: [],

            isLoading: true,
            index: 0,
            types: ['ChasingDots'],
            size: 100,
            color: "#FFFFFF",
        };
    }

    componentDidMount() {
        API.getUser((err, msg) => {
            this._loadUserInfo();
        });
    }


    _loadUserInfo() {
        API.getCredential((err, msg) => {
            if (err) return API.alert('ผิดพลาด', msg);
            API.loadUserInfo(msg, (err, msg) => {
                if (err) {
                    return API.alert('ผิดพลาด', msg);
                } else {
                    var mapping = null;
                    var province = [];
                    var hostid = [];

                    for (var k = 0; k < msg.roles.length; k++) {

                        if (msg.roles[k] === "ผู้อำนวยการ") {
                            Actions.Director_Scene();
                            break;
                        }

                    }

                    for (var i = 0; i < Mapping.mappingqcoachvshost.length; i++) {
                        var tmp = Mapping.mappingqcoachvshost[i];
                        if (tmp.staffid == msg.profile.staffid) {
                            mapping = tmp;
                            for (var j = 0; j < mapping.host.length; j++) {
                                hostid.push(mapping.host[j].hostid)
                                province.push(mapping.host[j].province)
                            }
                            break;
                        }
                    }
                    this.setState({ province: province })
                    this._getWeek(hostid)
                }

            });
        });
    }

    _getWeek(hostid) {
        var week = []
        var hostdata = []
        var maxWeek = 0;
        var lastWeekdata = [];
        var lastWeekprogress = [];
        for (let i = 0; i < hostid.length; i++) {
            Documents.getWeek(hostid[i], (err, msg) => {
                if (err) return API.alert('ผิดพลาด', msg);
                else if (msg.length > 0) {
                    hostdata.push(msg)
                    for (let j = 0; j < hostdata.length; j++) {
                        for (let k = 0; k < hostdata[j].length; k++) {
                            week.push(hostdata[j][k].value.doc.week)
                        }
                    }
                }
                maxWeek = Math.max(...week)
                Documents.getWeekDoc(hostid[i], maxWeek - 1, maxWeek, (err, msg) => {
                    if (err) return API.alert('ผิดพลาด', msg);
                    else if (msg.length > 0) {
                        if (hostid[i] == msg[i].value.doc.hostid) {
                            lastWeekdata.push(msg[i].value.doc)
                            lastWeekdata.sort((a, b) => {
                                return a.hostid - b.hostid
                            })
                        }

                        if (lastWeekdata.length == 2) {
                            for (let k = 0; k < lastWeekdata.length; k++) {
                                var lastSt = 0
                                var lastRatio = 0
                                var lastAttend = 0
                                var lastFull = 0
                                var lastPerprogress = 0

                                for (let j = 0; j < lastWeekdata[k].datasummary.length; j++) {
                                    lastSt += lastWeekdata[k].datasummary[j][1];
                                    lastRatio += lastWeekdata[k].datasummary[j][2];
                                    lastAttend += lastWeekdata[k].datasummary[j][3];
                                    lastFull += lastWeekdata[k].datasummary[j][4];
                                }
                                lastPerprogress = Math.floor(((lastSt + lastRatio + lastAttend) / (lastFull * 3)) * 100)
                                lastWeekprogress.push(lastPerprogress)

                            }

                        }

                    }
                    console.log(lastWeekprogress)
                    if (lastWeekprogress.length == 2) {
                        this.setState({ maxWeek: maxWeek, lastWeekprogress: lastWeekprogress })
                        this._getWeekDoc(hostid, maxWeek)
                    }
                })

            })

        }
    }

    _getWeekDoc(hostid, maxWeek) {
        const doc = [];
        var full = 0;
        var struct = 0;
        var sRatio = 0;
        var attend = 0;
        const res = [];
        const resObj = {};

        for (let i = 0; i < hostid.length; i++) {
            Documents.getWeekDoc(hostid[i], maxWeek, maxWeek + 1, (err, msg) => {
                if (err) return API.alert('ผิดพลาด', msg);
                else if (msg.length > 0) {
                    if (hostid[i] == msg[i].value.doc.hostid) {
                        doc.push(msg[i].value.doc)
                        doc.sort((a, b) => {
                            return a.hostid - b.hostid
                        })
                    }
                }
                if (doc.length == 2) {
                    this._calData(doc)
                }
            })
        }
    }

    _calData(doc) {

        var province = this.state.province
        var maxWeek = this.state.maxWeek
        var lastWeek = this.state.lastWeekprogress

        var res = [];
        for (let i = 0; i < doc.length; i++) {
            var st = 0;
            var ratio = 0;
            var at = 0;
            var full = 0;
            var perProgress = 0;
            for (let j = 0; j < doc[i].datasummary.length; j++) {
                st += doc[i].datasummary[j][1]
                ratio += doc[i].datasummary[j][2]
                at += doc[i].datasummary[j][3]
                full += doc[i].datasummary[j][4]
            }
            perProgress = Math.floor(((st + ratio + at) / (full * 3)) * 100)
            res.push({
                'hostname': doc[i].hostname,
                'struct': st,
                'ratio': ratio,
                'attend': at,
                'full': full,
                'province': province[i],
                'preprogress': perProgress,
                'week': maxWeek,
                'lastweek': lastWeek[i]
            })
        }

        this.setState({ res: res, isLoading: !this.state.isLoading })
    }

    renderSchoolList() {
        return this.state.res.map(
            school => <School_Detail key={school.hostname}
                schoolData={school} />
        );
    }


    render() {

        console.log(this.state.isLoading)


        Keyboard.dismiss()
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#808080'
                }}>
                    <Spinner isVisible={this.state.isLoading} size={this.state.size} type={this.state.types[this.state.index]} color={this.state.color} />
                </View>

            );
        }


        return (

            <View style={styles.screenStyle}>
                <Header
                    centerComponent={{ text: 'โรงเรียน', style: { fontSize: 20, color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: '#A0522D' }}
                >
                </Header>

                <ScrollView style={{ marginTop: 100 }}>
                    {this.renderSchoolList()}
                </ScrollView>
            </View>
        );

    }

}

const styles = StyleSheet.create({

    screenStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFEBCD'
    },

});
