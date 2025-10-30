"use client";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden font-playfair">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/20 -z-10" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            IMAGINE A FUTURE WITH
          </h1>
          <div className="relative">
            <h2 className="text-6xl md:text-8xl font-bold text-accent italic transform -rotate-2">
              ZERO TRAVELERS
            </h2>
          </div>
          
          <div className="pt-8 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gold">
              GLOBAL RECRUITMENT
            </h3>
            <h3 className="text-3xl md:text-4xl font-bold text-gold">
              COST EFFECTIVE SOLUTIONS
            </h3>
          </div>

          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto pt-6 leading-relaxed">
            With almost 2 decades in business, we've saved smart hospitals millions as they transition to their ZERO travelers goal quickly and cost effectively.
          </p>

          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
