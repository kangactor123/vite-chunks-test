import React, { Suspense } from "react";

const ComponentOne = React.lazy(() => import("./component-one"));

function App() {
  return (
    <div>
      hello boy
      <button
        onClick={() => {
          alert("hello world!!");
        }}
      >
        hello world
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <ComponentOne />
      </Suspense>
    </div>
  );
}

export default App;
