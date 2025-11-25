"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axiosInstance";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Building,
  Search,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

  const JobFeed = () => {
    const dummyjobs = [
      {
        id: 1,
        title: "Registered Nurse - ICU",
        name: "Mayo Clinic",
        department: "Nursing",
        location: "Rochester, MN",
        employment_type: "Full-time",
        salary_range: "$75,000 - $95,000",
        posted: "2 hours ago",
        description: "Join our world-renowned ICU team. We're looking for experienced RNs with critical care experience.",
        requirements: ["BSN required", "2+ years ICU experience", "Active RN license"],
        benefits: ["Health insurance", "401k matching", "Tuition reimbursement"],
        urgent: true,
        job_url: "https://www.mayoclinic.org/jobs"
      },
      {
        id: 2,
        title: "Travel Nurse - Emergency Department",
        name: "Johns Hopkins Hospital",
        location: "Baltimore, MD",
        employment_type: "Contract",
        salary_range: "$3,200 - $4,100/week",
        posted: "4 hours ago",
        department: "Pharmacy",
        description: "13-week travel assignment in our busy ED. Great opportunity to work at a top-tier hospital.",
        requirements: ["Active RN license", "BLS/ACLS certified", "2+ years ED experience"],
        benefits: ["Housing stipend", "Travel reimbursement", "Health benefits"],
        urgent: false,
        job_url: "https://www.hopkinsmedicine.org/careers"
      },
      {
        id: 3,
        title: "Nurse Practitioner - Family Medicine",
        name: "Cleveland Clinic",
        location: "Cleveland, OH",
        employment_type: "Full-time",
        salary_range: "$110,000 - $130,000",
        posted: "6 hours ago", department: "Nursing",
        description: "Join our primary care team providing comprehensive family medicine services.",
        requirements: ["MSN required", "NP certification", "Active license"],
        benefits: ["Comprehensive benefits", "CME allowance", "Flexible schedule"],
        urgent: false,
        job_url: "https://my.clevelandclinic.org/hr/careers"

      },
      {
        id: 4,
        title: "ICU Travel Nurse",
        name: "Massachusetts General Hospital",
        location: "Boston, MA",
        employment_type: "Contract",
        salary_range: "$3,500 - $4,200/week",
        posted: "8 hours ago",
        department: "Pharmacy",
        description: "High-acuity ICU position at one of the nation's top hospitals.",
        requirements: ["BSN preferred", "3+ years ICU experience", "Active RN license"],
        benefits: ["Premium pay", "Housing assistance", "Health insurance"],
        urgent: true,
        job_url: "https://www.massgeneral.org/careers"
      },
      {
        id: 5,
        title: "Pediatric Nurse",
        name: "Children's Hospital of Philadelphia",
        location: "Philadelphia, PA",
        employment_type: "Full-time",
        salary_range: "$70,000 - $85,000",
        posted: "1 day ago",
        department: "Laboratory",
        description: "Make a difference in children's lives. Join our dedicated pediatric team.",
        requirements: ["BSN required", "Pediatric experience preferred", "Active RN license"],
        benefits: ["Childcare assistance", "Health benefits", "Professional development"],
        urgent: false,
        job_url: "https://www.chop.edu/careers"
      }
    ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [jobs, setJobs] = useState(dummyjobs);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (pageNo = 1, append = false) => {
    try {
      setLoading(true);
      const res = await axios.get("/api/scrapejobs", {
        params: {
          page: pageNo,
          limit: 12,
          search: searchTerm,
          location: selectedLocation,
          type: selectedType,
        },
      });

      if (res.data.success) {
        setTotal(res.data.total);
        if (append) {
          setJobs((prev) => [...prev, ...res.data.jobs]);
        } else {
          setJobs(res.data.jobs);
        }
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load jobs initially
  useEffect(() => {
    fetchJobs(1, false);
  }, []);

  // Fetch jobs again when filters/search changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobs(1, false);
      setPage(1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory, selectedLocation, selectedType]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchJobs(nextPage, true);
    setPage(nextPage);
  };

  const hasMore = jobs.length < total;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Filters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Jobs</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>

              {/* Commented for now - filters can be added later   */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
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

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
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
              </div> */}
            </div>
          </div>

          {/* Job List */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {loading && jobs.length === 0
              ? "Loading jobs..."
              : `Showing ${jobs.length} of ${total} jobs.`}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg font-bold text-gray-800 leading-tight">
                      {job.title}
                    </CardTitle>
                    <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                        <CheckCircle2 className="w-3 h-3" />
                        Apply
                      </Badge>
                    </a>
                  </div>

                  <div className="text-teal-600 font-medium text-lg mb-3">
                    {job?.name}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      {job.location ? (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                      ) : null}
                    </div>
                    {job.salary_range && (
                      <div className="flex items-center text-green-600 font-medium">
                        {job.salary_range}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-gray-600 bg-gray-50">
                      <Building className="w-3 h-3 mr-1" />
                      {job.department || "Healthcare"}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600 bg-gray-50">
                      {job.employment_type}
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

          {/* Load More */}
          <div className="text-center mt-12">
            {hasMore && !loading && (
              <Button
                variant="outline"
                size="lg"
                className="px-8"
                onClick={handleLoadMore}
              >
                Load More Jobs
              </Button>
            )}
            {loading && (
              <div className="flex justify-center mt-6">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobFeed;
