import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateIdeas } from '../features/ideas/ideasSlice';

const IdeaGenerator = () => {
  const dispatch = useDispatch();
  const { ideas, isLoading, error } = useSelector((state) => state.ideas);
  
  const [formData, setFormData] = useState({
    contentType: '',
    industry: '',
    targetAudience: '',
    keywords: '',
    tone: '',
    count: 5
  });

  const contentTypes = ['Blog Post', 'Social Media', 'Video', 'Email Newsletter', 'Podcast'];
  const industries = ['Technology', 'Marketing', 'Finance', 'Health', 'Education', 'Entertainment', 'Food', 'Travel', 'Fashion', 'Sports'];
  const tones = ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational', 'Controversial'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateIdeas(formData));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Content Idea Generator</h1>
      
      <div className="grid md:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="md:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generate New Ideas</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contentType">
                  Content Type
                </label>
                <select
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Content Type</option>
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAudience">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Marketers, Small Business Owners"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keywords">
                  Keywords (optional)
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., marketing, strategy, growth"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tone">
                  Content Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Tone</option>
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count">
                  Number of Ideas (1-10)
                </label>
                <input
                  type="number"
                  id="count"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Ideas'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="md:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generated Ideas</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : ideas.length > 0 ? (
              <ul className="space-y-4">
                {ideas.map((idea, index) => (
                  <li key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="font-medium text-lg mb-2">{idea.title}</h3>
                    <p className="text-gray-600 mb-2">{idea.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {idea.keywords.map((keyword, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Save Idea
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Schedule
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Fill out the form and click "Generate Ideas" to see content suggestions here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaGenerator;
