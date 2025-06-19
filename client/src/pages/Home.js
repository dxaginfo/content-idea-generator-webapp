import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: '💡',
      title: 'Smart Idea Generation',
      description: 'Generate blog, video, and social media content ideas with AI assistance.'
    },
    {
      icon: '🔍',
      title: 'Keyword Optimization',
      description: 'Discover trending keywords to improve your content reach and SEO.'
    },
    {
      icon: '📅',
      title: 'Content Calendar',
      description: 'Plan and schedule your content strategy with an intuitive visual calendar.'
    },
    {
      icon: '📊',
      title: 'Trend Analysis',
      description: 'Stay on top of emerging topics and content trends in your industry.'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Never Run Out of Content Ideas Again</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl">
          AI-powered content idea generation for creators, marketers, and social media managers.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            to="/generate"
            className="px-8 py-3 bg-gray-100 text-gray-800 rounded-md font-medium text-lg hover:bg-gray-200 transition-colors"
          >
            Try Demo
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-xl p-8 my-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content Strategy?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of content creators who use our platform to generate engaging content ideas.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium text-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
