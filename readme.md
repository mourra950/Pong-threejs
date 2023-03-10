# Pong Game
![image](https://user-images.githubusercontent.com/64339763/210290137-f096aa0f-5bcb-4658-9e22-044aa7c0082f.png)

This is a simple pong game implemented in JavaScript using the three.js and cannon-es libraries.

## How to Run

to make the project work you follow this steps.
to initialize the npm environment

```ssh
npm init -y
```

to install parcel file project manager

```ssh
npm install parcel
```

to install threejs the 3D game/web engine

```ssh
npm install three
```

to install cannon-es the physics engine for collision and so

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
