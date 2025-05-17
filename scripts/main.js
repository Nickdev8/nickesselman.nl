const canvas = document.getElementById('treeCanvas');
const slider = document.getElementById('slider');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let offsetX = 0, offsetY = 0, isDragging = false, startX, startY;

const treeData = {
    name: 'Root',
    project: null,
    children: [
        { name: 'Project A', project: 'https://example.com/a', children: [] },
        {
            name: 'Category B', project: null,
            children: [
                { name: 'Project B1', project: 'https://example.com/b1', children: [] },
                { name: 'Project B1', project: 'https://example.com/b1', children: [] },
                {
                    name: 'Project B2', project: 'https://example.com/b2', children: [
                        { name: 'Project C', project: 'https://example.com/c', children: [] },
                        {
                            name: 'Project C', project: 'https://example.com/c', children: [
                                { name: 'Project C', project: 'https://example.com/c', children: [] },

                            ]
                        },

                    ]
                }
            ]
        },
        { name: 'Project C', project: 'https://example.com/c', children: [] },
        {
            name: 'Project C', project: 'https://example.com/c', children: [
                { name: 'Project C', project: 'https://example.com/c', children: [] },

            ]
        },
        { name: 'Project C', project: 'https://example.com/c', children: [] }
    ]
};

function drawNode(node, x, y, angle, depth = 0) {
    // Adjust branch length and thickness
    const len = 100 - depth * 10; // Branches get shorter further from the root
    const branchX = x + Math.cos(angle) * len;
    const branchY = y + Math.sin(angle) * len;

    // Adjust branch color and thickness
    ctx.strokeStyle = depth === 0 ? '#8B4513' : '#27ae60'; // Brown for the trunk, green for branches
    ctx.lineWidth = Math.max(2, 12 - depth * 2); // Thicker trunk, thinner branches
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(branchX, branchY);
    ctx.stroke();

    // Adjust node color
    ctx.fillStyle = node.project ? '#2ecc71' : '#1abc9c'; // Green for projects, teal for categories
    ctx.beginPath();
    ctx.arc(branchX, branchY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Store node position for hit testing
    node._pos = { x: branchX, y: branchY };
    node._radius = 20;
    // Spread branches more naturally in one direction
    // const spread = Math.PI/(depth*0.8+0.2);
    const spread = (depth+1) * -slider.value + 1.5;



    console.log(depth, node.name, spread);
    node.children.forEach((child, i) => {
        const a = angle - spread / 2 + (i / (node.children.length - 1 || 1)) * spread;
        drawNode(child, branchX, branchY, a, depth + 1);
    });
}
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    drawNode(treeData, width / 2, height - 100, -Math.PI / 2); // Start from the bottom center
    ctx.restore();
}

function hitTest(node, pos) {
    const dx = pos.x - node._pos.x;
    const dy = pos.y - node._pos.y;
    if (dx * dx + dy * dy <= node._radius * node._radius) return node;
    for (let child of node.children) {
        const hit = hitTest(child, pos);
        if (hit) return hit;
    }
    return null;
}

function checkHover(e) {
    const pos = { x: e.clientX - offsetX, y: e.clientY - offsetY };
    const node = hitTest(treeData, pos);
    const tooltip = document.getElementById('tooltip');
    if (node) {
        tooltip.style.left = e.clientX + 10 + 'px';
        tooltip.style.top = e.clientY + 10 + 'px';
        tooltip.textContent = node.name;
        tooltip.style.display = 'block';
    } else {
        tooltip.style.display = 'none';
    }
}

canvas.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
});
canvas.addEventListener('mousemove', e => {
    if (isDragging) {
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        draw();
    } else {
        checkHover(e);
    }
});
canvas.addEventListener('mouseup', () => isDragging = false);
canvas.addEventListener('mouseleave', () => isDragging = false);
canvas.addEventListener('click', e => {
    const pos = { x: e.clientX - offsetX, y: e.clientY - offsetY };
    const node = hitTest(treeData, pos);
    if (node && node.project) window.open(node.project, '_blank');
});

slider.addEventListener('input', () => {
    const sliderValue = slider.value;
    console.log(`Slider value: ${sliderValue}`);
    draw(); // Re-draw the tree if the slider affects its appearance
});

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    draw();
});

// Precompute positions and render the tree
draw();