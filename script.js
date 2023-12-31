// https://www.youtube.com/watch?v=aEDADLtLEbk&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=9

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 600;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 3000;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost'];
        }
        update(deltaTime) {
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(object => object.update(deltaTime));
        }
        draw() {
            this.enemies.forEach(object => object.draw(this.ctx));
        }
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if (randomEnemy == 'worm') this.enemies.push(new Worm(this));
            else if (randomEnemy == 'ghost') this.enemies.push(new Ghost(this));
            //  Draw enemies lower in front of higher enemies
            this.enemies.sort(function (a, b) {
                return a.y - b.y;
            });
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;
            this.markedForDeletion = false;
        }
        update(deltaTime) {
            this.x -= this.vx * deltaTime;
            // Remove enemies
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
        draw(ctx) {
            // ctx.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth / 2;
            this.height = this.spriteHeight / 2;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.markedForDeletion = false;
            this.image = worm; //  Id name
            this.vx = Math.random() * 0.1 + 0.1;
            console.log(this.image);
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth / 2;
            this.height = this.spriteHeight / 2;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.4;
            this.markedForDeletion = false;
            this.image = ghost; //  Id name
            this.vx = Math.random() * 0.2 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 3

            console.log(this.image);
        }
        update(deltaTime) {
            super.update(deltaTime)
            this.y += Math.sin(this.angle) * this.curve;
            this.angle += 0.04;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = 0.5;
            super.draw(ctx);
            ctx.restore();
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }

    animate(0);
});