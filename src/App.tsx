import React, { Suspense, useState } from "react";

const ComponentOne = React.lazy(() => import("./component-one"));
const ComponentTwo = React.lazy(() => import("./component-two"));

function App() {
  const [open, setOpen] = useState(false);
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
      <button onClick={() => setOpen((prev) => !prev)}>
        click open Component2
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <ComponentOne />
      </Suspense>
      {open && (
        <Suspense fallback={<div>Loading ComponentTwo...</div>}>
          <ComponentTwo />
        </Suspense>
      )}
    </div>
  );
}

export default App;
