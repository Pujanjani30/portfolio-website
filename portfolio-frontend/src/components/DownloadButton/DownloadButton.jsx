const DownloadButton = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    if (!fileUrl) {
      console.error('File URL is missing');
      return;
    }

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition ${!fileUrl ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      onClick={handleDownload}
      disabled={!fileUrl}
    >
      {fileUrl ? 'Resume' : 'Loading...'}
    </button>
  );
};

export default DownloadButton;
