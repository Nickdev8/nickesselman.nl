var totalTime = 0;

document.addEventListener("DOMContentLoaded", () => {
  const unnecessaryToggle = document.getElementById("unnecessaryToggle");

  unnecessaryToggle.addEventListener("click", () => {
    if (unnecessaryToggle.checked) {
      const error = ["ERROR", '<p>Error 404</p>'];
      const unine = ["Urine Tank Level",
        '<p>Current ISS urine tank level: <span id="urineTankLevel">Loading...</span></p>', "urine"];

      newPopup(0, error);
      newPopup(1, unine);

      newPopup(3, ["Nasa Picture of the Day",
        '<img id=potd style="visibility:hidden">', "nasapic"]
      );

      totalTime--; // i dont know why this is needed, but it is to make it directly close the popup after the last popup
      setTimeout(() => {
        unnecessaryToggle.checked = false;
        totalTime = 0;
      }, totalTime * 1000);
    }
  });
});

function newPopup(timeoutInSec, [header, content, special = null]) {
  totalTime += timeoutInSec;
  setTimeout(() => {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.classList.add("overlay-menu");
    popup.classList.add("physics-fixed");
    popup.style.left = Math.floor(Math.random() * 84) + "vw";
    popup.style.top = Math.floor(Math.random() * (90 - 5 * texts.length)) + "vh";

    const popupHeader = document.createElement("div");
    popupHeader.className = "popup-header";

    popupHeader.addEventListener("mousedown", (e) => {
      if (!window.IsPhyiscsOn) {
        let shiftX = e.clientX - popup.getBoundingClientRect().left;
        let shiftY = e.clientY - popup.getBoundingClientRect().top;
        function onMouseMove(event) {
          popup.style.left = (event.clientX - shiftX) + "px";
          popup.style.top = (event.clientY - shiftY) + "px";
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", onMouseMove);
        }, { once: true });
      }
    });

    const popupTitle = document.createElement("div");
    popupTitle.className = "popup-title";
    popupTitle.textContent = header;

    const popupClose = document.createElement("span");
    popupClose.className = "popup-close";
    popupClose.textContent = "×";
    popupClose.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.remove();
    });

    if (special === "urine") {
      const urineTankLevel = document.getElementById("urineTankLevel");
      getPISS().then((level) => {
        const urineTankLevel = document.getElementById("urineTankLevel");
        if (urineTankLevel) {
          urineTankLevel.textContent = level + "%";
        }
      }).catch((error) => {
        console.error("Error fetching urine tank level:", error);
        if (urineTankLevel) {
          urineTankLevel.textContent = "Error fetching data";
        }
      });
    }

    const contentContainer = document.createElement("div");
    contentContainer.innerHTML = content;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "popup-button-container";

    const closeButton = document.createElement("button");
    closeButton.className = "popup-button";
    closeButton.textContent = "OK";

    popup.appendChild(popupHeader);
    popupHeader.appendChild(popupTitle);
    popupHeader.appendChild(popupClose);

    popup.appendChild(contentContainer);

    popup.appendChild(buttonContainer);
    buttonContainer.appendChild(closeButton);

    document.body.appendChild(popup);

    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.remove();
    });

    if (special === "nasapic") {
      const potdImage = document.getElementById("potd");
      if (potdImage) {
        comcastifyjs.letsPrepareTheseImages([potdImage]);
        comcastifyjs.fixMyImagesLoadingSoFast({
          elements: [potdImage],
          loadMaxPercent: 0.75,
          loadSpeed: 1000,
          loadIncrement: 5,
          boxColor: 'hsl(0deg 0% 75%)'
        })();

        fetch("https://api.nasa.gov/planetary/apod?api_key=FaOagYSAyEILqbNk51CPYfhm2xgaZBF6s1SUYQqx")
          .then(response => response.json())
          .then(data => {
            potdImage.src = data.url;
            potdImage.alt = data.title;
            potdImage.style.width = "50rem";
            potdImage.style.height = "auto";
            potdImage.style.margin = "4px";
          })
          .catch(error => {
            console.error("Error fetching NASA Picture of the Day:", error);
            potdImage.alt = "Error loading image";
          });
      }
    }

    console.log("Popup created with texts:", texts);
  }, timeoutInSec * 1000);
}


async function getPISS() {
  return new Promise((resolve, reject) => {
    const client = new LightstreamerClient(
      "https://push.lightstreamer.com",
      "ISSLIVE"
    );

    client.connect();

    const sub = new Subscription("MERGE", ["NODE3000005"], ["Value"]);
    sub.setRequestedSnapshot("yes");
    let resolved = false;

    sub.addListener({
      onItemUpdate: (update) => {
        if (!resolved) {
          resolved = true;
          const value = update.getValue("Value");
          resolve(value);
          client.unsubscribe(sub);
          client.disconnect();
        }
      }
    });

    client.subscribe(sub);

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(new Error("Timeout waiting for update"));
        client.unsubscribe(sub);
        client.disconnect();
      }
    }, 10000);
  });
}
