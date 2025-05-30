
const birthDate = new Date('2008-08-08T00:00:00');
const circle = document.querySelector('.radial-bar .progress');
const circumference = 2 * Math.PI * 45;
circle.style.strokeDasharray = circumference;

function updateAge() {
    const now = new Date();
    const diff = now - birthDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / (365.25 / 12));
    const years = diff / (365.25 * 24 * 60 * 60 * 1000);

    // Update radial
    document.getElementById('years-old').textContent = years.toFixed(2);

    // Year progress percent
    const startOfYear = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    const nextBirthday = new Date(now.getFullYear() + (now >= startOfYear ? 1 : 0), birthDate.getMonth(), birthDate.getDate());
    const yearSpan = nextBirthday - startOfYear;
    const elapsed = now - startOfYear;
    const percent = elapsed / yearSpan;
    const offset = circumference * (1 - percent);
    circle.style.strokeDashoffset = offset;

    // Update list
    document.getElementById('months-old').textContent = months;
    document.getElementById('days-old').textContent = days;
    document.getElementById('hours-old').textContent = hours;
    document.getElementById('minutes-old').textContent = minutes;
    document.getElementById('seconds-old').textContent = seconds;
}

updateAge();
setInterval(updateAge, 1000);