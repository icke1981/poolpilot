function check(){
const ph=+phEl.value,cl=+chlor.value,taV=+ta.value,cyaV=+cya.value;
let res="",dose="",state="🟢 Wasserwerte gut";
if(ph<7){res+="<p class='warn'>pH zu niedrig</p>";dose+="• pH-Heber nach Herstellerangabe dosieren.<br>";state="🟡 pH korrigieren";}
else if(ph>7.4){res+="<p class='warn'>pH zu hoch</p>";dose+="• pH-Senker nach Herstellerangabe dosieren.<br>";state="🟡 pH korrigieren";}
else res+="<p class='ok'>pH optimal</p>";
if(cl<0.5){res+="<p class='warn'>Chlor zu niedrig</p>";dose+="• Schnellchlor (z. B. Bayrol Chloryte) nach Herstellerangabe zugeben.<br>";state="🟡 Chlor erhöhen";}
else if(cl>1.5){res+="<p class='warn'>Chlor zu hoch</p>";dose+="• Vor weiterer Chlorzugabe warten.<br>";}
else res+="<p class='ok'>Chlor optimal</p>";
if(taV<80||taV>120)res+="<p class='warn'>TA prüfen</p>";
if(cyaV>50){res+="<p class='warn'>CYA hoch – Teilwasserwechsel prüfen.</p>";}
status.innerText="Status: "+state;

result.innerHTML=res;
document.getElementById("phStatus").innerText=ph.toFixed(2);
document.getElementById("chlorStatus").innerText=cl toFixed(2)+" mg/l";
document.getElementById("tempStatus").innerText=temp.value+" °C";
document.getElementById("nextMeasure").innerTex = "Heute";
dose=dose||"Keine Korrektur erforderlich.";
document.getElementById("dose").innerHTML=dose;
dosage(ph, cl);
localStorage.setItem("poolpilot12",JSON.stringify({date:date.value,ph,cl,ta:taV,cya:cyaV,temp:temp.value}));
}
window.onload=()=>{
date.value=new Date().toISOString().slice(0,10);
window.phEl=document.getElementById('ph');
}const dose = document.getElementById("dose");

function dosage(ph, chlor) {
let text = "";

if (ph > 7.4) {
text += "🧪 pH-Minus: ca. 70 g hinzufügen.<br>";
} else if (ph < 7.0) {
text += "🧪 pH-Plus erforderlich.<br>";
} else {
text += "✅ pH-Wert ist optimal.<br>";
}

if (chlor < 0.5) {
text += "💊 Chlorgranulat: ca. 35 g zugeben.<br>";
} else if (chlor > 1.5) {
text += "⚠️ Chlor zu hoch – kein Chlor nachdosieren.<br>";
} else {
text += "✅ Chlorgehalt optimal.<br>";
}

text += "🟦 Multitab: 1 Tablette alle 7–10 Tage.";

dose.innerHTML = text;
}
