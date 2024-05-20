import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import axios from 'axios';
import { UidContext} from './AppContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import ConfirmRegister from './pages/ConfirmRegister';
import NavigBar from './components/NavigBar';
import Accueil from './pages/Accueil';
import Aide from './pages/Aide';
import AccueilVote from './pages/AccueilVote';
import VoteBO from './pages/VoteBO';
import Result from './components/Result';

function App() {
  const [uid, setUid] = useState(null)
  
  useEffect(() => {
    async function checkAuth() {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      }).then(async (res) => {
        if (res.status !== 200) {
          console.log("On est la"+ res.data)
          setUid(res.data)
        } else {
          console.log(res.status)
        }
      })
        .catch((err) => console.log(err));
    }
    checkAuth()
    console.log(uid)

  }, [])

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <div className="w-full min-h-screen bg-cover bg-center">
          <NavigBar/>
          <main >
            <Routes>/VoteResult
              <Route path="/inscription" element={<Register />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/verif" element={<ConfirmRegister />} />
              <Route path="/admin" element={uid ? <AdminPage /> : <Navigate to="/" />} />
              <Route path="/Aide" element={< Aide />} />
              <Route path="/VoteBO" element={uid ? <VoteBO /> : <Navigate to="/" /> }/>
              <Route path="/VoteResult" element={uid ? <Result />:<Navigate to="/" />}/>
              <Route path="/Choix" element={<AccueilVote />}/>
              <Route path="*" element={<h2 className='dark:text-[#0f0f0f] '>La page n'existe pas</h2>} />
              <Route path="/" element={ <Accueil/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </UidContext.Provider>
  )
}

export default App;