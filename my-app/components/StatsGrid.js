'use client';
import ChartCard from '@/components/ChartCard';
import PlayerStatsTable from '@/components/PlayerStatsTable';
import { colors } from '@/lib/colors';

export default function StatsGrid({ players, sortedPlayers, sortConfig, onSort }) {
  // Helper to compute top 5 by key
  const topNBy = (key) => [...players].filter(p => p[key] !== null).sort((a, b) => b[key] - a[key]).slice(0, 5);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Top 5 Players by ACS" data={topNBy('acs')} dataKey="acs" fill={colors.chartColors[0]} />
      <ChartCard title="Top 5 Players by K/D Ratio" data={topNBy('kd_ratio')} dataKey="kd_ratio" fill={colors.chartColors[2]} />
      <ChartCard title="Top 5 Players by First Kills" data={topNBy('fkpr')} dataKey="fkpr" fill={colors.chartColors[2]} />
      <ChartCard title="Top 5 Players by Clutch %" data={topNBy('cl_percent')} dataKey="cl_percent" fill={colors.chartColors[0]} />
      <PlayerStatsTable players={sortedPlayers} sortConfig={sortConfig} onSort={onSort} />
    </div>


  );
}