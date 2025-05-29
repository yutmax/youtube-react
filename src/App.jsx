import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import VideoPlayer from "./components/VideoPlayer";

import VideoInfo from "./components/VideoInfo";
import ChannelInfo from "./components/ChannelInfo";
import NextVideos from "./components/NextVideos";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="video-page">
        <div className="video-page__container video-page__container--narrow">
          <div className="video-page__content">
            <section className="video-page__player-section video-player-section">
              <VideoPlayer />

              <VideoInfo />
            </section>

            <ChannelInfo />
          </div>

          <NextVideos />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
