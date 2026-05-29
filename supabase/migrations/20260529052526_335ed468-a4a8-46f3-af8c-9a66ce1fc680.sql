
UPDATE public.recipes SET sugars = CASE name
  WHEN 'Avocado Toast with Eggs' THEN 4
  WHEN 'Baked Cod with Roasted Vegetables' THEN 8
  WHEN 'Banana Almond Smoothie Bowl' THEN 28
  WHEN 'Beef Stir Fry with Broccoli' THEN 10
  WHEN 'Breakfast Quinoa Bowl' THEN 14
  WHEN 'Buffalo Chicken Bowl' THEN 6
  WHEN 'Caprese Pasta Salad' THEN 8
  WHEN 'Chicken Caesar Wrap' THEN 4
  WHEN 'Chicken Teriyaki' THEN 18
  WHEN 'Citrus-Glazed Salmon Bowl' THEN 10
  WHEN 'Classic Oatmeal with Berries' THEN 16
  WHEN 'Egg White Frittata' THEN 3
  WHEN 'Greek Yogurt Parfait' THEN 22
  WHEN 'Grilled Tilapia Tacos' THEN 5
  WHEN 'Mediterranean Chickpea Salad' THEN 8
  WHEN 'Overnight Chia Pudding' THEN 18
  WHEN 'Pork Tenderloin with Apple Slaw' THEN 16
  WHEN 'Protein Pancakes' THEN 12
  WHEN 'Quinoa Black Bean Bowl' THEN 6
  WHEN 'Salmon Power Bowl' THEN 7
  WHEN 'Sheet Pan Lemon Herb Chicken' THEN 6
  WHEN 'Shrimp Garlic Pasta' THEN 5
  WHEN 'Spinach Mushroom Omelette' THEN 2
  WHEN 'Sweet Potato Hash' THEN 10
  WHEN 'Thai Peanut Noodle Salad' THEN 14
  WHEN 'Tuna Avocado Lettuce Wraps' THEN 3
  WHEN 'Turkey Club Wrap' THEN 6
  WHEN 'Turkey Meatballs with Zucchini Noodles' THEN 8
  WHEN 'Vegetarian Lentil Curry' THEN 12
  WHEN 'Veggie Hummus Power Wrap' THEN 8
  ELSE sugars
END;
