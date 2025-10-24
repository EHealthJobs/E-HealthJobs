import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const OneStopShop = () => {
  const services = [
    "Sourcing",
    "Screening",
    "Scheduling",
    "Pipeline management",
    "Weekly reports",
    "Credentialing",
    "Immigration process",
    "Attorney coordination",
    "International background checks",
    "Medical clearances",
    "Drug testing",
    "Flights",
    "Relocation logistics",
    "Airport pickup",
    "Cultural assimilation",
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              ONE STOP SHOP
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-secondary">
              We handle everything, including your attorney!
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-lg text-card-foreground font-medium">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OneStopShop;
