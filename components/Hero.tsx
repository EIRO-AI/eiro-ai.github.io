import { Button } from "./ui/button";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6">
            Reimagining Depression Care Through Precision Medicine
          </h1>
          <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
            We're building a clinical decision support tool that empowers doctors to deliver 
            personalized, evidence-based depression treatment. Our platform helps healthcare 
            providers make more informed decisions for better patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('about')}>
              Learn More
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}