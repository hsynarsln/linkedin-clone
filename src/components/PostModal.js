import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { postArticleAPI } from '../actions';
import { AssetButton, AttachAssets, Container, Content, Editor, Header, PostButton, ShareComment, ShareCreation, SharedContent, UploadImage, UserInfo } from '../styles/PostModalStyles';

const PostModal = props => {
  const [editorText, setEditorText] = useState('');
  const [shareImage, setShareImage] = useState('');
  const [videoLink, setVideoLink] = useState('');
  //! we want to see image or video (so: one of them)
  const [assetArea, setAssetArea] = useState('');

  //! we want to see image or video (so: one of them)
  const switchAssetArea = area => {
    setShareImage('');
    setVideoLink('');
    setAssetArea(area);
  };

  //! POST ARTICLE
  const postArticle = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now()
    };

    props.postArticle(payload);
    reset(e);
  };

  //! Upload image
  const handleChange = e => {
    const image = e.target.files[0];

    if (image === '' || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  //! close post and reset
  const reset = e => {
    setEditorText('');
    setShareImage('');
    setVideoLink('');
    setAssetArea('');
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === 'open' && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={event => reset(event)}>
                <img src='/images/close-icon.svg' alt='' />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {/* //! postModal açılınca photo ve isim görünsün!! */}
                {props.user.photoURL ? <img src={props.user.photoURL} /> : <img src='/images/user.svg' alt='' />}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea value={editorText} onChange={e => setEditorText(e.target.value)} placeholder='What do you want to talk about' autoFocus={true} />
                {/* //! showin image or video */}
                {assetArea === 'image' ? (
                  <UploadImage>
                    <input type='file' accept='image/gif, image/jpeg, image/png' name='image' id='file' style={{ display: 'none' }} onChange={handleChange} />
                    <p>
                      <label htmlFor='file'>Select an image to share</label>
                    </p>
                    {/* //! Adding img */}
                    {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                  </UploadImage>
                ) : (
                  assetArea === 'media' && (
                    <>
                      {/* //! Adding video */}
                      <input type='text' placeholder='Please input a video link' value={videoLink} onChange={e => setVideoLink(e.target.value)} />
                      {videoLink && <ReactPlayer width={'100%'} url={videoLink} />}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea('image')}>
                  <img src='/images/photo-icon.svg' alt='' />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea('media')}>
                  <img src='/images/share-video.svg' alt='' />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src='/images/comments-icon.svg' alt='' />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton disabled={!editorText ? true : false} onClick={event => postArticle(event)}>
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

//! Redux connection

const mapStateToProps = state => {
  return {
    user: state.userState.user
  };
};

const mapDispatchToProps = dispatch => ({
  postArticle: payload => dispatch(postArticleAPI(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

// export default PostModal;
