import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingDown, TrendingUp, Shield } from "lucide-react";

const NursesSection = () => {
  const benefits = [
    { icon: TrendingDown, text: "Remove the high cost of travelers/per diem workers" },
    { icon: TrendingUp, text: "Increase morale, patient outcomes, retention" },
    { icon: Shield, text: "Stay in business and save $$$" },
  ];

  const features = [
    "Easy step-by-step process",
    "Decreased turnover and burnout",
    "1-year replacement guarantee",
    "Bachelors and advanced certs for RNs",
    "State licensed, NCLEX passed",
    "VisaScreened and credentialed",
    "English speaking",
    "4 year commitments",
  ];

  return (
    <section id="about" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              And We're Especially Good
            </h2>
            <h3 className="text-5xl md:text-6xl font-bold text-secondary">
              With Nurses
            </h3>
          </div>

          <p className="text-xl md:text-2xl text-center mb-16 leading-relaxed max-w-4xl mx-auto">
            Our mission is to elevate patient care and end the nursing crisis in one fell swoop. 
            We all benefit from this goal, as we'll all be patients one day. And so will our kids and their kids. 
            Let's solve this NOW.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* You Get To Section */}
            <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 p-8">
              <h4 className="text-2xl font-bold text-gold mb-6">You get to:</h4>
              <div className="space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.text} className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <span className="text-lg text-primary-foreground">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* You Also Get Section */}
            <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 p-8">
              <h4 className="text-2xl font-bold text-gold mb-6">You also get:</h4>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-base text-primary-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NursesSection;
