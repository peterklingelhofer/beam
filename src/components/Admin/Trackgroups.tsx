import { css } from "@emotion/css";
import IconButton from "components/common/IconButton";
import Modal from "components/common/Modal";
import Table from "components/common/Table";
import React from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AdminTrackGroup, fetchTrackGroups } from "services/api/Admin";
import usePagination from "utils/usePagination";

export const AdminTrackGroups: React.FC = () => {
  const navigate = useNavigate();
  const { trackgroupId } = useParams();
  const [openModal, setOpenModal] = React.useState(false);

  const { LoadingButton, results } = usePagination<AdminTrackGroup>({
    apiCall: React.useCallback(fetchTrackGroups, []),
    options: React.useMemo(() => ({ limit: 50 }), []),
  });

  React.useEffect(() => {
    if (trackgroupId) {
      setOpenModal(true);
    }
  }, [trackgroupId]);

  const onClickQueue = React.useCallback(
    (id: string) => {
      navigate(`/admin/trackgroups/${id}`);
    },
    [navigate]
  );

  return (
    <div
      className={css`
        flex-grow: 1;
      `}
    >
      <h3>Trackgroups</h3>
      {results.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Private?</th>
              <th>Enabled?</th>
              <th>Display artist</th>
              <th>Release date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {results.map((trackgroup) => (
              <tr key={trackgroup.id}>
                <td>{trackgroup.title}</td>
                <td>{trackgroup.type}</td>
                <td>{trackgroup.private ? <FaCheck /> : undefined}</td>
                <td>{trackgroup.enabled ? <FaCheck /> : undefined}</td>
                <td>{trackgroup.display_artist}</td>
                <td>{trackgroup.releaseDate}</td>
                <td className="alignRight">
                  <IconButton
                    compact
                    onClick={() => onClickQueue(trackgroup.id)}
                  >
                    <FaEdit />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <LoadingButton />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          navigate("/admin/trackgroups");
        }}
      >
        <Outlet />
      </Modal>
    </div>
  );
};

export default AdminTrackGroups;
