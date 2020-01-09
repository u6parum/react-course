import React, { Component } from "react";

class Person extends Component {
  render() {
    return (
      <p>
        Person "{this.props.name}". Age = {this.props.age}. Returning JSX.{" "}
        {Math.random()}
      </p>
    );
  }
}

export default Person;

///
/// state is NOT AVAILABLE in function components like this, but available in CLASS component like in the above one!
///

// const person = props => {
//   return (
//     <p>
//       Test Person. Age = {props.age}. Returning JSX. {Math.random()}
//     </p>
//   );
// };

// export default person;
