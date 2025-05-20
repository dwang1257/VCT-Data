'use client';
import { colors } from '@/lib/colors';

export default function PlayerStatsTable({ players, sortConfig, onSort }) {
  const headers = [
    { key: 'acs', label: 'ACS' },
    { key: 'kd_ratio', label: 'K/D' },
    { key: 'kast', label: 'KAST' },
    { key: 'fkpr', label: 'FKPR' },
    { key: 'cl_percent', label: 'Clutch %' },
    { key: 'rounds_played', label: 'Rounds' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md col-span-1 lg:col-span-2">
      <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>Detailed Player Stats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr style={{ backgroundColor: colors.secondary, color: colors.white }}>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Team</th>
              {headers.map(h => (
                <th
                  key={h.key}
                  className="px-4 py-2 text-right cursor-pointer"
                  onClick={() => onSort(h.key)}
                >
                  {h.label} {sortConfig.key === h.key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {players.map((player, index) => (
              <tr
                key={player.id || index}
                style={{ backgroundColor: colors.white }}
              >
                <td className="px-4 py-2 font-medium" style={{ color: colors.black }}>{player.name}</td>
                <td className="px-4 py-2" style={{ color: colors.black }}>{player.team}</td>
                <td className="px-4 py-2 text-right" style={{ color: colors.black }}>{player.acs?.toFixed(2) || '-'}</td>
                <td className="px-4 py-2 text-right" style={{ color: colors.black }}>{player.kd_ratio?.toFixed(2) || '-'}</td>
                <td className="px-4 py-2 text-right" style={{ color: colors.black }}>{player.kast?.toFixed(2) || '-'}</td>
                <td className="px-4 py-2 text-right" style={{ color: colors.black }}>{player.fkpr?.toFixed(2) || '-'}</td>
                <td className="px-4 py-2 text-right" style={{ color: colors.black }}>{player.cl_percent?.toFixed(2) || '-'}</td>
                <td className="px-4 py-2 text-right" style={{ color: colors.black }}>{player.rounds_played || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}