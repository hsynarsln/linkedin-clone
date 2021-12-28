import React from 'react';
import { Avatar, BannerCard, Container, FeedList, FollowCard, Recommendation, Title } from '../styles/RigthSideStyles';

const RightSide = () => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src='/images/feed-icon.svg' alt='' />
        </Title>
        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>
        <Recommendation>
          View all recommendations
          <img src='/images/right-icon.svg' alt='' />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src='/images/job-ad.jpg' alt='' />
      </BannerCard>
    </Container>
  );
};

export default RightSide;
