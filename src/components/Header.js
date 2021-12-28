import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signOutAPI } from '../actions';
import { Container, Content, Logo, Nav, NavList, NavListWrap, Search, SearchIcon, SignOut, User } from '../styles/HeaderStyles';

const Header = props => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href='/home'>
            <img src='/images/home-logo.svg' alt='' />
          </a>
        </Logo>
        <Search>
          <div>
            <input type='text' placeholder='Search' />
          </div>
          <SearchIcon>
            <img src='/images/search-icon.svg' alt='' />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className='active'>
              <a>
                <img src='/images/nav-home.svg' alt='' />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src='/images/nav-network.svg' alt='' />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src='/images/nav-jobs.svg' alt='' />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src='/images/nav-messaging.svg' alt='' />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src='/images/nav-notifications.svg' alt='' />
                <span>Notifications</span>
              </a>
            </NavList>
            <User>
              <a>
                {/* //! user photo mevcut ise göster değil ise default img */}
                {props.user && props.user.photoURL ? <img src={props.user.photoURL} alt='' /> : <img src='/images/user.svg' alt='' />}
                <span>
                  Me
                  <img src='/images/down-icon.svg' alt='' />
                </span>
              </a>

              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img src='/images/nav-work.svg' alt='' />
                <span>
                  Work
                  <img src='/images/down-icon.svg' alt='' />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

//! REDUX

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = state => {
  return {
    user: state.userState.user
  };
};

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// export default Header;
