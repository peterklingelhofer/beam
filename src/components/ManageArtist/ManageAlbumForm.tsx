import React from "react";
import Modal from "components/common/Modal";
import TrackTable from "../common/TrackTable";
import AlbumForm from "./AlbumForm";
import NewTrack from "./NewTrack";

export interface ShareableTrackgroup {
  creatorId: number;
  slug: string;
}

export const ManageAlbumForm: React.FC<{
  open: boolean;
  onClose: () => void;
  trackgroup: TrackgroupDetail;
  artist: Artist;
  reload: () => Promise<void>;
}> = ({ open, trackgroup, onClose, reload, artist }) => {
  const [tracks] = React.useState(trackgroup.items.map((i) => i.track));

  return (
    <Modal open={open} onClose={onClose}>
      <AlbumForm existing={trackgroup} reload={reload} artist={artist} />
      <TrackTable tracks={tracks} editable trackgroupId={trackgroup.id} />
      <NewTrack trackgroup={trackgroup} reload={reload} />
    </Modal>
  );
};

export default ManageAlbumForm;