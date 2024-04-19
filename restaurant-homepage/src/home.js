export default function home() {
    const welcomeSection = document.createElement('section');
    welcomeSection.classList.add('welcome');
    welcomeSection.innerHTML =
    `<h1 class="welcome-text">Welcome to Taco Town!</h1>
    <p>Serving up authentic Mexican flavors since 2005, Taco Town is your go-to destination for delicious tacos
        that pack a punch. Our mission is simple: to bring the vibrant taste of Mexico to your plate, one bite at a
        time.
    </p>`;
    
    const tacoSection = document.createElement('section');
    tacoSection.classList.add('taco');
    tacoSection.classList.add('full-width', 'bg-primary', 'section-padding', 'flow');
    tacoSection.innerHTML =
    `<h2>🌮 Tantalizing Tacos</h2>
    <p>
    Indulge in our wide array of tacos, crafted with the freshest ingredients and bursting
    with bold flavors. From classic carne asada to mouthwatering al pastor, there's something to satisfy
    every
    craving.
    </p>`;
    
    const specialsSection = document.createElement('section');
    specialsSection.classList.add('specials');
    specialsSection.innerHTML =
    `<h2>🌶️ Sizzling Specials</h2>
    <p>
    Keep an eye out for our daily specials, featuring innovative twists on traditional
    favorites and seasonal delights that will keep you coming back for more.
    </p>`;
    
    const atmosphereSection = document.createElement('section');
    atmosphereSection.classList.add('atmosphere');
    atmosphereSection.classList.add('full-width', 'bg-secondary', 'section-padding', 'flow');
    atmosphereSection.innerHTML =
    `<h2>🎉 Fiesta Atmosphere</h2>
    <p>
        Step into our lively and welcoming atmosphere, where every visit feels like a celebration.
        Whether you're dining in with friends or grabbing a quick bite on the go, you'll always feel right at home.
    </p>`;

    const content = document.querySelector('#content');
    content.append(welcomeSection,tacoSection,specialsSection,atmosphereSection);

}


