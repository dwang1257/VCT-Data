import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ACSBarChart({ players }) {
  const topPlayers = [...players]
    .filter(p => p.acs !== null)
    .sort((a, b) => b.acs - a.acs)
    .slice(0, 5);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topPlayers}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="acs" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
