
export const getUltimosTickets = async() => {
    const resp = await fetch('http://localhost:8081/ultimosTickets');
    const data = await resp.json();
    return data.ultimosTickets;
}