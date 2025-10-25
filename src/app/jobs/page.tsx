"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, DollarSign, Building, Search, Filter, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JobFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Registered Nurse - ICU",
      company: "Metro Health Hospital",
      location: "New York, NY",
      type: "Full-time",
      category: "Nursing",
      salary: "$85,000 - $110,000",
      description: "Metro Health Hospital is seeking an experienced Senior Registered Nurse to join our Intensive Care Unit team. As a Senior RN in our ICU, you will be responsible for providing exceptional patient care to critically ill patients, collaborating with interdisciplinary teams, and mentoring junior staff members. This role requires advanced clinical skills, strong leadership abilities, and a commitment to excellence in patient outcomes."
    },
    {
      id: 2,
      title: "Medical Laboratory Technician",
      company: "Diagnostic Labs Inc.",
      location: "Chicago, IL",
      type: "Full-time",
      category: "Laboratory",
      salary: "$52,000 - $68,000",
      description: "Diagnostic Labs Inc. is seeking a skilled Medical Laboratory Technician to perform complex laboratory tests and procedures. About the Role: This position plays a crucial role in our laboratory operations, conducting diagnostic tests that help physicians make accurate diagnoses. You will work with advanced laboratory equipment, maintain quality control standards, and ensure accurate test results."
    },
    {
      id: 3,
      title: "Pharmacist - Clinical",
      company: "CareFirst Pharmacy",
      location: "Seattle, WA",
      type: "Full-time",
      category: "Pharmacy",
      salary: "$120,000 - $145,000",
      description: "CareFirst Pharmacy is looking for a Clinical Pharmacist to join our innovative patient care team. Position Overview: As a Clinical Pharmacist, you will work directly with patients and healthcare providers to optimize medication therapy and improve patient outcomes. This role involves medication management, patient counseling, and collaboration with medical teams."
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedLocation === "all" || !selectedLocation || job.category === selectedLocation;
    const matchesLocation = selectedLocation === "all" || !selectedLocation || job.location.includes(selectedLocation);
    const matchesType = selectedType === "all" || !selectedType || job.type === selectedType;
    
    return matchesSearch && (matchesCategory || matchesLocation) && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* <section className="py-20 bg-gray-50"> */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Filter Jobs Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Jobs</h2>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  
                  {/* Filter Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Nursing">Nursing</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Therapy">Therapy</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="NY">New York, NY</SelectItem>
                        <SelectItem value="IL">Chicago, IL</SelectItem>
                        <SelectItem value="WA">Seattle, WA</SelectItem>
                        <SelectItem value="CA">Los Angeles, CA</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Access Jobs Available Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {filteredJobs.length} Full Access Jobs Available
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <CardTitle className="text-lg font-bold text-gray-800 leading-tight">
                          {job.title}
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Full Access
                        </Badge>
                      </div>
                      
                      <div className="text-teal-600 font-medium text-lg mb-3">
                        {job.company}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="text-gray-600 bg-gray-50">
                          <Building className="w-3 h-3 mr-1" />
                          {job.category || 'Healthcare'}
                        </Badge>
                        <Badge variant="outline" className="text-gray-600 bg-gray-50">
                          {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {job.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default function JobsPage() {
  return <JobFeed />;
}
