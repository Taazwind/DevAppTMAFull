document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('congeForm');
    const historique = document.getElementById('historique');
    const demandesValidation = document.getElementById('demandesValidation');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const dateDebut = document.getElementById('dateDebut').value;
            const dateFin = document.getElementById('dateFin').value;
            const raison = document.getElementById('raison').value;

            const dateDebutObj = new Date(dateDebut);
            const dateActuelle = new Date();

            if (dateDebutObj <= dateActuelle) {
                afficherPopup("La date de début ne peut pas être antérieure ou égal à la date actuelle.");
                return;
            }

            const demande = {
                nom,
                prenom,
                dateDebut,
                dateFin,
                raison,
                statut: 'en attente'
            };

            let demandes = JSON.parse(localStorage.getItem('demandes')) || [];
            demandes.push(demande);
            localStorage.setItem('demandes', JSON.stringify(demandes));

            afficherHistorique(demandes);
            form.reset();
        });
    }

        function afficherPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove('hidden');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 5000);
    }

    function afficherHistorique(demandes) {
        if (historique) {
            historique.innerHTML = '';
            demandes.forEach(demande => {
                const li = document.createElement('li');
                li.classList.add('p-4', 'border', 'rounded-lg', 'shadow-sm');
                li.innerHTML = `
                    <strong>Nom:</strong> ${demande.nom}<br>
                    <strong>Prénom:</strong> ${demande.prenom}<br>
                    <strong>Date de début:</strong> ${demande.dateDebut}<br>
                    <strong>Date de fin:</strong> ${demande.dateFin}<br>
                    <strong>Raison:</strong> ${demande.raison}<br>
                    <strong>Statut:</strong> <span class="font-semibold ${getStatutClass(demande.statut)}">${demande.statut}</span>
                `;
                historique.appendChild(li);
            });
        }
    }

    function afficherDemandesValidation(demandes) {
        if (demandesValidation) {
            demandesValidation.innerHTML = '';
            demandes.forEach((demande, index) => {
                const li = document.createElement('li');
                li.classList.add('p-6', 'border', 'rounded-lg', 'shadow-md', 'bg-white');
                li.innerHTML = `
                    <div class="mb-4">
                        <strong>Nom:</strong> ${demande.nom}<br>
                        <strong>Prénom:</strong> ${demande.prenom}<br>
                        <strong>Date de début:</strong> ${demande.dateDebut}<br>
                        <strong>Date de fin:</strong> ${demande.dateFin}<br>
                        <strong>Raison:</strong> ${demande.raison}<br>
                        <strong>Statut:</strong> <span class="font-semibold ${getStatutClass(demande.statut)}">${demande.statut}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button class="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600" onclick="changerStatut(${index}, 'approuvé')">Approuver</button>
                        <button class="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600" onclick="changerStatut(${index}, 'refusé')">Refuser</button>
                    </div>
                `;
                demandesValidation.appendChild(li);
            });
        }
    }

    function getStatutClass(statut) {
        switch (statut) {
            case 'approuvé':
                return 'text-green-600';
            case 'refusé':
                return 'text-red-600';
            default:
                return 'text-yellow-600';
        }
    }

    const demandes = JSON.parse(localStorage.getItem('demandes')) || [];
    afficherHistorique(demandes);
});