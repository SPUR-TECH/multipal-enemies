// https://www.youtube.com/watch?v=aEDADLtLEbk&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=9


// console.log();


window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 600;

    class Game {
        constructor() {
            this.enemies = [];
            this.#addNewEnemy();
            console.log(this.enemies);
        }
        update() {
            this.enemies.forEach(object => object.update());
        }
        draw() {
            this.enemies.forEach(object => object.draw());
        }
        #addNewEnemy() {
            this.enemies.push(new Enemy());
        }
    }

    class Enemy {
        constructor() {
            this.x = 100;
            this.y = 100;
            this.width = 100;
            this.height = 100;
        }
        update() {
            this.x--;
        }
        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    const game = new Game();
    let lastTime = 1;

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update();
        game.draw();
        requestAnimationFrame(animate);
    }

    animate(0);
});