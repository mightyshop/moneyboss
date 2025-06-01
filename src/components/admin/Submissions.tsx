import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import ProofModal from './ProofModal';

interface Submission {
  id: string;
  username: string;
  ipAddress: string;
  timestamp: string;
  prize: {
    type: 'cash' | 'airtime';
    amount: number;
    network?: string;
    paymentDetails?: {
      bankName?: string;
      accountNumber?: string;
      accountName?: string;
      phoneNumber?: string;
    };
  };
  status: 'pending' | 'paid';
  proof: {
    type: 'image' | 'video';
    url: string;
  } | null;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    username: 'chioma123',
    ipAddress: '192.168.1.100',
    timestamp: '2024-03-07 14:30',
    prize: {
      type: 'cash',
      amount: 5000,
      paymentDetails: {
        bankName: 'GTBank',
        accountNumber: '0123456789',
        accountName: 'Chioma Okafor'
      }
    },
    status: 'pending',
    proof: {
      type: 'video',
      url: 'https://example.com/proof-video.mp4'
    }
  },
  {
    id: '2',
    username: 'adebayo_win',
    ipAddress: '192.168.1.101',
    timestamp: '2024-03-07 15:45',
    prize: {
      type: 'airtime',
      amount: 1000,
      network: 'MTN',
      paymentDetails: {
        phoneNumber: '08012345678'
      }
    },
    status: 'pending',
    proof: {
      type: 'image',
      url: 'https://example.com/proof-image.jpg'
    }
  }
];

const Submissions: React.FC = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaid = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id 
          ? { ...sub, status: 'paid', proof: null } // Delete proof by setting it to null
          : sub
      )
    );
    
    // Close modal if the paid submission was being viewed
    if (selectedSubmission?.id === id) {
      setIsModalOpen(false);
      setSelectedSubmission(null);
    }
  };

  const handleViewProof = (submission: Submission) => {
    if (submission.proof) {
      setSelectedSubmission(submission);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Winner Submissions</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prize
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {submission.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {submission.ipAddress}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₦{submission.prize.amount.toLocaleString()}
                    {submission.prize.type === 'airtime' && ` ${submission.prize.network} Airtime`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {submission.timestamp}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    submission.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {submission.proof && (
                      <button
                        onClick={() => handleViewProof(submission)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Proof
                      </button>
                    )}
                    {submission.status === 'pending' && (
                      <button
                        onClick={() => handlePaid(submission.id)}
                        className="text-green-600 hover:text-green-900 ml-2"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProofModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={selectedSubmission}
      />
    </div>
  );
};

export default Submissions;