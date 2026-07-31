console.log("chemistry.js wird geladen");

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

