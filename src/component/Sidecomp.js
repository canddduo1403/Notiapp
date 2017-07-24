import React,{Component,PropTypes} from 'react';
import {StyleSheet,
    View,
    Text,
    ToolbarAndroid,
    TouchableOpacity,
} from 'react-native';

import {Icon} from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

export default class Sidecomp extends Component{
    static contextTypes = {
        drawer:PropTypes.object.isRequired,
    };

    render(){
        const{drawer} = this.context
        return(
            <View>
                <TouchableOpacity onPress={()=>{drawer.close();Actions.Assignmentscene.call()}}>{'Assignmentscene'}>
                    <View>
                         <Icon name='assignment' size = {50}raised = {true}/> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{drawer.close();Actions.Studentscene.call()}}>{'Studentscene'}>
                    <View>
                         <Icon name='users' type='font-awesome' size = {50}raised = {true} /> 
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={()=>{drawer.close();Actions.Midtermscene.call()}}>{'Midtermscene'}>
                    <View>
                         <Icon name='book' type='foundation' size = {50} raised = {true} /> 
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{drawer.close();Actions.Finalscene.call()}}>{'Finalscene'}>
                    <View >
                         <Icon name='graduation-cap' type='font-awesome' size = {50} raised = {true} /> 
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
