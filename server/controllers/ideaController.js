const asyncHandler = require('express-async-handler');
const Idea = require('../models/ideaModel');
const openai = require('../services/openaiService');

// @desc    Generate content ideas
// @route   POST /api/ideas/generate
// @access  Public
const generateIdeas = asyncHandler(async (req, res) => {
  const { contentType, industry, targetAudience, keywords, tone, count = 5 } = req.body;

  if (!contentType || !industry) {
    res.status(400);
    throw new Error('Please provide content type and industry');
  }

  try {
    // For now, generate mock ideas
    // In production, this would call the OpenAI API
    const ideas = [];
    
    for (let i = 0; i < count; i++) {
      ideas.push({
        title: `${contentType} idea for ${industry} #${i + 1}`,
        description: `This is a sample ${tone || 'professional'} ${contentType.toLowerCase()} idea for the ${industry} industry targeting ${targetAudience || 'general audience'}.`,
        contentType,
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : ['sample', 'keyword', industry.toLowerCase()],
      });
    }

    res.status(200).json(ideas);
  } catch (error) {
    res.status(500);
    throw new Error('Error generating ideas: ' + error.message);
  }
});

// @desc    Save an idea
// @route   POST /api/ideas
// @access  Private
const saveIdea = asyncHandler(async (req, res) => {
  const { title, description, contentType, topics, keywords } = req.body;

  if (!title || !description || !contentType) {
    res.status(400);
    throw new Error('Please provide title, description, and content type');
  }

  const idea = await Idea.create({
    user: req.user.id,
    title,
    description,
    contentType,
    topics: topics || [],
    keywords: keywords || [],
  });

  res.status(201).json(idea);
});

// @desc    Get user's saved ideas
// @route   GET /api/ideas
// @access  Private
const getSavedIdeas = asyncHandler(async (req, res) => {
  const ideas = await Idea.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(ideas);
});

// @desc    Get idea by ID
// @route   GET /api/ideas/:id
// @access  Private
const getIdeaById = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  // Check if idea exists
  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  // Check if user owns the idea
  if (idea.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to access this idea');
  }

  res.status(200).json(idea);
});

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Private
const updateIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  // Check if idea exists
  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  // Check if user owns the idea
  if (idea.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this idea');
  }

  const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedIdea);
});

// @desc    Delete idea
// @route   DELETE /api/ideas/:id
// @access  Private
const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  // Check if idea exists
  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  // Check if user owns the idea
  if (idea.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this idea');
  }

  await idea.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  generateIdeas,
  saveIdea,
  getSavedIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
};
