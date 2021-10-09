
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider,signOut } from "firebase/auth";
import initializeAuthentication from './Firebase/initilizeAuthentication';
import { useState } from 'react';
initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new  GithubAuthProvider();

function App() {
   const [user, setUser] = useState([]);
  // firebase config
  const auth = getAuth();
  const handleGoogleSign = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const {displayName,email,photoURL} = result.user;
       const logInData = {
         name:displayName,
         email:email,
         photo:photoURL,
       };
       setUser(logInData); 
    })
  }
  const handleGithubSign = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      const {displayName,email,photoURL} = result.user;
       const logInData = {
         name:displayName,
         email:email,
         photo:photoURL,
       };
       setUser(logInData); 
    })
  }

  const handleSignOUt = () => {
    signOut(auth).then(() => {
      setUser([]);
    })
  }
  return (
    <div className="App">
          {!user.name ?
            <div>
              <button onClick={handleGoogleSign}>Google Sign In</button>
              <button onClick={handleGithubSign}>Github Sign In</button>
            </div>
            :
            <div>
               <button onClick={handleSignOUt}>Sign Out</button>
            </div>
          }
          
          {user.email && <div>Welcome {user.name} <p>i know YOur email Adress {user.email}</p><img src={user.photo} alt="" /></div>}
    </div>
  );
}
export default App;
