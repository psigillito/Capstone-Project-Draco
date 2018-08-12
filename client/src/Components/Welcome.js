import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

const alertMessages = [
    "The American College of Sports Medicine recommends performing cardio exercises at least 3-4 times per week for 30 minutes to optimize heart health!",
    "The longer and lower the intensity of an exercise bout, the more calories from fat will be burned. However, more intense exercise sessions are still valuable as the total caloric expenditure can be quite high.",
    "You should aim for losing no more than 2 lbs per week. As attempting to lose more than this target can be unsafe and lead to eventually weight regain.",
    "Improving fitness is usually tackled by either increasing the volume of exercise performed or by increasing the intensity of exercise performed.",
    "Improving your sports performance is usually done by increasing the volume of sport specific training, or by doing general training to improve your areas of weakness.",
    "To improve strength focus on whole body movements performed in a few sets of 4-6 reps with as much resistance as possible.",
    "To improve power focus on whole body movements performed in a few sets of 5-8 reps with little resistance but done as quickly as possible.",
    "Jumping exercises or plyometrics are a great way to improve power. Just make sure that you have a good base of strength before performing such exercises.",
    "Muscular endurance is improved by performing resistance exercises in a few sets of 10-20 (or more) reps performed with light to moderate resistance.",
    "To improve flexibility perform both short dynamic stretching movements as well as prolonged stretches for 3-5 minutes per stretch. Alternatively stretching workouts such as Yoga are a great way to improve flexibility.",
    "Some limitations in flexibility might be related to improvements in strength or aerobic ability in sports such as running.",
    "You have recommendations turned off. To enable visit the goals quiz and select your goal!",
    "If you want to improve aerobic fitness try High Intensity Interval Training (or H.I.I.T), which intersperes high intensity bouts with lower intensity recovery bouts.",
    "If you want to improve aerobic fitness try increasing the volume (gradually) or your running, cycling, swimming, etc.",
    "If you want to improve speed, focus on improving both strength and power as these are both vital components of speed.",
    "An often overlooked facet of sport performance is recovery! Make sure you recover between workouts, get plenty of sleep, and eat a healthy diet.",
    "Make sure to perform resistance training 2-3 times per week in addition to cardio. While performing resistance training does not necessarily burn a lot of calories. Building muscle will burn calories!"
];

class Welcome extends Component {
    constructor(props) {
    super(props);

    this.state = {
        visible: true
    };

    this.onDimiss = this.onDimiss.bind(this);
    }

    onDimiss() {
        this.setState({visible: false});
    }

    randArrayIndex(array) {
        return array[Math.floor(Math.random() * Math.floor(array.length - 1))];
    }

    chooseMessage() {
        var alertText = "";
        switch (this.props.goals.primaryGoal) {
            case 1:
                alertText = alertMessages[this.randArrayIndex([0, 5, 8, 9])];
                break;
            case 2:
                alertText = alertMessages[this.randArrayIndex([1, 2, 16])];
                break;
            case 3:
                alertText = alertMessages[this.randArrayIndex([3, 5, 6, 7, 8, 9, 10, 12, 13])];
                break;
            case 4:
                alertText = alertMessages[this.randArrayIndex([4, 5, 6, 7, 12, 13, 14, 15])];
                break;
            default:
                alertText = alertMessages[11];
        }
        return alertText;
    }
    render() {
        if (!this.props.goals) {
            return null;
        }
        return (
            <div className="row">
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDimiss}>
                    {this.chooseMessage()}
                </Alert>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        month: state.month,
        year: state.year,
        monthStatistics: state.monthStatistics
    }
}

export default connect(mapStateToProps)(Welcome);