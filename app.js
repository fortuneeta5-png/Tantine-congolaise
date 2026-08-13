// 1. VÉRIFIER SI L'UTILISATEUR EXISTE DÉJÀ
let user = JSON.parse(localStorage.getItem('user'));
let solde = parseInt(localStorage.getItem('solde')) || 0;
let epargne = parseInt(localStorage.getItem('epargne')) || 0;
let bonus = parseInt(localStorage.getItem('bonus')) || 0;
let historique = JSON.parse(localStorage.getItem('historique')) || [];

window.onload = () => {
  if(!user) {
    showScreen('inscription'); // 1ère fois = inscription
  } else {
    showScreen('accueil'); // Déjà inscrit = accueil
    updateUI();
  }
}

function creerCompte() {
  let nom = document.getElementById('nom').value;
  let tel = document.getElementById('telephone').value;
  let mail = document.getElementById('email').value;
  
  if(nom === "" || tel.length < 9 || mail === "") {
    alert("Remplis tous les champs correctement");
    return;
  }
  
  // SAUVEGARDER L'UTILISATEUR
  user = {nom: nom, telephone: tel, email: mail};
  localStorage.setItem('user', JSON.stringify(user));
  
  alert(`Bienvenue ${nom} !`);
  showScreen('accueil');
  updateUI();
}

function updateUI() {
  document.getElementById('solde').innerText = solde.toLocaleString() + ' FCFA';
  document.getElementById('epargne').innerText = epargne.toLocaleString() + ' FCFA';
  document.getElementById('bonus').innerText = bonus.toLocaleString();
  document.getElementById('username').innerText = user.nom.split(' ')[0]; // Affiche juste le prénom
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  if(id === 'historique') afficherHistorique();
  lucide.createIcons();
}

function selectMontant(montant) {
  let numero = user.telephone; // Utilise le numéro d'inscription direct
  solde += montant;
  epargne += montant;
  bonus += Math.floor(montant * 0.05);
  historique.unshift({type: "Dépôt", montant: montant, date: new Date().toLocaleString()});
  sauvegarder();
  alert(`✅ Épargne de ${montant} FCFA réussie !\nDébit: ${numero}`);
  showScreen('accueil');
}

function faireRetrait() {
  let montant = parseInt(document.getElementById('montantRetrait').value);
  if(montant > solde) { alert("Solde insuffisant"); return; }
  solde -= montant;
  historique.unshift({type: "Retrait", montant: montant, date: new Date().toLocaleString()});
  sauvegarder();
  alert(`✅ Retrait de ${montant} FCFA effectué vers ${user.telephone}`);
  document.getElementById('montantRetrait').value = "";
  showScreen('accueil');
}

function afficherHistorique() {
  let liste = document.getElementById('listeHistorique');
  if(historique.length === 0) { liste.innerHTML = "Aucune transaction"; return; }
  liste.innerHTML = historique.map(h => `
    <div style="padding:15px; border-bottom:1px solid #eee;">
      <b>${h.type}</b> : ${h.montant} FCFA <br>
      <small style="color:#888">${h.date}</small>
    </div>
  `).join('');
}

function sauvegarder() {
  localStorage.setItem('solde', solde);
  localStorage.setItem('epargne', epargne);
  localStorage.setItem('bonus', bonus);
  localStorage.setItem('historique', JSON.stringify(historique));
  updateUI();
    }
