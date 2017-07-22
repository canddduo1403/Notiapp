
import React from 'react';
import {Router,Scene,Modal,Schema, Actions, Reducer, ActionConst} from 'react-native-router-flux';

import Loginscene from './src/scene/Loginscene';
import Contentcene from './src/scene/Contentcene';
import Assignmentscene from './src/scene/Assignmentscene';
import Studentscene from './src/scene/Studentscene';
import Midtermscene from './src/scene/Midtermscene';
import Finalscene from './src/scene/Finalscene';
import TestChart from './src/scene/TestChart';

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class App extends React.Component{
  render(){
    return(
      <Router  createReducer={reducerCreate}>
        <Scene key = "modal" component ={Modal}>
          <Scene key="Login" component={Loginscene} schema="modal" title="Login" />
          <Scene key="Contentcene" component={Contentcene} schema="modal" title="รายการ" />
          <Scene key="Assignmentscene" component={Assignmentscene} title="บันทึกแผนการสอน" />
          <Scene key="Studentscene" component={Studentscene} title="บันทึกเวลาเรียน"   />
          <Scene key="Midtermscene" component={Midtermscene} title="บันทึกผลสอบกลางภาค"/>
          <Scene key="Finalscene" component={Finalscene} title="บันทึกผลสอบปลายภาค"/>
          <Scene key="TestChart" component={TestChart} title = "Charts" initial ={true} />
        </Scene>
      </Router>
    )
  }
}
