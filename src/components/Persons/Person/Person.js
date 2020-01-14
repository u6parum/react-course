import React, { Component } from "react";
import PropTypes from "prop-types";
import Aux from "../../hoc/Auxil";
import withClass from "../../hoc/withClass";
//import Radium from "radium";
import classes from "./Person.module.css";

// class Person extends Component {
//   render() {
//     return (
//       <p>
//         Person "{this.props.name}". Age = {this.props.age}. Returning JSX.{" "}
//         {Math.random()}
//       </p>
//     );
//   }
// }

// export default Person;

///
/// state is NOT AVAILABLE in function components like this, but available in CLASS component like in the above one!
///

// const person = props => {
// For this we need Radium's StyleRoot
//   const style = {
//     "@media (min-width: 500px)": {
//       width: "450px"
//     }
//   };

//   return (
//     <div className={classes.Person}>
//       <p onClick={props.click}>
//         Person "{props.name}". Age = {props.age}. Returning JSX. {Math.random()}
//       </p>
//       <input type="text" onChange={props.changed} value={props.name} />
//     </div>
//   );
// };

// export default Radium(person);

class Person extends Component {
  constructor(props) {
    super(props);
    console.log("[Person.js] Inside ctor", props);
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  UNSAFE_componentWillMount() {
    console.log("[Person.js] Inside componentWillMount", this.props);
  }

  componentDidMount() {
    console.log("[Person.js] Inside componentDidMount", this.props);
    if (this.props.position === 1) this.inputElement.focus(); // Here we access ref element
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(
      "[UPDATE Person.js] Inside componentWillReceiveProps",
      nextProps
    );
  }

  // Here we can stop update cycle if we detect something not really changed in the nextProps
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE Person.js] Inside shouldComponentUpdate",
      nextProps,
      nextState
    );
    //return nextProps.persons !== this.props.persons;
    return true;
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE Person.js] Inside componentWillUpdate",
      nextProps,
      nextState
    );
  }

  // Can cause Side-Effects
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "[UPDATE Person.js] Inside componentDidUpdate",
      prevProps,
      prevState
    );
  }

  render() {
    return (
      <Aux>
        <p onClick={this.props.click}>
          Person "{this.props.name}". Age = {this.props.age}. Returning JSX.{" "}
          {Math.random()}
        </p>
        <input
          ref={inp => {
            this.inputElement = inp;
          }} // Reference to this input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

// Defines types for props
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func
};

export default withClass(Person, classes.Person);
