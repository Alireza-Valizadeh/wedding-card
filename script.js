// Persian text content - you can customize this
const content = {
    title: "به نامش و در پناهش",
    text: "از صدای سخن عشق ندیدم خوش تـــر",
    names: "بهنوش و علیرضا ",
    familyNames: "جابـــری و ولـــی زاده",
    date: "شنبه ۲۲ آذر ماه ۱۴۰۴ \n  ساعت ۱۸ الی ۲۳",
    address: "ابتدای جاده شاندیز، بعد از خیابان فرمانیه، کوچه ثامن الائمه ۵، تالار وایت گاردن"
};

// Function to animate text word by word from right to left
function animateText(element, text, delayStart = 0) {
    // Replace \n with a placeholder that we'll handle separately
    const lines = text.split('\n');
    let html = '';
    let wordIndex = 0;
    
    lines.forEach((line, lineIndex) => {
        const words = line.trim().split(' ');
        
        // Build HTML with spans for each word
        words.forEach((word) => {
            if (word.trim()) {
                html += `<span class="word" style="animation-delay: ${delayStart + (wordIndex * 0.3)}s">${word}</span> `;
                wordIndex++;
            }
        });
        
        // Add line break if not the last line
        if (lineIndex < lines.length - 1) {
            html += '<br>';
        }
    });
    
    element.innerHTML = html;
}

// Wait for clouds to reach 20% of page height and card to appear
function startTextAnimation() {
    // Card appears at 2.5s, then start text animation after a brief delay
    setTimeout(() => {
        const titleElement = document.getElementById('cardTitle');
        const textElement = document.getElementById('cardText');
        const namesElement = document.getElementById('names');
        const familyNamesElement = document.getElementById('familyNames');
        const dateElement = document.getElementById('date');
        const addressElement = document.getElementById('address');

        // Animate title first
        animateText(titleElement, content.title, 0);

        // Calculate delay for names (after title words finish)
        const titleWords = content.title.split(' ').length;
        const namesDelay = titleWords * 0.3 + 0.5;

        // Animate names
        setTimeout(() => {
            animateText(namesElement, content.names, 0);

            // Calculate delay for text
            const namesWords = content.names.split(' ').length;
            const textDelay = namesWords * 0.3 + 0.3;

            setTimeout(() => {
                animateText(textElement, content.text, 0);

                // Calculate delay for family names
                const textWords = content.text.replace(/\n/g, ' ').split(' ').filter(w => w.trim()).length;
                const familyNamesDelay = textWords * 0.3 + 0.3;

                setTimeout(() => {
                    animateText(familyNamesElement, content.familyNames, 0);

                    // Calculate delay for date
                    const familyNamesWords = content.familyNames.split(' ').length;
                    const dateDelay = familyNamesWords * 0.3 + 0.3;

                    setTimeout(() => {
                        animateText(dateElement, content.date, 0);

                        // Calculate delay for address
                        const dateWords = content.date.split(' ').length;
                        const addressDelay = dateWords * 0.3 + 0.3;

                        setTimeout(() => {
                            animateText(addressElement, content.address, 0);
                        }, addressDelay * 1000);

                    }, dateDelay * 1000);

                }, familyNamesDelay * 1000);

            }, textDelay * 1000);

        }, namesDelay * 1000);

    }, 3000); // 3 seconds - wait for card to appear (2.5s) + 0.5s delay
}

// Start the animation when page loads
window.addEventListener('load', () => {
    startTextAnimation();
});

