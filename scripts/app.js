/* Variables et sélecteurs */
let img = document.querySelector('#imgDragable');
const btn = document.querySelector('button');
const select = document.querySelector('.select');
const recepts = document.querySelectorAll('.recept');
const supprimer = document.querySelector('.supprimer');
const toutesLesCases = [];
const choix = [];
let photoEnCours;
let indexPhoto = 1;

for(i = 0; i < recepts.length ; i++)
{
    toutesLesCases.push(recepts[i]);
}
toutesLesCases.push(supprimer);

img.style.background = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;

/* Événements */
img.addEventListener('dragstart', onDragstart);
img.addEventListener('dragend', onDragend);

for(const vide of toutesLesCases)
{
    vide.addEventListener('dragover', onDragover);
    vide.addEventListener('dragenter', onDragenter);
    vide.addEventListener('dragleave', onDragleave);
    vide.addEventListener('drop', onDrop);
}

/* Fonctions */

function onDragover(e) 
{
    e.preventDefault();
}

function onDragenter(e) 
{
    e.preventDefault();
    this.style.opacity = 0.5;
    this.style.border = '2px dotted #000';
}

function onDragleave()
{
    this.style.opacity = 1;
    this.style.border = '3px solid black';
}

function onDrop()
{
    // Empêcher de redéposer dans la première case
    if(this.id === "selection")
    {
        return;
    }

    // Suppression d'image
    if(this.id === "supprimer")
    {
        img.remove();
        nouvelleImage();
        return;
    }

    // Verouillage des images dans les recepts
    this.removeEventListener('drop', onDrop);
    this.removeEventListener('drop', onDragover);
    this.removeEventListener('drop', onDragenter);

    // Dépot des images et génération de la nouvelle image
    this.appendChild(img);
    this.childNodes[0].setAttribute('draggable', 'false');
    nouvelleImage();

    choix.push(photoEnCours);
    if(choix.length === 3)
    {
        setTimeout(() => 
        {
            alert('Sélection terminé');
        });
    }

    this.style.opacity = 1;
    this.style.border = '3px solid black';
}

function nouvelleImage()
{
    const nouvelleImg = document.createElement('div');
    nouvelleImg.setAttribute('class', 'imgDrag');
    nouvelleImg.setAttribute('draggable', 'true');
    indexPhoto++;
    nouvelleImg.style.background = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    select.appendChild(nouvelleImg);
    img = nouvelleImg;
    img.addEventListener('dragstart', onDragstart);
    img.addEventListener('dragend', onDragend);
}

function onDragend()
{
    select.style.opacity = 1;
    select.style.border = '3px solid black';
}

function onDragstart()
{
    select.style.opacity = 0.5;
    select.style.border = '2px dotted #000';
}



