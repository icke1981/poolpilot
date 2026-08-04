
// PoolPilot 2.4
// Chemische Berechnungen

function berechneAktivchlor(ph, dpd1, cya, temp) {

    // Temperaturabhängiger pKs-Wert

    const pKs = 7.54 - (0.028 * (temp - 25));

    // Anteil Hypochlorsäure (HOCl)

    const hocl = 1 / (1 + Math.pow(10, ph - pKs));

    // Cyanursäure-Korrektur

    const cyaFaktor = 1 / (1 + cya / 8);

    // Aktiv wirksames Chlor

    return dpd1 * hocl * cyaFaktor;
}
function bewerteAktivchlor(aktivChlor, dpd1, pool) {
    let text = "";
    if (aktivChlor < 0.30) {
        const ziel = 0.45;
        const faktor = ziel / aktivChlor;
        const neuesDPD = dpd1 * faktor;
        const gramm = Math.max(0, Math.round((neuesDPD - dpd1) * 72));
        text += "🔴 Aktivchlor zu niedrig.<br>";
        text += "🧪 Agualeve: <b>" + gramm + " g</b><br>";
    } else if (aktivChlor > 0.60) {
        text += "🟡 Aktivchlor zu hoch.<br>";
    } else {
        text += "🟢 Aktivchlor optimal.<br>";
    }
if (dpd1 < 1.0) {
    text += "🟦 GlobaClean: 1 Tablette einlegen.<br>";
} else {
    text += "🟦 Keine neue Tablette erforderlich.<br>";
}
text += "<br>⏳ Filteranlage mindestens 12 Stunden laufen lassen.<br>";
      return {
        text: text
    };
}
