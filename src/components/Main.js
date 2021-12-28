import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getArticlesAPI } from '../actions';
import { Article, Container, Content, Description, ShareBox, SharedActor, SharedImg, SocialActions, SocialCounts } from '../styles/MainStyles';
import PostModal from './PostModal';

const Main = props => {
  const [showModal, setShowModal] = useState('close');

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case 'open':
        setShowModal('close');
        break;
      case 'close':
        setShowModal('open');
        break;

      default:
        setShowModal('close');
        break;
    }
  };

  return (
    <>
      {props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? <img src={props.user.photoURL} alt='' /> : <img src='/images/user.svg' alt='' />}
              {/* //! LOADING */}
              <button onClick={handleClick} disabled={props.loading ? true : false}>
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src='/images/photo-icon.svg' alt='' />
                <span>Photo</span>
              </button>
              <button>
                <img src='/images/video-icon.svg' alt='' />
                <span>Video</span>
              </button>
              <button>
                <img src='/images/event-icon.svg' alt='' />
                <span>Event</span>
              </button>
              <button>
                <img src='/images/article-icon.svg' alt='' />
                <span>Write Article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {/* //! LOADING */}
            {props.loading && <img src='./images/spin-loader.svg' />}
            {/* //! ARTICLES */}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt='' />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                      </div>
                    </a>
                    <button>
                      <img src='/images/ellipsis.svg' alt='' />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>{!article.sharedImg && article.video ? <ReactPlayer width={'100%'} url={article.video} /> : article.sharedImg && <img src={article.sharedImg} />}</a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src='/images/like.svg' alt='' />
                        <img src='/images/clap.svg' alt='' />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src='/images/like-icon.svg' alt='' />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src='/images/comments-icon.svg' alt='' />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src='/images/share-icon.svg' alt='' />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src='/images/send-icon.svg' alt='' />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles
  };
};

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(getArticlesAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

// export default Main;
