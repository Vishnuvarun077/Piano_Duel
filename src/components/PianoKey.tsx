import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  isPressed?: boolean;
  isDisabled?: boolean;
  onPress: (note: string) => void;
  className?: string;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  isBlack = false,
  isPressed = false,
  isDisabled = false,
  onPress,
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for this note
    audioRef.current = new Audio(`/piano-samples/${note}.mp3`);
    audioRef.current.preload = 'auto';
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [note]);

  const playNote = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const handlePress = () => {
    if (!isDisabled) {
      playNote();
      onPress(note);
    }
  };

  return (
    <button
      className={cn(
        'relative transition-all duration-100 select-none shadow-md',
        isBlack
          ? 'bg-piano-black text-white h-32 w-12 -mx-6 z-10 hover:bg-opacity-90'
          : 'bg-piano-white text-black h-48 w-16 hover:bg-opacity-90',
        isPressed && 'animate-piano-press',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      disabled={isDisabled}
      aria-label={`Piano key ${note}`}
    >
      <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium">
        {note}
      </span>
    </button>
  );
};

export default PianoKey;