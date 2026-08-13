lucide.createIcons();

let solde = 0;
let jours = 0;
let montantSelectionne = 500;

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function selectMontant(m){
  montantSelectionne = m;
  document.querySelectorAll('.btn-amount').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function payer(){
  let tel = document.getElementById('telephone').value;
  if(tel === ''){ alert('Entrez votre numéro'); return; }
  
  // Simulation paiement
  solde += montantSelectionne;
  jours += 1;
  
  document.getElementById('solde').innerText = solde.toLocaleString() + ' FCFA';
  document.getElementById('epargne').innerText = solde.toLocaleString() + ' FCFA';
  document.getElementById('jours').innerText = jours + ' / 180 jours';
  let percent = (jours/180)*100;
  document.getElementById('progress').style.width = percent + '%';
  document.getElementById('pourcent').innerText = percent.toFixed(1) + '%';
  
  alert('Paiement de ' + montantSelectionne + ' FCFA simulé pour ' + tel);
  showScreen('accueil');
}
