(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let ah = date.getHours();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let l = 'pm';

            if (h > 12) {
                h = h -12;
            }

            if (h == 0){
                h=12;
            }

            if (ah < 12){
                l = 'am';
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + ' ' +l;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            if (linn.value === 'tln'){
                e.innerHTML = "TASUTA";
    
            }
            else if
                (linn.value === 'trt'){
                e.innerHTML ="2,50 &euro;"
            }
            else if
                (linn.value === 'nrv'){
                e.innerHTML ="2,50 &euro;"
            }
            else if
                (linn.value === 'prn'){
                e.innerHTML ="3,00 &euro;"
            }

        }       
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "ApmfDfHu7WELZf3-Tg-ubZXos80b8vXuwWUjkTMipjWPuK_K9qddoMef-ZlVdSow";

let map;
let infobox;

function GetMap() {
    "use strict";

    let pin1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let pin2 = new Microsoft.Maps.Location(
            58.343132, 
            25.5874901
        );
    
    let centerPoint = new Microsoft.Maps.Location(
        58.362086, 
        26.153705
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);
    
    let pushpin1 = new Microsoft.Maps.Pushpin(pin1, {
            title: 'Tartu Ülikool',
        });
    let pushpin2 = new Microsoft.Maps.Pushpin(pin2, {
            title: 'Viljandi järv',
        });
    
    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

    
    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Narva mnt 18 / 51009 Tartu / Eesti'
    };
    pushpin2.metadata = {
        title: 'Viljandi järv',
        description: 'Pindala: 1,62 km²'
    };

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

}
function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

