import { Card, CardContent } from "./ui/card";

export function About() {
  return (
    <section id="about" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="mb-4">
            Transforming Mental Healthcare
          </h2>
          <p className="text-muted-foreground">
            Depression affects millions worldwide, yet treatment selection often relies on 
            trial-and-error approaches. Our clinical decision support tool changes that by 
            providing data-driven insights for precision medicine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mb-2">Data-Driven Insights</h3>
              <p className="text-muted-foreground text-sm">
                Leverage comprehensive patient data and clinical research to inform treatment decisions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-2">Precision Medicine</h3>
              <p className="text-muted-foreground text-sm">
                Personalized treatment recommendations based on individual patient characteristics.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2">Clinical Integration</h3>
              <p className="text-muted-foreground text-sm">
                Seamlessly integrates into existing clinical workflows and EHR systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}