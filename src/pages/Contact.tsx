
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import allPackages from '@/data/packages';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get('package');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: packageParam || '',
    message: '',
  });

  useEffect(() => {
    if (packageParam) {
      setFormData(prev => ({
        ...prev,
        package: packageParam
      }));
    }
  }, [packageParam]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted",
      description: "We'll get back to you as soon as possible!",
      variant: "default",
    });
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      package: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
              <p className="text-lg text-gray-600">
                Have any questions about our packages? Get in touch with our travel experts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-vrred-500 mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+91 1234567890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-vrred-500 mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@vrbesttravels.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-vrred-500 mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        123 Travel Street, Bangalore,
                        <br />Karnataka, India - 560001
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="font-medium mb-3">Office Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="package">
                        Interested Package
                      </label>
                      <Select
                        value={formData.package}
                        onValueChange={(value) => handleSelectChange('package', value)}
                      >
                        <SelectTrigger id="package">
                          <SelectValue placeholder="Select a package (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {allPackages.map(pkg => (
                            <SelectItem key={pkg.id} value={pkg.title}>
                              {pkg.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-vrred-500 hover:bg-vrred-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
