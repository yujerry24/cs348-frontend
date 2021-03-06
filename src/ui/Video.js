import React from 'react';

export default ({ videoIds }) => {
  const first = videoIds && videoIds[0];
  const idList =
    videoIds && videoIds.length > 1 ? videoIds.slice(1).join(',') : '';
  return (
    <div
      style={{
        boxSizing: 'border-box',
        // padding: '16% 9%' /* 16:9 */,
        paddingBottom: '56.25%',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <iframe
        title="youtubeVid"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // minWidth: '480px',
          // minHeight: '270px',
        }}
        src={`https://www.youtube.com/embed/${first}?playlist=${idList}&autoplay=1&controls=0`}
        frameBorder="0"
      />
    </div>
  );
};
