import React, { Component } from "react";
import Radium, { StyleRoot } from "radium";
import Persons from "./components/Persons/Persons";
import Cockpit from "./components/Cockpit/Cockpit";
//import classes from "./App.module.css"; // CSS Modules enabled !

// It is better to use AuthContext in cases of Global settings
// Otherwise use props to pass data to subcomponents
export const AuthContext = React.createContext(false);

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] Inside ctor", props);
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  UNSAFE_componentWillMount() {
    console.log("[App.js] Inside componentWillMount", this.props);
  }

  componentDidMount() {
    console.log("[App.js] Inside componentDidMount", this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("[UPDATE App.js] Inside componentWillReceiveProps", nextProps);
  }

  // Here we can stop update cycle if we detect something not really changed in the nextProps
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE App.js] Inside shouldComponentUpdate",
      nextProps,
      nextState
    );
    return true;
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE App.js] Inside componentWillUpdate",
      nextProps,
      nextState
    );
  }

  // Can cause Side-Effects
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "[UPDATE App.js] Inside componentDidUpdate",
      prevProps,
      prevState
    );
  }

  // Called when props are updated
  // You can set state here accordingly
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "[UPDATE App.js] Inside getDerivedStateFromProps",
      nextProps,
      prevState
    );
    return prevState;
  }

  // Get the snapshot of the DOM right before update
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      "[UPDATE App.js] Inside getSnapshotBeforeUpdate",
      prevProps,
      prevState
    );
  }

  state = {
    persons: [
      { id: 1, name: "Slava", age: 30 },
      { id: 2, name: "Sanya", age: 35 },
      { id: 3, name: "Genrih", age: 45 }
    ],
    showPersons: false,
    toggleCounter: 0,
    authenticated: false
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
    // slice creates a copy! We need a copy, and must not manipulate the original object
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    // this.setState({
    //   showPersons: !this.state.showPersons,
    //   toggleCounter: this.state.toggleCounter + 1 // Incorrect way !!!
    // });

    this.setState((prevState, props) => ({
      showPersons: !prevState.showPersons,
      toggleCounter: prevState.toggleCounter + 1
    }));
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("[App.js] Inside render", this.props);

    // Inline style
    // Refers to the current component
    // Radium can handle ':hover' selectors
    // const style = {
    //   backgroundColor: "white",
    //   font: "inherit",
    //   border: "1px solid blue",
    //   padding: "8px",
    //   cursor: "pointer",
    //   ":hover": {
    //     backgroundColor: "yellow",
    //     textDecoration: "none"
    //   }
    // };

    return (
      <StyleRoot>
        {/* For css modules we use properties, not strings */}
        <div>
          <button
            onClick={() => {
              this.setState({ showPersons: true });
            }}
          >
            Show Persons
          </button>
          <Cockpit
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
          />
          {this.state.showPersons && (
            <AuthContext.Provider value={this.state.authenticated}>
              <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
              />
            </AuthContext.Provider>
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
