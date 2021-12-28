import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Content, Layout, Section } from '../styles/HomeStyles';
import LeftSide from './LeftSide';
import Main from './Main';
import RightSide from './RightSide';

const Home = props => {
  const navigate = useNavigate();

  return (
    <Container>
      {!props.user && navigate('/', { replace: true })}
      <Content>
        <Section>
          <h5>
            <a>Hiring in a hurry? - </a>
          </h5>
          <p>Find talented pros in record time with Upwork and keep business moving.</p>
        </Section>
        <Layout>
          <LeftSide />
          <Main />
          <RightSide />
        </Layout>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userState.user
  };
};

export default connect(mapStateToProps)(Home);

// export default Home;
