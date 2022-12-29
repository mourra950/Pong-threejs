import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { Box2 } from 'three';
//init renderer/scene /camera/lights

//init the physics
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, 0, 0), // m/s²
})
//init the scene
const scene = new THREE.Scene();
const backgroundurl = new URL('../pong.png', import.meta.url);
//camera
//##########################################
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);//camera config
camera.position.set(0, 0, 15);//camera position
camera.lookAt(0, 0, 0);//camera rotation
//###########################################
//lights
const sun = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
//renderer and linking it to the html
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
//renderer.setClearColor(0x000000); //background color

const paddlegeometry = new THREE.PlaneGeometry(0.4, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
//init the paddles in plane form
const paddle1 = new THREE.Mesh(paddlegeometry, material);
const paddle2 = new THREE.Mesh(paddlegeometry, material);
paddle1.position.set(20, 0, 0);//8.5 max in y
paddle2.position.set(-20, 0, 0);
scene.add(paddle1);
scene.add(paddle2);
//init the ball
const ballgeometry = new THREE.CircleGeometry(0.2, 64);
const ball = new THREE.Mesh(ballgeometry, material);
ball.position.set(0, 0, 0);
scene.add(ball);
//setting the background picture to the pong background
const backgroundtexture = new THREE.TextureLoader().load(backgroundurl.href);
scene.background = backgroundtexture
//adding light
scene.add(sun);

//const paddle1box = new THREE.Box2((20 - 0.2, 0 - 1.5), (20 + 0.2, 0 + 1.5));
//const ballbox = new THREE.Box2((0.1, 0.1), (0.1, 0.1));
//console.log("done")
//scene.add(paddle1box)
//scene.add(ballbox)

//init the variables 
let ball_x = 0;
let ball_y = 0;
let ball0_x = 0;
let ball0_y = 0;

let state = 0;
//const boxhelp = new THREE.BoxHelper( paddle1, 0xffff00 );
//scene.add( boxhelp);

//###############################
//physics
paddle1body = new CANNON.Body({
    Shape: new CANNON.Box(new CANNON.Vec3(0.2, 1.5, 0.1))
    // , type: CANNON.Body.DYNAMIC
})
paddle2body = new CANNON.Body({
    Shape: new CANNON.Box(new CANNON.Vec3(0.2, 1.5, 0.1))
    // , type: CANNON.Body.DYNAMIC
})
ballbody = new CANNON.Body({
    Shape: new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1))
    // , type: CANNON.Body.DYNAMIC
})
// ballbody.aabb.lowerBound=new CANNON.Vec3(-0.1, -0.1, -0.1);
// ballbody.aabb.upperBound=new CANNON.Vec3(0.1, 0.1, 0.1);
// paddle1body.aabb.lowerBound=new CANNON.Vec3(-0.2, -1.5, -0.1);
// paddle1body.aabb.upperBound=new CANNON.Vec3(0.2, 1.5, 0.1);
// paddle2body.aabb.lowerBound=new CANNON.Vec3(-0.2, -1.5, -0.1);
// paddle2body.aabb.upperBound=new CANNON.Vec3(0.2, 1.5, 0.1);
//ballbody.aabb.setFromPoints()
paddle1body.quaternion.setFromEuler(Math.PI / 2, 0, 0)
paddle1body.position.set(20, 0, 0)
paddle2body.quaternion.setFromEuler(Math.PI / 2, 0, 0)
paddle2body.position.set(-20, 0, 0)
ballbody.quaternion.setFromEuler(0, 0, 0)
ballbody.position.set(0, 0, 0)
ballbody.boundingSphereRadius = 0.2
world.addBody(ballbody)
world.addBody(paddle1body)
world.addBody(paddle2body)
//this function is called every frame to recalculate bouding boxes
function updateAABb() {
    ballbody.aabb.lowerBound = new CANNON.Vec3(ballbody.position.x - 0.1, ballbody.position.y - 0.1, -0.1);
    ballbody.aabb.upperBound = new CANNON.Vec3(ballbody.position.x + 0.1, ballbody.position.y - 0.1, 0.1);
    paddle1body.aabb.lowerBound = new CANNON.Vec3(paddle1body.position.x - 0.2, paddle1body.position.y - 1.5, -0.1);
    paddle1body.aabb.upperBound = new CANNON.Vec3(paddle1body.position.x + 0.2, paddle1body.position.y + 1.5, 0.1);
    paddle2body.aabb.lowerBound = new CANNON.Vec3(paddle2body.position.x - 0.2, paddle2body.position.y - 1.5, -0.1);
    paddle2body.aabb.upperBound = new CANNON.Vec3(paddle2body.position.x + 0.2, paddle2body.position.y + 1.5, 0.1);

};

//###############################
//this function is called to render every frame during runtime and to adjust screensize in case something changed
function render() {
    updateAABb()
    game();


    //console.log(paddle1box)

    //window resizing
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = 19 / 9;
        camera.updateProjectionMatrix();
    }
    //request for next frame
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    world.fixedStep()
}

//console.log(ballbody.aabb.overlaps(paddle1body.aabb))




//function to check if we need to resize the screen pixels height and width
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}


//updating game meshes
function update_meshes() {
    paddle1.position.copy(paddle1body.position)
    paddle2.position.copy(paddle2body.position)
    ball.position.copy(ballbody.position)
}
//is called every frame to check if the game on to update the ball position and check if new dx or dy need to be assigned based on any collisions
function ball_update() {
    if (state == 1) {
        
        //check for bottom and top walls collisions to invert the y direction
        if (ballbody.position.y > 10) {
            ball_y = -(Math.abs(ball0_y))
        }
        else if (ballbody.position.y < -10) {
            ball_y = (Math.abs(ball0_y))
        }
        
        //check for ball passing players
        if (ball.position.x > 21) {
            state = 0
        }
        else if (ball.position.x < -21) {
            state = 0
        }

        if (ballbody.aabb.overlaps(paddle1body.aabb)) {     //collision with player 1
            ball_x = -(Math.abs(ball0_x))
            ball0_x += 0.01
        }
        else if (ballbody.aabb.overlaps(paddle2body.aabb)) { //collission with player 2
            ball_x = (Math.abs(ball0_x))
            ball0_x += 0.01
        }
        ballbody.position.x += ball_x
        ballbody.position.y += ball_y

        paddle1body.position.y = ballbody.position.y;
    }
}

function game() {
    if (state == 0)//game starting
    {
        ballbody.position.set(0, 0, 0);
        ball_x = (Math.random() * 0.4) - 0.2;
        ball_y = (Math.random() * 0.3) - 0.15;
    }
    else if (state == 1) {
        ball_update();
        update_meshes();

    }
    else if (state == 2) {
        return;
    }
}

document.addEventListener('keypress', (event) => {
    if (event.key == 'a') {
        if (state == 0) {
            console.log("updated")
            state = 1;
            ball0_x = ball_x;
            ball0_y = ball_y;

        }
    }
    //paddle2 controls main player
    if (event.key == 'w') {
        paddle2body.position.y += 0.25
    }
    if (event.key == 's') {
        paddle2body.position.y -= 0.25
    }

}, false);

//to start requestion animation frame loop like while(1)
requestAnimationFrame(render);



