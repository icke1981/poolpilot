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
//document.getElementById("phStatus").innerText = ph.toFixed(2);
//document.getElementById("chlorStatus").innerText = cl.toFixed(2)+" mg/l";
//document.getElementById("tempStatus").innerText = temp.value+" °C";
//document.getElementById("nextMeasure").innerText = "Heute";
dose=dose||"Keine Korrektur erforderlich.";
document.getElementById("dose").innerHTML=dose;
dosage(ph, cl);
localStorage.setItem("poolpilot12",JSON.stringify({date:date.value,ph,cl,ta:taV,cya:cyaV,temp:temp.value}));
showHistory();
}
window.onload = () => {
    window.date = document.getElementById("date");
    window.phEl = document.getElementById("ph");
    window.chlor = document.getElementById("chlor");
    window.ta = document.getElementById("ta");
    window.cya = document.getElementById("cya");
    window.temp = document.getElementById("temp");
    window.status = document.getElementById("status");
    window.result = document.getElementById("result");
    window.dose = document.getElementById("dose"); 
  date.value = new Date().toISOString().slice(0,10);
    showHistory();
    drawChart();
    loadWeather();
  };
async function loadWeather() {

    try {
const url = "https://api.open-meteo.com/v1/forecast?latitude=51.55&longitude=7.31&current=temperature_2m,weather_code";
 const response = await fetch(url);
 const data = await response.json();

        document.getElementById("weatherTemp").innerText =

            data.current.temperature_2m + " °C";

        let text = "Unbekannt";

        switch (data.current.weather_code) {

            case 0:

                text = "☀️ Sonnig";

                break;

            case 1:

            case 2:

            case 3:

                text = "⛅ Teilweise bewölkt";

                break;

            case 45:

            case 48:

                text = "🌫 Nebel";

                break;

            case 61:

            case 63:

            case 65:

                text = "🌧 Regen";

                break;

            case 71:

            case 73:

            case 75:

                text = "❄️ Schnee";

                break;

        }

        document.getElementById("weatherText").innerText = text;

    } catch (e) {

        document.getElementById("weatherText").innerText =

            "Wetter nicht verfügbar";
    }

}
    function berechneAktivchlor(ph, dpd1, cya, temp) {
    const pKs = 7.54 - (0.028 * (temp - 25));
    const hocl = 1 / (1 + Math.pow(10, ph - pKs));
    const cyaFaktor = 1 / (1 + cya / 8);
    return dpd1 * hocl * cyaFaktor;
     }   
    
function dosage(ph, chlor) {

const pool = 7200;
    
const cya = Number(document.getElementById("cya").value);
const temp = Number(document.getElementById("temp").value);
let text = "<h3>Dosierung für 7.200 Liter</h3>";

/* pH */

if (ph > 7.4) {
const phMinusName =
document.getElementById("phMinus").options[

document.getElementById("phMinus").selectedIndex

].text;
const phPlusName =
document.getElementById("phPlus").options[
document.getElementById("phPlus").selectedIndex

].text;
text += "🧪 " + phPlusName + ": <b>" + gramm + " g</b><br>";
let gramm = 0;
text += "🧪 Cristal pH-Senker: <b>" + gramm + " g</b><br>";
} else if (ph < 7.0) {
let gramm = Math.max(0, math.round(((7.2 - ph) / 0.1) * 72));
text += "🧪 Cristal pH-Heber: <b>" + gramm + " g</b><br>";
} else {
text += "✅ pH optimal.<br>";
}
    
// Aktiv wirksames Chlor berechnen
let aktivChlor = berechneAktivchlor(ph, chlor, cya, temp);
aktivChlor = Math.max(0, aktivChlor);
text += "🧪 Freies Chlor (DPD1): <b>" + chlor.toFixed(2) + " mg/L</b><br>";
text += "⚡ Aktiv wirksames Chlor: <b>" + aktivChlor.toFixed(2) + " mg/L</b><br><br>";
if (aktivChlor < 0.30) {
    let ziel = 0.45;
    let faktor = ziel / aktivChlor;
    let neuesDPD = chlor * faktor;
    let gramm = Math.max(0, Math.round((neuesDPD - chlor) * 72));
    text += "🔴 Aktivchlor zu niedrig<br>";
   text += "⚠️ Dosierung wird noch berechnet – bitte nicht nach dieser Anzeige dosieren.<br>"; 
}
else if (aktivChlor > 0.60) {
    text += "🟡 Aktivchlor zu hoch.<br>";
}
else {
    text += "🟢 Aktivchlor optimal.<br>";

}

/* Multitab */

if (chlor < 1.0) {

text += "🟦 GlobaClean: 1 Tablette einlegen.<br>";

} else {

text += "🟦 Keine neue Tablette erforderlich.<br>";

}
//Antichlor- Empfehlung    
if (chlor > 3.0) {

    let gramm = Math.round((chlor - 3.0) * 7.2);

    text += "🟣 Antichlor: <b>" + gramm + " g</b><br>";

}
text += "<br>⏳ Filteranlage mindestens 12 Stunden laufen lassen.";

dose.innerHTML = text;
}

 function showHistory() {
 const data = JSON.parse(localStorage.getItem("poolpilot12") || "{}");
const history = document.getElementById("history");
 if (!history) return;
if (!data.date) {
 history.innerHTML = "Noch keine Messungen vorhanden.";
 return;
 }
 history.innerHTML = `
        <b>${data.date}</b><br>
        pH: ${data.ph}<br>
        Chlor: ${data.cl} mg/l<br>
        TA: ${data.ta}<br>
        CYA: ${data.cya}<br>
        Temperatur: ${data.temp} °C
         `;
document.getElementById("phStatus").innerText = Number(data.ph).toFixed(2);
document.getElementById("chlorStatus").innerText = Number(data.cl).toFixed(2) + " mg/l";
document.getElementById("tempStatus").innerText = data.temp + " °C";
document.getElementById("nextMeasure").innerText = "Heute";
if (data.ph < 7) {
 status.innerText = "Status: 🟡 pH korrigieren";

} else if (data.ph > 7.4) {
 status.innerText = "Status: 🟡 pH korrigieren";
} else if (data.cl < 0.5) {
 status.innerText = "Status: 🟡 Chlor erhöhen";
} else if (data.cl > 1.5) {
 status.innerText = "Status: 🟡 Chlor zu hoch";
} else {
 status.innerText = "Status: 🟢 Wasserwerte gut";
}
}  
function drawChart() {

    const canvas = document.getElementById("chart");

    if (!canvas) return;

    const data = JSON.parse(

        localStorage.getItem("poolpilot12") || "{}"

    );

    if (!data.date) return;

    new Chart(canvas, {

        type: "line",

        data: {

            labels: [data.date],

            datasets: [

                {

                    label: "pH",

                    data: [Number(data.ph)]

                },

                {

                    label: "Chlor",

                    data: [Number(data.cl)]

                },

                {

                    label: "Temperatur",

                    data: [Number(data.temp)]

                }

            ]

        }
  });
}

