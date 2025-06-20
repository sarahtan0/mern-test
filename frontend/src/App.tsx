import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container} from 'react-bootstrap';
import SignUpModal from './components/SignUpModal';
import LogInModal from './components/LogInModal';
import NavBar from './components/NavBar';
import { User } from './models/user';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import * as NotesApi from "./network/notes_api";

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<User|null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [hasTriedLoadingUser, setHasTriedLoadingUser] = useState(false);

  useEffect(() => {

    async function fetchLoggedInUser() {
      try{
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch(error) {
        if (!hasTriedLoadingUser) {
          // expected: user not logged in, do nothing
          return;
        }
        console.error(error);
        alert(error);
      } finally {
        setHasTriedLoadingUser(true);
      }
    }

    fetchLoggedInUser();
  }, []);

  return (

    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => {setShowSignUp(true)}}
        onLoginClicked={() => {setShowLogin(true)}}
        onLogoutClicked={() => {setLoggedInUser(null)}}
      />
      <Container>
        {loggedInUser
        ? <NotesPageLoggedInView/>
        : <NotesPageLoggedOutView/>
        }
        {showSignUp && 
          <SignUpModal
              onDismiss={() => setShowSignUp(false)}
              onSignUpSuccessful={(user) => {
                setShowSignUp(false);
                setLoggedInUser(user);
              }}
          />
        }

        {showLogin &&
          <LogInModal
              onDismiss={() => {setShowLogin(false)}}
              onLoginSuccessful={(user) => {
                setShowLogin(false);
                setLoggedInUser(user);
              }}
          />
        }
      </Container>
    </div>
  );
}

export default App;
