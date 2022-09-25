const score = document.querySelector('.score');
        const startScreen = document.querySelector('.startScreen');
        const gameArea = document.querySelector('.gameArea');

        //console.log(score);
        //console.log(startScreen);
        console.log(gameArea);

        startScreen.addEventListener('click', start);
        var player = { speed: 5, score: 0 };

        //suru me sare false rhenge taki jb user jo key press kre whin true ho baki sb false rhe
        var keys = {
            ArrowUp: false, ArrowDown: false, ArrowLeft: false,
            ArrowRight: false
        }


        //user kon sa key press kr rha hai use pta lgabyenge
        // fn call kr rhe hain or call back fn
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        //fn define krenge
        function keyDown(e) {
            //js ke default behaviour ko prevent krenge
            e.preventDefault();
            keys[e.key] = true;
            //console.log(e.key);
            //console.log(keys);
        }

        function keyUp(e) {
            e.preventDefault();
            keys[e.key] = false;
            //console.log(e.key);
            //console.log(keys);
        }

        function iscollide(a, b) {
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
                (aRect.right < bRect.left) || (aRect.left > bRect.right))

        }
        //moving white lines continuosly
        function moveLines() {
            let lines = document.querySelectorAll('.lines');

            lines.forEach(function (item) {
                //700 pe jate hi wapas use upar se niche dikhao
                if (item.y >= 700) {
                    item.y -= 750
                }
                //lines ki speed
                item.y += player.speed;
                ////for center
                item.style.top = item.y + 'px';

            })
        }

        //ending game after colliding
        function endGame() {
            player.start = false;
            //adding screen at end of game which shows final score and game over  
            startScreen.classList.remove('hide');
            startScreen.innerHTML = "Game Over <br> Your Final Score Is : " + player.score +
                "<br>Press Here To Restart The Game";
        }




        //move enemy car
        function moveEnemy(car) {
            let enemy = document.querySelectorAll('.enemy');

            enemy.forEach(function (item) {
                if (iscollide(car, item)) {
                    //console.log("BOOM HIt");
                    endGame();
                }
                //750 pe jaise touch krega waie hi wapas aayehga top se -300 se
                if (item.y >= 750) {
                    item.y = -300;
                    item.style.left = Math.floor(Math.random() * 350) + "px";
                }
                //lines ki speed
                item.y += player.speed;
                ////for center
                item.style.top = item.y + 'px';

            })
        }

        function gamePlay() {
            // console.log("hey i am clicked");

            let car = document.querySelector('.car');

            //road ka pura sixe pta lga rhe hain x se yse height width 
            let road = gameArea.getBoundingClientRect();
            // console.log(road);



            if (player.start) {

                moveLines();
                moveEnemy(car);




                //moving car up down
                if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }

                if (keys.ArrowDown && player.y < (road.bottom - 90)) { player.y += player.speed }

                if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }

                if (keys.ArrowRight && player.x < (road.width - 70)) { player.x += player.speed }

                car.style.top = player.y + "px";
                car.style.left = player.x + "px";


                window.requestAnimationFrame(gamePlay);
                //console.log(player.score++);

                player.score++;

                var ps = player.score - 1;
                score.innerText = "Score : " + ps;



            }

        }


        //game shuru
        function start() {
            //we are hiding a class and adding in other prees here to start
            //gameArea.classList.remove('hide');

            //and adding hide propert in start screen for adding car
            startScreen.classList.add('hide');

            gameArea.innerHTML = "";



            player.start = true;
            player.score = 0;

            window.requestAnimationFrame(gamePlay);


            //making road line white wali
            // road ke bich me

            for (x = 0; x < 5; x++) {
                let roadLine = document.createElement('div');
                roadLine.setAttribute('class', 'lines');
                roadLine.y = (x * 150);
                roadLine.style.top = roadLine.y + "px";
                gameArea.appendChild(roadLine);

            }



            //adding car  //generating car through java script
            let car = document.createElement('div');
            car.setAttribute('class', 'car');
            //car.innerText = "hey i am car";

            //game are div ke andar car add kr rhe hain
            gameArea.appendChild(car);



            //top kisi trah se top left ki value ko ghataoon , badhaoon to car ki position change hone wali hai


            player.x = car.offsetLeft;
            player.y = car.offsetTop;

            //console.log("top position " +car.offsetTop);
            //console.log("left position " +car.offsetLeft);




            //generating enemy car

            for (x = 0; x < 4; x++) {
                let enemyCar = document.createElement('div');
                enemyCar.setAttribute('class', 'enemy');
                enemyCar.y = ((x + 1) * 450) * -1;
                enemyCar.style.top = enemyCar.y + "px";
                //enemyCar.style.backgroundImage = choosePic;
                // enemyCar.style.color='red';






                enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
                gameArea.appendChild(enemyCar);

            }



        }
