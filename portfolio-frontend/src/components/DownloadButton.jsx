import PropTypes from 'prop-types';

const DownloadButton = ({ fileUrl, fileName }) => {

  const handleDownload = () => {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  };

  return (
    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md" onClick={handleDownload}>
      Download Resume
    </button>
  );
};

DownloadButton.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default DownloadButton;