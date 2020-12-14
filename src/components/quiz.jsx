import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Categories, QuizLayout, Exit } from "./index";

export class Quiz extends Component {
  state = {
    quizQuestions: [],
    quizQuestionIndex: 0,
    questionCounter: [
      { id: 1, money: 1000, timer: 15 },
      { id: 2, money: 5000, timer: 15 },
      { id: 3, money: 10000, timer: 15 },
      { id: 4, money: 20000, timer: 15 },
      { id: 5, money: 50000, timer: 15 },
      { id: 6, money: 100000, timer: 30 },
      { id: 7, money: 200000, timer: 30 },
      { id: 8, money: 400000, timer: 30 },
      { id: 9, money: 800000, timer: 30 },
      { id: 10, money: 1000000, timer: 30 },
      { id: 11, money: 2000000, timer: 45 },
      { id: 12, money: 3000000, timer: 45 },
      { id: 13, money: 6000000, timer: 45 },
      { id: 14, money: 8000000, timer: 45 },
      { id: 15, money: 10000000, timer: 45 },
    ],
    showAnswer: false,
    totalMoney: 0,
    fixedAmount: 0,
    timer: 0,
  };

  selectedCategoryHandler = async (id, history) => {
    const quizData = [];
    const quizDataEasy = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=${id}&difficulty=easy&type=multiple`
    );
    const quizDataMedium = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=${id}&difficulty=medium&type=multiple`
    );
    const quizDataHard = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=${id}&difficulty=hard&type=multiple`
    );
    const easyData = quizDataEasy.data.results;
    const mediumData = quizDataMedium.data.results;
    const hardData = quizDataHard.data.results;
    quizData.push(...easyData);
    quizData.push(...mediumData);
    quizData.push(...hardData);
    const quizQuestions = quizData.map((ques) => ({
      ...ques,
      answers: [ques.correct_answer, ...ques.incorrect_answers].sort(
        () => Math.random() - 0.5
      ),
    }));
    this.setState({ quizQuestions: quizQuestions });
    this.startTimer(15, history);
    history.replace("/quiz");
  };

  answerHandler = (answer, history) => {
    const { quizQuestions, quizQuestionIndex, questionCounter } = this.state;
    const { correct_answer } = quizQuestions[quizQuestionIndex];
    // clear timeinterval and start with the new value
    let value = questionCounter[quizQuestionIndex + 1].timer;
    clearInterval(this.counter);
    //check the answer ,if correct move to next question update the total cost and questionIndex

    this.setState({ showAnswer: true });
    if (answer === correct_answer) {
      this.startTimer(value, history);
      if (quizQuestionIndex === 9) {
        this.setState({ fixedAmount: questionCounter[9].money });
      } else if (quizQuestionIndex === 4) {
        this.setState({ fixedAmount: questionCounter[4].money });
      }
      if (quizQuestionIndex < quizQuestions.length - 1) {
        setTimeout(() => {
          this.setState({ quizQuestionIndex: quizQuestionIndex + 1 });
          this.setState({ showAnswer: false });
        }, 1000);
      } else {
        this.setState({ fixedAmount: questionCounter[14].money });
        history.replace("/exit");
      }
      this.setState({
        totalMoney: questionCounter[quizQuestionIndex].money,
      });
    }
    // if wrong go to exit page with the total money earned msg
    else {
      if (quizQuestionIndex >= 10) {
        this.setState({ fixedAmount: questionCounter[9].money });
      } else if (quizQuestionIndex >= 5) {
        this.setState({ fixedAmount: questionCounter[4].money });
      }
      setTimeout(() => {
        history.replace("/exit");
        this.setState({ showAnswer: false });
      }, 500);
    }
  };

  exitHandler = (history) => {
    const { totalMoney, fixedAmount } = this.state;
    this.setState({ fixedAmount: fixedAmount + totalMoney });
    history.replace("/exit");
  };

  playAgainHandler = (history) => {
    this.setState({
      quizQuestionIndex: 0,
      totalMoney: 0,
      fixedAmount: 0,
      timer: 0,
    });
    history.replace("/");
  };

  startTimer = (time, history) => {
    const timer = () => {
      this.setState({ timer: time });
      time--;
      if (time <= 0) {
        clearInterval(this.counter);
        history.replace("/exit");
      }
    };
    this.counter = setInterval(timer, 1000);
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/exit"
              render={(props) => (
                <Exit
                  fixedAmount={this.state.fixedAmount}
                  playAgainClicked={this.playAgainHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/quiz"
              render={(props) => (
                <QuizLayout
                  questionCounter={this.state.questionCounter}
                  quizQuestions={this.state.quizQuestions}
                  quizQuestionIndex={this.state.quizQuestionIndex}
                  answerClicked={this.answerHandler}
                  exitClicked={this.exitHandler}
                  totalMoney={this.state.totalMoney}
                  timer={this.state.timer}
                  showAnswer={this.state.showAnswer}
                  restartClicked={this.playAgainHandler}
                  fixedAmount={this.state.fixedAmount}
                  {...props}
                />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <Categories
                  categorySelected={this.selectedCategoryHandler}
                  {...props}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Quiz;
