import io from 'socket.io-client';
const socket = io('http://localhost:5000');
socket.on('new_report', (data) => {
    console.log('New report:', data);
    // Optionally update UI (e.g., show alert-badge)
    alert(data.message);  // Example UI update
});
socket.on('connect_error', (error) => console.log('Socket error:', error));
export default socket;