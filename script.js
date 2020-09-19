const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disbale/enable Button
function toggleButton() {
    // if button.disable = true it will make it reverse which is false
    // else button.disable = false it will make it reverse which is true
    button.disabled = !button.disabled;
}

// Passingg joke to voiceRss API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20')
    VoiceRSS.speech({
        key: "a53878d4be354da0bcc1a44480607ea8",
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke Api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // catch errors here;
        console.log('OOOPS', error)
    }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);