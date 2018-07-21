import Main from './Main';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions'
import {withRouter} from 'react-router'

function mapStateToProps(state){
    return {
        days: state.days,
        month: state.month,
        year: state.year,
        dayVisible: state.dayVisible,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch)

}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default App