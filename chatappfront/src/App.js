import './App.css';
import {Routes, Route} from "react-router-dom"
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import {AuthProvider, RequireAuth} from './utils/authentication'


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <nav>
          
        </nav>
        <Routes>
          <Route path="" element={<RequireAuth><Home /></RequireAuth>}/>
          <Route path="/login" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
