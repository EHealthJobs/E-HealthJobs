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

interface Job {
  Id: string;
  Scrapper_Job_Title__c: string;
  name: string;
  Scrapper_Department__c: string;
  City__c: string;
  State__c: string;
  Scrapper_Employement_Type__c: string;
  Salary_Range__c: string;
  posted: string;
  Job_Description__c: string;
  job_url: string;
  Scrapper_Location__c: string;
}

  const JobFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
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
          Scrapper_Location__c: selectedLocation,
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
  }, [searchTerm]);

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
                key={job.Id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg font-bold text-gray-800 leading-tight">
                      {job.Scrapper_Job_Title__c}
                    </CardTitle>
                    <a href={`/job-detail/${job.Id}`} target="_blank" rel="noopener noreferrer">
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                        <CheckCircle2 className="w-3 h-3" />
                        Apply
                      </Badge>
                    </a>
                  </div>

                  {/* <div className="text-teal-600 font-medium text-lg mb-3">
                    {job?.name}
                  </div> */}

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      {(job.State__c && job.City__c) || job.Scrapper_Location__c ? (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                            {job.State__c && job.City__c ? job.City__c+', '+job.State__c : job.Scrapper_Location__c}  
                        </div>
                      ) : null}
                    </div>
                    {job.Salary_Range__c && (
                      <div className="flex items-center text-green-600 font-medium">
                        {job.Salary_Range__c}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    {job?.Scrapper_Department__c && (<Badge variant="outline" className="text-gray-600 bg-gray-50">
                      <Building className="w-3 h-3 mr-1" />
                      {job?.Scrapper_Department__c}
                    </Badge>)
                    }
                   {job?.Scrapper_Employement_Type__c && ( <Badge variant="outline" className="text-gray-600 bg-gray-50">
                      {job?.Scrapper_Employement_Type__c}
                    </Badge>)
                    }
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {job.Job_Description__c}
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
