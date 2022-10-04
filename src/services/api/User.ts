/**
 * User track groups
 */

import {
  API,
  FetchTrackGroupFilter,
  fetchWrapper,
  getToken,
} from "services/Api";

export const fetchUserProfile = async (): Promise<LoggedInUser> => {
  return fetchWrapper("user/profile/", {
    method: "GET",
  });
};

export const fetchPublicUserPlaylists = async (
  id: number,
  options?: APIOptions
): Promise<Trackgroup[]> => {
  return fetchWrapper(
    `users/${id}/playlists`,
    {
      method: "GET",
    },
    options
  );
};

/**
 * User playlists
 */

export const createPlaylist = async (data: {
  cover: string;
  title: string;
  type: string;
  artistId?: number;
}): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/playlists`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePlaylist = async (
  id: string,
  data: {
    cover: string;
    title: string;
    private: boolean;
    tags: string[];
    type: string;
    about?: string;
  }
): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/playlists/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const fetchUserPlaylist = async (
  id: string
): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/playlists/${id}`, {
    method: "GET",
  });
};

export const addTracksToPlaylist = async (
  id: string,
  data: {
    tracks: { track_id: number }[];
  }
) => {
  return fetchWrapper(`user/playlists/${id}/items/add`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const removeTracksFromPlaylist = async (
  id: string,
  data: {
    tracks: { track_id: number }[];
  }
) => {
  return fetchWrapper(`user/playlists/${id}/items/remove`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const setNewTracksOnPlaylist = async (
  id: string,
  data: {
    tracks: { track_id: number; index?: number }[];
  }
) => {
  return fetchWrapper(`user/playlists/${id}/items`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteUserPlaylist = async (id: string) => {
  return fetchWrapper(`user/playlists/${id}`, {
    method: "DELETE",
  });
};

export const uploadPlaylistCover = async (id: string, file: File) => {
  var fd = new FormData();
  const { token, version: apiVersion } = getToken();
  fd.append("file", file);
  let baseUrl = `${API}${apiVersion}/`;
  return fetch(`${baseUrl}user/trackgroups/${id}/cover`, {
    method: "PUT",
    body: fd,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

/**
 * User Track groups
 */

export const createTrackGroup = async (data: {
  cover: string;
  title: string;
  type: string;
  artistId?: number;
}): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/trackgroups`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTrackGroup = async (
  id: string,
  data: {
    cover: string;
    title: string;
    private: boolean;
    tags: string[];
    type: string;
    about?: string;
  }
): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/trackgroups/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const fetchUserTrackGroups = async (
  options?: FetchTrackGroupFilter
): Promise<TrackgroupDetail[]> => {
  return fetchWrapper(
    `user/trackgroups`,
    {
      method: "GET",
    },
    options
  );
};

export const fetchUserTrackGroup = async (
  id: string
): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/trackgroups/${id}`, {
    method: "GET",
  });
};

export const addTracksToTrackGroup = async (
  id: string,
  data: {
    tracks: { track_id: number }[];
  }
) => {
  return fetchWrapper(`user/trackgroups/${id}/items/add`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const removeTracksFromTrackGroup = async (
  id: string,
  data: {
    tracks: { track_id: number }[];
  }
) => {
  return fetchWrapper(`user/trackgroups/${id}/items/remove`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const setNewTracksOnTrackGroup = async (
  id: string,
  data: {
    tracks: { track_id: number; index?: number }[];
  }
) => {
  return fetchWrapper(`user/trackgroups/${id}/items`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteUserTrackGroup = async (id: string) => {
  return fetchWrapper(`user/trackgroups/${id}`, {
    method: "DELETE",
  });
};

export const uploadTrackGroupCover = async (id: string, file: File) => {
  var fd = new FormData();
  const { token, version: apiVersion } = getToken();
  fd.append("file", file);
  let baseUrl = `${API}${apiVersion}/`;
  return fetch(`${baseUrl}user/trackgroups/${id}/cover`, {
    method: "PUT",
    body: fd,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

/**
 * User artist endpoints
 */

export const fetchUserArtists = (
  options?: APIOptions
): Promise<APIPaginatedResult<Artist>> => {
  return fetchWrapper(
    `user/artists`,
    {
      method: "GET",
    },
    options,
    true
  );
};

export const fetchUserArtist = (artistId: number): Promise<Artist> => {
  return fetchWrapper(`user/artists/${artistId}`, {
    method: "GET",
  });
};

export const createUserArtist = async (data: {
  displayName: string;
}): Promise<TrackgroupDetail> => {
  return fetchWrapper(`user/artists`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * user tracks
 */

export const createTrack = async (data: {
  track_name: string;
  status: number;
}) => {
  return fetchWrapper(`user/tracks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const uploadTrackFile = async (id: number, data: any) => {
  var fd = new FormData();
  fd.append("files", data.upload[0]);
  const { token, version: apiVersion } = getToken();
  let baseUrl = `${API}${apiVersion}/`;
  return fetch(`${baseUrl}user/tracks/${id}/file`, {
    method: "PUT",
    body: fd,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

/**
 * Misc user info
 */

export const fetchUserStats = async (
  from: string,
  to: string
): Promise<Stat[]> => {
  return fetchWrapper(`user/plays/stats?from=${from}&to=${to}`, {
    method: "GET",
  });
};

export const fetchUserArtistHistory = async (
  options?: APIOptions
): Promise<APIPaginatedResult<{ uid: number; meta_value: string }>> => {
  return fetchWrapper(
    "user/plays/history/artists",
    { method: "GET" },
    options,
    true
  );
};

export const fetchUserCollection = async (
  options?: APIOptions
): Promise<APIPaginatedResult<Track>> => {
  return fetchWrapper("user/collection/", { method: "GET" }, options, true);
};

export const fetchUserHistory = async (
  options?: APIOptions
): Promise<APIPaginatedResult<Track>> => {
  return fetchWrapper("user/plays/history/", { method: "GET" }, options, true);
};

export const fetchUserFavorites = async (
  options?: APIOptions
): Promise<APIPaginatedResult<Track>> => {
  return fetchWrapper(
    "user/favorites",
    {
      method: "GET",
    },
    options,
    true
  );
};

export const addTrackToUserFavorites = async (id: number): Promise<Track[]> => {
  return fetchWrapper("user/favorites", {
    method: "POST",
    body: JSON.stringify({
      track_id: id,
    }),
  });
};

export const checkTrackIdsForFavorite = async (
  ids: number[]
): Promise<{ track_id: number }[]> => {
  return fetchWrapper("user/favorites/resolve", {
    method: "POST",
    body: JSON.stringify({
      ids,
    }),
  });
};

/**
 * User plays
 */

export const registerPlay = (
  trackId: number
): Promise<{ count: number; cost: number; total: string }> => {
  return fetchWrapper(`user/plays`, {
    method: "POST",
    body: JSON.stringify({ track_id: trackId }),
  });
};

export const buyTrack = async (trackId: number) => {
  return fetchWrapper(`user/plays/buy`, {
    method: "POST",
    body: JSON.stringify({
      track_id: trackId,
    }),
  });
};

export const checkPlayCountOfTrackIds = async (
  ids: number[]
): Promise<{ track_id: number; count: number }[]> => {
  return fetchWrapper("user/plays/resolve", {
    method: "POST",
    body: JSON.stringify({
      ids,
    }),
  });
};

/**
 * Products
 */

export interface Product {
  id: string;
  images: string[];
  name: string;
  default_price: string;
  price: {
    unit_amount: number;
    type: "one_time" | "recurring";
    currency: "eur";
    id: string;
  };
}

export const fetchProducts = async (): Promise<Product[]> => {
  return fetchWrapper("user/products", {
    method: "GET",
  });
};