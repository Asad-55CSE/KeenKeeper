import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimeline } from '../context/TimelineContext';

const COLORS = {
  text:  '#7c3aed',
  call:  '#2D4A3E',
  video: '#4ade80',
};

const LABELS = { text: 'Text', call: 'Call', video: 'Video' };

const Stats = () => {
  const { entries } = useTimeline();

  const counts = entries.reduce(
    (acc, e) => {
      if (acc[e.type] !== undefined) acc[e.type]++;
      return acc;
    },
    { call: 0, text: 0, video: 0 },
  );

  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({ name: LABELS[key], value, key }));

  const total = data.reduce((s, d) => s + d.value, 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Friendship Analytics</h1>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="font-semibold text-gray-700 mb-6">By Interaction Type</p>

          {total === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-gray-400">
              <p className="text-sm">No interactions logged yet.</p>
              <p className="text-xs">Use Quick Check-In on a friend's page to get started.</p>
            </div>
          ) : (
            <>
              {/* Summary row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {data.map((d) => (
                  <div key={d.key} className="flex flex-col items-center gap-1 p-4 rounded-xl" style={{ background: `${COLORS[d.key]}10` }}>
                    <span className="text-2xl font-extrabold" style={{ color: COLORS[d.key] }}>{d.value}</span>
                    <span className="text-xs font-medium text-gray-600">{d.name}</span>
                  </div>
                ))}
              </div>

              {/* Donut chart */}
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {data.map((entry) => (
                      <Cell key={entry.key} fill={COLORS[entry.key]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} interaction${value !== 1 ? 's' : ''}`, name]}
                    contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', fontFamily: 'Plus Jakarta Sans' }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => <span style={{ fontSize: 13, color: '#4b5563', fontFamily: 'Plus Jakarta Sans' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>

              <p className="text-center text-sm text-gray-400 mt-2">
                {total} total interaction{total !== 1 ? 's' : ''} logged
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
