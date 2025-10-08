import type { Track } from '@/@types/Track';
import { likeMusic, unlikeMusic } from '@/store/slices/likesSlice';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';

interface LikeButtonProps {
  track: Track;
  isLiked: boolean;
}

const LikeButton = ({ isLiked, track }: LikeButtonProps) => {
  const dispatch = useDispatch();
  return (
    <button
      className="cursor-pointer rounded-full bg-black/50 p-2 text-white hover:bg-[#FF4081]/30"
      onClick={(e) => {
        e.stopPropagation();
        if (isLiked) {
          dispatch(unlikeMusic(track.idTrack));
        } else {
          dispatch(likeMusic(track));
        }
      }}
    >
      <Heart
        className={`h-5 w-5 ${
          isLiked ? 'fill-pink-600 text-pink-600' : 'text-pink-500'
        }`}
      />
    </button>
  );
};

export default LikeButton;
