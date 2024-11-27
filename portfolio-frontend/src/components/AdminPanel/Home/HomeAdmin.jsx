import React, { useState, useEffect } from "react";

function HomeAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    profilePic: null,
    resume: null,
    githubLink: "",
    linkedinLink: "",
  });

  const [links, setLinks] = useState([
    { label: "GitHub", url: "" },
    { label: "LinkedIn", url: "" },
  ]);

  const [initialData, setInitialData] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  // Fetch data from the API on first load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getUserDetails"); // Replace with your API endpoint
        const data = await response.json();
        setFormData(data);
        setLinks(data.links || []);
        setInitialData(data); // Save the fetched data to compare later
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    checkIfChanged();
  };

  // Handle file changes (for profile pic and resume)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    checkIfChanged();
  };

  // Handle link change (for dynamic links)
  const handleLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLinks = [...links];
    updatedLinks[index][name] = value;
    setLinks(updatedLinks);
    checkIfChanged();
  };

  // Add a new link
  const addLink = () => {
    setLinks([...links, { label: "", url: "" }]);
    checkIfChanged();
  };

  // Remove a link
  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    checkIfChanged();
  };

  // Check if any changes were made
  const checkIfChanged = () => {
    // Compare formData and links with initialData
    const isFormChanged = Object.keys(formData).some(
      (key) => formData[key] !== initialData[key]
    );
    const areLinksChanged = links.some(
      (link, index) => link.url !== initialData.links[index]?.url || link.label !== initialData.links[index]?.label
    );
    setIsChanged(isFormChanged || areLinksChanged);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data to be submitted:", formData, links);
    // Example: You can integrate API here to save data in the future
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-zinc-900 text-white rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="text-3xl font-semibold mb-6">Edit Home Page Details</h1>

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
        {/* Name Field */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Position Field */}
          <div className="flex-1">
            <label htmlFor="position" className="block text-sm font-medium">
              Position
            </label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePic" className="block text-sm font-medium">
            Profile Picture
          </label>
          <input
            id="profilePic"
            name="profilePic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm border border-gray-300 rounded-lg file:border-0 file:px-4 file:py-2 file:bg-blue-500 file:text-white focus:outline-none"
          />
        </div>

        {/* Resume */}
        <div>
          <label htmlFor="resume" className="block text-sm font-medium">
            Resume (PDF)
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm border border-gray-300 rounded-lg file:border-0 file:px-4 file:py-2 file:bg-blue-500 file:text-white focus:outline-none"
          />
        </div>

        {/* Dynamic Links (GitHub, LinkedIn, etc.) */}
        <div>
          <h3 className="text-xl font-semibold pb-3">Social Links</h3>
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                name="label"
                value={link.label}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Link Label (e.g., GitHub)"
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg flex-1 text-black"
              />
              <input
                type="url"
                name="url"
                value={link.url}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="URL"
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg flex-1 text-black"
              />
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLink}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Link
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isChanged ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={!isChanged}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomeAdmin;
