import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ACSVsRoundsLineChart({ players }) {
  const data = players
    .filter(p => p.acs !== null && p.rounds_played !== null)
    .map(p => ({
      name: p.name,
      acs: p.acs,
      rounds_played: p.rounds_played,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="acs" stroke="#8884d8" />
        <Line type="monotone" dataKey="rounds_played" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
