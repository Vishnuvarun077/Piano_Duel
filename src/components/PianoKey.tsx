import React from 'react';
import { cn } from '@/lib/utils';
import { playNote } from '@/utils/audioUtils';

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
  const handlePress = () => {
    if (!isDisabled) {
      playNote(note);
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