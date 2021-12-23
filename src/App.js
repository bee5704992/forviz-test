import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FetchImg from './page/fetchImage'
import Index from './page/Index'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/fetchImg' element={<FetchImg />} />
        <Route exact path='/' element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
