// import { useGame } from "@/contexts/GameContext";
// import { Button } from "@/components/ui/button";
// import { Heart } from "lucide-react";
// import PianoKeyboard from "./PianoKeyboard";

// export default function Game() {
//   const { 
//     currentPlayer, 
//     isPlaying, 
//     playSequence, 
//     guessSequence, 
//     lives,
//     turnCount,
//     setTurnCount
//   } = useGame();

//   return (
//     <div className="flex flex-col items-center gap-8 p-4">
//       <div className="text-2xl font-bold text-center">
//         {currentPlayer === 'player1' ? "Player 1's Turn" : "Player 2's Turn"}
//       </div>

//       {currentPlayer === 'player1' && !isPlaying && (
//         <div className="flex flex-col items-center gap-4">
//           <div className="flex items-center gap-4">
//             <Button 
//               variant="outline" 
//               onClick={() => setTurnCount(Math.max(1, turnCount - 1))}
//             >
//               -
//             </Button>
//             <span className="text-xl font-bold">{turnCount} Notes</span>
//             <Button 
//               variant="outline" 
//               onClick={() => setTurnCount(turnCount + 1)}
//             >
//               +
//             </Button>
//           </div>
//           <Button onClick={playSequence} className="w-48">
//             Play Sequence
//           </Button>
//         </div>
//       )}

//       {currentPlayer === 'player2' && (
//         <div className="flex flex-col items-center gap-4">
//           <div className="flex gap-2">
//             {[...Array(3)].map((_, i) => (
//               <Heart
//                 key={i}
//                 className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
//               />
//             ))}
//           </div>
//           <div className="flex gap-2">
//             {guessSequence.map((guess, index) => (
//               <div
//                 key={index}
//                 className={`w-8 h-8 border-2 rounded flex items-center justify-center
//                   ${guess === null ? 'border-gray-300' : 
//                     guess === sequence[index] ? 'bg-green-500 border-green-500' : 'bg-red-500 border-red-500'}`}
//               >
//                 {guess !== null && (guess === sequence[index] ? '✓' : '×')}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <PianoKeyboard />
//     </div>
//   );
// }
