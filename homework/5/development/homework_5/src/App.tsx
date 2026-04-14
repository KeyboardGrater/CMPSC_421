import './App.css'
import {Route, Routes} from 'react-router-dom'
import {WordScrambeling} from './routes/wordScrambler'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WordScrambeling />} />
        <Route path="/scrambler" element={<WordScrambeling />} />
      </Routes>
    </div>
  )
}