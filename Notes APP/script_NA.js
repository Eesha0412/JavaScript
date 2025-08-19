const notesContainer= document.querySelector(".notes-container");
const createButton= document.querySelector(".btn");
let notes= document.querySelectorAll(".input-box");

// show items existing in local storage when page is refreshed
function showNotes(){
    notesContainer.innerHTML= localStorage.getItem("notes");
}
showNotes();

// storage exitsing notes in local storage 
function updateStorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}

// create note box wheneever create button is clicked
createButton.addEventListener("click", ()=>{
    let inputBox= document.createElement("p");
    let img= document.createElement("img");
    inputBox.className= "input-box";
    inputBox.setAttribute("contenteditable","true");
    img.src= "notes_app_images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener("click", function(e){
    // delete note when delete button is clicked 
    if(e.target.tagName==="IMG"){ 
        e.target.parentElement.remove();
        // update local storage post deletion
        updateStorage();
    }
    // local storage should be updated with the content 
    // inside the box whenever user starts typing anything
    else if(e.target.tagName==="P"){
        notes= document.querySelectorAll(".input-box");
        notes.forEach(note=>{
            note.onkeyup= function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown",event=>{
    if(event.key==="Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
