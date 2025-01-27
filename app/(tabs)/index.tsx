import React from "react";
import { FeedProvider } from "replyke-expo";
import Feed from "../../components/home/Feed";

const Home = () => {
  return (
    <FeedProvider sortBy="hot">
      <Feed />
    </FeedProvider>
  );
};

export default Home;
