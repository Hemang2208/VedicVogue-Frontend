"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Star, ThumbsUp, ThumbsDown, Camera, Send, Award } from "lucide-react";

const recentMeals = [
  {
    id: 1,
    name: "Classic Veg Thali",
    date: "Today",
    time: "12:30 PM",
    image: "https://placehold.co/80x80/svg",
    status: "delivered",
    rated: false,
  },
  {
    id: 2,
    name: "Protein Power Bowl",
    date: "Yesterday",
    time: "7:15 PM",
    image: "https://placehold.co/80x80/svg",
    status: "delivered",
    rated: true,
    rating: 5,
  },
  {
    id: 3,
    name: "South Indian Delight",
    date: "Dec 14",
    time: "12:45 PM",
    image: "https://placehold.co/80x80/svg",
    status: "delivered",
    rated: true,
    rating: 4,
  },
];

const feedbackCategories = [
  "Food Quality",
  "Taste",
  "Portion Size",
  "Packaging",
  "Delivery Time",
  "Temperature",
  "Freshness",
  "Presentation",
];

export default function FeedbackPage() {
  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [overallExperience, setOverallExperience] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmitFeedback = () => {
    if (!selectedMeal || rating === 0) return;

    const feedbackData = {
      mealId: selectedMeal,
      rating,
      feedback,
      categories: selectedCategories,
      overallExperience,
      wouldRecommend,
    };

    console.log("Submitting feedback:", feedbackData);

    // Reset form
    setSelectedMeal(null);
    setRating(0);
    setFeedback("");
    setSelectedCategories([]);
    setOverallExperience("");
    setWouldRecommend(null);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Feedback & Ratings</h1>
            <p className="text-muted-foreground">
              Help us improve by sharing your experience with our meals and
              service
            </p>
          </div>

          <Tabs defaultValue="rate-meals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rate-meals">Rate Meals</TabsTrigger>
              <TabsTrigger value="service-feedback">
                Service Feedback
              </TabsTrigger>
              <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
            </TabsList>

            {/* Rate Meals */}
            <TabsContent value="rate-meals">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Meal Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Meals</CardTitle>
                    <p className="text-muted-foreground">
                      Select a meal to rate
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentMeals.map((meal) => (
                        <div
                          key={meal.id}
                          className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedMeal === meal.id
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() =>
                            !meal.rated && setSelectedMeal(meal.id)
                          }
                        >
                          <Image
                            src={meal.image || "https://placehold.co/50x50/svg"}
                            alt={meal.name}
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{meal.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {meal.date} • {meal.time}
                            </p>
                          </div>
                          {meal.rated ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < meal.rating!
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="secondary">Rated</Badge>
                            </div>
                          ) : (
                            <Badge variant="outline">Rate Now</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Rating Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Rate Your Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedMeal ? (
                      <>
                        {/* Star Rating */}
                        <div className="text-center space-y-4">
                          <div className="flex justify-center gap-2">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`h-8 w-8 cursor-pointer transition-colors ${
                                  index < (hoverRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-200"
                                }`}
                                onClick={() => handleStarClick(index)}
                                onMouseEnter={() => setHoverRating(index + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                              />
                            ))}
                          </div>
                          {(rating > 0 || hoverRating > 0) && (
                            <p className="text-lg font-medium text-primary">
                              {getRatingText(hoverRating || rating)}
                            </p>
                          )}
                        </div>

                        {/* Feedback Categories */}
                        <div>
                          <Label className="text-base font-medium mb-3 block">
                            What would you like to feedback about? (Optional)
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            {feedbackCategories.map((category) => (
                              <div
                                key={category}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={category}
                                  checked={selectedCategories.includes(
                                    category
                                  )}
                                  onCheckedChange={() =>
                                    handleCategoryToggle(category)
                                  }
                                />
                                <Label htmlFor={category} className="text-sm">
                                  {category}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Written Feedback */}
                        <div>
                          <Label
                            htmlFor="feedback"
                            className="text-base font-medium mb-2 block"
                          >
                            Tell us more (Optional)
                          </Label>
                          <Textarea
                            id="feedback"
                            placeholder="Share your detailed feedback about the meal..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                          />
                        </div>

                        {/* Photo Upload */}
                        <div>
                          <Label className="text-base font-medium mb-2 block">
                            Add Photo (Optional)
                          </Label>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload a photo of your meal
                            </p>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          className="w-full"
                          onClick={handleSubmitFeedback}
                          disabled={rating === 0}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Feedback
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">
                          Select a Meal to Rate
                        </h3>
                        <p className="text-muted-foreground">
                          Choose a recent meal from the list to share your
                          feedback
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Service Feedback */}
            <TabsContent value="service-feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Service Feedback</CardTitle>
                  <p className="text-muted-foreground">
                    Share your thoughts about our overall service experience
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Experience */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      How would you rate your overall experience?
                    </Label>
                    <Select
                      value={overallExperience}
                      onValueChange={setOverallExperience}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="very-good">Very Good</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Would you recommend VedicVogue Kitchen to others?
                    </Label>
                    <div className="flex gap-4">
                      <Button
                        variant={
                          wouldRecommend === true ? "default" : "outline"
                        }
                        onClick={() => setWouldRecommend(true)}
                        className="flex-1"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Yes, I would
                      </Button>
                      <Button
                        variant={
                          wouldRecommend === false ? "destructive" : "outline"
                        }
                        onClick={() => setWouldRecommend(false)}
                        className="flex-1"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        No, I wouldn&apos;t
                      </Button>
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Rate different aspects of our service
                    </Label>
                    <div className="space-y-4">
                      {[
                        "Food Quality",
                        "Delivery Time",
                        "Customer Service",
                        "App Experience",
                        "Value for Money",
                      ].map((aspect) => (
                        <div
                          key={aspect}
                          className="flex items-center justify-between"
                        >
                          <span className="font-medium">{aspect}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 cursor-pointer text-gray-300 hover:text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div>
                    <Label
                      htmlFor="service-feedback"
                      className="text-base font-medium mb-2 block"
                    >
                      Additional Comments
                    </Label>
                    <Textarea
                      id="service-feedback"
                      placeholder="Share any additional thoughts or suggestions..."
                      rows={4}
                    />
                  </div>

                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Service Feedback
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Reviews */}
            <TabsContent value="my-reviews">
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">
                        Average Rating
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">
                        Reviews Given
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">22</p>
                      <p className="text-sm text-muted-foreground">
                        Positive Reviews
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">
                        Photos Shared
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Review History */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Image
                            src="https://placehold.co/60x60/svg"
                            alt="Meal"
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">
                                Classic Veg Thali
                              </h3>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < 4
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Reviewed on Dec {15 - index}, 2024
                            </p>
                            <p className="text-sm">
                              &quot;Excellent taste and quality. The dal was
                              perfectly cooked and the vegetables were fresh.
                              Delivery was on time and the packaging was
                              neat.&quot;
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Badge variant="secondary">Food Quality</Badge>
                              <Badge variant="secondary">Taste</Badge>
                              <Badge variant="secondary">Delivery Time</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
