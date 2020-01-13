import React, { Component } from "react";
import Radium from "radium";
import "./Person.css";

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

const person = props => {
  // For this we need Radium's StyleRoot
  const style = {
    "@media (min-width: 500px)": {
      width: "450px"
    }
  };

  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>
        Person "{props.name}". Age = {props.age}. Returning JSX. {Math.random()}
      </p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default Radium(person);
