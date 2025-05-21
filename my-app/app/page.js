'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import ComparisonPanel from '@/components/ComparisonPanel';
import StatsGrid from '@/components/StatsGrid';
import { colors } from '@/lib/colors';
import { getPlayers, deletePlayer } from '@/lib/api';

export default function DashboardPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ name: '', team: '' });
  const [p1, setP1] = useState({name: ''})
  const [p2, setP2] = useState({name: ''})
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'acs', direction: 'desc' });
  const comparisonPlayers = players.filter(
     (player) =>
       player.name.toLowerCase() === p1.name.toLowerCase() ||
       player.name.toLowerCase() === p2.name.toLowerCase()
    );


  useEffect(() => { fetchPlayers(); }, []);
  useEffect(() => { const t = setTimeout(fetchPlayers, 10); return () => clearTimeout(t); }, [filter]);




  async function fetchPlayers() {
    try {
      setLoading(true);
      const data = await getPlayers(filter.name, filter.team);
      setPlayers(data);
    } finally { setLoading(false); }
  }

  async function handleDeletePlayer() {
    if (!playerToDelete) return;
    await deletePlayer(playerToDelete);
    setPlayerToDelete('');
    fetchPlayers();
  }

  function handleSort(key) {
    setSortConfig(({ key: k, direction }) => ({
      key,
      direction: k === key && direction === 'desc' ? 'asc' : 'desc'
    }));
  }

  const sortedPlayers = [...players].sort((a, b) => {
    if (a[sortConfig.key] === null) return 1;
    if (b[sortConfig.key] === null) return -1;
    return sortConfig.direction === 'asc' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key];
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <Header
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
        showComparison={showComparison}
        toggleComparison={() => setShowComparison(!showComparison)}
      />

      <FilterPanel
        visible={showFilters}
        filter={filter}
        setFilter={setFilter}
        playerToDelete={playerToDelete}
        setPlayerToDelete={setPlayerToDelete}
        onDelete={handleDeletePlayer}
      />
      <ComparisonPanel
        visible = {showComparison}
        p1 = {p1}
        setP1 = {setP1}
        p2 = {p2}
        setP2 = {setP2}
      />
      <main className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl" style={{ color: colors.text }}>Loading player stats...</p>
          </div>
        ) : (
          <StatsGrid
            players={comparisonPlayers.length === 2 ? comparisonPlayers : players}
            sortedPlayers={comparisonPlayers.length === 2 ? comparisonPlayers : sortedPlayers}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        )}
      </main>
    </div>
  );
}
