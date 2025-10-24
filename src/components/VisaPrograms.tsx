import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Globe, Award } from "lucide-react";

const VisaPrograms = () => {
  const programs = [
    {
      icon: Clock,
      title: "TN Visa for Nurses",
      timeline: "2-4 months",
      description: "Interview RNs from Canada and Mexico, and expect arrival in 2-4 months. Get rid of travelers and start saving right away!",
      color: "text-secondary",
    },
    {
      icon: Users,
      title: "H1b for Allied Health",
      timeline: "3-4 months",
      description: "Hire MTs, PTs, OTs, SLPs, Social Workers, Psychologists, Pharmacists or any job requiring Bachelors. Expect arrival in 3-4 months.",
      color: "text-accent",
    },
    {
      icon: Globe,
      title: "H1b for Nurses",
      timeline: "4-6 months",
      description: "A new pathway for international RNs (other than Cn or Mx) to work for you under an H1b Visa. We work with immigration attorneys to craft a strategy and job description so these BSN and advanced certification nurses can arrive in 4-6 months.",
      color: "text-gold",
    },
    {
      icon: Award,
      title: "EB3 or Diversity for everyone else",
      timeline: "Varies",
      description: "Now that most of your travel positions are filled, we can help with providers, CNAs, Radiology Techs, Environmental Services, or any other area you need to save money.",
      color: "text-primary",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Visa Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multiple pathways to bring qualified healthcare professionals to your facility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card key={program.title} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className={`${program.color} bg-muted p-3 rounded-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{program.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Timeline: <span className="font-semibold text-secondary">{program.timeline}</span>
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground leading-relaxed">
                    {program.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisaPrograms;
