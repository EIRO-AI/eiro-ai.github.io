import { Button } from "./ui/button";
import { Logo } from "./Logo";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('contact');
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo className="text-primary" size={32} />
            <span style={{ fontWeight: '500' }}>eiro inc.</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('solution')} 
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Contact
            </button>
          </nav>
          
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </div>
    </header>
  );
}