import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Team = () => {
  const team = [
    {
      name: "Austin Morioka",
      role: "President",
      bio: "I am the client facing representative of E-Health Jobs with a track record of successful project delivery and client satisfaction, committed to driving positive outcomes for everyone. Diversity and Inclusion and Quality Patient Care are at the top of my goals for change. From personal experience I believe deeply that together we can change the quality of healthcare in the US by great, cost effective staffing. Hence the drive to replace all your high cost travel nurses with permanent members of your community.",
    },
    {
      name: "Jacqueline Russ",
      role: "Vice-President",
      bio: "I'm a seasoned serial entrepreneur with proven success in product development, strategic planning, market analysis, and performance optimization. I launched the Global Nurses Allied Professionals Program (GNAP), and E-Health Global, the international arm of E-Health Jobs. I'm obsessed with high quality, anticipatory service and it drives all my decisions and processes. The end result for our clients is quiet, streamlined, tailored and intuitive service. I am particularly proud of my staff and a big believer in \"you get what you pay for\". We alleviate so much stress and headaches, you'll be sad when our work together is complete. And so will we!",
    },
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              And We Are...
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10">
                  <CardTitle className="text-2xl">{member.name}</CardTitle>
                  <p className="text-secondary font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-card-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
