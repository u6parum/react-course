import React, { Component, PureComponent } from "react";
import ErrorBoundary from "../ErrorBondary/ErrorBoundary";
import Person from "./Person/Person";

// Pure component automatically checks all nextProps in shouldComponentUpdate hook
// and continue updating only if it detects any changes
// Use it if updates may not be required
export default class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log("[Persons.js] Inside ctor", props);
    this.lastPersonRef = React.createRef();
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  UNSAFE_componentWillMount() {
    console.log("[Persons.js] Inside componentWillMount", this.props);
  }

  componentDidMount() {
    console.log("[Persons.js] Inside componentDidMount", this.props);
    this.lastPersonRef.current.focus();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(
      "[UPDATE Persons.js] Inside componentWillReceiveProps",
      nextProps
    );
  }

  // Here we can stop update cycle if we detect something not really changed in the nextProps
  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log(
  //       "[UPDATE Persons.js] Inside shouldComponentUpdate",
  //       nextProps,
  //       nextState
  //     );
  //     return (
  //       nextProps.persons !== this.props.persons ||
  //       nextProps.clicked !== this.props.clicked ||
  //       nextProps.changed !== this.props.changed
  //     );
  //     //return true;
  //   }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE Persons.js] Inside componentWillUpdate",
      nextProps,
      nextState
    );
  }

  // Can cause Side-Effects
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "[UPDATE Persons.js] Inside componentDidUpdate",
      prevProps,
      prevState
    );
  }

  render() {
    return this.props.persons.map((person, personIndex) => {
      return (
        <ErrorBoundary key={person.id}>
          <Person
            position={personIndex}
            name={person.name}
            age={person.age}
            ref={this.lastPersonRef}
            click={() => this.props.clicked(personIndex)}
            changed={event => this.props.changed(event, person.id)}
          />
        </ErrorBoundary>
      );
    });
  }
}
