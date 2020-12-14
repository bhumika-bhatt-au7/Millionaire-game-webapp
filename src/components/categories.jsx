import React, { Component, Fragment } from "react";
import axios from "axios";

class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount = async () => {
    const categoriesData = await axios.get(
      "https://opentdb.com/api_category.php"
    );
    const categories = categoriesData.data.trivia_categories;
    this.setState({ categories });
  };

  render() {
    return (
      <Fragment>
        {this.state.categories ? (
          <div>
            <div className="container-fluid min-vh=100 bg-info ">
              <div className="container  ">
                <h1 className="text-center text-white p-5">
                  Select the Category you like!
                </h1>
              </div>
            </div>
            <div className="container bg-light">
              <div className="row">
                {this.state.categories.map((category) => (
                  <div
                    className="col mt-5 text-center shadow-sm p-3 mb-3 mx-3 bg-info rounded text-white"
                    key={category.id}
                  >
                    <div
                      className="myhover"
                      style={{
                        minHeight: "150px",
                        minWidth: "150px",
                        padding: "20px",
                      }}
                      onClick={() =>
                        this.props.categorySelected(
                          category.id,
                          this.props.history
                        )
                      }
                    >
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading .....</h1>
        )}
      </Fragment>
    );
  }
}

export default Categories;
