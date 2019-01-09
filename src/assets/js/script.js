/**********************************************************
 * Évenement globaux
**********************************************************/



/**********************************************************
 * Formulaire de connexion
**********************************************************/

var modal = document.getElementsByClassName("login-modal")[0]
// var login = document.getElementById("login")
// var close = document.getElementsByClassName("close")[0];

function afficherLoginForm() {
  modal.style.display = "block";
}

function fermerModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/**********************************************************
 * Galerie
**********************************************************/
/**
 * 
 * @param {object} image Valeur récupéré dans le html avec "this" 
 */
function agrandir(image) {
    document.querySelector("section.preview img").src = image.src;
}

/**********************************************************
 * Gestion du calendrier
**********************************************************/

// document.onload = afficherDate(); // Fonction appeler directetement dans le html sur l'événement onload dans la balise body (index.html)

function afficherDate() {
    var date = document.querySelector(".date");
    var d = new Date();
    var jour = calculerJour(d);
    var mois = calculerMois(d);
    
    date.innerHTML = jour + " " + d.getDate() + " " + mois +  " " + d.getFullYear()
                    + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    setTimeout(arguments.callee, 1000);
    
}

/*
 * Retourne le nom du jours de la semaine
*****************************************/
function calculerJour(date) {
    return ["Lundi", "Mardi", "Mercredi", 
           "Jeudi", "Vendredi", "Samedi", 
           "Dimanche"][date.getDay() - 1];
}

/*
 * Retourne le nom du mois
*****************************************/
function calculerMois(date) {
    return ["Janvier", "Fevrier", "Mars", "Avril", 
    "Mai", "Juin", "Juillet", "Août", "Septembre", 
    "Octobre", "Novembre", "Decembre"][date.getMonth()];
}

/*
 * Calculer le nombre de jours dans un mois
******************************************/
function joursDansMois(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/*
 * Calcule tout les jours du mois et les stockes
 * dans un tableau
************************************************/
function caclculerDates(date) {
    nombreDeJours = joursDansMois(date);
    var calendrier = new Array();
    for (let i = 1; i <= nombreDeJours; i++) {
        calendrier[i - 1] = i;
        console.log(calendrier[i-1]);
    }
    return calendrier;
}

function genererCalendrier(date) {
    var tbody = document.getElementById("tbody-calendrier");
    var listeDates = caclculerDates(date);

    for (var i = 0; i < listeDates.length; i++) {
        var dateActuelle = listeDates[i];
        var jour = calculerJour(new Date(date.getYear(), date.getMonth(), dateActuelle));
        // console.log("Le " + dateActuelle + " est un " + jour);
        var listeTr = document.querySelectorAll(".ligne-calendrier");
        var listeTd = document.querySelectorAll(".cellule-calendrier");

        // Parcourir les lignes du calendrier
        for (var j = 0; j < 5; j++) {
            var ligne = listeTr[j];
            
            // Parcourir les colonnes du calendrier
            for (var k = 0; k < 7; k++) {
                var cellule = listeTd[k];

                if (jour == "Lundi" && k == 0) {
                    cellule.innerHTML = dateActuelle;
                }

                if (jour == "Mardi" && k == 1) {
                    cellule.innerHTML = dateActuelle;
                }

                if (jour == "Mercredi" && k == 2) {
                    cellule.innerHTML = dateActuelle;
                }

                if (jour == "Jeudi" && k == 3) {
                    cellule.innerHTML = dateActuelle;
                }

                if (jour == "Vendredi" && k == 4) {
                    cellule.innerHTML = dateActuelle;
                }

                if (jour == "Samedi" && k == 5) {
                    cellule.innerHTML = dateActuelle;
                }

                if (jour == "Dimanche" && k == 6) {
                    cellule.innerHTML = dateActuelle;
                }
            }
        }
        
    }
}

/**********************************************************
 * Validation des formulaires
**********************************************************/


function verifierFormulaireContact() {
    var bienRempli = false;
    var fomulaire = document.querySelector(".contact form");
    var nom = fomulaire.nom;
    var email = fomulaire.email;
    var tel = fomulaire.tel;
    var erreurs = document.querySelector(".erreurs ul");

    erreurs.style.display = "block";

    if(nomCorrect(nom) || emailCorrect(email) || telCorrect(tel)) {
        bienRempli = true;
        erreurs.style.display = "none";
    }

    return bienRempli;
}

function verifierFormulaireInscription() {
    var bienRempli = false;
    var fomulaire = document.querySelector("form#inscription");
    var nom = fomulaire.nom;
    var email = fomulaire.email;
    var tel = fomulaire.tel;
    var erreurs = document.querySelector(".erreurs ul");

    erreurs.style.display = "block";

    if(nomCorrect(nom) || emailCorrect(email) || telCorrect(tel)) {
        bienRempli = true;
        erreurs.style.display = "none";
    }

    return bienRempli;
}

function nomCorrect(nom) {
    var motif = /^[A-Z][a-z]+ ([A-Z][a-z])*/; 
    //console.log(typeof motif) // Objet de type RegExp
    var nomFormate = "";

    for (var i = 0; i < nom.value.length; i++) {
        // Si c'est la première lettre ou une lettre 
        // précédée d'un espace, on la met en majuscule, 
        // sinon en minuscule
        if (i == 0 || (i > 0 && nom.value.charAt(i - 1) == " ")) {
            nomFormate += nom.value.charAt(i).toUpperCase();
        } else {
            nomFormate += nom.value.charAt(i).toLowerCase();
        }
        
    }

    nom.value = nomFormate.trim(); // On enlève les éventuelle espaces autour du nom

    if(motif.test(nom.value)) {
        nom.style.borderColor = "green";
        return true;
    } else {
        afficherErreur("Nom incorrect (format \"Nom Prénom\" attendu)");
        nom.style.borderColor = "red";
        return false;
    }
}

function emailCorrect(email) {
    var motif = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/; 
    
    if(motif.test(email.value)) {
        email.style.borderColor = "green";
        return true;
    } else {
        afficherErreur("Email invalide (format \"xxx@yyy.zz\")");
        email.style.borderColor = "red";
        return false;
    }
}

function telCorrect(tel) {
    var motif = /^[0-9]{10}$/; 
    
    if(motif.test(tel.value)) {
        tel.style.borderColor = "green";
        return true;
    } else {
        afficherErreur("Numéro de teléphone non valide (10 chiffres attendu)");
        tel.style.borderColor = "red";
        return false;
    }
}

function afficherErreur(message) {
    var erreurs = document.querySelector(".erreurs ul"); // Récupère un <ul></ul>
    var li = document.createElement("li");
    li.innerHTML = message;
    erreurs.appendChild(li);
}
