document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    
    const cursorLight = document.createElement('div');
    cursorLight.classList.add('cursor-light');
    body.appendChild(cursorLight);
    
    const numTrails = 8;
    const trails = [];
    
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            alpha: 0
        });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    function updateCursorPosition() {
        const deltaX = mouseX - cursorX;
        const deltaY = mouseY - cursorY;
        
        cursorX += deltaX * 0.2;
        cursorY += deltaY * 0.2;
        
        cursorLight.style.left = `${cursorX}px`;
        cursorLight.style.top = `${cursorY}px`;
        
        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            
            const targetX = trails[i-1] ? trails[i-1].x : cursorX;
            const targetY = trails[i-1] ? trails[i-1].y : cursorY;
            
            trail.x += (targetX - trail.x) * 0.3;
            trail.y += (targetY - trail.y) * 0.3;
            
            trail.element.style.left = `${trail.x}px`;
            trail.element.style.top = `${trail.y}px`;
            
            if (deltaX !== 0 || deltaY !== 0) {
                trail.alpha = Math.min(trail.alpha + 0.05, (1 - i * 0.1));
            } else {
                trail.alpha = Math.max(trail.alpha - 0.05, 0);
            }
            
            trail.element.style.opacity = trail.alpha;
        }
        
        requestAnimationFrame(updateCursorPosition);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('mouseenter', () => {
        cursorLight.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorLight.style.opacity = '0';
        trails.forEach(trail => {
            trail.element.style.opacity = '0';
        });
    });
    
    document.addEventListener('mousedown', () => {
        cursorLight.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorLight.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    updateCursorPosition();
});