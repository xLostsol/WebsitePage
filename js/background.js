document.addEventListener('DOMContentLoaded', () => {
    const bgContainer = document.getElementById('background-elements');
    const colorPalette = [
        'rgba(59, 173, 227, 0.2)',  
        'rgba(87, 111, 230, 0.2)',  
        'rgba(152, 68, 183, 0.2)',  
        'rgba(255, 53, 127, 0.2)'   
    ];

    function createBackgroundElements() {
        const numElements = Math.min(12, Math.floor(window.innerWidth / 100));
        
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            element.classList.add('bg-element');
            
            const size = randomBetween(100, 400);
            const posX = randomBetween(0, 100);
            const posY = randomBetween(0, 100);
            const delay = randomBetween(0, 5);
            const duration = randomBetween(15, 30);
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.left = `${posX}%`;
            element.style.top = `${posY}%`;
            element.style.backgroundColor = color;
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
            element.style.opacity = '0';
            
            bgContainer.appendChild(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, 100 * i);
        }
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function parallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const elements = document.querySelectorAll('.bg-element');
            elements.forEach(element => {
                const depth = parseFloat(element.style.width) / 400;
                const moveX = (mouseX - 0.5) * 20 * depth;
                const moveY = (mouseY - 0.5) * 20 * depth;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
            });
        });
    }

    function handleResize() {
        bgContainer.innerHTML = '';
        createBackgroundElements();
    }

    createBackgroundElements();
    parallaxEffect();
    
    window.addEventListener('resize', debounce(handleResize, 200));
    
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});