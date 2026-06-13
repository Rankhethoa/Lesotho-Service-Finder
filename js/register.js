// add platform and username
addSocialBtn.addEventListener('click', () => {
    const platform = platformSelect.value;
    const username = usernameInput.value.trim();

    if (!platform || !username) {
        alert('Please select a platform and enter a username.');
        return;
    }

    if (socialData[platform]) {
        alert('You have already added this platform.');
        return;
    }

    socialData[platform] = username;
    renderSocialList();

    platformSelect.value = '';
    usernameInput.value = '';
});

// Remove platform from list
function removePlatform(platform) {
    delete socialData[platform];
    renderSocialList();
}