const { Engine, Render, Runner, Bodies, Composite, Body, Vector } = Matter;

const engine = Engine.create();

const render = Render.create({
  element: document.body,
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

const ball = Bodies.circle(400, 200, 30, { restitution: 0.9 });
const ground = Bodies.rectangle(width / 2, height * 3 / 4, width, 40, { isStatic: true });
const left_wall = Bodies.rectangle();

Composite.add(engine.world, [ball, ground]);

document.addEventListener("click", () => {
  const dir = Vector.normalise({
    x: Math.random() - 0.5,
    y: Math.random() - 0.5
  });

  Body.applyForce(ball, ball.position, {
    x: dir.x * 0.05,
    y: dir.y * 0.05
  });
});
