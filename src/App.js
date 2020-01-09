import React, { Component } from "react";
import Person from "./components/Person/Person";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      { name: "Slava", age: 30 },
      { name: "Sanya", age: 35 }
    ]
  };

  switchNameHandler = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <h1>Hello React!</h1>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
      </div>
    );

    // return React.createElement(
    //   "div",
    //   null,
    //   React.createElement("h1", null, "Test")
    // );
  }
}

export default App;
