
function updateAge() {
    const birthDate = new Date('2008-08-08T00:00:00');
    const now = new Date();
    const diff = now - birthDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const days = Math.floor(seconds / (24 * 60 * 60));
    const months = Math.floor(days / (365 / 12));

    document.getElementById('seconds-old').textContent = `${seconds} seconds`;
    document.getElementById('minutes-old').textContent = `${minutes} minutes`;
    document.getElementById('days-old').textContent = `${days} days`;
    document.getElementById('months-old').textContent = `${months} months`;
}

updateAge();
setInterval(updateAge, 1000);