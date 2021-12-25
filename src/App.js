import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FetchImg from './page/fetchImage'
import Index from './page/Index'
import Booking from './page/bookingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/fetchImg' element={<FetchImg />} />
        <Route exact path='/' element={<Index />} />
        <Route path='/booking' element={<Booking/>} />
      </Routes>
    </Router>
  );
}

export default App;
