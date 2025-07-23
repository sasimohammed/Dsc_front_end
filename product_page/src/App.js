import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Detail from "./Detail";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Detail />} />
        </Routes>
      </Router>
  );
}

export default App;