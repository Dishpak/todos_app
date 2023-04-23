import {useState} from 'react';
import Register from "./Register";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const {handleSubmit, formInputs, handleInputChange, failedLog} = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className={'login-wrapper flex-container'}>
      <div className={'login-container'}>
        {!showRegister && <h3>Please Log in</h3>}
        <form onSubmit={handleSubmit} className={`login-form ${showRegister ? 'hidden': ''}`}>
          <label htmlFor="username">Username</label>
          <input type="text"
                 placeholder='Enter your Name'
                 name='username'
                 value={formInputs.username || ''}
                 onChange={handleInputChange}
                 autoFocus={true}
          />
          <label htmlFor="password">Password</label>
          <input type="password"
                 placeholder='********'
                 name='password'
                 value={formInputs.password || ''}
                 onChange={handleInputChange}
          />
          <div className={'controls'}>
            <button type={"submit"} className={'btn '}>Log In</button>
            <button className={'btn '} type={'button'} onClick={() => setShowRegister(!showRegister)}>Register</button>
          </div>
        </form>
        {failedLog &&
          <p>Check your username or password <br/>
            <a onClick={() => setShowRegister(true)}>Register?</a>
          </p>
        }

        {showRegister && <Register/>}
      </div>
    </main>
  );
};

export default LoginPage;
