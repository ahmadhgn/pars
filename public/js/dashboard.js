
async function loadVillage() {
    const res = await fetch("/villages/1");
    const data = await res.json();

    const v = data[0];

    document.getElementById("wood").innerText = v.wood;
    document.getElementById("stone").innerText = v.stone;
    document.getElementById("food").innerText = v.food;

    document.getElementById("woodLevel").innerText = v.wood_level;
}

function upgradeWood() {
    fetch("/upgrade/wood/1", {
        method: "POST"
    })
    .then(res => res.text())
    .then(alert)
    .then(loadVillage);
}

loadVillage();
setInterval(loadVillage, 3000);
