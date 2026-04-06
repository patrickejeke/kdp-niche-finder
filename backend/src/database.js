import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, '..', 'data', 'database.json');

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const content = readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    } catch {
      return { categories: [], niches: [], keywords: [], trends: [], competition: [] };
    }
  }

  save() {
    const dir = dirname(DB_PATH);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  exec(sql) {
    return [];
  }

  prepare(sql) {
    return {
      run: (...params) => {
        return { lastInsertRowid: Math.floor(Math.random() * 10000) };
      },
      all: (...params) => {
        return [];
      },
      get: (...params) => {
        return null;
      }
    };
  }
}

const db = new Database();
export default db;

export function initDatabase() {
  const categories = [
    { id: 1, name: 'Pets', slug: 'pets', icon: 'paw-print', niche_count: 15 },
    { id: 2, name: 'Finance', slug: 'finance', icon: 'wallet', niche_count: 14 },
    { id: 3, name: 'Health', slug: 'health', icon: 'heart-pulse', niche_count: 13 },
    { id: 4, name: 'Business', slug: 'business', icon: 'briefcase', niche_count: 12 },
    { id: 5, name: 'Self-Help', slug: 'self-help', icon: 'brain', niche_count: 11 },
    { id: 6, name: 'Cooking', slug: 'cooking', icon: 'utensils', niche_count: 10 },
    { id: 7, name: 'Education', slug: 'education', icon: 'graduation-cap', niche_count: 10 },
    { id: 8, name: 'Hobbies', slug: 'hobbies', icon: 'palette', niche_count: 8 },
    { id: 9, name: 'Parenting', slug: 'parenting', icon: 'baby', niche_count: 7 },
    { id: 10, name: 'Crafts', slug: 'crafts', icon: 'scissors', niche_count: 5 }
  ];

  const niches = [
    { id: 1, name: 'Senior Dog Care & Health', slug: 'senior-dog-care-health', category: 'Pets', subcategory: 'Dogs', description: 'Comprehensive guides for caring for aging dogs, including nutrition, exercise modifications, and common health issues.', opportunity_score: 87, competition_level: 'medium', competition_count: 234, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 2800, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 23.5, avg_reviews: 89, books_count: 234 },
    { id: 2, name: 'Pet Anxiety & Separation Solutions', slug: 'pet-anxiety-separation-solutions', category: 'Pets', subcategory: 'Dogs', description: 'Training methods and products to help anxious pets cope with separation and environmental stressors.', opportunity_score: 92, competition_level: 'low', competition_count: 156, avg_rating: 4.1, avg_price: 12.99, monthly_revenue_low: 3400, monthly_revenue_high: 7800, trend_direction: 'rising', trend_percentage: 31.2, avg_reviews: 67, books_count: 156 },
    { id: 3, name: 'Exotic Pet Ownership Guide', slug: 'exotic-pet-ownership-guide', category: 'Pets', subcategory: 'Exotic', description: 'Care manuals for reptiles, amphibians, and small exotic mammals gaining popularity among urban dwellers.', opportunity_score: 78, competition_level: 'low', competition_count: 89, avg_rating: 4.5, avg_price: 18.99, monthly_revenue_low: 1900, monthly_revenue_high: 4500, trend_direction: 'rising', trend_percentage: 18.7, avg_reviews: 45, books_count: 89 },
    { id: 4, name: 'Cat Behavior Training', slug: 'cat-behavior-training', category: 'Pets', subcategory: 'Cats', description: 'Understanding and modifying cat behavior problems through positive reinforcement techniques.', opportunity_score: 71, competition_level: 'medium', competition_count: 312, avg_rating: 4.2, avg_price: 11.99, monthly_revenue_low: 2100, monthly_revenue_high: 4800, trend_direction: 'stable', trend_percentage: 4.2, avg_reviews: 112, books_count: 312 },
    { id: 5, name: 'Puppy Training for First-Time Owners', slug: 'puppy-training-first-time-owners', category: 'Pets', subcategory: 'Dogs', description: 'Step-by-step guides for new dog owners navigating puppyhood successfully.', opportunity_score: 68, competition_level: 'high', competition_count: 567, avg_rating: 4.0, avg_price: 9.99, monthly_revenue_low: 1500, monthly_revenue_high: 3200, trend_direction: 'stable', trend_percentage: 2.1, avg_reviews: 234, books_count: 567 },
    { id: 6, name: 'Homemade Pet Food & Treats', slug: 'homemade-pet-food-treats', category: 'Pets', subcategory: 'Nutrition', description: 'Recipes and nutrition guides for preparing healthy meals at home for dogs and cats.', opportunity_score: 82, competition_level: 'medium', competition_count: 198, avg_rating: 4.4, avg_price: 13.99, monthly_revenue_low: 2400, monthly_revenue_high: 5600, trend_direction: 'rising', trend_percentage: 15.8, avg_reviews: 78, books_count: 198 },
    { id: 7, name: 'Pet Loss & Grieving Support', slug: 'pet-loss-grieving-support', category: 'Pets', subcategory: 'Emotional', description: 'Compassionate guides for coping with the loss of a beloved pet and memorializing them.', opportunity_score: 88, competition_level: 'low', competition_count: 67, avg_rating: 4.7, avg_price: 11.99, monthly_revenue_low: 1800, monthly_revenue_high: 4200, trend_direction: 'rising', trend_percentage: 12.4, avg_reviews: 34, books_count: 67 },
    { id: 8, name: 'Dog Sports & Agility Training', slug: 'dog-sports-agility-training', category: 'Pets', subcategory: 'Dogs', description: 'Competitive and recreational dog sports including agility, dock diving, and nose work.', opportunity_score: 65, competition_level: 'medium', competition_count: 145, avg_rating: 4.3, avg_price: 16.99, monthly_revenue_low: 1200, monthly_revenue_high: 2900, trend_direction: 'stable', trend_percentage: 3.8, avg_reviews: 56, books_count: 145 },
    { id: 9, name: 'Multi-Pet Household Harmony', slug: 'multi-pet-household-harmony', category: 'Pets', subcategory: 'General', description: 'Strategies for introducing and managing multiple pets living together peacefully.', opportunity_score: 74, competition_level: 'low', competition_count: 112, avg_rating: 4.2, avg_price: 10.99, monthly_revenue_low: 1600, monthly_revenue_high: 3800, trend_direction: 'rising', trend_percentage: 9.2, avg_reviews: 48, books_count: 112 },
    { id: 10, name: 'Senior Cat Care Guide', slug: 'senior-cat-care-guide', category: 'Pets', subcategory: 'Cats', description: 'Specialized care for aging cats including health monitoring and quality of life improvements.', opportunity_score: 85, competition_level: 'low', competition_count: 78, avg_rating: 4.5, avg_price: 12.99, monthly_revenue_low: 2100, monthly_revenue_high: 4900, trend_direction: 'rising', trend_percentage: 19.6, avg_reviews: 41, books_count: 78 },
    { id: 11, name: 'Pet First Aid & Emergency Care', slug: 'pet-first-aid-emergency-care', category: 'Pets', subcategory: 'Health', description: 'Essential emergency response guides for pet owners covering injuries and illnesses.', opportunity_score: 79, competition_level: 'medium', competition_count: 167, avg_rating: 4.4, avg_price: 15.99, monthly_revenue_low: 2200, monthly_revenue_high: 5100, trend_direction: 'rising', trend_percentage: 11.3, avg_reviews: 72, books_count: 167 },
    { id: 12, name: 'Service Dog Training', slug: 'service-dog-training', category: 'Pets', subcategory: 'Dogs', description: 'Training protocols for owner-trained service dogs for various disabilities.', opportunity_score: 91, competition_level: 'low', competition_count: 45, avg_rating: 4.6, avg_price: 24.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 27.8, avg_reviews: 28, books_count: 45 },
    { id: 13, name: 'Fish Tank Setup & Maintenance', slug: 'fish-tank-setup-maintenance', category: 'Pets', subcategory: 'Fish', description: 'Complete guides for freshwater and saltwater aquarium setup, cycling, and maintenance.', opportunity_score: 62, competition_level: 'medium', competition_count: 234, avg_rating: 4.1, avg_price: 14.99, monthly_revenue_low: 1100, monthly_revenue_high: 2600, trend_direction: 'stable', trend_percentage: 1.5, avg_reviews: 98, books_count: 234 },
    { id: 14, name: 'Rabbit Care & Housing', slug: 'rabbit-care-housing', category: 'Pets', subcategory: 'Small Pets', description: 'Proper care, housing, and enrichment for pet rabbits in indoor settings.', opportunity_score: 76, competition_level: 'low', competition_count: 98, avg_rating: 4.4, avg_price: 11.99, monthly_revenue_low: 1700, monthly_revenue_high: 4000, trend_direction: 'rising', trend_percentage: 8.9, avg_reviews: 52, books_count: 98 },
    { id: 15, name: 'Dog Breed Specific Nutrition', slug: 'dog-breed-specific-nutrition', category: 'Pets', subcategory: 'Nutrition', description: 'Tailored nutrition guides for specific dog breeds and their unique dietary needs.', opportunity_score: 58, competition_level: 'medium', competition_count: 189, avg_rating: 4.0, avg_price: 13.99, monthly_revenue_low: 900, monthly_revenue_high: 2100, trend_direction: 'stable', trend_percentage: 2.3, avg_reviews: 67, books_count: 189 },
    { id: 16, name: 'FIRE Movement & Early Retirement', slug: 'fire-movement-early-retirement', category: 'Finance', subcategory: 'Investing', description: 'Financial independence retire early strategies including savings rates, investments, and lifestyle design.', opportunity_score: 94, competition_level: 'low', competition_count: 178, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 4200, monthly_revenue_high: 9800, trend_direction: 'rising', trend_percentage: 34.5, avg_reviews: 145, books_count: 178 },
    { id: 17, name: 'Cryptocurrency for Beginners', slug: 'cryptocurrency-beginners', category: 'Finance', subcategory: 'Crypto', description: 'Plain-English introductions to Bitcoin, Ethereum, and blockchain technology for new investors.', opportunity_score: 72, competition_level: 'high', competition_count: 456, avg_rating: 3.9, avg_price: 12.99, monthly_revenue_low: 1800, monthly_revenue_high: 4100, trend_direction: 'declining', trend_percentage: -8.2, avg_reviews: 267, books_count: 456 },
    { id: 18, name: 'Minimalist Budgeting for Millennials', slug: 'minimalist-budgeting-millennials', category: 'Finance', subcategory: 'Budgeting', description: 'Modern budgeting approaches that align with millennial values and lifestyle goals.', opportunity_score: 89, competition_level: 'low', competition_count: 134, avg_rating: 4.3, avg_price: 11.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 28.9, avg_reviews: 89, books_count: 134 },
    { id: 19, name: 'Side Hustle Income Streams', slug: 'side-hustle-income-streams', category: 'Finance', subcategory: 'Income', description: 'Practical guides to building additional income sources outside traditional employment.', opportunity_score: 86, competition_level: 'medium', competition_count: 345, avg_rating: 4.1, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 22.1, avg_reviews: 156, books_count: 345 },
    { id: 20, name: 'Debt Free Living Strategies', slug: 'debt-free-living-strategies', category: 'Finance', subcategory: 'Debt', description: 'Debt payoff methods including snowball, avalanche, and debt consolidation approaches.', opportunity_score: 81, competition_level: 'medium', competition_count: 289, avg_rating: 4.2, avg_price: 12.99, monthly_revenue_low: 2500, monthly_revenue_high: 5800, trend_direction: 'stable', trend_percentage: 5.7, avg_reviews: 123, books_count: 289 },
    { id: 21, name: 'Passive Income Real Estate', slug: 'passive-income-real-estate', category: 'Finance', subcategory: 'Real Estate', description: 'Building wealth through rental properties, REITs, and real estate crowdfunding.', opportunity_score: 77, competition_level: 'medium', competition_count: 412, avg_rating: 4.0, avg_price: 19.99, monthly_revenue_low: 2200, monthly_revenue_high: 5100, trend_direction: 'rising', trend_percentage: 14.3, avg_reviews: 178, books_count: 412 },
    { id: 22, name: 'Stock Market Investing for Women', slug: 'stock-market-investing-women', category: 'Finance', subcategory: 'Investing', description: 'Approachable investing guides designed specifically for women investors.', opportunity_score: 83, competition_level: 'low', competition_count: 156, avg_rating: 4.5, avg_price: 14.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 19.8, avg_reviews: 98, books_count: 156 },
    { id: 23, name: 'Small Business Tax Deductions', slug: 'small-business-tax-deductions', category: 'Finance', subcategory: 'Taxes', description: 'Maximize deductions and minimize tax liability for small business owners.', opportunity_score: 84, competition_level: 'medium', competition_count: 234, avg_rating: 4.3, avg_price: 18.99, monthly_revenue_low: 2800, monthly_revenue_high: 6400, trend_direction: 'rising', trend_percentage: 16.4, avg_reviews: 112, books_count: 234 },
    { id: 24, name: 'Credit Score Repair Guide', slug: 'credit-score-repair-guide', category: 'Finance', subcategory: 'Credit', description: 'Step-by-step credit improvement strategies for rebuilding financial standing.', opportunity_score: 75, competition_level: 'medium', competition_count: 267, avg_rating: 4.1, avg_price: 11.99, monthly_revenue_low: 1900, monthly_revenue_high: 4400, trend_direction: 'stable', trend_percentage: 3.4, avg_reviews: 134, books_count: 267 },
    { id: 25, name: 'Retirement Planning at 40+', slug: 'retirement-planning-40', category: 'Finance', subcategory: 'Retirement', description: 'Catch-up retirement strategies for those who started saving later in life.', opportunity_score: 70, competition_level: 'medium', competition_count: 198, avg_rating: 4.2, avg_price: 15.99, monthly_revenue_low: 1700, monthly_revenue_high: 3900, trend_direction: 'stable', trend_percentage: 2.8, avg_reviews: 87, books_count: 198 },
    { id: 26, name: 'Frugal Living Blueprint', slug: 'frugal-living-blueprint', category: 'Finance', subcategory: 'Budgeting', description: 'Practical strategies for reducing expenses and maximizing savings without sacrificing quality of life.', opportunity_score: 67, competition_level: 'high', competition_count: 378, avg_rating: 4.0, avg_price: 9.99, monthly_revenue_low: 1400, monthly_revenue_high: 3100, trend_direction: 'stable', trend_percentage: 1.9, avg_reviews: 189, books_count: 378 },
    { id: 27, name: 'Index Fund Investment Strategy', slug: 'index-fund-investment-strategy', category: 'Finance', subcategory: 'Investing', description: 'Simple, low-cost index fund investing approaches for long-term wealth building.', opportunity_score: 80, competition_level: 'medium', competition_count: 223, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2300, monthly_revenue_high: 5400, trend_direction: 'rising', trend_percentage: 12.6, avg_reviews: 104, books_count: 223 },
    { id: 28, name: 'Emergency Fund Mastery', slug: 'emergency-fund-mastery', category: 'Finance', subcategory: 'Savings', description: 'Building and maintaining emergency savings for financial security and peace of mind.', opportunity_score: 73, competition_level: 'medium', competition_count: 145, avg_rating: 4.3, avg_price: 9.99, monthly_revenue_low: 2000, monthly_revenue_high: 4600, trend_direction: 'rising', trend_percentage: 8.7, avg_reviews: 76, books_count: 145 },
    { id: 29, name: 'Couples Financial Planning', slug: 'couples-financial-planning', category: 'Finance', subcategory: 'General', description: 'Managing money together, merging finances, and achieving shared financial goals as a couple.', opportunity_score: 78, competition_level: 'medium', competition_count: 189, avg_rating: 4.2, avg_price: 13.99, monthly_revenue_low: 2100, monthly_revenue_high: 4900, trend_direction: 'rising', trend_percentage: 10.2, avg_reviews: 92, books_count: 189 },
    { id: 30, name: 'Keto Diet for Athletes', slug: 'keto-diet-athletes', category: 'Health', subcategory: 'Diet', description: 'Optimizing athletic performance while maintaining ketosis through targeted nutrition.', opportunity_score: 88, competition_level: 'low', competition_count: 134, avg_rating: 4.3, avg_price: 16.99, monthly_revenue_low: 3200, monthly_revenue_high: 7400, trend_direction: 'rising', trend_percentage: 26.4, avg_reviews: 87, books_count: 134 },
    { id: 31, name: 'Meditation for Anxiety Relief', slug: 'meditation-anxiety-relief', category: 'Health', subcategory: 'Mental Health', description: 'Guided meditation practices and techniques specifically for managing anxiety and stress.', opportunity_score: 91, competition_level: 'medium', competition_count: 289, avg_rating: 4.4, avg_price: 12.99, monthly_revenue_low: 3600, monthly_revenue_high: 8300, trend_direction: 'rising', trend_percentage: 32.1, avg_reviews: 167, books_count: 289 },
    { id: 32, name: 'Intermittent Fasting Women', slug: 'intermittent-fasting-women', category: 'Health', subcategory: 'Diet', description: 'Time-restricted eating protocols designed for female physiology and hormones.', opportunity_score: 85, competition_level: 'medium', competition_count: 234, avg_rating: 4.2, avg_price: 14.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 18.9, avg_reviews: 123, books_count: 234 },
    { id: 33, name: 'Low Back Pain Self Treatment', slug: 'low-back-pain-self-treatment', category: 'Health', subcategory: 'Pain Management', description: 'At-home exercises and techniques for managing chronic back pain without medication.', opportunity_score: 82, competition_level: 'medium', competition_count: 312, avg_rating: 4.1, avg_price: 15.99, monthly_revenue_low: 2600, monthly_revenue_high: 6000, trend_direction: 'stable', trend_percentage: 6.4, avg_reviews: 145, books_count: 312 },
    { id: 34, name: 'Gut Health Protocol', slug: 'gut-health-protocol', category: 'Health', subcategory: 'Digestive', description: 'Improving digestive health through diet, probiotics, and lifestyle modifications.', opportunity_score: 90, competition_level: 'low', competition_count: 156, avg_rating: 4.5, avg_price: 16.99, monthly_revenue_low: 3400, monthly_revenue_high: 7800, trend_direction: 'rising', trend_percentage: 29.7, avg_reviews: 98, books_count: 156 },
    { id: 35, name: 'Sleep Quality Improvement', slug: 'sleep-quality-improvement', category: 'Health', subcategory: 'Sleep', description: 'Natural strategies for better sleep including sleep hygiene and relaxation techniques.', opportunity_score: 83, competition_level: 'medium', competition_count: 267, avg_rating: 4.3, avg_price: 13.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 17.2, avg_reviews: 134, books_count: 267 },
    { id: 36, name: 'Plant-Based Nutrition Guide', slug: 'plant-based-nutrition-guide', category: 'Health', subcategory: 'Diet', description: 'Complete plant-based eating plans for optimal health and nutrition.', opportunity_score: 74, competition_level: 'high', competition_count: 423, avg_rating: 4.1, avg_price: 14.99, monthly_revenue_low: 1900, monthly_revenue_high: 4300, trend_direction: 'stable', trend_percentage: 3.2, avg_reviews: 198, books_count: 423 },
    { id: 37, name: 'Chronic Fatigue Syndrome', slug: 'chronic-fatigue-syndrome', category: 'Health', subcategory: 'Chronic Conditions', description: 'Managing and coping with chronic fatigue through lifestyle adjustments and medical support.', opportunity_score: 87, competition_level: 'low', competition_count: 89, avg_rating: 4.6, avg_price: 18.99, monthly_revenue_low: 3000, monthly_revenue_high: 6900, trend_direction: 'rising', trend_percentage: 14.8, avg_reviews: 56, books_count: 89 },
    { id: 38, name: 'Blood Sugar Balance Naturally', slug: 'blood-sugar-balance-naturally', category: 'Health', subcategory: 'Metabolic', description: 'Managing blood sugar through diet, exercise, and natural approaches.', opportunity_score: 86, competition_level: 'medium', competition_count: 178, avg_rating: 4.4, avg_price: 15.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 21.3, avg_reviews: 112, books_count: 178 },
    { id: 39, name: 'Postpartum Recovery Guide', slug: 'postpartum-recovery-guide', category: 'Health', subcategory: "Women's Health", description: 'Physical and emotional recovery after childbirth for new mothers.', opportunity_score: 89, competition_level: 'low', competition_count: 98, avg_rating: 4.7, avg_price: 14.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 23.6, avg_reviews: 72, books_count: 98 },
    { id: 40, name: 'Thyroid Healing Diet', slug: 'thyroid-healing-diet', category: 'Health', subcategory: 'Diet', description: 'Nutrition protocols for supporting thyroid health and managing thyroid conditions.', opportunity_score: 84, competition_level: 'medium', competition_count: 156, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2700, monthly_revenue_high: 6300, trend_direction: 'rising', trend_percentage: 16.9, avg_reviews: 89, books_count: 156 },
    { id: 41, name: 'HIIT Workouts Over 50', slug: 'hiit-workouts-over-50', category: 'Health', subcategory: 'Fitness', description: 'High-intensity interval training programs designed for older adults.', opportunity_score: 79, competition_level: 'medium', competition_count: 134, avg_rating: 4.3, avg_price: 12.99, monthly_revenue_low: 2300, monthly_revenue_high: 5300, trend_direction: 'rising', trend_percentage: 13.5, avg_reviews: 78, books_count: 134 },
    { id: 42, name: 'Anti-Inflammatory Diet', slug: 'anti-inflammatory-diet', category: 'Health', subcategory: 'Diet', description: 'Reducing chronic inflammation through strategic food choices and meal planning.', opportunity_score: 76, competition_level: 'medium', competition_count: 245, avg_rating: 4.2, avg_price: 14.99, monthly_revenue_low: 2000, monthly_revenue_high: 4600, trend_direction: 'stable', trend_percentage: 4.8, avg_reviews: 123, books_count: 245 },
    { id: 43, name: 'Amazon FBA Beginners Guide', slug: 'amazon-fba-beginners-guide', category: 'Business', subcategory: 'E-commerce', description: 'Launching and scaling a successful Amazon FBA business from scratch.', opportunity_score: 69, competition_level: 'high', competition_count: 567, avg_rating: 4.0, avg_price: 19.99, monthly_revenue_low: 1600, monthly_revenue_high: 3700, trend_direction: 'declining', trend_percentage: -5.4, avg_reviews: 289, books_count: 567 },
    { id: 44, name: 'Remote Work Productivity', slug: 'remote-work-productivity', category: 'Business', subcategory: 'Work', description: 'Thriving in remote work environments with systems for focus and collaboration.', opportunity_score: 88, competition_level: 'medium', competition_count: 312, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 24.8, avg_reviews: 178, books_count: 312 },
    { id: 45, name: 'Dropshipping Business Model', slug: 'dropshipping-business-model', category: 'Business', subcategory: 'E-commerce', description: 'Building a dropshipping store with supplier relationships and marketing strategies.', opportunity_score: 64, competition_level: 'high', competition_count: 489, avg_rating: 3.8, avg_price: 16.99, monthly_revenue_low: 1200, monthly_revenue_high: 2800, trend_direction: 'stable', trend_percentage: 1.2, avg_reviews: 234, books_count: 489 },
    { id: 46, name: 'Freelance Writing Career', slug: 'freelance-writing-career', category: 'Business', subcategory: 'Freelancing', description: 'Building a sustainable freelance writing business with client acquisition strategies.', opportunity_score: 81, competition_level: 'medium', competition_count: 234, avg_rating: 4.2, avg_price: 13.99, monthly_revenue_low: 2500, monthly_revenue_high: 5800, trend_direction: 'rising', trend_percentage: 15.6, avg_reviews: 134, books_count: 234 },
    { id: 47, name: 'Print on Demand Business', slug: 'print-on-demand-business', category: 'Business', subcategory: 'E-commerce', description: 'Creating and selling print-on-demand products without inventory.', opportunity_score: 83, competition_level: 'medium', competition_count: 278, avg_rating: 4.1, avg_price: 14.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 19.2, avg_reviews: 145, books_count: 278 },
    { id: 48, name: 'Virtual Assistant Training', slug: 'virtual-assistant-training', category: 'Business', subcategory: 'Freelancing', description: 'Starting and growing a virtual assistant business serving entrepreneurs.', opportunity_score: 86, competition_level: 'low', competition_count: 167, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 22.7, avg_reviews: 98, books_count: 167 },
    { id: 49, name: 'Online Course Creation', slug: 'online-course-creation', category: 'Business', subcategory: 'Education', description: 'Designing, building, and launching profitable online courses.', opportunity_score: 84, competition_level: 'medium', competition_count: 345, avg_rating: 4.2, avg_price: 24.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 18.4, avg_reviews: 167, books_count: 345 },
    { id: 50, name: 'Small Business Marketing', slug: 'small-business-marketing', category: 'Business', subcategory: 'Marketing', description: 'Affordable marketing strategies for small businesses and local shops.', opportunity_score: 75, competition_level: 'high', competition_count: 412, avg_rating: 4.0, avg_price: 16.99, monthly_revenue_low: 2000, monthly_revenue_high: 4600, trend_direction: 'stable', trend_percentage: 3.6, avg_reviews: 198, books_count: 412 },
    { id: 51, name: 'Social Media Manager Guide', slug: 'social-media-manager-guide', category: 'Business', subcategory: 'Freelancing', description: 'Starting a social media management agency or working as a freelancer.', opportunity_score: 82, competition_level: 'medium', competition_count: 189, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 2600, monthly_revenue_high: 6000, trend_direction: 'rising', trend_percentage: 16.8, avg_reviews: 112, books_count: 189 },
    { id: 52, name: 'Pinterest Marketing Strategy', slug: 'pinterest-marketing-strategy', category: 'Business', subcategory: 'Marketing', description: 'Driving traffic and sales through Pinterest content and advertising.', opportunity_score: 87, competition_level: 'low', competition_count: 123, avg_rating: 4.5, avg_price: 14.99, monthly_revenue_low: 3000, monthly_revenue_high: 7000, trend_direction: 'rising', trend_percentage: 28.3, avg_reviews: 78, books_count: 123 },
    { id: 53, name: 'Etsy Shop Success', slug: 'etsy-shop-success', category: 'Business', subcategory: 'E-commerce', description: 'Building a thriving Etsy business with SEO, product photos, and customer service.', opportunity_score: 80, competition_level: 'medium', competition_count: 298, avg_rating: 4.2, avg_price: 13.99, monthly_revenue_low: 2400, monthly_revenue_high: 5600, trend_direction: 'rising', trend_percentage: 12.9, avg_reviews: 156, books_count: 298 },
    { id: 54, name: 'Coaching Business Blueprint', slug: 'coaching-business-blueprint', category: 'Business', subcategory: 'Coaching', description: 'Building a profitable coaching practice with niche selection and client attraction.', opportunity_score: 85, competition_level: 'medium', competition_count: 178, avg_rating: 4.4, avg_price: 24.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 17.6, avg_reviews: 103, books_count: 178 },
    { id: 55, name: 'Overcoming Imposter Syndrome', slug: 'overcoming-imposter-syndrome', category: 'Self-Help', subcategory: 'Confidence', description: 'Breaking through self-doubt and owning your accomplishments authentically.', opportunity_score: 93, competition_level: 'low', competition_count: 145, avg_rating: 4.5, avg_price: 13.99, monthly_revenue_low: 3800, monthly_revenue_high: 8800, trend_direction: 'rising', trend_percentage: 35.2, avg_reviews: 156, books_count: 145 },
    { id: 56, name: 'Habit Stacking for Success', slug: 'habit-stacking-success', category: 'Self-Help', subcategory: 'Productivity', description: 'Building powerful routines by stacking new habits onto existing ones.', opportunity_score: 89, competition_level: 'medium', competition_count: 234, avg_rating: 4.4, avg_price: 12.99, monthly_revenue_low: 3300, monthly_revenue_high: 7600, trend_direction: 'rising', trend_percentage: 26.8, avg_reviews: 145, books_count: 234 },
    { id: 57, name: 'Mindset for Entrepreneurs', slug: 'mindset-entrepreneurs', category: 'Self-Help', subcategory: 'Business Mindset', description: 'Mental frameworks and psychological strategies for business success.', opportunity_score: 85, competition_level: 'medium', competition_count: 267, avg_rating: 4.3, avg_price: 16.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 19.4, avg_reviews: 167, books_count: 267 },
    { id: 58, name: 'Decluttering Your Mind', slug: 'decluttering-your-mind', category: 'Self-Help', subcategory: 'Mental Health', description: 'Mental clarity techniques for reducing overthinking and increasing focus.', opportunity_score: 87, competition_level: 'low', competition_count: 156, avg_rating: 4.5, avg_price: 12.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 23.9, avg_reviews: 112, books_count: 156 },
    { id: 59, name: 'Building Unshakeable Confidence', slug: 'building-unshakeable-confidence', category: 'Self-Help', subcategory: 'Confidence', description: 'Developing lasting self-confidence through practical exercises and mindset shifts.', opportunity_score: 86, competition_level: 'medium', competition_count: 289, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 3000, monthly_revenue_high: 6900, trend_direction: 'rising', trend_percentage: 21.8, avg_reviews: 178, books_count: 289 },
    { id: 60, name: 'Digital Minimalism', slug: 'digital-minimalism', category: 'Self-Help', subcategory: 'Lifestyle', description: 'Reclaiming focus and time in a hyperconnected world.', opportunity_score: 84, competition_level: 'medium', competition_count: 198, avg_rating: 4.4, avg_price: 13.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 18.2, avg_reviews: 134, books_count: 198 },
    { id: 61, name: 'Stoic Philosophy Modern Life', slug: 'stoic-philosophy-modern-life', category: 'Self-Help', subcategory: 'Philosophy', description: 'Applying ancient Stoic wisdom to contemporary challenges and relationships.', opportunity_score: 81, competition_level: 'medium', competition_count: 212, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2600, monthly_revenue_high: 6000, trend_direction: 'rising', trend_percentage: 14.6, avg_reviews: 145, books_count: 212 },
    { id: 62, name: 'Morning Routine Mastery', slug: 'morning-routine-mastery', category: 'Self-Help', subcategory: 'Productivity', description: 'Designing and maintaining a powerful morning routine for peak performance.', opportunity_score: 79, competition_level: 'medium', competition_count: 245, avg_rating: 4.2, avg_price: 12.99, monthly_revenue_low: 2400, monthly_revenue_high: 5500, trend_direction: 'stable', trend_percentage: 6.8, avg_reviews: 156, books_count: 245 },
    { id: 63, name: 'Goal Setting Blueprint', slug: 'goal-setting-blueprint', category: 'Self-Help', subcategory: 'Productivity', description: 'Science-backed goal achievement frameworks for personal and professional success.', opportunity_score: 72, competition_level: 'high', competition_count: 378, avg_rating: 4.1, avg_price: 11.99, monthly_revenue_low: 1900, monthly_revenue_high: 4300, trend_direction: 'stable', trend_percentage: 2.4, avg_reviews: 189, books_count: 378 },
    { id: 64, name: 'Emotional Intelligence Guide', slug: 'emotional-intelligence-guide', category: 'Self-Help', subcategory: 'Relationships', description: 'Developing EQ skills for better relationships and leadership.', opportunity_score: 83, competition_level: 'medium', competition_count: 223, avg_rating: 4.4, avg_price: 15.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 15.3, avg_reviews: 156, books_count: 223 },
    { id: 65, name: 'Minimalism for Beginners', slug: 'minimalism-beginners', category: 'Self-Help', subcategory: 'Lifestyle', description: 'Simplifying life and possessions to find more meaning and freedom.', opportunity_score: 77, competition_level: 'medium', competition_count: 189, avg_rating: 4.3, avg_price: 12.99, monthly_revenue_low: 2200, monthly_revenue_high: 5100, trend_direction: 'stable', trend_percentage: 5.2, avg_reviews: 112, books_count: 189 },
    { id: 66, name: 'Air Fryer Cookbook Beginners', slug: 'air-fryer-cookbook-beginners', category: 'Cooking', subcategory: 'Appliances', description: 'Simple, healthy air fryer recipes for those new to the appliance.', opportunity_score: 82, competition_level: 'medium', competition_count: 267, avg_rating: 4.2, avg_price: 14.99, monthly_revenue_low: 2600, monthly_revenue_high: 6000, trend_direction: 'rising', trend_percentage: 17.8, avg_reviews: 167, books_count: 267 },
    { id: 67, name: 'Keto Meal Prep Sunday', slug: 'keto-meal-prep-sunday', category: 'Cooking', subcategory: 'Meal Prep', description: 'Weekly meal prep strategies and recipes for maintaining ketosis.', opportunity_score: 86, competition_level: 'low', competition_count: 156, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 24.1, avg_reviews: 112, books_count: 156 },
    { id: 68, name: 'Vegan Comfort Food', slug: 'vegan-comfort-food', category: 'Cooking', subcategory: 'Vegan', description: 'Plant-based versions of classic comfort foods that satisfy all appetites.', opportunity_score: 84, competition_level: 'medium', competition_count: 198, avg_rating: 4.4, avg_price: 15.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 19.6, avg_reviews: 134, books_count: 198 },
    { id: 69, name: 'Slow Cooker Freezer Meals', slug: 'slow-cooker-freezer-meals', category: 'Cooking', subcategory: 'Meal Prep', description: 'Batch cooking recipes that can be prepped ahead and cooked slowly.', opportunity_score: 79, competition_level: 'medium', competition_count: 212, avg_rating: 4.3, avg_price: 13.99, monthly_revenue_low: 2300, monthly_revenue_high: 5400, trend_direction: 'stable', trend_percentage: 4.6, avg_reviews: 145, books_count: 212 },
    { id: 70, name: 'Budget Friendly Family Meals', slug: 'budget-friendly-family-meals', category: 'Cooking', subcategory: 'Budget', description: 'Delicious, nutritious meals that feed a family without breaking the bank.', opportunity_score: 81, competition_level: 'high', competition_count: 345, avg_rating: 4.1, avg_price: 12.99, monthly_revenue_low: 2500, monthly_revenue_high: 5800, trend_direction: 'stable', trend_percentage: 3.8, avg_reviews: 198, books_count: 345 },
    { id: 71, name: 'Mediterranean Diet Cookbook', slug: 'mediterranean-diet-cookbook', category: 'Cooking', subcategory: 'Diet', description: 'Heart-healthy Mediterranean recipes for improved wellness.', opportunity_score: 76, competition_level: 'high', competition_count: 389, avg_rating: 4.2, avg_price: 14.99, monthly_revenue_low: 2000, monthly_revenue_high: 4600, trend_direction: 'stable', trend_percentage: 2.9, avg_reviews: 212, books_count: 389 },
    { id: 72, name: 'Quick 30-Minute Dinners', slug: 'quick-30-minute-dinners', category: 'Cooking', subcategory: 'Quick Meals', description: 'Fast, flavorful dinner recipes for busy weeknights.', opportunity_score: 74, competition_level: 'high', competition_count: 412, avg_rating: 4.0, avg_price: 12.99, monthly_revenue_low: 1800, monthly_revenue_high: 4100, trend_direction: 'stable', trend_percentage: 1.8, avg_reviews: 234, books_count: 412 },
    { id: 73, name: 'Instant Pot Pressure Cooking', slug: 'instant-pot-pressure-cooking', category: 'Cooking', subcategory: 'Appliances', description: 'Modern pressure cooker recipes that cut cooking time dramatically.', opportunity_score: 78, competition_level: 'medium', competition_count: 278, avg_rating: 4.2, avg_price: 14.99, monthly_revenue_low: 2200, monthly_revenue_high: 5100, trend_direction: 'stable', trend_percentage: 3.2, avg_reviews: 167, books_count: 278 },
    { id: 74, name: 'Gluten Free Baking', slug: 'gluten-free-baking', category: 'Cooking', subcategory: 'Baking', description: 'Mastering gluten-free flours and techniques for perfect baked goods.', opportunity_score: 83, competition_level: 'medium', competition_count: 189, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 14.8, avg_reviews: 123, books_count: 189 },
    { id: 75, name: 'Fermented Foods at Home', slug: 'fermented-foods-at-home', category: 'Cooking', subcategory: 'Preservation', description: 'Traditional fermentation techniques for sauerkraut, kimchi, kombucha, and more.', opportunity_score: 87, competition_level: 'low', competition_count: 123, avg_rating: 4.5, avg_price: 15.99, monthly_revenue_low: 3000, monthly_revenue_high: 7000, trend_direction: 'rising', trend_percentage: 22.4, avg_reviews: 89, books_count: 123 },
    { id: 76, name: 'Homeschool Curriculum Guide', slug: 'homeschool-curriculum-guide', category: 'Education', subcategory: 'Homeschool', description: 'Planning and selecting curriculum for home education across all grade levels.', opportunity_score: 85, competition_level: 'medium', competition_count: 234, avg_rating: 4.3, avg_price: 18.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 18.9, avg_reviews: 156, books_count: 234 },
    { id: 77, name: 'SAT Math Preparation', slug: 'sat-math-preparation', category: 'Education', subcategory: 'Test Prep', description: 'Targeted strategies and practice for excelling on SAT mathematics.', opportunity_score: 73, competition_level: 'high', competition_count: 367, avg_rating: 4.1, avg_price: 19.99, monthly_revenue_low: 1900, monthly_revenue_high: 4400, trend_direction: 'stable', trend_percentage: 2.1, avg_reviews: 198, books_count: 367 },
    { id: 78, name: 'Learning a New Language Fast', slug: 'learning-new-language-fast', category: 'Education', subcategory: 'Languages', description: 'Accelerated language learning methods and immersion techniques.', opportunity_score: 80, competition_level: 'medium', competition_count: 289, avg_rating: 4.2, avg_price: 14.99, monthly_revenue_low: 2400, monthly_revenue_high: 5600, trend_direction: 'rising', trend_percentage: 12.4, avg_reviews: 167, books_count: 289 },
    { id: 79, name: 'Online Tutoring Business', slug: 'online-tutoring-business', category: 'Education', subcategory: 'Business', description: 'Starting and growing a profitable online tutoring practice.', opportunity_score: 88, competition_level: 'low', competition_count: 134, avg_rating: 4.5, avg_price: 16.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 26.2, avg_reviews: 98, books_count: 134 },
    { id: 80, name: 'College Admission Essays', slug: 'college-admission-essays', category: 'Education', subcategory: 'College', description: 'Writing compelling college essays that stand out from the competition.', opportunity_score: 82, competition_level: 'medium', competition_count: 178, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 2600, monthly_revenue_high: 6000, trend_direction: 'rising', trend_percentage: 15.7, avg_reviews: 112, books_count: 178 },
    { id: 81, name: 'ADHD Study Strategies', slug: 'adhd-study-strategies', category: 'Education', subcategory: 'Learning', description: 'Study techniques and tools specifically designed for students with ADHD.', opportunity_score: 90, competition_level: 'low', competition_count: 98, avg_rating: 4.6, avg_price: 14.99, monthly_revenue_low: 3300, monthly_revenue_high: 7600, trend_direction: 'rising', trend_percentage: 28.4, avg_reviews: 78, books_count: 98 },
    { id: 82, name: 'Phonics Reading Instruction', slug: 'phonics-reading-instruction', category: 'Education', subcategory: 'Literacy', description: 'Teaching children to read through systematic phonics instruction.', opportunity_score: 84, competition_level: 'medium', competition_count: 198, avg_rating: 4.4, avg_price: 15.99, monthly_revenue_low: 2700, monthly_revenue_high: 6300, trend_direction: 'rising', trend_percentage: 16.2, avg_reviews: 134, books_count: 198 },
    { id: 83, name: 'CPA Exam Study Guide', slug: 'cpa-exam-study-guide', category: 'Education', subcategory: 'Professional', description: 'Comprehensive preparation for passing the Certified Public Accountant exam.', opportunity_score: 79, competition_level: 'medium', competition_count: 156, avg_rating: 4.3, avg_price: 29.99, monthly_revenue_low: 2300, monthly_revenue_high: 5300, trend_direction: 'stable', trend_percentage: 4.1, avg_reviews: 112, books_count: 156 },
    { id: 84, name: 'Montessori at Home', slug: 'montessori-at-home', category: 'Education', subcategory: 'Early Childhood', description: 'Implementing Montessori principles and activities in the home environment.', opportunity_score: 86, competition_level: 'low', competition_count: 145, avg_rating: 4.5, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 21.6, avg_reviews: 103, books_count: 145 },
    { id: 85, name: 'GMAT Critical Reasoning', slug: 'gmat-critical-reasoning', category: 'Education', subcategory: 'Test Prep', description: 'Mastering GMAT critical reasoning questions for business school admission.', opportunity_score: 75, competition_level: 'medium', competition_count: 167, avg_rating: 4.3, avg_price: 24.99, monthly_revenue_low: 2000, monthly_revenue_high: 4600, trend_direction: 'stable', trend_percentage: 3.5, avg_reviews: 98, books_count: 167 },
    { id: 86, name: 'Beginner Watercolor Painting', slug: 'beginner-watercolor-painting', category: 'Hobbies', subcategory: 'Art', description: 'Learning watercolor techniques from scratch with guided projects.', opportunity_score: 83, competition_level: 'medium', competition_count: 212, avg_rating: 4.4, avg_price: 16.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 17.4, avg_reviews: 145, books_count: 212 },
    { id: 87, name: 'Candle Making Business', slug: 'candle-making-business', category: 'Hobbies', subcategory: 'Craft Business', description: 'Starting a handcrafted candle business from home with proper techniques.', opportunity_score: 89, competition_level: 'low', competition_count: 134, avg_rating: 4.5, avg_price: 16.99, monthly_revenue_low: 3200, monthly_revenue_high: 7400, trend_direction: 'rising', trend_percentage: 27.8, avg_reviews: 98, books_count: 134 },
    { id: 88, name: 'Resin Art & Crafts', slug: 'resin-art-crafts', category: 'Hobbies', subcategory: 'Art', description: 'Creating stunning resin art pieces including geode art and jewelry.', opportunity_score: 88, competition_level: 'low', competition_count: 123, avg_rating: 4.5, avg_price: 15.99, monthly_revenue_low: 3100, monthly_revenue_high: 7200, trend_direction: 'rising', trend_percentage: 25.3, avg_reviews: 87, books_count: 123 },
    { id: 89, name: 'Urban Sketching Guide', slug: 'urban-sketching-guide', category: 'Hobbies', subcategory: 'Art', description: 'Drawing and documenting city scenes and travel experiences on location.', opportunity_score: 76, competition_level: 'medium', competition_count: 145, avg_rating: 4.4, avg_price: 17.99, monthly_revenue_low: 2100, monthly_revenue_high: 4900, trend_direction: 'stable', trend_percentage: 5.8, avg_reviews: 89, books_count: 145 },
    { id: 90, name: 'Knitting for Beginners', slug: 'knitting-beginners', category: 'Hobbies', subcategory: 'Fiber Arts', description: 'Learning to knit with basic patterns and techniques for newcomers.', opportunity_score: 70, competition_level: 'high', competition_count: 312, avg_rating: 4.2, avg_price: 12.99, monthly_revenue_low: 1700, monthly_revenue_high: 3900, trend_direction: 'stable', trend_percentage: 2.3, avg_reviews: 167, books_count: 312 },
    { id: 91, name: 'Drone Photography', slug: 'drone-photography', category: 'Hobbies', subcategory: 'Photography', description: 'Aerial photography techniques and editing for drone enthusiasts.', opportunity_score: 84, competition_level: 'medium', competition_count: 167, avg_rating: 4.4, avg_price: 18.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 18.7, avg_reviews: 112, books_count: 167 },
    { id: 92, name: 'Chess Strategy Beginners', slug: 'chess-strategy-beginners', category: 'Hobbies', subcategory: 'Games', description: 'Chess fundamentals and strategic thinking for new players.', opportunity_score: 78, competition_level: 'medium', competition_count: 234, avg_rating: 4.3, avg_price: 13.99, monthly_revenue_low: 2200, monthly_revenue_high: 5100, trend_direction: 'rising', trend_percentage: 11.2, avg_reviews: 145, books_count: 234 },
    { id: 93, name: 'Sourdough Bread Baking', slug: 'sourdough-bread-baking', category: 'Hobbies', subcategory: 'Baking', description: 'Mastering sourdough bread with starters, fermentation, and shaping.', opportunity_score: 74, competition_level: 'high', competition_count: 289, avg_rating: 4.3, avg_price: 14.99, monthly_revenue_low: 1900, monthly_revenue_high: 4400, trend_direction: 'declining', trend_percentage: -4.2, avg_reviews: 178, books_count: 289 },
    { id: 94, name: 'Tantrum Management Toddlers', slug: 'tantrum-management-toddlers', category: 'Parenting', subcategory: 'Toddlers', description: 'Understanding and responding to toddler tantrums with compassion and strategy.', opportunity_score: 90, competition_level: 'medium', competition_count: 189, avg_rating: 4.5, avg_price: 13.99, monthly_revenue_low: 3400, monthly_revenue_high: 7800, trend_direction: 'rising', trend_percentage: 30.2, avg_reviews: 145, books_count: 189 },
    { id: 95, name: 'Positive Discipline Techniques', slug: 'positive-discipline-techniques', category: 'Parenting', subcategory: 'General', description: 'Non-punitive parenting approaches that build cooperation and respect.', opportunity_score: 86, competition_level: 'medium', competition_count: 234, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 19.8, avg_reviews: 167, books_count: 234 },
    { id: 96, name: 'Teenage Mental Health Support', slug: 'teenage-mental-health-support', category: 'Parenting', subcategory: 'Teenagers', description: 'Helping teenagers navigate mental health challenges with appropriate support.', opportunity_score: 92, competition_level: 'low', competition_count: 112, avg_rating: 4.6, avg_price: 16.99, monthly_revenue_low: 3500, monthly_revenue_high: 8100, trend_direction: 'rising', trend_percentage: 33.6, avg_reviews: 89, books_count: 112 },
    { id: 97, name: 'Sleep Training Infants', slug: 'sleep-training-infants', category: 'Parenting', subcategory: 'Babies', description: 'Gentle and effective methods for helping babies develop healthy sleep patterns.', opportunity_score: 82, competition_level: 'medium', competition_count: 267, avg_rating: 4.3, avg_price: 13.99, monthly_revenue_low: 2600, monthly_revenue_high: 6000, trend_direction: 'stable', trend_percentage: 5.4, avg_reviews: 178, books_count: 267 },
    { id: 98, name: 'Single Parent Guide', slug: 'single-parent-guide', category: 'Parenting', subcategory: 'General', description: 'Navigating the unique challenges and rewards of single parenting.', opportunity_score: 87, competition_level: 'low', competition_count: 134, avg_rating: 4.5, avg_price: 14.99, monthly_revenue_low: 3000, monthly_revenue_high: 7000, trend_direction: 'rising', trend_percentage: 24.2, avg_reviews: 103, books_count: 134 },
    { id: 99, name: 'Baby-Led Weaning Recipes', slug: 'baby-led-weaning-recipes', category: 'Parenting', subcategory: 'Feeding', description: 'Safe, nutritious foods for babies learning to self-feed.', opportunity_score: 85, competition_level: 'medium', competition_count: 178, avg_rating: 4.4, avg_price: 14.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 20.4, avg_reviews: 123, books_count: 178 },
    { id: 100, name: 'Screen Time Balance Kids', slug: 'screen-time-balance-kids', category: 'Parenting', subcategory: 'General', description: 'Managing children technology use while maintaining family connection.', opportunity_score: 83, competition_level: 'medium', competition_count: 156, avg_rating: 4.4, avg_price: 13.99, monthly_revenue_low: 2700, monthly_revenue_high: 6200, trend_direction: 'rising', trend_percentage: 16.8, avg_reviews: 112, books_count: 156 },
    { id: 101, name: 'Hand Lettering Practice', slug: 'hand-lettering-practice', category: 'Crafts', subcategory: 'Calligraphy', description: 'Modern calligraphy and hand lettering techniques for beginners.', opportunity_score: 81, competition_level: 'medium', competition_count: 198, avg_rating: 4.4, avg_price: 15.99, monthly_revenue_low: 2500, monthly_revenue_high: 5800, trend_direction: 'rising', trend_percentage: 14.2, avg_reviews: 134, books_count: 198 },
    { id: 102, name: 'Quilting for Beginners', slug: 'quilting-beginners', category: 'Crafts', subcategory: 'Fiber Arts', description: 'Learning quilt making from fabric selection to finishing techniques.', opportunity_score: 73, competition_level: 'medium', competition_count: 223, avg_rating: 4.3, avg_price: 16.99, monthly_revenue_low: 1900, monthly_revenue_high: 4400, trend_direction: 'stable', trend_percentage: 3.1, avg_reviews: 145, books_count: 223 },
    { id: 103, name: 'Soap Making Recipes', slug: 'soap-making-recipes', category: 'Crafts', subcategory: 'Bath & Body', description: 'Crafting handmade soap with natural ingredients and creative designs.', opportunity_score: 84, competition_level: 'low', competition_count: 145, avg_rating: 4.5, avg_price: 15.99, monthly_revenue_low: 2800, monthly_revenue_high: 6500, trend_direction: 'rising', trend_percentage: 19.4, avg_reviews: 98, books_count: 145 },
    { id: 104, name: 'Crochet Patterns Amigurumi', slug: 'crochet-patterns-amigurumi', category: 'Crafts', subcategory: 'Fiber Arts', description: 'Crocheting adorable stuffed animals and character toys.', opportunity_score: 79, competition_level: 'medium', competition_count: 189, avg_rating: 4.4, avg_price: 13.99, monthly_revenue_low: 2300, monthly_revenue_high: 5300, trend_direction: 'stable', trend_percentage: 4.8, avg_reviews: 123, books_count: 189 },
    { id: 105, name: 'Embroidery Modern Designs', slug: 'embroidery-modern-designs', category: 'Crafts', subcategory: 'Fiber Arts', description: 'Contemporary embroidery patterns and techniques for the modern maker.', opportunity_score: 86, competition_level: 'low', competition_count: 123, avg_rating: 4.5, avg_price: 14.99, monthly_revenue_low: 2900, monthly_revenue_high: 6700, trend_direction: 'rising', trend_percentage: 22.8, avg_reviews: 89, books_count: 123 }
  ];

  const keywordsData = {
    1: [
      { id: 1, niche_id: 1, keyword: 'senior dog care', search_volume: 18200, competition: 'medium', category: 'primary' },
      { id: 2, niche_id: 1, keyword: 'old dog health problems', search_volume: 12100, competition: 'low', category: 'primary' },
      { id: 3, niche_id: 1, keyword: 'best dog food for seniors', search_volume: 24600, competition: 'high', category: 'primary' },
      { id: 4, niche_id: 1, keyword: 'senior dog supplements', search_volume: 8900, competition: 'low', category: 'primary' },
      { id: 5, niche_id: 1, keyword: 'caring for aging dog', search_volume: 6700, competition: 'low', category: 'primary' },
      { id: 6, niche_id: 1, keyword: 'dog arthritis natural treatment', search_volume: 5400, competition: 'low', category: 'longtail' },
      { id: 7, niche_id: 1, keyword: 'senior dog exercises', search_volume: 3200, competition: 'low', category: 'longtail' },
      { id: 8, niche_id: 1, keyword: 'when to put dog down checklist', search_volume: 8900, competition: 'medium', category: 'longtail' },
      { id: 9, niche_id: 1, keyword: 'elderly dog incontinence', search_volume: 4100, competition: 'low', category: 'longtail' },
      { id: 10, niche_id: 1, keyword: 'home cooked meals for senior dogs', search_volume: 2800, competition: 'low', category: 'longtail' },
      { id: 11, niche_id: 1, keyword: 'cognitive decline in dogs', search_volume: 2300, competition: 'low', category: 'related' },
      { id: 12, niche_id: 1, keyword: 'dog mobility issues', search_volume: 4500, competition: 'medium', category: 'related' }
    ],
    2: [
      { id: 13, niche_id: 2, keyword: 'dog separation anxiety', search_volume: 33500, competition: 'high', category: 'primary' },
      { id: 14, niche_id: 2, keyword: 'pet anxiety treatment', search_volume: 22100, competition: 'medium', category: 'primary' },
      { id: 15, niche_id: 2, keyword: 'calming treats for dogs', search_volume: 19800, competition: 'high', category: 'primary' },
      { id: 16, niche_id: 2, keyword: 'dog anxiety medication alternatives', search_volume: 12400, competition: 'low', category: 'primary' },
      { id: 17, niche_id: 2, keyword: 'separation anxiety in cats', search_volume: 11200, competition: 'medium', category: 'primary' },
      { id: 18, niche_id: 2, keyword: 'thunder shirt for dogs', search_volume: 8700, competition: 'medium', category: 'longtail' },
      { id: 19, niche_id: 2, keyword: 'dog crate training anxiety', search_volume: 5600, competition: 'low', category: 'longtail' },
      { id: 20, niche_id: 2, keyword: 'natural anxiety relief for pets', search_volume: 7800, competition: 'low', category: 'longtail' },
      { id: 21, niche_id: 2, keyword: 'pheromone diffuser dogs', search_volume: 4200, competition: 'low', category: 'longtail' },
      { id: 22, niche_id: 2, keyword: 'work from home with anxious pet', search_volume: 3100, competition: 'low', category: 'longtail' },
      { id: 23, niche_id: 2, keyword: 'separation anxiety training schedule', search_volume: 2900, competition: 'low', category: 'related' },
      { id: 24, niche_id: 2, keyword: 'noise aversion in pets', search_volume: 3800, competition: 'low', category: 'related' }
    ],
    16: [
      { id: 25, niche_id: 16, keyword: 'fire movement', search_volume: 45000, competition: 'medium', category: 'primary' },
      { id: 26, niche_id: 16, keyword: 'financial independence retire early', search_volume: 38200, competition: 'medium', category: 'primary' },
      { id: 27, niche_id: 16, keyword: 'how to retire early', search_volume: 67800, competition: 'high', category: 'primary' },
      { id: 28, niche_id: 16, keyword: 'extreme savings challenge', search_volume: 12400, competition: 'low', category: 'primary' },
      { id: 29, niche_id: 16, keyword: 'coast fire calculator', search_volume: 8900, competition: 'low', category: 'primary' },
      { id: 30, niche_id: 16, keyword: 'lean fire meaning', search_volume: 6700, competition: 'low', category: 'longtail' },
      { id: 31, niche_id: 16, keyword: 'barista fire lifestyle', search_volume: 5400, competition: 'low', category: 'longtail' },
      { id: 32, niche_id: 16, keyword: 'fire community stories', search_volume: 3200, competition: 'low', category: 'longtail' },
      { id: 33, niche_id: 16, keyword: 'savings rate optimization', search_volume: 2800, competition: 'low', category: 'longtail' },
      { id: 34, niche_id: 16, keyword: 'passive income fire strategy', search_volume: 4100, competition: 'low', category: 'longtail' },
      { id: 35, niche_id: 16, keyword: 'debt free fire journey', search_volume: 3600, competition: 'low', category: 'related' },
      { id: 36, niche_id: 16, keyword: 'mini fire movement', search_volume: 2100, competition: 'low', category: 'related' }
    ],
    31: [
      { id: 37, niche_id: 31, keyword: 'meditation for anxiety', search_volume: 89000, competition: 'high', category: 'primary' },
      { id: 38, niche_id: 31, keyword: 'guided meditation anxiety', search_volume: 45600, competition: 'medium', category: 'primary' },
      { id: 39, niche_id: 31, keyword: 'breathing exercises anxiety', search_volume: 34200, competition: 'medium', category: 'primary' },
      { id: 40, niche_id: 31, keyword: 'mindfulness meditation stress', search_volume: 67800, competition: 'high', category: 'primary' },
      { id: 41, niche_id: 31, keyword: 'anxiety relief techniques', search_volume: 28900, competition: 'medium', category: 'primary' },
      { id: 42, niche_id: 31, keyword: '5 minute meditation for anxiety', search_volume: 12400, competition: 'low', category: 'longtail' },
      { id: 43, niche_id: 31, keyword: 'sleep meditation anxiety', search_volume: 9800, competition: 'low', category: 'longtail' },
      { id: 44, niche_id: 31, keyword: 'work meditation stress', search_volume: 6700, competition: 'low', category: 'longtail' },
      { id: 45, niche_id: 31, keyword: 'body scan meditation anxiety', search_volume: 7800, competition: 'low', category: 'longtail' },
      { id: 46, niche_id: 31, keyword: 'morning meditation routine', search_volume: 11200, competition: 'medium', category: 'longtail' },
      { id: 47, niche_id: 31, keyword: 'progressive relaxation anxiety', search_volume: 5400, competition: 'low', category: 'related' },
      { id: 48, niche_id: 31, keyword: 'calm app meditation', search_volume: 8900, competition: 'medium', category: 'related' }
    ],
    55: [
      { id: 49, niche_id: 55, keyword: 'imposter syndrome', search_volume: 56200, competition: 'medium', category: 'primary' },
      { id: 50, niche_id: 55, keyword: 'overcoming imposter syndrome', search_volume: 38400, competition: 'medium', category: 'primary' },
      { id: 51, niche_id: 55, keyword: 'feeling like a fraud at work', search_volume: 14500, competition: 'low', category: 'primary' },
      { id: 52, niche_id: 55, keyword: 'self doubt in career', search_volume: 18200, competition: 'low', category: 'primary' },
      { id: 53, niche_id: 55, keyword: 'high achiever anxiety', search_volume: 11200, competition: 'low', category: 'primary' },
      { id: 54, niche_id: 55, keyword: 'imposter syndrome women work', search_volume: 8900, competition: 'low', category: 'longtail' },
      { id: 55, niche_id: 55, keyword: 'stop comparing yourself', search_volume: 15600, competition: 'medium', category: 'longtail' },
      { id: 56, niche_id: 55, keyword: 'own your accomplishments', search_volume: 4200, competition: 'low', category: 'longtail' },
      { id: 57, niche_id: 55, keyword: 'confidence at work tips', search_volume: 7800, competition: 'low', category: 'longtail' },
      { id: 58, niche_id: 55, keyword: 'success guilt feelings', search_volume: 3400, competition: 'low', category: 'longtail' },
      { id: 59, niche_id: 55, keyword: 'intellectual humility', search_volume: 2800, competition: 'low', category: 'related' },
      { id: 60, niche_id: 55, keyword: 'imposter syndrome therapy', search_volume: 5100, competition: 'low', category: 'related' }
    ],
    81: [
      { id: 61, niche_id: 81, keyword: 'ADHD study strategies', search_volume: 18200, competition: 'low', category: 'primary' },
      { id: 62, niche_id: 81, keyword: 'studying with ADHD', search_volume: 22400, competition: 'low', category: 'primary' },
      { id: 63, niche_id: 81, keyword: 'ADHD focus techniques', search_volume: 15600, competition: 'low', category: 'primary' },
      { id: 64, niche_id: 81, keyword: 'homework tips for ADHD kids', search_volume: 11200, competition: 'low', category: 'primary' },
      { id: 65, niche_id: 81, keyword: 'ADHD time management', search_volume: 9800, competition: 'low', category: 'primary' },
      { id: 66, niche_id: 81, keyword: 'focus music for ADHD', search_volume: 5400, competition: 'low', category: 'longtail' },
      { id: 67, niche_id: 81, keyword: 'body doubling technique', search_volume: 7800, competition: 'low', category: 'longtail' },
      { id: 68, niche_id: 81, keyword: 'ADHD fidget tools', search_volume: 4200, competition: 'low', category: 'longtail' },
      { id: 69, niche_id: 81, keyword: 'reward system for ADHD', search_volume: 3400, competition: 'low', category: 'longtail' },
      { id: 70, niche_id: 81, keyword: 'ADHD study environment', search_volume: 2800, competition: 'low', category: 'longtail' },
      { id: 71, niche_id: 81, keyword: 'chunking assignments ADHD', search_volume: 2300, competition: 'low', category: 'related' },
      { id: 72, niche_id: 81, keyword: 'executive function supports', search_volume: 3100, competition: 'low', category: 'related' }
    ],
    87: [
      { id: 73, niche_id: 87, keyword: 'candle making business', search_volume: 19800, competition: 'low', category: 'primary' },
      { id: 74, niche_id: 87, keyword: 'how to make candles sell', search_volume: 12400, competition: 'low', category: 'primary' },
      { id: 75, niche_id: 87, keyword: 'soy candle business', search_volume: 8900, competition: 'low', category: 'primary' },
      { id: 76, niche_id: 87, keyword: 'handmade candle packaging', search_volume: 5600, competition: 'low', category: 'primary' },
      { id: 77, niche_id: 87, keyword: 'candle making supplies wholesale', search_volume: 7800, competition: 'low', category: 'primary' },
      { id: 78, niche_id: 87, keyword: 'start candle business from home', search_volume: 6700, competition: 'low', category: 'longtail' },
      { id: 79, niche_id: 87, keyword: 'candle fragrance trends', search_volume: 4200, competition: 'low', category: 'longtail' },
      { id: 80, niche_id: 87, keyword: 'custom candle labels', search_volume: 3400, competition: 'low', category: 'longtail' },
      { id: 81, niche_id: 87, keyword: 'Etsy candle shop tips', search_volume: 5400, competition: 'low', category: 'longtail' },
      { id: 82, niche_id: 87, keyword: 'candle safety regulations', search_volume: 3100, competition: 'low', category: 'longtail' },
      { id: 83, niche_id: 87, keyword: 'luxury candle branding', search_volume: 2800, competition: 'low', category: 'related' },
      { id: 84, niche_id: 87, keyword: 'seasonal candle flavors', search_volume: 2300, competition: 'low', category: 'related' }
    ]
  };

  const trends = [];
  const competition = [];
  
  niches.forEach((niche) => {
    const months = ['2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];
    let booksPublished = Math.round(niche.books_count / 24);
    let interest = niche.opportunity_score;
    
    months.forEach((month, i) => {
      const seasonal = Math.sin((i / 12) * Math.PI * 2) * 0.15;
      const growth = 0.02 * i;
      const noise = (Math.random() - 0.5) * 0.1;
      
      booksPublished = Math.round(niche.books_count / 24 * (1 + growth + noise + (seasonal * 0.3)));
      interest = Math.round(niche.opportunity_score * (1 + (growth * 1.5) + noise + seasonal));
      
      trends.push({
        id: trends.length + 1,
        niche_id: niche.id,
        month,
        books_published: Math.max(1, booksPublished),
        avg_price: 12.99 + (Math.random() * 5),
        avg_rating: 4.0 + (Math.random() * 0.6),
        search_interest: Math.max(10, Math.min(100, interest))
      });
    });

    const numCompetitors = Math.min(10, Math.round(niche.competition_count / 25));
    const authorNames = ['Sarah Mitchell', 'James Anderson', 'Emily Chen', 'Michael Roberts', 'Jennifer Lee', 'David Thompson'];
    
    for (let i = 0; i < numCompetitors; i++) {
      const author = authorNames[Math.floor(Math.random() * authorNames.length)];
      const year = 2020 + Math.floor(Math.random() * 6);
      const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
      
      competition.push({
        id: competition.length + 1,
        niche_id: niche.id,
        title: `The ${niche.subcategory || niche.category} Guide ${String.fromCharCode(65 + i)}`,
        author,
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        reviews: Math.round(20 + Math.random() * 300),
        price: (7.99 + Math.random() * 15).toFixed(2),
        categories: `${niche.category} > ${niche.subcategory || niche.category}`,
        published_date: `${year}-${month}-01`
      });
    }
  });

  const allKeywords = [];
  Object.values(keywordsData).forEach(kws => {
    kws.forEach(kw => allKeywords.push(kw));
  });

  db.data = { categories, niches, keywords: allKeywords, trends, competition };
  db.save();
  
  console.log(`Seeded: ${categories.length} categories, ${niches.length} niches, ${allKeywords.length} keywords, ${trends.length} trends, ${competition.length} competition entries`);
}

export { db };
initDatabase();
