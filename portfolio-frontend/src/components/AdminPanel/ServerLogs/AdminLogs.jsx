import React, { useEffect, useState } from 'react';
import { getLogs } from '../../../api/index.js';
import { errorAlert } from '../../../utils/alert.js';
import LogsPagination from './LogsPagination.jsx';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLogs(currentPage);
        setLogs(data.logs);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        errorAlert("Error fetching data.");
        setLoading(false);

      }
    };
    fetchData();
  }, [currentPage]);

  // Handle page click
  const handlePageClick = async (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openModal = (log) => {
    setSelectedLog(log);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedLog(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Admin Logs</h1>

      {/* Pagination */}
      <LogsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />

      <div className="overflow-x-auto shadow-lg rounded-lg bg-zinc-800 w-full max-w-6xl mx-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium w-1/5">Timestamp</th>
              <th className="px-6 py-3 text-left text-sm font-medium w-1/5">Level</th>
              <th className="px-6 py-3 text-left text-sm font-medium w-1/5">Message</th>
              <th className="px-6 py-3 text-left text-sm font-medium w-1/5">Method</th>
              <th className="px-6 py-3 text-left text-sm font-medium w-1/5">URL</th>
              <th className="px-6 py-3 text-left text-sm font-medium w-1/5">Stack Trace</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id.$oid}
                className="border-b text-white cursor-pointer"
                onClick={() => openModal(log)}
              >
                <td className="px-6 py-4 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">{log.level}</td>
                <td className="px-6 py-4 text-sm">
                  <pre className="text-sm max-w-52 overflow-hidden truncate">{log.message}</pre>
                </td>
                <td className="px-6 py-4 text-sm">{log.metadata.method}</td>
                <td className="px-6 py-4 text-sm">{log.metadata.url}</td>
                <td className="px-6 py-4 text-sm">
                  <pre className="text-sm max-w-52 overflow-hidden truncate">{log.metadata.stack}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Details</h2>
            <div className="space-y-4 max-h-80 overflow-auto">
              <div>
                <strong>Timestamp:</strong>
                <p>{new Date(selectedLog.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <strong>Level:</strong>
                <p>{selectedLog.level}</p>
              </div>
              <div>
                <strong>Message:</strong>
                <p>{selectedLog.message}</p>
              </div>
              <div>
                <strong>Method:</strong>
                <p>{selectedLog.metadata.method}</p>
              </div>
              <div>
                <strong>URL:</strong>
                <p>{selectedLog.metadata.url}</p>
              </div>
              <div>
                <strong>Stack Trace:</strong>
                <div className="overflow-y-auto max-h-60">
                  <pre className="text-sm text-gray-600">{selectedLog.metadata.stack}</pre>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogs;
