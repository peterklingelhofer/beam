import React from "react";
import { css } from "@emotion/css";
import ClickToPlay from "./ClickToPlay";
import SmallTileDetails from "./SmallTileDetails";
import { Link } from "react-router-dom";
import TrackPopup from "./TrackPopup";
import ResultListItem from "./ResultListItem";
import useDraggableTrack from "utils/useDraggableTrack";
import { useGlobalStateContext } from "contexts/globalState";

const staffPickUl = css``;

interface TrackWithKey extends Track {
  key: string;
}

const TrackList: React.FC<{
  tracks: Track[];
  draggable?: boolean;
  fullWidth?: boolean;
  handleDrop?: (ev: React.DragEvent<HTMLLIElement>) => void;
}> = ({ tracks, draggable, fullWidth, handleDrop }) => {
  const [localTracks, setLocalTracks] = React.useState<TrackWithKey[]>([]);
  const { dispatch } = useGlobalStateContext();

  React.useEffect(() => {
    const newTracks = tracks.map((track, index) => ({
      ...track,
      key: `${track.id} + ${index}`,
    }));
    setLocalTracks(newTracks);
  }, [tracks]);

  const addTracksToQueue = React.useCallback(
    (id: string) => {
      const idx = tracks.findIndex((track) => track.id === id);
      dispatch({
        type: "startPlayingIds",
        playerQueueIds: tracks
          .slice(idx, tracks.length)
          .map((track) => track.id),
      });
    },
    [dispatch, tracks]
  );

  return (
    <>
      <ul className={staffPickUl} data-cy="track-list">
        {localTracks.map((track) => (
          <TrackLIWrapper
            track={track}
            key={track.key}
            handleDrop={handleDrop}
            draggable={draggable}
            fullWidth={fullWidth}
            addTracksToQueue={addTracksToQueue}
          />
        ))}
      </ul>
    </>
  );
};

const TrackLIWrapper: React.FC<{
  track: TrackWithKey;
  handleDrop?: (ev: React.DragEvent<HTMLLIElement>) => void;
  draggable?: boolean;
  fullWidth?: boolean;
  addTracksToQueue?: (id: string) => void;
}> = ({ track, draggable, fullWidth, handleDrop, addTracksToQueue }) => {
  const { onDragStart, onDragEnd } = useDraggableTrack();

  const [isHoveringOver, setIsHoveringOver] = React.useState(false);

  const onDragEnter = () => {
    setIsHoveringOver(true);
  };

  const onDragLeave = () => {
    setIsHoveringOver(false);
  };

  return (
    <ResultListItem
      draggable={draggable}
      onDragOver={(ev) => ev.preventDefault()}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      fullWidth={fullWidth}
      id={`${track.id}`}
      onDropCapture={handleDrop}
      className={
        isHoveringOver
          ? css`
              background-color: #f8f8f8;
              & * {
                pointer-events: none;
              }
            `
          : ""
      }
    >
      <ClickToPlay
        trackId={track.id}
        title={track.title}
        image={track.images.small ?? { width: 120, height: 120 }}
        playActionIntercept={addTracksToQueue}
      />
      <SmallTileDetails
        title={track.title}
        subtitle={
          <Link to={`/library/trackgroup/${track.trackGroup.id}`}>
            {track.creator?.displayName}{" "}
            {track.trackGroup && <>- {track.trackGroup.title}</>}
          </Link>
        }
        moreActions={<TrackPopup trackId={track.id} />}
      />
    </ResultListItem>
  );
};

export default TrackList;
