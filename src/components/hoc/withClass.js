import React from "react";

const withClass = (WrappedComponent, className) => {
  const WithClass = props => (
    <div className={className}>
      <WrappedComponent ref={props.forwardedRef} {...props} />
    </div>
  );

  return React.forwardRef((props, ref) => {
    return <WithClass {...props} forwardedRef={ref} />;
  });
};

export default withClass;
