import {useState} from 'react';
import Register from "./Register";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
    const {handleSubmit, setUsername, setPassword, failedLog} = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    return (
      <>
          <main className={'login-container flex-container'}>
              {!showRegister && <h3>Please Log in</h3>}
              <form onSubmit={handleSubmit}>
                  <label htmlFor="userName">Username</label>
                  <input type="text"
                         placeholder='Enter your Name'
                         name='userName'
                         onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <input type="password"
                         placeholder='********'
                         name='password'
                         onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type={"submit"} className={'btn '}>Log In</button>
              </form>

              {failedLog &&
                <p>Check your username or password <br/>
                    <a onClick={() => setShowRegister(true)}>Register?</a>
                </p>
              }
          </main>
          {showRegister && <Register/>}
      </>
    );
};

export default LoginPage;
