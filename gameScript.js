var em = ["💐", "🌹", "🌻", "🏵️", "🌺", "🌴", "🌈", "🍓", "🍒", "🍎", "🍉", "🍊", "🥭", "🍍", "🍋", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🌶️", "🍄", "🧅", "🥦", "🥑", "🍔", "🍕", "🧁", "🎂", "🍬", "🍩", "🍫", "🎈"];

// Shuffling above array
var tmp, c, p = em.length;
if (p) while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = em[c];
    em[c] = em[p];
    em[p] = tmp;
}

// Variables
var pre = "", pID, ppID = 0, turn = 0, t = "transform", flip = "rotateY(180deg)", vi="visibility", visible="visible", hidden="hidden", flipBack = "rotateY(0deg)", mode;

// Starting the game with a 5x5 grid
function start() {
    var r = 4, l = 5;  // 5x5 grid
    moves = 0;
    $("#moves").html("Moves: 0");
    rem = r * l / 2;
    noItems = rem;
    mode = r + "x" + l;

    // Generating item array and shuffling it
    var items = [];
    for (var i = 0; i < noItems; i++)
        items.push(em[i]);
    for (var i = 0; i < noItems; i++)
        items.push(em[i]);

    var tmp, c, p = items.length;
    if (p) while (--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }

    // Creating table
    $("table").html("");
    var n = 1;
    for (var i = 1; i <= r; i++) {
        $("table").append("<tr>");
        for (var j = 1; j <= l; j++) {
            $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n - 1]}</p></div></div></td>`);
            n++;
        }
        $("table").append("</tr>");
    }

    // Hide any previous screens (like instructions)
    $("#ol").fadeOut(500);
}

// Function for flipping blocks
function change(x) {
    // Variables
    let i = "#" + x + " .inner";
    let f = "#" + x + " .inner .front";
    let b = "#" + x + " .inner .back";

    // Don't flip for these conditions

    if (turn == 2 || $(i).attr("flip") == "block" || ppID == x) { }

    // Flip
    else {
        $(i).css(t, flip);
        $(i).find(".back").css(vi, visible);
        console.log( $(i).find(".back"),"afae")
        if (turn == 1) {
            // This value will prevent spam clicking
            turn = 2;

            // If both flipped blocks are not the same
            if (pre != $(b).text()) {
                setTimeout(function () {
                    $(pID).css(t, flipBack);
                    $(i).css(t, flipBack);
                    $(i).css(t, flipBack);
                    $(i).find(".back").css(vi, hidden);
                    $(pID).find(".back").css(vi, hidden)
                    ppID = 0;
                }, 1000);
            }

            // If blocks flipped are the same
            else {
                rem--;
                $(i).attr("flip", "block");
                $(pID).attr("flip", "block");
            }

            setTimeout(function () {
                turn = 0;
                // Increase moves
                moves++;
                $("#moves").html("Moves: " + moves);
            }, 1150);

        }
        else {
            pre = $(b).text();
            ppID = x;
            pID = "#" + x + " .inner";
            turn = 1;
        }

        // If all pairs are matched
        if (rem == 0) {
            setTimeout(function () {
                $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again?</p><button onclick="start()">Play Again (5x5)</button> <button onclick="restartGame()">Restart Game</button></div></center>`);
                $("#ol").fadeIn(750);
            }, 1500);
        }
    }
}

// Restart the game
function restartGame() {
    location.reload();  // Reload the page to restart the game completely
}

// Automatically start the game when the page loads
window.onload = function () {
    start();  // Start the game directly with 5x5 grid
};
