import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users } from "lucide-react";

const CaseStudies = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Let Our Numbers Do The Talking
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <Card className="shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader className="bg-secondary/10">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-10 h-10 text-secondary" />
                  <CardTitle className="text-2xl">Case Study 1</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-card-foreground leading-relaxed">
                  Hospital claims a 15% vacancy rate which they fill with travelers. They pay permanent 
                  staff nurses $45 and travelers an extra $40/hr over permanent staff = $85/hr.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  When they hired E-Health to replace the 15 travelers with long term 4-year minimum 
                  permanent hire nurses, they save <span className="font-bold text-accent">$3,952,050</span> in just 4 years 
                  by not using travelers.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  Average retention of our 4-year tenured nurses is 90%, and this hospital retained 13 
                  of those 15 to stay another 4 years. Considering onboarding costs as well, they saved 
                  an additional <span className="font-bold text-accent">$3,893,760</span>.
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-2xl font-bold text-accent">
                    Total savings = $7,845,810
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">on just 15 nurses!</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader className="bg-gold/10">
                <div className="flex items-center space-x-3">
                  <Users className="w-10 h-10 text-gold" />
                  <CardTitle className="text-2xl">Case Study 2</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-card-foreground leading-relaxed">
                  Hospital had a goal to fill every traveler RN position in facility. They interviewed 
                  25 nurses per year for 2 years and hired total of 50 of our BSN, NCLEX passed, State 
                  Board licensed, CGFNS credentialed, English fluent nurses.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  Nurses come on EB3 Visa with a 3-year commitment to work for them.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  We managed every step of immigration processing to pre-departure to arrival and housed 
                  them, fed them and culturally assimilated them into their new locale, so all they had 
                  to do was concentrate on work!
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-2xl font-bold text-accent">
                    Total savings = $22,953,630*
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">on 50 nurses</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    *Before factoring onboarding and retention costs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
