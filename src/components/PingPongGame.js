import React, { useEffect, useRef, useState } from "react";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 240;
const PADDLE_WIDTH = 70;
const PADDLE_HEIGHT = 12;
const BALL_RADIUS = 8;
const PADDLE_Y = CANVAS_HEIGHT - 30;
const INIT_BALL_SPEED = 3;

// Bomb settings
const BOMB_RADIUS = 10;
const BOMB_SPEED = 2;
const BOMB_DROP_INTERVAL = 1800; // ms

const PingPongGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paddleX, setPaddleX] = useState((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const [ball, setBall] = useState({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    dx: INIT_BALL_SPEED,
    dy: -INIT_BALL_SPEED,
    speed: INIT_BALL_SPEED,
  });
  const [bombs, setBombs] = useState([]);

  // Paddle movement with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "ArrowLeft") {
        setPaddleX((prev) => Math.max(prev - 32, 0));
      } else if (e.code === "ArrowRight") {
        setPaddleX((prev) => Math.min(prev + 32, CANVAS_WIDTH - PADDLE_WIDTH));
      }
      if (gameOver && (e.code === "Space" || e.code === "ArrowUp")) {
        restart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [gameOver]);

  // Ball movement and collision, speed up every 10 points
  useEffect(() => {
    if (gameOver) return;
    let animation;
    const move = () => {
      setBall((prev) => {
        let { x, y, dx, dy, speed } = prev;

        // Increase speed every 10 points
        const newSpeed = INIT_BALL_SPEED + Math.floor(score / 10) * 1.2;
        if (speed !== newSpeed) {
          dx = dx > 0 ? newSpeed : -newSpeed;
          dy = dy > 0 ? newSpeed : -newSpeed;
        }

        x += dx;
        y += dy;

        // Wall collision
        if (x < BALL_RADIUS || x > CANVAS_WIDTH - BALL_RADIUS) dx = -dx;
        if (y < BALL_RADIUS) dy = -dy;

        // Paddle collision
        if (
          y + BALL_RADIUS >= PADDLE_Y &&
          x > paddleX &&
          x < paddleX + PADDLE_WIDTH &&
          dy > 0
        ) {
          dy = -dy;
          setScore((s) => s + 1);
        }

        // Missed paddle
        if (y > CANVAS_HEIGHT - BALL_RADIUS) {
          setGameOver(true);
        }

        return { x, y, dx, dy, speed: newSpeed };
      });
      animation = requestAnimationFrame(move);
    };
    animation = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animation);
    // eslint-disable-next-line
  }, [paddleX, gameOver, score]);

  // Bomb drop logic
  useEffect(() => {
    if (gameOver) return;
    const dropBomb = () => {
      setBombs((prev) => [
        ...prev,
        {
          x: Math.random() * (CANVAS_WIDTH - BOMB_RADIUS * 2) + BOMB_RADIUS,
          y: -BOMB_RADIUS,
        },
      ]);
    };
    const interval = setInterval(dropBomb, BOMB_DROP_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Bomb movement and collision
  useEffect(() => {
    if (gameOver) return;
    let animation;
    const moveBombs = () => {
      setBombs((prev) =>
        prev
          .map((bomb) => ({
            ...bomb,
            y: bomb.y + BOMB_SPEED + score * 0.05, // bombs get slightly faster as score increases
          }))
          .filter((bomb) => bomb.y < CANVAS_HEIGHT + BOMB_RADIUS)
      );
      animation = requestAnimationFrame(moveBombs);
    };
    animation = requestAnimationFrame(moveBombs);
    return () => cancelAnimationFrame(animation);
  }, [gameOver, score]);

  // Bomb collision with paddle or ball
  useEffect(() => {
    if (gameOver) return;
    for (let bomb of bombs) {
      // Paddle collision
      if (
        bomb.y + BOMB_RADIUS >= PADDLE_Y &&
        bomb.x > paddleX &&
        bomb.x < paddleX + PADDLE_WIDTH
      ) {
        setGameOver(true);
        break;
      }
      // Ball collision
    }
    // eslint-disable-next-line
  }, [bombs, paddleX , gameOver]);

  // Draw everything
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Background
    ctx.fillStyle = "#f9f9f9";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Paddle
    ctx.fillStyle = "#fc8019";
    ctx.fillRect(paddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "#4caf50";
    ctx.fill();
    ctx.closePath();

    // Bombs
    bombs.forEach((bomb) => {
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, BOMB_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = "#e74c3c";
      ctx.fill();
      ctx.strokeStyle = "#b71c1c";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      // fuse
      ctx.beginPath();
      ctx.moveTo(bomb.x, bomb.y - BOMB_RADIUS);
      ctx.lineTo(bomb.x, bomb.y - BOMB_RADIUS - 8);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    });

    // Score
    ctx.font = "bold 18px monospace";
    ctx.fillStyle = "#fc8019";
    ctx.fillText(`Score: ${score}`, 16, 28);

    if (gameOver) {
      ctx.fillStyle = "#e74c3c";
      ctx.font = "bold 28px monospace";
      ctx.fillText("GAME OVER", CANVAS_WIDTH / 2 - 90, 100);
      ctx.font = "bold 16px monospace";
      ctx.fillStyle = "#222";
      ctx.fillText("Press Space or ↑ to restart", CANVAS_WIDTH / 2 - 110, 130);
    }
  }, [paddleX, ball, gameOver, score, bombs]);

  // Restart game
  const restart = () => {
    setGameOver(false);
    setScore(0);
    setPaddleX((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
    setBall({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      dx: INIT_BALL_SPEED,
      dy: -INIT_BALL_SPEED,
      speed: INIT_BALL_SPEED,
    });
    setBombs([]);
  };

  // Mouse/touch paddle movement
  useEffect(() => {
    const handleMove = (e) => {
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = canvasRef.current.getBoundingClientRect();
      let x = clientX - rect.left - PADDLE_WIDTH / 2;
      x = Math.max(0, Math.min(x, CANVAS_WIDTH - PADDLE_WIDTH));
      setPaddleX(x);
    };
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("touchmove", handleMove);
    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2 style={{ color: "#fc8019", fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
        You are offline!
      </h2>
      <p style={{ color: "#444", fontSize: 16, marginBottom: 18 }}>
        Play Ping Pong! Use <b>←</b> <b>→</b> or mouse/touch to move paddle
      </p>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          background: "linear-gradient(180deg, #fffbe6 0%, #ffe0c2 100%)",
          border: "2.5px solid #fc8019",
          borderRadius: 12,
          margin: "0 auto",
          display: "block",
          boxShadow: "0 4px 24px 0 #fc801933",
          touchAction: "none",
        }}
      />
    </div>
  );
};

export default PingPongGame;