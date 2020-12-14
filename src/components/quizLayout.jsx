import React, { Component } from "react";

export class QuizLayout extends Component {
  render() {
    const {
      showAnswer,
      quizQuestions,
      questionCounter,
      quizQuestionIndex,
      answerClicked,
      exitClicked,
      totalMoney,
      timer,
      restartClicked,
      fixedAmount,
      history,
    } = this.props;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <h1 className="bg-info text-center text-white p-3">
            who wants to be a millionaire
          </h1>
          <h3>
            <span className="m-5 p-3 text-black-50">
              Total Money : {totalMoney}
            </span>
            <span className="m-5 p-3 text-black-50">
              Guaranteed Amount : {fixedAmount}
            </span>
            <span className="m-5 p-3 text-black-50">Time Left : {timer}</span>
          </h3>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-9 text-center min-vh-50">
              {quizQuestions.length > 0 ? (
                <div className="container col-8 mt-5 p-5">
                  <div className="row">
                    <div
                      className="col-12 p-4 m-2 bg-info text-white rounded-pill border-bottom "
                      dangerouslySetInnerHTML={{
                        __html: quizQuestions[quizQuestionIndex].question,
                      }}
                    ></div>
                  </div>

                  <div className="row">
                    {quizQuestions[quizQuestionIndex].answers.map((answer) => {
                      const { correct_answer } = quizQuestions[
                        quizQuestionIndex
                      ];
                      const bgColor = showAnswer
                        ? answer === correct_answer
                          ? "bg-success"
                          : "bg-danger"
                        : "bg-info";
                      return (
                        <div
                          key={answer}
                          className={`${bgColor} col-5 ml-4 mr-3 p-3 m-2 text-white rounded-pill border-bottom`}
                          onClick={() => answerClicked(answer, history)}
                          dangerouslySetInnerHTML={{
                            __html: answer,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                  <h2>
                    <span className="badge bg-secondary text-white rounded-pill border-bottom p-3 mb-0">
                      Type : {quizQuestions[quizQuestionIndex].difficulty}
                    </span>
                  </h2>

                  <button
                    type="button"
                    className="btn btn-danger btn-lg px-5 mt-5"
                    onClick={() => exitClicked(history)}
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <div className="container col-8 mt-5 p-5">
                  <div className="row">
                    <div className="col-12 p-4 m-2 bg-secondary text-white rounded-pill border-bottom">
                      <h1>Cannot fetch Questions! Please re-Start</h1>
                    </div>
                    <div className="col-12 p-4 m-2 text-white">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => restartClicked(history)}
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-3 text-center d-flex flex-column-reverse">
              {questionCounter.map((count) => (
                <div
                  className={
                    count.id === quizQuestionIndex + 1
                      ? `mh-25 mw-100 py-2 bg-secondary text-white rounded-pill border-bottom`
                      : `mh-25 mw-100 py-2  bg-info text-white rounded-pill border-bottom`
                  }
                  key={count.id}
                >
                  {count.money}
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QuizLayout;
