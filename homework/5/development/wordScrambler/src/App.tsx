import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import {Home} from "./pages/Home";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>

//     </>
//   )
// }

// export default App

export default function App() {
  return (
    <div>
      {/* <nav>
        <Link to="/">Home</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
