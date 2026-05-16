const openGameBtn=document.getElementById("openGameBtn");
const savedSettingsBtn=document.getElementById("savedSettingsBtn");
const loadSettingsBtn=document.getElementById("loadSettingsBtn");
const resetSettingsBtn=document.getElementById("resetSettingsBtn");
const previewText=document.getElementById("previewText");
const setupForm=document.getElementById("setupForm");

function getSettings(){

    const setupForm=document.getElementById("setupForm");

    const playerName=document.getElementById("playerName").value;

    const difficulty=document.getElementById("difficulty").value;

    const gameLength=document.getElementById("gameLength").value;

    const theme= document.querySelector("input[name='theme']:checked").value;

    const showShadow=document.getElementById("showShadow").checked;

    const enableBonus=document.getElementById("enableBonus").checked;

    const doubleScore=document.getElementById("doubleScore").checked;

    return{
        playerName,
        difficulty,
        gameLength,
        theme,
        showShadow,
        enableBonus,
        doubleScore
    };

}
//Live preview
setupForm.addEventListener("change", ()=>{

    const s=getSettings();

    previewText.textContent=
    "|Player: " + s.playerName +
    "|Difficulty: " + s.difficulty +
    "|Time: " + s.gameLength + "s" +
    "|Theme: " + s.theme;
});

//Open game
openGameBtn.addEventListener("click", ()=>{

    const settings=getSettings();

    localStorage.setItem(
        "savedSettings",
        JSON.stringify(settings)
    );
    window.location.href="game.html";
});

//Save settings
saveBtn=addEventListener("click", ()=>{

    const settings=getSettings();

    localStorage.setItem(
        "savedSettings",
        JSON.stringify(settings)
    );
    alert("Settings saved!");
});

setupForm.addEventListener("change", ()=>{

    const s=getSettings();

    previewText.textContent=
    "Player: " + s.playerName +
    "|Difficulty: " + s.difficulty +
    "|Time: " + s.gameLength + "s" +
    "|Theme: " + s.theme;
});

//Load settings
loadBtn.addEventListener("click", ()=>{

    const saved=JSON.parse(localStorage.getItem("savedSettings"));

    if(!saved){
        alert("No saved settings found.");
        return;
    }
    document.getElementById("playerName").value=saved.playerName;
    document.getElementById("difficulty").value=saved.difficulty;
    document.getElementById("gameLength").value=saved.gameLength;
    document.getElementById("showShadow").checked=saved.showShadow;
    document.getElementById("enableBonus").checked=saved.enableBonus;
    document.getElementById("doubleScore").checked=saved.doubleScore;
    document.querySelector('input[name="theme"][value="${saved.theme}"]').checked=true;

    alert("Settings loaded!");
});

//Reset settings
resetBtn.addEventListener("click", ()=>{
    
    document.getElementById("setupForm").reset();

    previewText.textContent="No settings selected yet.";
});
