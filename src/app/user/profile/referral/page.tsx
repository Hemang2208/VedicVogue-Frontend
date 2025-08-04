"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Share2,
  Gift,
  Users,
  Trophy,
  Star,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Check,
} from "lucide-react";

const referralStats = {
  totalReferrals: 12,
  successfulReferrals: 8,
  pendingReferrals: 4,
  totalEarnings: 2400,
  availableBalance: 1800,
  redeemedAmount: 600,
};

const referralHistory = [
  {
    id: 1,
    name: "Anita Sharma",
    email: "anita.s@email.com",
    status: "completed",
    joinDate: "Dec 10, 2024",
    reward: 300,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "rajesh.k@email.com",
    status: "completed",
    joinDate: "Dec 8, 2024",
    reward: 300,
  },
  {
    id: 3,
    name: "Meera Patel",
    email: "meera.p@email.com",
    status: "pending",
    joinDate: "Dec 12, 2024",
    reward: 300,
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram.s@email.com",
    status: "completed",
    joinDate: "Dec 5, 2024",
    reward: 300,
  },
];

const rewardTiers = [
  { referrals: 5, reward: 500, title: "Bronze Referrer", achieved: true },
  { referrals: 10, reward: 1000, title: "Silver Referrer", achieved: true },
  { referrals: 20, reward: 2000, title: "Gold Referrer", achieved: false },
  { referrals: 50, reward: 5000, title: "Platinum Referrer", achieved: false },
];

export default function ReferralPage() {
  const [referralCode] = useState("PRIYA2024");
  const [copied, setCopied] = useState(false);
  const [, setShareMethod] = useState("");

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralLink = (method: string) => {
    const referralLink = `https://vedicvogue.com/signup?ref=${referralCode}`;
    const message = `Join VedicVogue Kitchen using my referral code ${referralCode} and get ₹100 off on your first order! Fresh, healthy Indian meals delivered daily. ${referralLink}`;

    switch (method) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case "facebook":
        window.open(
          `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            referralLink
          )}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=Join VedicVogue Kitchen&body=${encodeURIComponent(
            message
          )}`
        );
        break;
      default:
        copyReferralCode();
    }
    setShareMethod(method);
  };

  const nextTier = rewardTiers.find((tier) => !tier.achieved);
  const progressToNextTier = nextTier
    ? (referralStats.successfulReferrals / nextTier.referrals) * 100
    : 100;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Refer & Earn
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share the love of healthy eating with friends and earn rewards for
              every successful referral!
            </p>
          </div>

          {/* How it Works */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Share2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  1. Share Your Code
                </h3>
                <p className="text-muted-foreground">
                  Share your unique referral code with friends and family
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  2. Friends Sign Up
                </h3>
                <p className="text-muted-foreground">
                  Your friends get ₹100 off on their first order when they sign
                  up
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  3. You Earn Rewards
                </h3>
                <p className="text-muted-foreground">
                  Earn ₹300 for every friend who completes their first order
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="share" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="share">Share & Earn</TabsTrigger>
              <TabsTrigger value="stats">My Stats</TabsTrigger>
              <TabsTrigger value="history">Referral History</TabsTrigger>
              <TabsTrigger value="rewards">Reward Tiers</TabsTrigger>
            </TabsList>

            {/* Share & Earn */}
            <TabsContent value="share">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Referral Code */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Referral Code</CardTitle>
                    <p className="text-muted-foreground">
                      Share this code with friends to start earning
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Input
                        value={referralCode}
                        readOnly
                        className="text-center text-2xl font-bold tracking-wider"
                      />
                      <Button onClick={copyReferralCode} className="shrink-0">
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {copied && (
                      <p className="text-sm text-green-600 text-center">
                        Referral code copied to clipboard!
                      </p>
                    )}

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Or share your referral link directly:
                      </p>
                      <div className="flex items-center gap-2">
                        <Input
                          value={`vedicvogue.com/signup?ref=${referralCode}`}
                          readOnly
                          className="text-sm"
                        />
                        <Button
                          variant="outline"
                          onClick={() => shareReferralLink("copy")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Share Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Share with Friends</CardTitle>
                    <p className="text-muted-foreground">
                      Choose your preferred way to share
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-2"
                        onClick={() => shareReferralLink("whatsapp")}
                      >
                        <MessageCircle className="h-6 w-6 text-green-600" />
                        <span>WhatsApp</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-2"
                        onClick={() => shareReferralLink("facebook")}
                      >
                        <Facebook className="h-6 w-6 text-blue-600" />
                        <span>Facebook</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-2"
                        onClick={() => shareReferralLink("twitter")}
                      >
                        <Twitter className="h-6 w-6 text-blue-400" />
                        <span>Twitter</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-2"
                        onClick={() => shareReferralLink("email")}
                      >
                        <Mail className="h-6 w-6 text-gray-600" />
                        <span>Email</span>
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">
                        Referral Message Preview:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        &quot;Join VedicVogue Kitchen using my referral code{" "}
                        <strong>{referralCode}</strong> and get ₹100 off on your
                        first order! Fresh, healthy Indian meals delivered
                        daily.&quot;
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* My Stats */}
            <TabsContent value="stats">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="text-3xl font-bold">
                      {referralStats.totalReferrals}
                    </p>
                    <p className="text-muted-foreground">Total Referrals</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <p className="text-3xl font-bold">
                      {referralStats.successfulReferrals}
                    </p>
                    <p className="text-muted-foreground">Successful</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Gift className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                    <p className="text-3xl font-bold">
                      ₹{referralStats.totalEarnings}
                    </p>
                    <p className="text-muted-foreground">Total Earned</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                    <p className="text-3xl font-bold">
                      ₹{referralStats.availableBalance}
                    </p>
                    <p className="text-muted-foreground">Available Balance</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Progress to Next Tier */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress to Next Tier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {nextTier ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{nextTier.title}</span>
                          <Badge variant="outline">
                            {referralStats.successfulReferrals}/
                            {nextTier.referrals}
                          </Badge>
                        </div>
                        <Progress value={progressToNextTier} className="h-3" />
                        <p className="text-sm text-muted-foreground">
                          {nextTier.referrals -
                            referralStats.successfulReferrals}{" "}
                          more referrals to unlock ₹{nextTier.reward} bonus!
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                        <h3 className="font-semibold mb-2">
                          Maximum Tier Achieved!
                        </h3>
                        <p className="text-muted-foreground">
                          Congratulations! You&apos;ve reached the highest
                          referral tier.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Earnings Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Referral Rewards</span>
                        <span className="font-semibold">
                          ₹{referralStats.successfulReferrals * 300}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tier Bonuses</span>
                        <span className="font-semibold">
                          ₹
                          {referralStats.totalEarnings -
                            referralStats.successfulReferrals * 300}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Redeemed Amount</span>
                        <span className="font-semibold text-red-600">
                          -₹{referralStats.redeemedAmount}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Available Balance</span>
                        <span className="text-primary">
                          ₹{referralStats.availableBalance}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-6">Redeem Balance</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Referral History */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Referral History</CardTitle>
                  <p className="text-muted-foreground">
                    Track all your referrals and their status
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {referralHistory.map((referral) => (
                      <div
                        key={referral.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{referral.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {referral.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined: {referral.joinDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{referral.reward}</p>
                          <Badge
                            variant={
                              referral.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {referral.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reward Tiers */}
            <TabsContent value="rewards">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Reward Tiers</CardTitle>
                    <p className="text-muted-foreground">
                      Unlock bigger rewards as you refer more friends
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rewardTiers.map((tier, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 border rounded-lg ${
                            tier.achieved
                              ? "bg-green-50 border-green-200"
                              : "bg-muted/30"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                tier.achieved
                                  ? "bg-green-500 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {tier.achieved ? (
                                <Check className="h-6 w-6" />
                              ) : (
                                <Trophy className="h-6 w-6" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{tier.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {tier.referrals} successful referrals
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ₹{tier.reward}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Bonus Reward
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Terms & Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        • Referral rewards are credited after the referred user
                        completes their first order
                      </li>
                      <li>
                        • Each referral code can only be used once per new user
                      </li>
                      <li>
                        • Tier bonuses are awarded immediately upon reaching the
                        required number of referrals
                      </li>
                      <li>
                        • Rewards can be redeemed as account credit or cash
                        withdrawal
                      </li>
                      <li>
                        • VedicVogue Kitchen reserves the right to modify the
                        referral program terms
                      </li>
                      <li>
                        • Fraudulent referrals will result in account suspension
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
