import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: {
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
    proof: {
      type: 'image' | 'video';
      url: string;
    };
  } | null;
}

const ProofModal: React.FC<ProofModalProps> = ({ isOpen, onClose, submission }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen || !submission) return null;

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Submission Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">User Information</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-800">
                    <span className="font-medium">Username:</span> {submission.username}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">IP Address:</span> {submission.ipAddress}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Timestamp:</span> {submission.timestamp}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Prize Details</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-800">
                    <span className="font-medium">Type:</span>{' '}
                    {submission.prize.type === 'airtime' ? 'Airtime' : 'Cash'}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Amount:</span>{' '}
                    ₦{submission.prize.amount.toLocaleString()}
                  </p>
                  {submission.prize.type === 'airtime' && submission.prize.network && (
                    <p className="text-gray-800">
                      <span className="font-medium">Network:</span> {submission.prize.network}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Payment Details</h4>
                <div className="mt-2 space-y-2">
                  {submission.prize.type === 'cash' ? (
                    <>
                      <p className="text-gray-800">
                        <span className="font-medium">Bank Name:</span>{' '}
                        {submission.prize.paymentDetails?.bankName}
                      </p>
                      <p className="text-gray-800">
                        <span className="font-medium">Account Number:</span>{' '}
                        {submission.prize.paymentDetails?.accountNumber}
                      </p>
                      <p className="text-gray-800">
                        <span className="font-medium">Account Name:</span>{' '}
                        {submission.prize.paymentDetails?.accountName}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-800">
                      <span className="font-medium">Phone Number:</span>{' '}
                      {submission.prize.paymentDetails?.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500">Proof</h4>
                {submission.proof.type === 'image' && (
                  <button
                    onClick={toggleZoom}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    {isZoomed ? (
                      <>
                        <ZoomOut className="w-4 h-4 mr-1" />
                        Zoom Out
                      </>
                    ) : (
                      <>
                        <ZoomIn className="w-4 h-4 mr-1" />
                        Zoom In
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className={`bg-gray-100 rounded-lg overflow-hidden ${isZoomed ? 'fixed inset-4 z-50 bg-black flex items-center justify-center' : ''}`}>
                {submission.proof.type === 'image' ? (
                  <img
                    src={submission.proof.url}
                    alt="Submission proof"
                    className={`w-full h-auto ${isZoomed ? 'max-h-full object-contain' : ''}`}
                    style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                    onClick={toggleZoom}
                  />
                ) : (
                  <video
                    src={submission.proof.url}
                    controls
                    className="w-full h-auto"
                    controlsList="nodownload"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofModal;