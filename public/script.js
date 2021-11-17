window.onload = () => {
    initialize({
        canvas_name: "board",
        background_colour: "#000000",
        square_colour: "#009900",
        tile_colours: { black: "#000000", white: "#ffffff" },
        board_size: { x: 10, y: 10 },
        square_size: 50,
        square_padding: 2,
        tile_size: 35,
    })
}

function initialize(config) {
    const canvas = document.getElementById(config.canvas_name);
    const ctx = canvas.getContext("2d");

    config.full_padding = config.square_padding * 2;
    config.full_square = config.square_size + config.full_padding;
    config.tile_center = config.full_square / 2 + config.square_padding;
    config.tile_colours.empty = config.square_colour;

    canvas.setAttribute("width", getLength(config, { index: "x", board_padding: true }));
    canvas.setAttribute("height", getLength(config, { index: "y", board_padding: true }));
    
    drawBoard(config, ctx);
    drawTile(config, ctx, { x: 0, y: 0 }, "white")
    drawTile(config, ctx, { x: 0, y: 1 }, "black")
    drawTile(config, ctx, { x: 1, y: 0 }, "empty")
}

function getLength(config, { index = "x", square = config.board_size[index], board_padding = false, tile_center = false }) {
    return square * config.full_square + (board_padding ? config.full_padding : 0) + (tile_center ? config.tile_center : 0)
}

function drawBoard(config, ctx) {
    ctx.fillStyle = config.background_colour;
    ctx.fillRect(0, 0, getLength(config, { index: "x", board_padding: true }), getLength(config, { index: "y", board_padding: true }));

    for (let x = 0; x < getLength(config, { index: "x" }); x += config.full_square) {
        for (let y = 0; y < getLength(config, { index: "y" }); y += config.full_square) {
            drawSquare(config, ctx, {
                x: x + config.full_padding,
                y: y + config.full_padding
            });
        }
    }
}

function drawSquare(config, ctx, { x, y }) {
    ctx.fillStyle = config.square_colour;
    ctx.fillRect(x, y, config.square_size, config.square_size);
}

function drawTile(config, ctx, { x, y }, state = "empty") {
    ctx.fillStyle = config.tile_colours[state];
    ctx.beginPath();
    ctx.arc(getLength(config, { square: x, tile_center: true }), getLength(config, { square: y, tile_center: true }), config.tile_size / 2, 0, 2 * Math.PI, false);
    ctx.fill();
}