# Pong Game

This is a simple pong game implemented in JavaScript using the three.js and cannon-es libraries.

## How to Run

to make the project work you follow this steps.

```ssh
npm init -y
```

```ssh
npm install parcel
```

```ssh
npm install three
```

```ssh
npm install cannon-es
```

then you can deploy web page using parcel by excuting the following command in the terminal

```ssh
parcel ./src/index.html
```

## How to Play

The objective of the game is to use the paddles to hit the ball back and forth, trying to score a point by getting the ball past your opponent's paddle.

Player 1 controls the left paddle using the W and S keys, and player 2 controls the right paddle is controlled by a simple AI which follows the balls so good luck winning XD. The ball will start moving in a random direction when the game begins, and it will bounce off the paddles and walls of the game area.

The game is made just to pass time no winning system is build.

## File Structure

- index.html: HTML file that contains the game canvas and links to the necessary JavaScript files.
- main.js: Contains the main game logic and function definitions.
- pong.png: Image file used as the background for the game.

## Dependencies

- three.js: A JavaScript library for creating 3D graphics.
- cannon-es: A JavaScript library for physics simulation.

## References

three.js documentation
cannon-es documentation
