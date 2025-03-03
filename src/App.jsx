import { RecoilRoot, useRecoilValue, useSetRecoilState , atom } from "recoil";
import React from "react";

const countAtom = atom({
  key: "count",
  default: 0,
});

function App() {
   return (
      <>
      <div>
        <h1>Aur bhai kaise ho</h1>
      </div>
      <RecoilRoot>
        <Counter/>
      </RecoilRoot>
      </>
   );
}

function Counter(){
  const setCounter = useSetRecoilState(countAtom);
  return (
    <div>
      <button onClick={()=>setCounter(prev=>parseInt(prev)+1)}>Increment</button>
      <DisplayCount/>
    </div>
  );
}
 
function DisplayCount(){
  const Counter = useRecoilValue(countAtom);
  return (
    <div>
      {Counter}
    </div>
  );
}

export default App;
