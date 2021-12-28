import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInAPI } from '../actions';
import { Container, Form, Google, Hero, Join, Nav, Section, SignIn } from '../styles/LoginStyles';

const Login = props => {
  const navigate = useNavigate();
  return (
    <Container>
      {/* //! user var ise navigate --> home */}
      {props.user && navigate('/home', { replace: true })}
      <Nav>
        <a href='/'>
          <img src='/images/login-logo.svg' alt='' />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src='/images/login-hero.svg' alt='' />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src='/images/google.svg' alt='' />
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userState.user
  };
};

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signInAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;
