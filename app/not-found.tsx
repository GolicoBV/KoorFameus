import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-bold text-coral/20">404</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary md:text-4xl mb-4">
          Pagina niet gevonden
        </h1>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          Oeps! De pagina die je zoekt bestaat niet of is verplaatst.
          Geen zorgen, we helpen je graag verder.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-coral hover:bg-coral-dark text-white px-6 py-5 rounded-xl"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Naar homepagina
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-coral text-coral hover:bg-coral hover:text-white px-6 py-5 rounded-xl"
          >
            <Link href="/contact">
              Neem contact op
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
