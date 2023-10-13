window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 600;

    class Game {
        constructor() {
            this.enemies = [];
        }
        update() {

        }
        draw() {

        }
        #addNewEnemy() {

        }
    }

    class Enemy {
        constructor() {

        }
        update() {

        }
        draw() {

        }
    }

    let lastTime = 1;

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        requestAnimationFrame(animate);
    }

    animate(0);
});