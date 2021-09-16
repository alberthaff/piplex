function tick() {
    // Check if the PIP button is visible
    if (document.getElementsByClassName('piplex-button').length === 0) {
        const bottomNav = getElementByXpath("//html/body/div[1]/div[4]");

        if (bottomNav && bottomNav.childNodes.length !== 0) {
            addButton();
        }
    }

    setTimeout(tick, 250);
}

function addButton() {
    // Get an existing button
    const otherButton = document.querySelector('[data-testid="closeButton"]');
    if (!otherButton) {
        return;
    }
    // Get the container of the buttons
    const buttonContainer = otherButton.parentElement;

    const pipButton = document.createElement('button')
    buttonContainer.appendChild(pipButton);
    pipButton.innerHTML = `<svg  className="chroma_Icon_none chroma_Icon_inheritColor" fill="currentColor" height="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
    <path id="XMLID_11_" class="st0" d="M418.5,139.4H232.4v139.8h186.1V139.4z M464.8,46.7H46.3C20.5,46.7,0,68.1,0,93.1v325.9
\t\tc0,25.8,21.4,46.3,46.3,46.3h419.4c25.8,0,46.3-20.5,46.3-46.3V93.1C512,67.2,490.6,46.7,464.8,46.7z M464.8,418.9H46.3V92.2h419.4
\t\tv326.8H464.8z"/>
        </svg>`;
    pipButton.className = 'piplex-button ' + otherButton.className;

    pipButton.onclick = pipClick;
}

function pipClick() {
    const videoElement = getElementByXpath("/html/body/div[1]/div[4]/div/div[1]/video");

    if (!videoElement) {
        alert('Unable to locate the video player. Please make sure the video is playing and try again.');
        return;
    }

    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        if (document.pictureInPictureEnabled) {
            videoElement.requestPictureInPicture();
        }
    }
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Start the extension
tick();
