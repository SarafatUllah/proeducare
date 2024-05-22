export const usePlayVideos = () => {
  const playVideos = () => {
    document.addEventListener(
      "play",
      function (e) {
        const videos = document.getElementsByTagName("video");
        for (let i = 0, len = videos.length; i < len; i++) {
          if (videos[i] !== e.target) {
            videos[i].pause();
          }
        }
      },
      true
    );
  };

  return {
    playVideos,
  };
};
