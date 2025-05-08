export async function getPlayers(name, team) {
  const query = new URLSearchParams();
  if (name) query.append('name', name);
  if (team) query.append('team', team);

  const res = await fetch(`http://localhost:8080/api?${query.toString()}`);
  return res.json();
}

export async function addPlayer(player) {
  return await fetch('http://localhost:8080/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  });
}

export async function deletePlayer(name) {
  return await fetch(`http://localhost:8080/api/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
}
