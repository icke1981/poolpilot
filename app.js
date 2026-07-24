function check(){
let ph=+document.getElementById('ph').value;
let cl=+document.getElementById('chlor').value;
let ta=+document.getElementById('ta').value;
let cya=+document.getElementById('cya').value;
let r='<h2>Ergebnis</h2>';
r+=(ph>=7&&ph<=7.4)?'<p class="ok">🟢 pH optimal</p>':'<p class="warn">🟡 pH korrigieren</p>';
r+=(cl>=0.5&&cl<=1.5)?'<p class="ok">🟢 Chlor optimal</p>':'<p class="warn">🟡 Chlor prüfen</p>';
r+=(ta>=80&&ta<=120)?'<p class="ok">🟢 TA optimal</p>':'<p class="warn">🟡 TA außerhalb Idealbereich</p>';
r+=(cya>=20&&cya<=50)?'<p class="ok">🟢 CYA optimal</p>':'<p class="warn">🟡 CYA prüfen</p>';
document.getElementById('result').innerHTML=r;
localStorage.setItem('poolpilot11',JSON.stringify({
date:date.value,ph,cl,ta,cya,temp:temp.value
}));
}
window.onload=()=>{date.value=new Date().toISOString().slice(0,10);}