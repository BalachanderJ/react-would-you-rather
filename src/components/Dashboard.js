import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Dashboard extends Component {
    render() {
        return (
            <div>
                {this.props.autheduser === null && <div>Hello World!</div>}
                <h3 className='center'>Would You Rather</h3>

                <Tabs>
                    <TabList>
                        <Tab>UnAnswered Questions</Tab>
                        <Tab>Answered Questions</Tab>
                    </TabList>

                    <TabPanel>
                        {this.props.unansweredQuestionIds.length > 0 &&
                        <ul className='dashboard-list'>
                            {this.props.unansweredQuestionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id}></Question>
                                </li>
                            ))}
                        </ul>
                        }
                        {this.props.unansweredQuestionIds.length === 0 &&
                        <ul className='dashboard-list'>
                            <li>
                                You have answered all questions
                            </li>
                        </ul>
                        }
                    </TabPanel>
                    <TabPanel>
                        {this.props.answeredQuestionIds.length > 0 &&
                        <ul className='dashboard-list'>
                            {this.props.answeredQuestionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id}></Question>
                                </li>
                            ))}
                        </ul>
                        }
                        {this.props.answeredQuestionIds.length === 0 &&
                        <ul className='dashboard-list'>
                            <li>Ypu don't have any questions answered</li>
                            ))}
                        </ul>
                        }
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps({questions, autheduser}) {
    return {
        autheduser: autheduser,
        answeredQuestionIds: Object.keys(questions)
            .filter((question) => {
                let optionOneSelected = questions[question].optionOne.votes.indexOf(autheduser) !== -1;
                let optionTwoSelected = questions[question].optionTwo.votes.indexOf(autheduser) !== -1;
                return optionOneSelected || optionTwoSelected
            })
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIds: Object.keys(questions)
            .filter((question) => {
                let optionOneSelected = questions[question].optionOne.votes.indexOf(autheduser) === -1;
                let optionTwoSelected = questions[question].optionTwo.votes.indexOf(autheduser) === -1;
                return optionOneSelected && optionTwoSelected
            })
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)