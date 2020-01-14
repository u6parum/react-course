import React from "react";

const withClass = (WrapComponent, className) => {
  return props => (
    <div className={className}>
      <WrapComponent {...props} />
    </div>
  );
};

export default withClass;
