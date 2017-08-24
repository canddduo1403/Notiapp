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

import Calweek_comp from './Calweek_comp';

import API from '../service/API';

import Mapping from '../service/Testuser';

import Documents from '../service/Documents';

import { Actions } from 'react-native-router-flux';

import { Card, ListItem, Button, ButtonGroup, Icon, Header } from 'react-native-elements';

import Spinner from 'react-native-spinkit';

const Window = Dimensions.get('window');

export default class Structchart_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: [],
            res: [],
            isLoading: true,
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
        var docWeekdata = []
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
                this._getWeekDoc(hostid, maxWeek)
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
        var res = [];
        for (let i = 0; i < doc.length; i++) {
            var st = 0;
            var ratio = 0;
            var at = 0;
            var full = 0;
            for (let j = 0; j < doc[i].datasummary.length; j++) {
                st += doc[i].datasummary[j][1]
                ratio += doc[i].datasummary[j][2]
                at += doc[i].datasummary[j][3]
                full += doc[i].datasummary[j][4]
            }
            res.push({
                'hostname': doc[i].hostname,
                'struct': st,
                'ratio': ratio,
                'attend': at,
                'full': full,
                'province': province[i]
            })
        }
        console.log(res)
        this.setState({ res: res })
    }



    render() {


        Keyboard.dismiss()
        return (

            <View style={styles.screenStyle}>


            </View>
        );

    }

}

const styles = StyleSheet.create({

    screenStyle: {
        flex: 1,
        backgroundColor: '#FFEBCD'
    }

});
