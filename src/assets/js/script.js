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
 * @param {int} numeroImage Valeur arbitraire passer en paramètre dans le HTML pour une image donnée
 */
function aggrandir(image) {
    document.querySelector("img.preview").src = image.src;
}

/**********************************************************
 * Gestion du calendrier
**********************************************************/

document.onload = afficherDate();

function afficherDate() {
    var date = document.querySelector(".date");
    var d = new Date();
    var jour = calculerJour(d);
    
    date.innerHTML = jour + " " + d.getDate() + "/" + d.getMonth() +  "/" + d.getFullYear()
                    + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    setTimeout(arguments.callee, 1000);
    
}

/*
 * Retourne le nom du jours de la semaine
*****************************************/
function calculerJour(numeroJour) {
    return ["Lundi", "Mardi", "Mercredi", 
           "Jeudi", "Vendredi", "Samedi", 
           "Dimanche"][numeroJour.getDay() - 1];
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
