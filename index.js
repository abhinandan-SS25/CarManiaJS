document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#startscreen").addEventListener("click", function () {
        document.querySelector("#startscreen").style.opacity = "0";
        document.querySelector("#startscreen").style.zIndex = "5";
        document.querySelector("#startscreen").style.height = "0";
        document.querySelector("#playscreen").style.height = "100vh";
        document.querySelector("#playscreen").style.opacity = "1";
        document.querySelector("#curb").style.display = "flex";
        document.querySelector("#scorer").style.display = "flex";

        const road_dim = {
            l: document.getElementById("1").getBoundingClientRect().left,
            r: document.getElementById("5").getBoundingClientRect().right,
            t: 0,
            b: window.innerHeight
        }
        let player = {
            x: (road_dim.l + road_dim.r) / 2,
            y: window.innerHeight * 0.7,
        }
        const f = document.createElement("div");
        f.id = "player";
        f.style.left = `${player.x}px`;
        f.style.top = `${player.y}px`;
        f.style.zIndex = "1";

        document.getElementById("5").append(f);

        document.addEventListener("keydown", function (k) {
            if ((k.key == "ArrowRight") && (player.x < road_dim.r - 90)) {
                player.x = player.x + 10;
                f.style.transform = "rotate(0.4rad)";
                f.style.left = `${player.x}px`;
            }
            if ((k.key == "ArrowLeft") && (player.x > road_dim.l)) {
                player.x = player.x - 10;
                f.style.transform = "rotate(-0.4rad)";
                f.style.left = `${player.x}px`;
            }
            if ((k.key == "ArrowUp") && (player.y > road_dim.t)) {
                player.y = player.y - 10;
                f.style.transform = "rotate(0rad)";
                f.style.top = `${player.y}px`;
            }
            if ((k.key == "ArrowDown") && (player.y < road_dim.b - 200)) {
                player.y = player.y + 10;
                f.style.transform = "rotate(0rad)";
                f.style.top = `${player.y}px`;
            }
        })
        f.addEventListener("transitionend", () => {
            f.style.transform = "rotate(0rad)";
        })

        window.setInterval( () => {
            if (document.querySelector("#playscreen").style.display == "") {
                c_score = parseFloat(document.querySelector("#score").innerText);
                n_score = c_score + 1;
                document.querySelector("#score").innerText = n_score;
            }
        },
        100);

        const roads = [1,2,3,4,5];
        const enemys = [
            "./assets/enemy1.png",
            "./assets/enemy2.png",
            "./assets/enemy3.png",
        ]

        window.setInterval( () => {
            const road = roads[Math.floor(Math.random()*3)];
            const enembg = enemys[Math.floor(Math.random()*3)];
            const enemy = document.createElement("div");
            enemy.className = "enemy";
            enemy.style.backgroundImage = `url(${enembg})`;

            document.getElementById(`${road}`).append(enemy);
            const speed = 2;
            enemy.style.animation = `enemycar ${speed}s linear 1`;

            window.setTimeout( function () {
                window.setInterval( function () {
                        const p = document.querySelector("#player");
                        const pl = p.getBoundingClientRect();

                        if ((pl.left>=document.querySelector(".enemy").getBoundingClientRect().left && pl.left<=document.querySelector(".enemy").getBoundingClientRect().right) && (pl.top>=document.querySelector(".enemy").getBoundingClientRect().top && pl.top<=document.querySelector(".enemy").getBoundingClientRect().bottom)) {
                            document.querySelector("#playscreen").style.display = "none";
                            document.querySelector("#startscreen").style.display = "none";
                            document.querySelector("#endscreen").style.display = "flex";
                            document.querySelector("span").innerText = parseFloat(document.querySelector("#score").innerText);
                        }
                        else if ((pl.left>=document.querySelector(".enemy").getBoundingClientRect().left && pl.left<=document.querySelector(".enemy").getBoundingClientRect().right) && (pl.bottom>=document.querySelector(".enemy").getBoundingClientRect().top && pl.bottom<=document.querySelector(".enemy").getBoundingClientRect().bottom)) {
                            document.querySelector("#playscreen").style.display = "none";
                            document.querySelector("#startscreen").style.display = "none";
                            document.querySelector("#endscreen").style.display = "flex";
                            document.querySelector("span").innerText = parseFloat(document.querySelector("#score").innerText);
                        }
                        else if ((pl.right>=document.querySelector(".enemy").getBoundingClientRect().left && pl.right<=document.querySelector(".enemy").getBoundingClientRect().right) && (pl.bottom>=document.querySelector(".enemy").getBoundingClientRect().top && pl.bottom<=document.querySelector(".enemy").getBoundingClientRect().bottom)) {
                            document.querySelector("#playscreen").style.display = "none";
                            document.querySelector("#startscreen").style.display = "none";
                            document.querySelector("#endscreen").style.display = "flex";
                            document.querySelector("span").innerText = parseFloat(document.querySelector("#score").innerText);
                        }
                        else if ((pl.right>=document.querySelector(".enemy").getBoundingClientRect().left && pl.right<=document.querySelector(".enemy").getBoundingClientRect().right) && (pl.top>=document.querySelector(".enemy").getBoundingClientRect().top && pl.top<=document.querySelector(".enemy").getBoundingClientRect().bottom)) {
                            document.querySelector("#playscreen").style.display = "none";
                            document.querySelector("#startscreen").style.display = "none";
                            document.querySelector("#endscreen").style.display = "flex";
                            document.querySelector("span").innerText = parseFloat(document.querySelector("#score").innerText);
                        }
                    },
                50);
            }, 
            5000);
            
            enemy.addEventListener("animationend", () => {
                document.getElementById(`${road}`).removeChild(enemy);
                cc_score = parseFloat(document.querySelector("#score").innerText);
                nn_score = cc_score + 50;
                document.querySelector("#score").innerText = nn_score;
            })
        },
        5000);
        })

})