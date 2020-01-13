import React, { Component } from "react";
import Person from "./components/Person/Person";
import Radium, { StyleRoot } from "radium";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      { id: 1, name: "Slava", age: 30 },
      { id: 2, name: "Sanya", age: 35 }
    ],
    showPersons: false
  };

  nameChangedHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === personId;
    });

    const newPerson = {
      ...this.state.persons[personIndex]
    };
    // const newPerson = Object.assign({} , person);

    newPerson.name = event.target.value;

    const persons = [...this.state.persons];
    persons.splice(personIndex, 1, newPerson);

    this.setState({ persons });
  };

  switchNameHandler = newName => {
    console.log(this.state);

    ///
    /// STATE MUTATION !!!
    //this.state.persons[0].name = "HACKED";
    ///

    /// Merge state with the current one
    /// This forces React to update the DOM
    this.setState({
      persons: [
        { name: newName, age: 30 },
        { name: "Sanya", age: 35 }
      ]
    });

    /// In React two actions force DOM updating:
    /// 1) Setting State via setState()
    /// 2) Setting Props
  };

  deletePersonHandler = personIndex => {
    /// slice creates a copy! We need a copy, and must not manipulate the original object
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  showPersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };

  render() {
    // Inline style
    // Refers to the current component
    // Radium can handle ':hover' selectors
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "yellow",
        textDecoration: "none"
      }
    };

    // Dynamic css classes
    const classNames = [];
    if (this.state.persons.length <= 2) {
      classNames.push("red");
    }
    if (this.state.persons.length <= 1) {
      classNames.push("bold");
    }

    if (this.state.showPersons) {
      style.backgroundColor = "green";
      style[":hover"] = {
        backgroundColor: "red",
        textDecoration: "underline"
      };
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hello React!</h1>
          <p className={classNames.join(" ")}>Style changes conditionally</p>
          <button style={style} onClick={this.showPersonsHandler}>
            Show Persons
          </button>
          {this.state.showPersons && (
            <div>
              {this.state.persons.map((person, personIndex) => {
                return (
                  <Person
                    key={person.id}
                    name={person.name}
                    age={person.age}
                    click={() => this.deletePersonHandler(personIndex)}
                    changed={event => this.nameChangedHandler(event, person.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </StyleRoot>
    );

    // return React.createElement(
    //   "div",
    //   null,
    //   React.createElement("h1", null, "Test")
    // );
  }
}

export default Radium(App);
