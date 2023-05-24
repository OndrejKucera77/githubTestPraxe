window.onload = function() {
    document.getElementById("add").addEventListener("click", function() {
        const kontejner = document.getElementById("cont");
        const deti = kontejner.children;
    
        let klon = deti[Math.floor(Math.random() * deti.length)].cloneNode(true);
    
        kontejner.appendChild(klon);
    });
}