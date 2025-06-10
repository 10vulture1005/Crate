import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesPage from './NotesPage';
import Login from './login'; // if you have a login page
import './App.css'; // Import your CSS file

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<><Login /></>} />         {/* Login as default page */}
        <Route path="/notes" element={<NotesPage />} /> {/* Notes page */}
      </Routes>
    
  );
}

export default App;
