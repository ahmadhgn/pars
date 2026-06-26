const dialog = document.getElementById("gameDialog");

const closeBtn = document.getElementById("dialogClose");

closeBtn.onclick = () => {

    dialog.classList.add("hidden");

};

function openDialog(title, html){

    document.getElementById("dialogTitle").innerHTML = title;

    document.getElementById("dialogBody").innerHTML = html;

    dialog.classList.remove("hidden");

}

setTimeout(()=>{

    openDialog(

        "خوش آمدید",

        "<p style='text-align:center'>به امپراتوری پارس خوش آمدید.</p>"

    );

},1000);