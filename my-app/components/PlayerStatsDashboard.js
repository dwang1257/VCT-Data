'use client'

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell,
  ScatterChart, Scatter
} from 'recharts';
import { getPlayers, addPlayer, deletePlayer } from '../lib/api';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';

// Valorant color scheme
const colors = {
  primary: '#FF4655', // Valorant red
  secondary: '#0F1923', // Dark blue/black
  accent: '#18E4B7', // Teal accent
  background: '#ECE8E1', // Light background
  text: '#383E3A', // Dark text
  white: '#FFFFFF',
  chartColors: ['#FF4655', '#0F1923', '#18E4B7', '#BDBCB7', '#809BCE', '#8860D0']
};

export default function ValorantDashboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ name: '', team: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'acs', direction: 'desc' });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const data = await getPlayers(filter.name, filter.team);
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlayers();
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

  const handleDeletePlayer = async () => {
    if (!playerToDelete) return;

    try {
      await deletePlayer(playerToDelete);
      setPlayerToDelete('');
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (a[sortConfig.key] === null) return 1;
    if (b[sortConfig.key] === null) return -1;
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] - b[sortConfig.key];
    }
    return b[sortConfig.key] - a[sortConfig.key];
  });

  // Top 5 players by ACS
  const topACSPlayers = [...players]
    .filter(p => p.acs !== null)
    .sort((a, b) => b.acs - a.acs)
    .slice(0, 5);

  // Top 5 players by KD ratio
  const topKDPlayers = [...players]
    .filter(p => p.kd_ratio !== null)
    .sort((a, b) => b.kd_ratio - a.kd_ratio)
    .slice(0, 5);

  // Top 5 players by KAST
  const topKASTPlayers = [...players]
    .filter(p => p.kast !== null)
    .sort((a, b) => b.kast - a.kast)
    .slice(0, 5);

  // Top 5 players by FKPR (First Kill Per Round)
  const topFKPRPlayers = [...players]
    .filter(p => p.fkpr !== null)
    .sort((a, b) => b.fkpr - a.fkpr)
    .slice(0, 5);

  // Top 5 players by Clutch percentage
  const topClutchPlayers = [...players]
    .filter(p => p.cl_percent !== null)
    .sort((a, b) => b.cl_percent - a.cl_percent)
    .slice(0, 5);

  // Team distribution data
  const teamDistribution = players.reduce((acc, player) => {
    if (!player.team) return acc;
    acc[player.team] = (acc[player.team] || 0) + 1;
    return acc;
  }, {});

  const teamPieData = Object.keys(teamDistribution).map((team, index) => ({
    name: team,
    value: teamDistribution[team],
    fill: colors.chartColors[index % colors.chartColors.length]
  }));

  // KD vs ACS scatter data
  const scatterData = players
    .filter(p => p.kd_ratio !== null && p.acs !== null)
    .map(p => ({
      name: p.name,
      kd: p.kd_ratio,
      acs: p.acs,
      team: p.team
    }));

  // Agent role effectiveness (simulated data since we don't have agent roles)
  const radarPlayers = players
    .filter(p => p.kd_ratio !== null && p.kast !== null && p.fkpr !== null && p.acs !== null && p.cl_percent !== null)
    .slice(0, 3)
    .map(p => ({
      name: p.name,
      "K/D": p.kd_ratio * 20, // Scale for radar chart
      "KAST": p.kast || 0,
      "First Bloods": p.fkpr * 100 || 0,
      "ACS": p.acs / 5 || 0, // Scale for radar
      "Clutch %": p.cl_percent || 0
    }));

  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center" style={{ backgroundColor: colors.secondary }}>
        <div className="flex items-center">
          <h1 className="text-3xl font-bold" style={{ color: colors.white }}>
            VALORANT<span style={{ color: colors.primary }}> PLAYER STATS</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 rounded"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            Filters {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </header>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 shadow-md" style={{ backgroundColor: colors.white }}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                Player Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filter.name}
                  onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                  className="w-full p-2 pl-8 border rounded text-black"
                  placeholder="Search by name..."
                  style={{ borderColor: colors.secondary }}
                />
                <Search size={16} className="absolute left-2 top-3" style={{ color: colors.secondary }} />
              </div>
            </div>

            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                Team
              </label>
              <input
                type="text"
                value={filter.team}
                onChange={(e) => setFilter({ ...filter, team: e.target.value })}
                className="w-full p-2 border rounded text-black"
                placeholder="Filter by team..."
                style={{ borderColor: colors.secondary }}
              />
            </div>

            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                Delete Player
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={playerToDelete}
                  onChange={(e) => setPlayerToDelete(e.target.value)}
                  className="flex-1 p-2 border rounded text-black"
                  placeholder="Enter player name..."
                  style={{ borderColor: colors.secondary }}
                />
                <button
                  onClick={handleDeletePlayer}
                  className="px-3 py-2 rounded"
                  style={{ backgroundColor: colors.primary, color: colors.white }}
                  disabled={!playerToDelete}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl" style={{ color: colors.text }}>Loading player stats...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top 5 Players by ACS */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>Top 5 Players by ACS</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topACSPlayers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: colors.secondary, color: colors.white, borderColor: colors.primary }}
                    itemStyle={{ color: colors.white }}
                    labelStyle={{ color: colors.primary, fontWeight: 'bold' }}
                  />
                  <Bar dataKey="acs" fill={colors.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>


            {/* Top 5 Players by K/D Ratio */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>Top 5 Players by K/D Ratio</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topKDPlayers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: colors.secondary, color: colors.white, borderColor: colors.accent }}
                    itemStyle={{ color: colors.white }}
                    labelStyle={{ color: colors.accent, fontWeight: 'bold' }}
                  />
                  <Bar dataKey="kd_ratio" fill={colors.accent} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top 5 Players by FKPR */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>Top 5 Players by First Kills</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topFKPRPlayers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: colors.secondary, color: colors.white, borderColor: colors.chartColors[3] }}
                    itemStyle={{ color: colors.white }}
                    labelStyle={{ color: colors.chartColors[3], fontWeight: 'bold' }}
                  />
                  <Bar dataKey="fkpr" fill={colors.chartColors[3]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top 5 Players by Clutch % */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>Top 5 Players by Clutch %</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topClutchPlayers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: colors.secondary, color: colors.white, borderColor: colors.chartColors[4] }}
                    itemStyle={{ color: colors.white }}
                    labelStyle={{ color: colors.chartColors[4], fontWeight: 'bold' }}
                  />
                  <Bar dataKey="cl_percent" fill={colors.chartColors[4]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Player Stats Table */}
            <div className="bg-white p-4 rounded-lg shadow-md col-span-1 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>Detailed Player Stats</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr style={{ backgroundColor: colors.secondary, color: colors.white }}>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Team</th>
                      <th
                        className="px-4 py-2 text-right cursor-pointer"
                        onClick={() => handleSort('acs')}
                      >
                        ACS {sortConfig.key === 'acs' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-4 py-2 text-right cursor-pointer"
                        onClick={() => handleSort('kd_ratio')}
                      >
                        K/D {sortConfig.key === 'kd_ratio' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-4 py-2 text-right cursor-pointer"
                        onClick={() => handleSort('kast')}
                      >
                        KAST {sortConfig.key === 'kast' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-4 py-2 text-right cursor-pointer"
                        onClick={() => handleSort('fkpr')}
                      >
                        FKPR {sortConfig.key === 'fkpr' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-4 py-2 text-right cursor-pointer"
                        onClick={() => handleSort('cl_percent')}
                      >
                        Clutch % {sortConfig.key === 'cl_percent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-4 py-2 text-right cursor-pointer"
                        onClick={() => handleSort('rounds_played')}
                      >
                        Rounds {sortConfig.key === 'rounds_played' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sortedPlayers.map((player, index) => (
                      <tr
                        key={player.id || index}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                        style={{ backgroundColor: index % 2 === 0 ? '#f8f8f8' : colors.white }}
                      >
                        <td className="px-4 py-2 font-medium" style={{ color: colors.primary }}>{player.name}</td>
                        <td className="px-4 py-2" style={{ color: '#000' }}>{player.team}</td>
                        <td className="px-4 py-2 text-right" style={{ color: '#000' }}>{player.acs?.toFixed(2) || '-'}</td>
                        <td className="px-4 py-2 text-right" style={{ color: '#000' }}>{player.kd_ratio?.toFixed(2) || '-'}</td>
                        <td className="px-4 py-2 text-right" style={{ color: '#000' }}>{player.kast?.toFixed(2) || '-'}</td>
                        <td className="px-4 py-2 text-right" style={{ color: '#000' }}>{player.fkpr?.toFixed(2) || '-'}</td>
                        <td className="px-4 py-2 text-right" style={{ color: '#000' }}>{player.cl_percent?.toFixed(2) || '-'}</td>
                        <td className="px-4 py-2 text-right" style={{ color: '#000' }}>{player.rounds_played || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center" style={{ backgroundColor: colors.secondary, color: colors.white }}>
        <p>Valorant Champions Tour Player Statistics Dashboard © 2025</p>
      </footer>
    </div>
  );
}