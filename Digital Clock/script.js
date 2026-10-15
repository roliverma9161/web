function updateClock() {
    const now = new Date();  
    // Time variables
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // AM ya PM determine karna
    let ampm = hours >= 12 ? 'PM' : 'AM';
    // 12-hour format mein convert karna
    hours = hours % 12;
    hours = hours ? hours : 12; // agar 0 ho toh 12 dikhaye
    // Agar number single digit ka hai toh aage '0' laga dena (jaise 05, 09)
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // HTML mein time update karna
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = timeString;
    // Date variables
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);   
    // HTML mein date update karna
    document.getElementById('date').textContent = dateString;
}
// Har 1 second (1000 milliseconds) mein function ko run karna taaki live time dikhe
setInterval(updateClock, 1000);
// Page khulte hi turant function run karne ke liye
updateClock();