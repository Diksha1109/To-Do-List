import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ToDoApp from './component/ToDoApp/ToDoApp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ToDoApp/>}>

          </Route>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
