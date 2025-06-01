import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface WinningRate {
  ipAddress: string;
  username: string;
  rate: number;
  lastModified: string;
}

const mockWinningRates: WinningRate[] = [
  {
    ipAddress: '192.168.1.100',
    username: 'chioma123',
    rate: 0.2,
    lastModified: '2024-03-07 14:30'
  },
  {
    ipAddress: '192.168.1.101',
    username: 'adebayo_win',
    rate: 100,
    lastModified: '2024-03-07 15:45'
  }
];

const WinningRates: React.FC = () => {
  const [winningRates, setWinningRates] = useState(mockWinningRates);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRateChange = (ipAddress: string, newRate: number) => {
    setWinningRates(prev =>
      prev.map(rate =>
        rate.ipAddress === ipAddress
          ? { ...rate, rate: newRate, lastModified: new Date().toLocaleString() }
          : rate
      )
    );
  };

  const filteredRates = winningRates.filter(rate =>
    rate.ipAddress.includes(searchTerm) || rate.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Winning Rates Management</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search by IP address or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Winning Rate (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRates.map((rate) => (
              <tr key={rate.ipAddress}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{rate.ipAddress}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{rate.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{rate.rate}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{rate.lastModified}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    value={rate.rate}
                    onChange={(e) => handleRateChange(rate.ipAddress, Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value={0.2}>Default (0.2%)</option>
                    <option value={100}>100%</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinningRates;