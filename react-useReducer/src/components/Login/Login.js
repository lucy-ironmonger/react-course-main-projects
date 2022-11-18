import React, {useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducerFn = (state, action) => {
  // Takes a state and action, and returns a new state
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'ON_BLUR') {
    return { value: state.value, isValid: (state.value.includes('@') && state.value.trim().length > 6) } // how do we get the pw value?
  }
  return { value: '', isValid: null }
}

const passwordReducerFn = (state, action) => {
  if (action.type === 'USER_PW_INPUT') {
    return { value: action.val, isValid: (action.val.trim().length > 6) && (state.value.includes('@')) } // how do we get the email value ?
  }
  if (action.type === 'ON_BLUR_PW') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: null }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducerFn, { value: '', isValid: null } )
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFn,{ value: '', isValid: null } )

  // EMAIL

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );

    // dispatchEmail is now what sends the action to our emailReducerFn, which there can check the values and validate
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    })
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'ON_BLUR' })
  };

  // PASSWORD

  const passwordChangeHandler = (event) => {
    // setFormIsValid(
    //     emailState.value.includes('@') && event.target.value.trim().length > 6
    // );
    dispatchPassword({
      type: 'USER_INPUT_PW',
      val: event.target.value
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'ON_BLUR_PW' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
              emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={(!passwordState.isValid && !emailState.isValid)}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
