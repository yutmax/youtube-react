import { useState, useRef, useEffect } from "react";

const ShowMore = ({ text, maxHeight = 100, showMoreText = "Show more", showLessText = "Show less", className = "", buttonClassName = "", contentClassName = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setIsOverflowing(element.scrollHeight > maxHeight);
    }
  }, [text, maxHeight]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const contentStyle = {
    maxHeight: isExpanded ? "none" : `${maxHeight}px`,
    overflow: "hidden",
    transition: "max-height 0.3s ease-in-out",
  };

  return (
    <div className={`show-more-container ${className}`}>
      <div ref={contentRef} className={`show-more-content ${contentClassName}`} style={isOverflowing ? contentStyle : {}}>
        {text}
      </div>

      {isOverflowing && (
        <button onClick={toggleExpand} className={`show-more-button ${buttonClassName}`} aria-expanded={isExpanded}>
          {isExpanded ? showLessText : showMoreText}
        </button>
      )}
    </div>
  );
};

export default ShowMore;
