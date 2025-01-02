import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import PianoKeyboard from './PianoKeyboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GameScreen: React.FC = () => {
  const { gameState, addToSequence, checkSequence, nextTurn, resetGame } = useGame();
  const [guessSequence, setGuessSequence] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const currentPlayer = gameState.players[gameState.currentTurn];
  const requiredLength = gameState.currentRound + 2;
  const isCreating = gameState.gamePhase === 'create';

  const handleKeyPress = (note: string) => {
    if (isCreating) {
      if (gameState.sequence.length < requiredLength) {
        addToSequence(note);
        if (gameState.sequence.length + 1 === requiredLength) {
          setTimeout(() => nextTurn(), 500);
        }
      }
    } else {
      setGuessSequence(prev => {
        const newSequence = [...prev, note];
        if (newSequence.length === gameState.sequence.length) {
          const isCorrect = checkSequence(newSequence);
          setTimeout(() => {
            setGuessSequence([]);
            nextTurn();
          }, 1000);
        }
        return newSequence;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-piano-bg">
      <div className="flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="text-lg font-semibold">
          Round {gameState.currentRound}
        </div>
        <div className="flex space-x-4">
          {gameState.players.map((player, index) => (
            <div
              key={player.name}
              className={cn(
                'px-4 py-2 rounded-lg transition-colors',
                gameState.currentTurn === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              {player.name}: {player.score}
            </div>
          ))}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">End Game</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All progress will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetGame}>
                End Game
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex-1 flex flex-col justify-between pt-16">
        <PianoKeyboard
          isRotated={true}
          isDisabled={gameState.currentTurn === 1}
          onKeyPress={handleKeyPress}
        />

        <div className="text-center py-8 animate-fade-in glass-morphism mx-4 rounded-lg">
          <div className="text-2xl font-semibold mb-2">
            {currentPlayer.name}'s turn to {isCreating ? 'create' : 'guess'}
          </div>
          <div className="text-muted-foreground">
            {isCreating
              ? `Play ${requiredLength} notes`
              : `Reproduce the sequence (${guessSequence.length}/${gameState.sequence.length})`}
          </div>
        </div>

        <PianoKeyboard
          isDisabled={gameState.currentTurn === 0}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default GameScreen;