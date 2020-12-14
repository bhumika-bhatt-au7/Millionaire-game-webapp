import React from "react";
import { useHistory } from "react-router";

const ExitPage = (props) => {
  const { fixedAmount, playAgainClicked } = props;
  const history = useHistory();
  return (
    <div>
      <div className="container-fluid bg-dark">
        <div className="row">
          <div className="col p-3">
            <h1 className="text-white p-3">Who wants to be a Millionaire</h1>
          </div>
        </div>
      </div>
      <div className="conatiner">
        <div className="row">
          <div className="col my-5 min-vh-50 ">
            {fixedAmount > 0 ? (
              <h2 className="text-info">
                Congratulations!!! You Win{" "}
                <span className="text-danger">{fixedAmount}</span>
              </h2>
            ) : (
              <h2>Better Luck next time!</h2>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => playAgainClicked(history)}
      >
        Play Again
      </button>
    </div>
  );
};

export default ExitPage;
