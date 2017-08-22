import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimension
} from 'react-native';

import Documents from '../service/Documents';

import API from '../service/API';

export default class Calweek_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: null,
            weekArray: [],
            dataSum: [],
            maxWeek: 0,

            perStruct: 0,
            perAttend: 0,
            perScoreRatio: 0,

            LperStruct: 0,
            LperAttend: 0,
            LperScoreRatio: 0,

        }

        this._getWeek = this._getWeek.bind(this)
        this._getWeekDoc = this._getWeekDoc.bind(this)
        this._calWeekBeforeProgress = this._calWeekBeforeProgress.bind(this)
        this._calProgress = this._calProgress.bind(this)
    }

    componentDidMount() {
        this._getWeek();
    }

    _getWeek() {
        var doc = this.props.docs;
        var weekArray = [];
        var maxWeek = 0;
        Documents.getWeekdata(doc[0].hostid, (err, msg) => {
            if (err)
                return API.alert('ผิดพลาด', msg);
            else {
                for (var i = 0; i < msg.length; i++) {
                    if (msg[i].value.doc.hostid == doc[0].hostid) {
                        weekArray.push(msg[i].value.doc.week)
                    }
                }

                maxWeek = Math.max(...weekArray)
                this._getWeekDoc(maxWeek, doc[0].hostid)
                this._getLastWeekDoc(maxWeek, doc[0].hostid)
            }
        })
    }

    _getLastWeekDoc(maxWeek, hostid) {
        var start = maxWeek - 1;
        var end = maxWeek;
        var dataSum = [];

        Documents.getWeekDoc(hostid, start, end, (err, msg) => {

            if (err) return API.alert('ผิดพลาด', msg);

            else {
                for (var i = 0; i < msg.length; i++) {
                    if (hostid == msg[i].value.doc.hostid) {
                        for (var j = 0; j < msg[i].value.doc.datasummary.length; j++) {
                            dataSum.push(msg[i].value.doc.datasummary[j])
                        }
                    }

                }
                this._calWeekBeforeProgress(dataSum)
            }
        })

    }

    _getWeekDoc(maxWeek, hostid) {

        var start = maxWeek;
        var end = maxWeek + 1;
        var dataSum = [];

        Documents.getWeekDoc(hostid, start, end, (err, msg) => {

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

      _calWeekBeforeProgress(dataSum) {
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
  
          var LperStruct = Math.floor((sumStruct * 100) / full);
          var LperScoreRatio = Math.floor((sumScoreRatio * 100) / full);
          var LperAttend = Math.floor((sumAttend * 100) / full);
  
          this.setState({ LperStruct: LperStruct, LperScoreRatio: LperScoreRatio, LperAttend: LperAttend })
  
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

        this.setState({ perStruct: perStruct, perScoreRatio: perScoreRatio, perAttend: perAttend })

    }

    render() {
        return (
            <View>
                <Text>{this.state.LperAttend}</Text>
            </View>
        );
    }
}