const dialog = document.getElementById("gameDialog");

const dialogClose = document.getElementById("dialogClose");

function openDialog(title, html){

    document.getElementById("dialogTitle").innerHTML = title;

    document.querySelector(".dialog-body").innerHTML = html;

    dialog.style.display="flex";

}

function closeDialog(){

    dialog.style.display="none";

}

dialogClose.onclick = closeDialog;

setTimeout(()=>{

    openDialog(

        "خوش آمدید",

        `
        <p style="text-align:center">

        ورود شما به امپراتوری پارس با موفقیت انجام شد.

        </p>
        `

    );

},1000);