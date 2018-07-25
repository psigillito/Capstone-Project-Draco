import Main from './Main';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions'
import {withRouter} from 'react-router'

function mapStateToProps(state){
    return {
        //days is array of days in a month 
        days: state.days,
        auth: state.auth,
        trainingPlans: state.trainingPlans,
        workouts: state.workouts,
        day: state.day,
        month: state.month,
        year: state.year,
        weekDay: state.weekDay

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch)

}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default App