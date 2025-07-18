import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interested in learning more about our clinical decision support tool? 
              We'd love to discuss how we can help improve depression care at your organization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">Email</p>
                    <p className="text-muted-foreground text-sm">contact@eiro.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">Location</p>
                    <p className="text-muted-foreground text-sm">Nashville, TN</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm mb-2">Partnership Opportunities</p>
                  <p className="text-muted-foreground text-sm">
                    We're interested in collaborating with healthcare systems, 
                    research institutions, and technology partners to advance precision medicine in mental health.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-1">First Name</label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John" 
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-1">Last Name</label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@hospital.com" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm mb-1">Organization</label>
                    <Input 
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your healthcare organization" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm mb-1">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your interest in our clinical decision support tool..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}