const { Engine, Render, Runner, Bodies, Composite, Body, Vector } = Matter;

const engine = Engine.create();

const render = Render.create({
  element: document.getElementById("scene"),
  engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
  }
});

const width = render.options.width;
const height = render.options.height;

Render.run(render);
Runner.run(Runner.create(), engine);
// x position, y position, radius, physical behavior
// more on physical behavior: restitution determines how "bouncy" the ball is
// the higher the value, the less energy loss the ball experiences after a collision
const ball = Bodies.circle(400, 400, 30, { restitution: 0.9 });
const ground = Bodies.rectangle(width / 2, height * 3 / 4, width, 40, { isStatic: true });
const left_wall = Bodies.rectangle(0, height / 2,  40, height / 2, {isStatic: true});
const right_wall = Bodies.rectangle(width, height / 2,  40, height / 2, {isStatic: true});
const ceiling = Bodies.rectangle(width / 2, height / 4, width, 40, {isStatic: true});

Composite.add(engine.world, [ball, ground, left_wall, right_wall, ceiling]);

document.addEventListener("click", function(event) {

    const xPos = event.clientX;
    const yPos = event.clientY;
    
    const dist_to_clicked_pixel = Math.sqrt((xPos - ball.position.x) ** 2 + 
                                            (yPos - ball.position.y) ** 2);

    if(dist_to_clicked_pixel > ball.circleRadius){
        return;
    }


    // dir.x determines the horizontal movement: positive -> right, negative -> left
    const dir = Vector.normalise({
        x: ball.position.x - xPos,
        y: ball.position.y - yPos
    });

  Body.applyForce(ball, ball.position, {
    x: dir.x * (dist_to_clicked_pixel / ball.circleRadius) * 0.3,
    y: dir.y * (dist_to_clicked_pixel / ball.circleRadius) * 0.3
  });
});
