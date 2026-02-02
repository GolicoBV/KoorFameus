import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16 lg:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-coral/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-coral/20 bg-bg-accent px-4 py-1.5 text-sm font-medium text-coral">
            <span className="mr-2">🎵</span>
            Kinderkoor met passie
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Welkom bij{" "}
            <span className="text-coral">Koor Fameus</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-2xl text-lg text-text-secondary md:text-xl">
            Een energiek kinderkoor waar plezier en muziek samenkomen.
            Onze nieuwe website is binnenkort klaar!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-coral hover:bg-coral-dark text-white px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Meer informatie
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-coral text-coral hover:bg-coral hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-200"
            >
              Neem contact op
            </Button>
          </div>
        </div>

        {/* Feature cards preview */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="🎤"
            title="Zingen"
            description="Wekelijkse repetities vol plezier en muziek"
          />
          <FeatureCard
            icon="🎭"
            title="Optredens"
            description="Regelmatige voorstellingen en evenementen"
          />
          <FeatureCard
            icon="👨‍👩‍👧‍👦"
            title="Gemeenschap"
            description="Een warme groep voor kinderen van alle leeftijden"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="group border-0 bg-bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-accent text-2xl transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-text-secondary">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
