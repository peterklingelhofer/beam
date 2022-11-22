import Button from "components/common/Button";
import { InputEl } from "components/common/Input";
import LoadingSpinner from "components/common/LoadingSpinner";
import { SelectEl } from "components/common/Select";
import { useSnackbar } from "contexts/SnackbarContext";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AdminTrack, fetchTrack, updateTrack } from "services/api/Admin";

export const TrackDetails: React.FC = () => {
  const { trackId } = useParams();
  const snackbar = useSnackbar();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const [track, setTrack] = React.useState<AdminTrack>();

  const fetchTrackWrapper = React.useCallback(
    async (id: string) => {
      const fetchedTrack = await fetchTrack(id);
      setTrack(fetchedTrack);
      reset({
        ...fetchedTrack,
      });
    },
    [reset]
  );

  React.useEffect(() => {
    if (trackId) {
      fetchTrackWrapper(trackId);
    }
  }, [fetchTrackWrapper, trackId]);

  const doSave = React.useCallback(
    async (data) => {
      if (trackId) {
        try {
          setIsLoading(true);
          await updateTrack(+trackId, data);
          snackbar("Successfully updated track", { type: "success" });
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [trackId, snackbar]
  );

  return (
    <>
      <h3>Track: {track?.title}</h3>
      <form onSubmit={handleSubmit(doSave)}>
        <div>
          Title: <InputEl {...register("title")} />
        </div>
        <div>
          Status:{" "}
          <SelectEl defaultValue="paid" {...register("status")}>
            <option value="free+paid">Free + Paid</option>
            <option value="hidden">Hidden</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="deleted">Deleted</option>
          </SelectEl>
        </div>

        <Button
          type="submit"
          style={{ marginTop: "1rem" }}
          disabled={isLoading}
          startIcon={isLoading ? <LoadingSpinner /> : undefined}
        >
          Save track
        </Button>
      </form>
    </>
  );
};

export default TrackDetails;
