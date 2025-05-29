import channelAvatar from "../img/channels/large.jpg";
import ShowMore from "./ShowMore";
import { useMediaQuery } from "react-responsive";

const ChannelInfo = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="video-page__channel-info-section channel-info-block">
      <img src={channelAvatar} alt="Channel avatar" className="channel-info-block__avatar" />
      <div className="channel-info-block__body">
        <div className="channel-info-block__wrapper">
          <div className="channel-info-block__titles">
            <h3 className="channel-info-block__name">Food & Drink</h3>
            <h6 className="channel-info-block__subtitle">Published on 14 Jun 2019</h6>
          </div>
          <button className="subscribe-button">
            Subscribe <span>2.3m</span>
          </button>
        </div>
        {isMobile ? "" : <ShowMore buttonClassName="channel-info-block__show-more-button" contentClassName="channel-info-block__description" maxHeight={88} text={"A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula to write perfect ad copy; it is based on a number of factors, including ad placement, demographic, even the consumer’s mood when they see your ad. A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula to write perfect ad copy; it is based on a number of factors, including ad placement, demographic, even the consumer’s mood when they see your ad. "} />}
      </div>
    </section>
  );
};

export default ChannelInfo;
