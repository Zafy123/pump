document.addEventListener('DOMContentLoaded', () => {
    const launchButton = document.getElementById('launchButton');
    launchButton.addEventListener('click', createCoin);
    
    // Initialize mock event source for GitHub Pages
    setInterval(mockEventSource, 5000);
    loadExistingCoins();
});

// Mock database using localStorage
let coins = JSON.parse(localStorage.getItem('memeCoins')) || [];
let notificationCount = 0;

function mockEventSource() {
    if (coins.length > 0) {
        const coin = coins[Math.floor(Math.random() * coins.length)];
        handleNewCoin(coin);
    }
}

function createCoin() {
    const coinData = {
        name: document.getElementById('coinName').value,
        symbol: document.getElementById('coinSymbol').value.toUpperCase(),
        supply: document.getElementById('totalSupply').value,
        image: document.getElementById('coinImage').value || 'https://source.unsplash.com/random/800x600/?meme,crypto',
        created_at: new Date().toISOString()
    };

    coins.push(coinData);
    localStorage.setItem('memeCoins', JSON.stringify(coins));
    
    // Clear form
    document.getElementById('coinName').value = '';
    document.getElementById('coinSymbol').value = '';
    document.getElementById('totalSupply').value = '';
    document.getElementById('coinImage').value = '';
    
    handleNewCoin(coinData);
}

function handleNewCoin(coin) {
    // Update notification counter
    notificationCount++;
    document.getElementById('notificationCount').textContent = notificationCount;

    // Add to live feed
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        🚀 New coin: <strong>${coin.name}</strong> (${coin.symbol}) 
        <br>${new Date(coin.created_at).toLocaleTimeString()}
    `;
    document.getElementById('liveNotifications').prepend(notification);
    
    // Update marketplace
    addCoinToMarketplace(coin);
}

function addCoinToMarketplace(coin) {
    const marketplace = document.getElementById('marketplace');
    
    const coinCard = document.createElement('div');
    coinCard.className = 'coin-card';
    coinCard.innerHTML = `
        <img src="${coin.image}" class="coin-image" alt="${coin.name}">
        <h3>${coin.name} (${coin.symbol})</h3>
        <p>💰 Supply: ${Number(coin.supply).toLocaleString()}</p>
        <p>⏰ Created: ${new Date(coin.created_at).toLocaleTimeString()}</p>
    `;
    
    marketplace.prepend(coinCard);
}

function loadExistingCoins() {
    coins.forEach(coin => addCoinToMarketplace(coin));
}