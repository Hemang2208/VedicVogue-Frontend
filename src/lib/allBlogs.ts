export interface BlogPostClientProps {
  blog: BlogPost;
  initialLikes: number;
  initialViews: number;
  initialComments: {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    likes: number;
    isLiked: boolean;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
  featured: boolean;
}

export const mockBlogs: BlogPost[] = [
  {
    id: "health-benefits-vegetarian-diet",
    title: "10 Amazing Health Benefits of a Pure Vegetarian Diet",
    excerpt:
      "Discover how embracing a pure vegetarian lifestyle can transform your health, boost energy levels, and contribute to overall well-being.",
    content: `
# 10 Amazing Health Benefits of a Pure Vegetarian Diet

A pure vegetarian diet has been gaining popularity worldwide, and for good reason. Beyond the ethical and environmental considerations, adopting a plant-based lifestyle offers numerous health benefits that can significantly improve your quality of life.

## 1. Improved Heart Health

Studies consistently show that vegetarians have a lower risk of heart disease. Plant-based diets are naturally lower in saturated fat and cholesterol, while being rich in fiber, antioxidants, and heart-healthy nutrients.

## 2. Better Weight Management

Vegetarian diets tend to be lower in calories and higher in fiber, making it easier to maintain a healthy weight. The high fiber content helps you feel full longer, reducing the likelihood of overeating.

## 3. Enhanced Digestive Health

The abundance of fiber in vegetarian foods promotes healthy digestion and regular bowel movements. This can help prevent constipation and reduce the risk of digestive disorders.

## 4. Reduced Risk of Type 2 Diabetes

Research indicates that vegetarians have a significantly lower risk of developing type 2 diabetes. Plant-based diets help improve insulin sensitivity and glucose metabolism.

## 5. Lower Blood Pressure

The potassium-rich foods commonly found in vegetarian diets help regulate blood pressure. Many studies show that vegetarians typically have lower blood pressure than non-vegetarians.

## 6. Increased Energy Levels

Many people report feeling more energetic after switching to a vegetarian diet. The clean, nutrient-dense foods provide sustained energy without the heavy feeling often associated with meat-heavy meals.

## 7. Better Skin Health

The antioxidants and vitamins abundant in fruits and vegetables can contribute to healthier, more radiant skin. Many vegetarians notice improvements in their complexion.

## 8. Reduced Inflammation

Plant-based diets are naturally anti-inflammatory, thanks to the abundance of antioxidants and phytochemicals. This can help reduce the risk of chronic inflammatory conditions.

## 9. Improved Mental Clarity

Some studies suggest that vegetarian diets may support better cognitive function and mental clarity. The nutrients in plant foods support brain health and may improve focus.

## 10. Longevity Benefits

Research indicates that vegetarians tend to live longer than non-vegetarians. The combination of all these health benefits contributes to increased longevity and better quality of life in later years.

## Getting Started

Transitioning to a vegetarian diet doesn't have to be overwhelming. Start by incorporating more plant-based meals into your routine and gradually reducing meat consumption. Focus on whole foods, plenty of vegetables, legumes, nuts, and seeds.

Remember to ensure you're getting all essential nutrients, particularly vitamin B12, iron, and omega-3 fatty acids. Consider consulting with a nutritionist to create a well-balanced vegetarian meal plan that meets your specific needs.

*Ready to start your vegetarian journey? Our meal plans are designed to make the transition smooth and delicious!*
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    category: "Health & Nutrition",
    tags: ["Vegetarian", "Health", "Nutrition", "Lifestyle"],
    publishedAt: "2024-01-15",
    author: {
      name: "Dr. Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    },
    readTime: 8,
    featured: true,
  },
  {
    id: "traditional-indian-vegetarian-recipes",
    title: "5 Traditional Indian Vegetarian Recipes for Modern Kitchens",
    excerpt:
      "Explore time-tested Indian vegetarian recipes that are perfect for today's health-conscious lifestyle, featuring authentic flavors and nutritious ingredients.",
    content: `
# 5 Traditional Indian Vegetarian Recipes for Modern Kitchens

Indian cuisine offers a treasure trove of vegetarian dishes that have been perfected over centuries. These recipes combine incredible flavors with nutritional benefits, making them perfect for modern health-conscious lifestyles.

## 1. Dal Tadka (Tempered Lentils)

This protein-rich dish is a staple in Indian households and provides essential amino acids.

**Ingredients:**
- 1 cup yellow dal (moong or toor)
- 2 tomatoes, chopped
- 1 onion, finely chopped
- 2 cloves garlic, minced
- 1 tsp cumin seeds
- 1 tsp turmeric powder
- Salt to taste
- Fresh coriander for garnish

**Instructions:**
1. Cook dal with turmeric until soft
2. Heat oil, add cumin seeds
3. Add onions, garlic, and tomatoes
4. Mix with cooked dal and simmer
5. Garnish with coriander

## 2. Palak Paneer (Spinach with Cottage Cheese)

Rich in iron and calcium, this dish is both nutritious and delicious.

## 3. Rajma (Kidney Bean Curry)

A protein powerhouse that's perfect for building muscle and providing sustained energy.

## 4. Vegetable Biryani

A complete meal that combines rice, vegetables, and aromatic spices in perfect harmony.

## 5. Sambar (South Indian Lentil Curry)

A tangy and nutritious curry that's packed with vegetables and lentils.

These recipes not only taste amazing but also provide complete nutrition for your body. They're perfect for meal prep and can be easily customized to your taste preferences.

*Want to try these recipes? Check out our meal plans that feature authentic Indian vegetarian cuisine!*
    `,
    featuredImage:
      "https://plus.unsplash.com/premium_photo-1669150851976-997ce17a32ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Recipes",
    tags: ["Indian Cuisine", "Recipes", "Traditional", "Cooking"],
    publishedAt: "2024-01-10",
    author: {
      name: "Chef Rajesh Kumar",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    readTime: 6,
    featured: true,
  },
  {
    id: "seasonal-vegetarian-meal-planning",
    title: "Seasonal Vegetarian Meal Planning: Eating Fresh Year-Round",
    excerpt:
      "Learn how to create nutritious and delicious vegetarian meal plans that align with seasonal produce for maximum freshness and flavor.",
    content: `
# Seasonal Vegetarian Meal Planning: Eating Fresh Year-Round

Eating seasonally is one of the best ways to ensure you're getting the freshest, most nutritious, and flavorful vegetables throughout the year. Here's your guide to seasonal vegetarian meal planning.

## Why Eat Seasonally?

Seasonal eating offers numerous benefits:
- **Better Nutrition**: Seasonal produce is harvested at peak ripeness
- **Enhanced Flavor**: Fruits and vegetables taste better when in season
- **Cost Effective**: Seasonal produce is typically more affordable
- **Environmental Impact**: Reduces carbon footprint from transportation
- **Variety**: Encourages trying new foods throughout the year

## Spring Planning (March-May)

**Featured Vegetables**: Asparagus, artichokes, peas, spring onions, leafy greens
**Meal Ideas**: 
- Fresh green salads with seasonal herbs
- Asparagus and pea risotto
- Spring vegetable soup

## Summer Planning (June-August)

**Featured Vegetables**: Tomatoes, zucchini, bell peppers, eggplant, corn, cucumbers
**Meal Ideas**:
- Gazpacho and cold soups
- Grilled vegetable medleys
- Fresh tomato and basil dishes

## Fall Planning (September-November)

**Featured Vegetables**: Squash, pumpkin, sweet potatoes, apples, root vegetables
**Meal Ideas**:
- Roasted root vegetable dishes
- Pumpkin curries and soups
- Apple and squash salads

## Winter Planning (December-February)

**Featured Vegetables**: Cabbage, carrots, potatoes, citrus fruits, winter squash
**Meal Ideas**:
- Hearty stews and casseroles
- Roasted winter vegetables
- Citrus-based salads

## Meal Planning Tips

1. **Start with a seasonal produce list** for your area
2. **Plan your protein sources** - legumes, nuts, dairy
3. **Batch cook grains and legumes** for easy meal assembly
4. **Preserve seasonal abundance** through freezing or canning
5. **Keep a flexible meal plan** that can adapt to available produce

## Sample Weekly Menu (Spring)

**Monday**: Asparagus and pea pasta
**Tuesday**: Spring green salad with chickpeas
**Wednesday**: Artichoke and spinach curry
**Thursday**: Fresh pea soup with mint
**Friday**: Seasonal vegetable stir-fry
**Saturday**: Spring onion and herb frittata
**Sunday**: Mixed green salad with seasonal fruits

*Ready to start seasonal meal planning? Our subscription service adjusts to seasonal availability for the freshest meals!*
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
    category: "Meal Planning",
    tags: ["Seasonal", "Meal Planning", "Fresh Produce", "Nutrition"],
    publishedAt: "2024-01-05",
    author: {
      name: "Nutritionist Anita Patel",
      avatar:
        "https://images.unsplash.com/photo-1594736797933-d0bbcb92bb1f?w=100&h=100&fit=crop&crop=face",
    },
    readTime: 7,
    featured: false,
  },
  {
    id: "plant-based-protein-sources",
    title: "Complete Guide to Plant-Based Protein Sources",
    excerpt:
      "Everything you need to know about getting adequate protein from plant-based sources, including complete proteins and amino acid profiles.",
    content: `
# Complete Guide to Plant-Based Protein Sources

One of the most common concerns about vegetarian diets is protein intake. This comprehensive guide will show you how to easily meet your protein needs with delicious plant-based sources.

## Understanding Protein Needs

The average adult needs about 0.8 grams of protein per kilogram of body weight. For a 70kg person, that's about 56 grams of protein per day - easily achievable with plant-based foods.

## Complete vs. Incomplete Proteins

**Complete Proteins** contain all nine essential amino acids:
- Quinoa
- Buckwheat
- Chia seeds
- Hemp seeds
- Spirulina
- Amaranth

**Incomplete Proteins** can be combined to create complete proteins:
- Rice + Beans
- Peanut butter + Whole grain bread
- Hummus + Pita bread

## Top Plant-Based Protein Sources

### Legumes (15-18g protein per cup)
- Lentils: 18g protein per cup
- Chickpeas: 15g protein per cup
- Black beans: 15g protein per cup
- Kidney beans: 15g protein per cup

### Nuts and Seeds (6-8g protein per ounce)
- Almonds: 6g protein per ounce
- Pumpkin seeds: 8g protein per ounce
- Peanuts: 7g protein per ounce
- Sunflower seeds: 6g protein per ounce

### Grains (4-8g protein per cup)
- Quinoa: 8g protein per cup
- Oats: 6g protein per cup
- Brown rice: 5g protein per cup
- Whole wheat bread: 4g protein per slice

### Dairy and Alternatives (8-20g protein per serving)
- Greek yogurt: 20g protein per cup
- Cottage cheese: 14g protein per cup
- Milk: 8g protein per cup
- Cheese: 7g protein per ounce

## Sample High-Protein Vegetarian Day

**Breakfast**: Oatmeal with almond butter and chia seeds (15g protein)
**Snack**: Greek yogurt with berries (20g protein)
**Lunch**: Quinoa salad with chickpeas and vegetables (25g protein)
**Snack**: Handful of mixed nuts (8g protein)
**Dinner**: Lentil curry with brown rice (22g protein)

**Total**: 90g protein - well above daily requirements!

## Protein Combining Myths

You don't need to worry about combining proteins at every meal. As long as you eat a variety of plant-based proteins throughout the day, you'll get all essential amino acids.

## Tips for Maximizing Protein Absorption

1. **Eat vitamin C with iron-rich foods** to enhance absorption
2. **Include fermented foods** to support gut health
3. **Stay hydrated** to support digestion
4. **Space protein intake** throughout the day
5. **Include healthy fats** to support nutrient absorption

*Looking for high-protein vegetarian meals? Our meal plans are designed to meet all your nutritional needs!*
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&h=600&fit=crop",
    category: "Nutrition",
    tags: ["Protein", "Nutrition", "Plant-Based", "Health"],
    publishedAt: "2024-01-01",
    author: {
      name: "Dr. Meera Gupta",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    },
    readTime: 10,
    featured: false,
  },
  {
    id: "ayurvedic-eating-principles",
    title: "Ayurvedic Eating Principles for Modern Vegetarians",
    excerpt:
      "Discover ancient Ayurvedic wisdom for optimal digestion and health through mindful vegetarian eating practices.",
    content: `
# Ayurvedic Eating Principles for Modern Vegetarians

Ayurveda, the ancient Indian system of medicine, offers timeless wisdom for optimal health through food. These principles are particularly relevant for vegetarians seeking to maximize the benefits of their plant-based diet.

## The Three Doshas and Food

Understanding your constitution (Prakruti) helps you choose foods that support your unique needs:

### Vata (Air + Space)
- **Characteristics**: Dry, light, cold, rough, subtle, mobile
- **Best Foods**: Warm, moist, grounding foods
- **Examples**: Cooked grains, root vegetables, warm milk, nuts

### Pitta (Fire + Water)
- **Characteristics**: Hot, sharp, light, liquid, slightly oily
- **Best Foods**: Cool, sweet, bitter foods
- **Examples**: Leafy greens, coconut, cucumber, sweet fruits

### Kapha (Earth + Water)
- **Characteristics**: Heavy, slow, cool, oily, smooth, soft
- **Best Foods**: Light, warm, spicy foods
- **Examples**: Legumes, spices, leafy greens, bitter vegetables

## Six Tastes (Rasas) for Balance

Include all six tastes in your daily diet:

1. **Sweet (Madhura)**: Grains, milk, fruits - builds tissue
2. **Sour (Amla)**: Yogurt, lemon, fermented foods - aids digestion
3. **Salty (Lavana)**: Sea salt, seaweed - retains moisture
4. **Pungent (Katu)**: Ginger, chili, garlic - stimulates digestion
5. **Bitter (Tikta)**: Leafy greens, turmeric - detoxifies
6. **Astringent (Kashaya)**: Beans, pomegranate - dries excess moisture

## Ayurvedic Eating Guidelines

### Timing
- **Largest meal at noon** when digestive fire is strongest
- **Light dinner before sunset** for better digestion
- **Avoid eating when not hungry** to prevent toxin buildup

### Preparation
- **Cook with love and intention** - the cook's energy affects the food
- **Use fresh, seasonal ingredients** for maximum prana (life force)
- **Combine foods properly** to avoid digestive conflicts

### Mindful Eating
- **Eat in a calm environment** without distractions
- **Chew thoroughly** to aid digestion
- **Eat until 75% full** to allow space for digestion

## Spices as Medicine

Ayurveda views spices as medicine:

- **Turmeric**: Anti-inflammatory, supports liver
- **Ginger**: Aids digestion, reduces nausea
- **Cumin**: Enhances nutrient absorption
- **Coriander**: Cooling, supports kidney function
- **Fennel**: Digestive aid, reduces bloating

## Seasonal Eating According to Ayurveda

### Spring (Kapha Season)
- Focus on light, warm, spicy foods
- Include bitter and astringent tastes
- Reduce heavy, oily foods

### Summer (Pitta Season)
- Emphasize cool, sweet foods
- Include plenty of fresh fruits and vegetables
- Avoid excessive heat and spice

### Fall/Winter (Vata Season)
- Choose warm, grounding foods
- Include healthy oils and nuts
- Avoid cold, dry foods

## Sample Ayurvedic Meal Plan

**Morning**: Warm water with ginger and lemon
**Breakfast**: Oatmeal with ghee, cinnamon, and stewed apples
**Lunch**: Kitchari (rice and lentils) with vegetables and spices
**Afternoon**: Herbal tea with a few dates
**Dinner**: Vegetable soup with whole grain bread
**Evening**: Warm milk with turmeric before bed

*Interested in Ayurvedic meal planning? Our customized meal plans can be tailored to your dosha type!*
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "Ayurveda",
    tags: ["Ayurveda", "Traditional Medicine", "Mindful Eating", "Doshas"],
    publishedAt: "2023-12-28",
    author: {
      name: "Dr. Kavita Sharma",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    },
    readTime: 9,
    featured: false,
  },
  {
    id: "vegetarian-meal-prep-guide",
    title: "Ultimate Vegetarian Meal Prep Guide for Busy Lives",
    excerpt:
      "Master the art of vegetarian meal prep with time-saving strategies, storage tips, and batch cooking techniques for a week of healthy meals.",
    content: `
# Ultimate Vegetarian Meal Prep Guide for Busy Lives

Meal prep is a game-changer for maintaining a healthy vegetarian diet in our busy world. This comprehensive guide will help you prepare nutritious, delicious meals for the entire week in just a few hours.

## Benefits of Vegetarian Meal Prep

- **Time-saving**: Cook once, eat multiple times
- **Cost-effective**: Buy ingredients in bulk, reduce food waste
- **Portion control**: Pre-planned servings help maintain healthy eating
- **Stress reduction**: No daily "what's for dinner?" decisions
- **Consistent nutrition**: Ensures balanced meals throughout the week

## Essential Meal Prep Equipment

### Storage Containers
- **Glass containers**: Best for reheating and storing
- **Freezer bags**: Space-saving for frozen items
- **Mason jars**: Perfect for salads and overnight oats
- **Silicone bags**: Eco-friendly alternative to plastic

### Cooking Equipment
- **Large pots and pans**: For batch cooking
- **Sheet pans**: For roasting vegetables
- **Slow cooker**: Set-and-forget cooking
- **Rice cooker**: Perfect grains every time

## The 3-Step Meal Prep Process

### Step 1: Plan (30 minutes)
1. **Choose your recipes** for the week
2. **Create a shopping list** organized by store sections
3. **Schedule your prep time** - usually 2-3 hours on weekends

### Step 2: Prep (2-3 hours)
1. **Wash and chop vegetables** first
2. **Start long-cooking items** (grains, legumes)
3. **Prepare proteins** (tofu, tempeh, eggs)
4. **Make sauces and dressings**

### Step 3: Store (15 minutes)
1. **Cool completely** before storing
2. **Label containers** with contents and date
3. **Store strategically** - use within 3-4 days

## Base Ingredients for Versatile Meals

### Grains (Cook in Large Batches)
- **Brown rice**: 1 cup dry = 3 cups cooked
- **Quinoa**: 1 cup dry = 3 cups cooked
- **Oats**: For breakfast bowls and overnight oats
- **Pasta**: Quick dinner solutions

### Proteins (Prep Multiple Ways)
- **Lentils**: Cooked plain, curried, or in salads
- **Chickpeas**: Roasted, mashed, or in curries
- **Tofu**: Baked, scrambled, or marinated
- **Eggs**: Hard-boiled, scrambled, or in frittatas

### Vegetables (Prep for Multiple Uses)
- **Roasted vegetables**: Season variety, roast together
- **Raw vegetables**: Chopped for salads and snacks
- **Steamed vegetables**: Quick reheat for any meal

## Sample Weekly Meal Prep Plan

### Sunday Prep Session (2.5 hours)

**Hour 1**: Grains and Legumes
- Cook 2 cups brown rice
- Cook 1 cup quinoa
- Prepare 2 cups lentils

**Hour 2**: Proteins and Vegetables
- Bake seasoned tofu
- Roast mixed vegetables
- Hard-boil eggs

**Hour 3**: Assembly and Storage
- Prepare 5 grain bowls
- Make overnight oats
- Prep salad jars

### Weekly Menu Example

**Breakfast**: Overnight oats with fruits and nuts
**Lunch**: Grain bowls with roasted vegetables and protein
**Dinner**: Lentil curry with rice and steamed vegetables
**Snacks**: Cut vegetables with hummus, trail mix

## Storage and Food Safety Tips

### Refrigerator Storage (3-4 days)
- **Cooked grains**: Store in airtight containers
- **Roasted vegetables**: Keep separate from raw items
- **Proteins**: Store in smaller portions for easy reheating
- **Sauces**: Store separately to prevent sogginess

### Freezer Storage (1-3 months)
- **Soups and stews**: Freeze in individual portions
- **Cooked grains**: Freeze in 1-cup portions
- **Bread**: Slice before freezing
- **Smoothie packs**: Pre-portioned frozen fruits

## Quick Assembly Meal Ideas

### Buddha Bowls
**Base**: Quinoa or brown rice
**Protein**: Roasted chickpeas or baked tofu
**Vegetables**: Roasted sweet potato, steamed broccoli
**Sauce**: Tahini dressing or pesto

### Mason Jar Salads
**Bottom**: Dressing
**Layer 2**: Hardy vegetables (carrots, peppers)
**Layer 3**: Protein (chickpeas, cheese)
**Layer 4**: Grains (quinoa, farro)
**Top**: Delicate greens

### Wrap Variations
**Base**: Whole grain tortilla
**Spread**: Hummus or avocado
**Protein**: Seasoned tempeh or scrambled tofu
**Vegetables**: Pre-cut vegetables and greens

## Time-Saving Hacks

1. **Use a slow cooker** for hands-off cooking
2. **Invest in pre-cut vegetables** when budget allows
3. **Double recipes** and freeze half
4. **Repurpose ingredients** in different dishes
5. **Keep emergency meals** in the freezer

*Ready to streamline your meal prep? Our meal delivery service offers pre-prepped ingredients and recipes for effortless healthy eating!*
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    category: "Meal Prep",
    tags: ["Meal Prep", "Time Management", "Batch Cooking", "Organization"],
    publishedAt: "2023-12-20",
    author: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    readTime: 12,
    featured: false,
  },
];

export const getFeaturedBlogs = (): BlogPost[] => {
  return mockBlogs.filter((blog) => blog.featured);
};

export const getBlogById = (id: string): BlogPost | undefined => {
  return mockBlogs.find((blog) => blog.id === id);
};

export const getBlogsByCategory = (category: string): BlogPost[] => {
  return mockBlogs.filter(
    (blog) => blog.category.toLowerCase() === category.toLowerCase()
  );
};

export const getBlogsByTag = (tag: string): BlogPost[] => {
  return mockBlogs.filter((blog) =>
    blog.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getAllCategories = (): string[] => {
  return [...new Set(mockBlogs.map((blog) => blog.category))];
};

export const getAllTags = (): string[] => {
  return [...new Set(mockBlogs.flatMap((blog) => blog.tags))];
};
