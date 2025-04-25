import { Theme } from '@mui/material';
import {
  Add,
  QueueMusic,
  PlaylistAdd,
  ContentCopy,
  Clear,
} from '@mui/icons-material';
import { Track } from '@common/interfaces';
import { useStore } from '@store/index';
import {
  useAddTrackToSavedSongs,
  useRemoveTrackFromSavedSongs,
} from '@services/tracks';
import { useLanguage } from '@hooks/common';

const contextMenuIconSx = {
  width: 20,
  height: 20,
  fill: (theme: Theme) => theme.palette.accent.main,
};

export const useTrackContext = (
  selectedTrack: Track | null,
  isSavedTracksList?: boolean
) => {
  const { t } = useLanguage('tracks');
  const tracks = useStore((state) => state.savedTracks.tracks);
  const offset = useStore((state) => state.savedTracks.offset);
  const total = useStore((state) => state.savedTracks.total);
  const setTracksData = useStore((state) => state.savedTracks.setTracksData);
  const { mutate: saveTrackMutation } = useAddTrackToSavedSongs();
  const { mutate: removeTrackMutation } = useRemoveTrackFromSavedSongs();

  const handleSaveTrack = () => {
    saveTrackMutation({ id: selectedTrack?.id ?? '' });

    if (
      selectedTrack &&
      tracks.length &&
      !tracks.some((track) => track.track.id === selectedTrack.id)
    ) {
      setTracksData({
        tracks: [
          { added_at: new Date().toISOString(), track: selectedTrack },
          ...tracks,
        ],
        total: total + 1,
        offset: offset,
      });
    }
  };

  const handleRemoveTrack = () => {
    removeTrackMutation({ id: selectedTrack?.id ?? '' });

    if (
      selectedTrack &&
      tracks.length &&
      tracks.some((track) => track.track.id === selectedTrack.id)
    ) {
      const updatedTracks = tracks.filter(
        (track) => track.track.id !== selectedTrack.id
      );

      setTracksData({
        tracks: updatedTracks,
        total: total - 1,
        offset: offset,
      });
    }
  };

  const saveTrackOption = !isSavedTracksList
    ? [
        {
          label: t('trackOptions.save'),
          onClick: handleSaveTrack,
          icon: <Add sx={contextMenuIconSx} />,
        },
      ]
    : [];

  const deleteTrackOption = isSavedTracksList
    ? [
        {
          label: t('trackOptions.delete'),
          onClick: handleRemoveTrack,
          icon: (
            <Clear
              sx={{
                width: contextMenuIconSx.width,
                height: contextMenuIconSx.height,
                fill: (theme) => theme.palette.error.main,
              }}
            />
          ),
        },
      ]
    : [];

  const options = [
    ...saveTrackOption,
    {
      label: t('trackOptions.addToQueue'),
      onClick: () => {},
      icon: <QueueMusic sx={contextMenuIconSx} />,
    },
    {
      label: t('trackOptions.addToPlaylist'),
      onClick: () => {},
      icon: <PlaylistAdd sx={contextMenuIconSx} />,
    },
    {
      label: t('trackOptions.copyLink'),
      onClick: () => {},
      icon: (
        <ContentCopy
          sx={{ width: 18, height: 18, fill: contextMenuIconSx.fill }}
        />
      ),
    },
    ...deleteTrackOption,
  ];

  return {
    options,
  };
};
