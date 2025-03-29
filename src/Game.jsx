// import React, { useState } from "react";
// import players from "./PlayerData"; // Importing player data
// import "./game.css"; // Importing CSS file

// const Game = () => {
//   // Function to get a random player
//   const getRandomPlayer = () => players[Math.floor(Math.random() * players.length)];

//   // State variables
//   const [currentPlayer, setCurrentPlayer] = useState(getRandomPlayer());
//   const [score, setScore] = useState(0);
//   const [highScore, setHighScore] = useState(
//     localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0
//   );
//   const [gameOver, setGameOver] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [blurLevel, setBlurLevel] = useState(10); // Initial blur level

//   // Handle user input
//   const handleGuess = () => {
//     if (inputValue.toLowerCase() === currentPlayer.name.toLowerCase()) {
//       setScore(score + 1);
//       setIsCorrect(true);
//       setBlurLevel(0); // Fully reveal the image
//     } else {
//       // Reduce blur effect on incorrect guesses
//       setBlurLevel((prev) => Math.max(prev - 2, 2));
//     }
//   };

//   // Function to go to the next player
//   const handleNextPlayer = () => {
//     setIsCorrect(false);
//     setInputValue("");
//     setBlurLevel(10); // Reset blur for the new player
//     setCurrentPlayer(getRandomPlayer());
//   };

//   // Function to reset the game
//   const resetGame = () => {
//     setScore(0);
//     setGameOver(false);
//     setIsCorrect(false);
//     setCurrentPlayer(getRandomPlayer());
//     setInputValue("");
//     setBlurLevel(10);
//   };

//   return (
//     <div className="game-container">
//       <h1>Guess the Player</h1>
//       <h2>Score: {score}</h2>
//       <h2>High Score: {highScore}</h2>

//       {gameOver ? (
//         <div className="game-over">
//           <h3>Game Over! The correct answer was: {currentPlayer.name}</h3>
//           <button onClick={resetGame}>Reset Game</button>
//         </div>
//       ) : (
//         <div className="game-content">
//           {/* Display the player's image with dynamic blur effect */}
//           <div className="image-container">
//             <img
//               src={currentPlayer.image}
//               alt={currentPlayer.name}
//               className="player-image"
//               style={{ filter: `blur(${isCorrect ? 0 : blurLevel}px)`, transition: "filter 0.5s ease-in-out" }}
//             />
//           </div>

//           {isCorrect ? (
//             <>
//               <h3>Correct! This is {currentPlayer.name}.</h3>
//               <button onClick={handleNextPlayer}>Next Player</button>
//             </>
//           ) : (
//             <>
//               <p>Hint: {currentPlayer.hint}</p>
//               <input
//                 type="text"
//                 placeholder="Enter Player Name"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//               />
//               <button onClick={handleGuess}>Submit</button>
//               <button onClick={resetGame}>Reset Game</button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Game;
import React, { useState } from "react";
import players from "./PlayerData";
import "./game.css";

const Game = () => {
    const [playerList, setPlayerList] = useState([...players]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem("highScore")) || 0
    );
    const [input, setInput] = useState("");
    const [blurLevel, setBlurLevel] = useState(10); 
    const [showImage, setShowImage] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false); 

    // Get current player
    const currentPlayer = playerList[currentIndex];

    const handleGuess = () => {
        if (!currentPlayer) return;

        if (input.toLowerCase() === currentPlayer.name.toLowerCase()) {
            setScore(score + 1);
            setShowImage(true);
            setAnsweredCorrectly(true);
        } else {
            if (blurLevel > 0) {
                setBlurLevel(blurLevel - 2); 
            } else {
                setGameOver(true);
            }
        }
        setInput("");
    };

    const moveToNextPlayer = () => {
        setShowImage(false);
        setBlurLevel(10); // Reset blur
        setAnsweredCorrectly(false);

        if (playerList.length === 1) {
            setWin(true);
        } else {
            const newPlayerList = playerList.filter((_, i) => i !== currentIndex);
            setPlayerList(newPlayerList);
            setCurrentIndex(Math.floor(Math.random() * newPlayerList.length));
        }
    };

    const handleReset = () => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("highScore", score);
        }
        setPlayerList([...players]);
        setCurrentIndex(0);
        setScore(0);
        setBlurLevel(10);
        setShowImage(false);
        setGameOver(false);
        setWin(false);
        setAnsweredCorrectly(false);
    };


    

    return (
        <div className="game-container">
            <h1>Guess the Player</h1>
            <h2>Enter Full Name of the player</h2>
            <h2>Score: {score}</h2>
            <h2>High Score: {highScore}</h2>

            {gameOver ? (
                <h2>You Couldn't Guess the Player. Game Over!</h2>
            ) : win ? (<>
                <h1>Congratulations!!!</h1>
                <h2>🎉 You Won the Game! 🎉</h2>
                </>
            ) : (
                <>
                    <p><b>Hint:</b> {currentPlayer.hint}</p>
                    <div className="image-container">
                        <img
                            src={currentPlayer.image}
                            alt="Player"
                            className="player-image"
                            style={{ filter: `blur(${showImage ? 0 : blurLevel}px)` }}
                        />
                    </div>
                    {!answeredCorrectly ? (
                        <>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter Player Name"
                            />
                            <button onClick={handleGuess}><span class="box">Submit</span></button>
                        </>
                    ) : (
                        <button onClick={moveToNextPlayer}><span class="box">Next Player</span></button>
                    )}
                </>
            )}

            <button onClick={handleReset}><span class="box">Reset Game</span></button>
        </div>
    );
};

export default Game;








