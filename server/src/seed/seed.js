require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Template = require('../models/Template');

const templates = [
  {
    name: 'Flavored Coffee Shop',
    description: 'Warm, photo-led landing page for a coffee brand with a menu preview, app promo section, and table reservation CTA.',
    thumbnail_url: '/templates/coffee-landing-1.jpg',
    category: 'Landing Page',
  },
  {
    name: 'Savor Coffee Co.',
    description: 'Bold hero landing page for a coffee shop with a features strip, "Why Choose Us" split section, and gallery of drinks.',
    thumbnail_url: '/templates/coffee-landing-2.jpg',
    category: 'Landing Page',
  },
  {
    name: 'Modern Home Decor',
    description: 'Interior design studio landing page with a full-bleed hero, concept gallery, and service highlight cards.',
    thumbnail_url: '/templates/interior-design-landing.jpg',
    category: 'Landing Page',
  },
  {
    name: 'Gravity Adventure Tours',
    description: 'Illustrated, story-driven landing page for an outdoor adventure brand with activity cards and a photo gallery.',
    thumbnail_url: '/templates/adventure-travel-landing.jpg',
    category: 'Landing Page',
  },

  {
    name: 'Rayhan — Web Designer Portfolio',
    description: 'Bold editorial portfolio with oversized type, a selected-projects grid, and a skills/process breakdown.',
    thumbnail_url: '/templates/portfolio-red.jpg',
    category: 'Portfolio',
  },
  {
    name: 'Mariana — Creative Portfolio',
    description: 'Moody, magazine-style UI/UX portfolio with project showcases, a tools section, and client testimonials.',
    thumbnail_url: '/templates/portfolio-editorial.jpg',
    category: 'Portfolio',
  },
  {
    name: 'Armaan Khan — Designer Portfolio',
    description: 'Warm-toned personal portfolio with stats, a 4-step design process, and a featured-work grid.',
    thumbnail_url: '/templates/portfolio-warm.jpg',
    category: 'Portfolio',
  },
  {
    name: 'AV Digital Designer Portfolio',
    description: 'Minimal dark portfolio with a strong type-led hero, capability list, and tools & certifications section.',
    thumbnail_url: '/templates/portfolio-dark.jpg',
    category: 'Portfolio',
  },

  {
    name: 'Example Electronics Store',
    description: 'Full electronics storefront with flash deals, category navigation, best-sellers strip, and an app download banner.',
    thumbnail_url: '/templates/ecommerce-electronics.jpg',
    category: 'E-commerce',
  },
  {
    name: 'ShopLuxe General Store',
    description: 'Clean multi-category storefront with trending products, member benefits, and a newsletter signup section.',
    thumbnail_url: '/templates/ecommerce-shopluxe.jpg',
    category: 'E-commerce',
  },
  {
    name: 'Viva — Live Better',
    description: 'Eco-friendly lifestyle storefront with curated top picks, category icons, and customer review highlights.',
    thumbnail_url: '/templates/ecommerce-viva.jpg',
    category: 'E-commerce',
  },

  {
    name: 'The Blog — Carrie Brad',
    description: 'Editorial blog template with a featured-post hero, topic filters, and a responsive 3-column article grid.',
    thumbnail_url: '/templates/blog-carriebrad.jpg',
    category: 'Blog',
  },

  {
    name: 'Maii & Jae Aesthetic Fanpage',
    description: 'Scrapbook-style aesthetic fan page layout with photo collage cards, stickers, and a social-post mockup grid.',
    thumbnail_url: '/templates/social-fanpage-maii.jpg',
    category: 'Social Media',
  },
  {
    name: 'Eleanor Merriweather Profile',
    description: 'Multi-platform aesthetic profile layout combining a bio card, photo gallery, and linked social accounts.',
    thumbnail_url: '/templates/social-profile-eleanor.jpg',
    category: 'Social Media',
  },

  {
    name: 'Helios Investments Dashboard',
    description: 'Dark finance dashboard with a portfolio performance chart, watchlist, and AI-driven insights panel.',
    thumbnail_url: '/templates/dashboard-investments.jpg',
    category: 'Dashboard',
  },
  {
    name: 'Aaru Daily Productivity',
    description: 'Personal productivity bento dashboard with a focus timer, task list, weekly activity chart, and system status.',
    thumbnail_url: '/templates/dashboard-productivity.jpg',
    category: 'Dashboard',
  },
  {
    name: 'Pastel Task Dashboard',
    description: 'Friendly, illustrated task dashboard with project progress rings, an activity chart, and a task list panel.',
    thumbnail_url: '/templates/dashboard-pastel-tasks.jpg',
    category: 'Dashboard',
  },
  {
    name: 'UX/UI Learner Profile',
    description: 'Online-course learner profile dashboard with a course timeline, payment details, and premium subscription panel.',
    thumbnail_url: '/templates/dashboard-elearning-profile.jpg',
    category: 'Dashboard',
  },
  {
    name: 'Student Result Management System',
    description: 'Academic self-service dashboard showing CGPA, recent results, attendance, and an academic calendar.',
    thumbnail_url: '/templates/dashboard-student-srms.jpg',
    category: 'Dashboard',
  },

  {
    name: 'E-Learning Course Admin',
    description: 'Dark admin panel for managing online courses, tracking activity reports, and scheduling upcoming lessons.',
    thumbnail_url: '/templates/admin-elearning-courses.jpg',
    category: 'Admin Panel',
  },
  {
    name: 'Dashflow Campaign Admin',
    description: 'Marketing automation admin panel with campaign performance charts, audience growth stats, and automation triggers.',
    thumbnail_url: '/templates/admin-campaign-dashflow.jpg',
    category: 'Admin Panel',
  },
  {
    name: 'Untlip Order Management',
    description: 'Admin panel for managing orders, clients, and finances with status tracking across pending, delivered, and cancelled orders.',
    thumbnail_url: '/templates/admin-orders-untlip.jpg',
    category: 'Admin Panel',
  },
  {
    name: 'Cleverwise Employee Management',
    description: 'HR admin panel for managing employee records with import/add actions, department filters, and quick edit/view controls.',
    thumbnail_url: '/templates/admin-employees-cleverwise.jpg',
    category: 'Admin Panel',
  },
];

async function seed() {
  await connectDB();

  await Template.deleteMany({});
  await Template.insertMany(templates);

  console.log(`Seeded ${templates.length} templates`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
