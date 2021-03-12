
const velgfilm = document.getElementById("velgfilm");
const antall = document.getElementById("antall");
const fornavn = document.getElementById("fornavn");
const etternavn = document.getElementById("etternavn");
const telefonnr = document.getElementById("telefonnr");
const epost = document.getElementById("epost");

function regFilm() {
    let ErrorX = false

    let filmF = velgfilm;
    let antallF = antall;
    let fornavnF = fornavn;
    let etternavnF = etternavn;
    let telefonnrF = telefonnr;
    let epostF = epost;

    if (filmF === "velg film her") {
        document.getElementById("filmX").innerHTML = "må velge film";
        ErrorX = true;
    } else if (antallF === "") {
        document.getElementById("antallX").innerHTML = "må skrive noe inn i antall";
        ErrorX = true;
    } else if (isNaN(antallF)) {
        document.getElementById("antallX").innerHTML = "må skrive noe inn riktig antall";
        ErrorX = true;
    } else if (fornavnF === "") {
        document.getElementById("fornavnX").innerHTML = "må skrive noe inn i fornavnet";
        ErrorX = true;
    } else if (etternavnF === "") {
        document.getElementById("etternavnX").innerHTML = "må skrive noe inn etternavnet";
        ErrorX = true;
    } else if (telefonnrF === "") {
        document.getElementById("telefonnrX").innerHTML = "må skrive noe inn telefonnr";
        ErrorX = true;
    } else if (isNaN(telefonnrF)) {
        document.getElementById("telefonnrX").innerHTML = "må skrive noe inn riktig telefonnr";
        ErrorX = true;
    } else if (epostF === "") {
        document.getElementById("epostX").innerHTML = "må skrive noe inn i epost";
        ErrorX = true;
    }
    if (ErrorX === true) {
        return;
    } else {

        const enBillet = {
            velgfilm: velgfilm.value(),
            antall: antall.value(),
            fornavn: fornavn.value(),
            etternavn: etternavn.value(),
            telefonnr: telefonnr.value(),
            epost: epost.value(),
        };
        billeter.push(enBillet);
        $.post("/kino", Billet, function(){
            hentAlle();
        });

        $("#velgfilm").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }

    function hentAlle() {
        $.get( "/kino", function( data ) {
            formaterData(data);
        });
    }
    function formaterData(data) {

        let ut = "<table class='table table-striped table-bordered'><tr>" +
            "<th><b>Film</b></th><th><b>Antall</b></th><th><b>Fornavn</b></th><th><b>Etternavn</b></th><th><b>Telefonnr</b></th><th><b>Epost</b></th>" +
            "</tr>";
        for (let B of Billeter) {
            ut += "<tr>";
            ut += "<td>" + B.velgfilm + "</td><td>" + B.antall + "</td><td>" + B.fornavn + "</td><td>" + B.etternavn + "</td><td>" + B.telefonnr + "</td><td>" + B.epost + "</td>";
            ut += "</tr>";
        }
        document.getElementById("filmene").innerHTML = ut;
    }

    $("#slettAlle").click(() => {
        $.ajax("/kino", {
            type: 'DELETE',
            success: () => hent(),
            error: (jqXhr, textStatus, errorMessage) => console.log(errorMessage)
        });
    });
   }