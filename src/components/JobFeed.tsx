// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { MapPin, Clock, DollarSign, Building, Search, Filter } from "lucide-react";

// const JobFeed = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedType, setSelectedType] = useState("");

//   const jobs = [
//     {
//       id: 1,
//       title: "Registered Nurse - ICU",
//       company: "Mayo Clinic",
//       location: "Rochester, MN",
//       type: "Full-time",
//       salary: "$75,000 - $95,000",
//       posted: "2 hours ago",
//       description: "Join our world-renowned ICU team. We're looking for experienced RNs with critical care experience.",
//       requirements: ["BSN required", "2+ years ICU experience", "Active RN license"],
//       benefits: ["Health insurance", "401k matching", "Tuition reimbursement"],
//       urgent: true
//     },
//     {
//       id: 2,
//       title: "Travel Nurse - Emergency Department",
//       company: "Johns Hopkins Hospital",
//       location: "Baltimore, MD",
//       type: "Contract",
//       salary: "$3,200 - $4,100/week",
//       posted: "4 hours ago",
//       description: "13-week travel assignment in our busy ED. Great opportunity to work at a top-tier hospital.",
//       requirements: ["Active RN license", "BLS/ACLS certified", "2+ years ED experience"],
//       benefits: ["Housing stipend", "Travel reimbursement", "Health benefits"],
//       urgent: false
//     },
//     {
//       id: 3,
//       title: "Nurse Practitioner - Family Medicine",
//       company: "Cleveland Clinic",
//       location: "Cleveland, OH",
//       type: "Full-time",
//       salary: "$110,000 - $130,000",
//       posted: "6 hours ago",
//       description: "Join our primary care team providing comprehensive family medicine services.",
//       requirements: ["MSN required", "NP certification", "Active license"],
//       benefits: ["Comprehensive benefits", "CME allowance", "Flexible schedule"],
//       urgent: false
//     },
//     {
//       id: 4,
//       title: "ICU Travel Nurse",
//       company: "Massachusetts General Hospital",
//       location: "Boston, MA",
//       type: "Contract",
//       salary: "$3,500 - $4,200/week",
//       posted: "8 hours ago",
//       description: "High-acuity ICU position at one of the nation's top hospitals.",
//       requirements: ["BSN preferred", "3+ years ICU experience", "Active RN license"],
//       benefits: ["Premium pay", "Housing assistance", "Health insurance"],
//       urgent: true
//     },
//     {
//       id: 5,
//       title: "Pediatric Nurse",
//       company: "Children's Hospital of Philadelphia",
//       location: "Philadelphia, PA",
//       type: "Full-time",
//       salary: "$70,000 - $85,000",
//       posted: "1 day ago",
//       description: "Make a difference in children's lives. Join our dedicated pediatric team.",
//       requirements: ["BSN required", "Pediatric experience preferred", "Active RN license"],
//       benefits: ["Childcare assistance", "Health benefits", "Professional development"],
//       urgent: false
//     }
//   ];

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLocation = selectedLocation === "all" || !selectedLocation || job.location.includes(selectedLocation);
//     const matchesType = selectedType === "all" || !selectedType || job.type === selectedType;
    
//     return matchesSearch && matchesLocation && matchesType;
//   });

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Healthcare Jobs
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Find your next healthcare opportunity. Browse thousands of nursing and allied health positions.
//             </p>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search jobs, companies, locations..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
              
//               <Select value={selectedLocation} onValueChange={setSelectedLocation}>
//                 <SelectTrigger>
//                   <MapPin className="w-4 h-4 mr-2" />
//                   <SelectValue placeholder="Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Locations</SelectItem>
//                   <SelectItem value="MN">Minnesota</SelectItem>
//                   <SelectItem value="MD">Maryland</SelectItem>
//                   <SelectItem value="OH">Ohio</SelectItem>
//                   <SelectItem value="MA">Massachusetts</SelectItem>
//                   <SelectItem value="PA">Pennsylvania</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select value={selectedType} onValueChange={setSelectedType}>
//                 <SelectTrigger>
//                   <Filter className="w-4 h-4 mr-2" />
//                   <SelectValue placeholder="Job Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Types</SelectItem>
//                   <SelectItem value="Full-time">Full-time</SelectItem>
//                   <SelectItem value="Contract">Contract</SelectItem>
//                   <SelectItem value="Part-time">Part-time</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Button className="bg-blue-600 hover:bg-blue-700">
//                 Search Jobs
//               </Button>
//             </div>
//           </div>

//           {/* Job Listings */}
//           <div className="space-y-6">
//             {filteredJobs.map((job) => (
//               <Card key={job.id} className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
//                         {job.urgent && (
//                           <Badge variant="destructive" className="text-xs">
//                             Urgent
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="flex items-center text-gray-600 mb-2">
//                         <Building className="w-4 h-4 mr-1" />
//                         <span className="font-medium">{job.company}</span>
//                       </div>
//                       <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {job.location}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {job.posted}
//                         </div>
//                         <div className="flex items-center">
//                           <DollarSign className="w-4 h-4 mr-1" />
//                           {job.salary}
//                         </div>
//                         <Badge variant="outline">{job.type}</Badge>
//                       </div>
//                     </div>
//                     <div className="mt-4 md:mt-0 md:ml-4">
//                       <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
//                         Apply Now
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-700 mb-4">{job.description}</p>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
//                       <ul className="text-sm text-gray-600 space-y-1">
//                         {job.requirements.map((req, index) => (
//                           <li key={index} className="flex items-start">
//                             <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
//                             {req}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
//                       <ul className="text-sm text-gray-600 space-y-1">
//                         {job.benefits.map((benefit, index) => (
//                           <li key={index} className="flex items-start">
//                             <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
//                             {benefit}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Load More Button */}
//           <div className="text-center mt-12">
//             <Button variant="outline" size="lg" className="px-8">
//               Load More Jobs
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobFeed;
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Clock,
  DollarSign,
  Building,
  Search,
  Filter,
  Loader2,
} from "lucide-react";

const JobFeed = () => {
  const dummyjobs = [
    {
      id: 1,
      title: "Registered Nurse - ICU",
      company: "Mayo Clinic",
      location: "Rochester, MN",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      posted: "2 hours ago",
      description: "Join our world-renowned ICU team. We're looking for experienced RNs with critical care experience.",
      requirements: ["BSN required", "2+ years ICU experience", "Active RN license"],
      benefits: ["Health insurance", "401k matching", "Tuition reimbursement"],
      urgent: true
    },
    {
      id: 2,
      title: "Travel Nurse - Emergency Department",
      company: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      type: "Contract",
      salary: "$3,200 - $4,100/week",
      posted: "4 hours ago",
      description: "13-week travel assignment in our busy ED. Great opportunity to work at a top-tier hospital.",
      requirements: ["Active RN license", "BLS/ACLS certified", "2+ years ED experience"],
      benefits: ["Housing stipend", "Travel reimbursement", "Health benefits"],
      urgent: false
    },
    {
      id: 3,
      title: "Nurse Practitioner - Family Medicine",
      company: "Cleveland Clinic",
      location: "Cleveland, OH",
      type: "Full-time",
      salary: "$110,000 - $130,000",
      posted: "6 hours ago",
      description: "Join our primary care team providing comprehensive family medicine services.",
      requirements: ["MSN required", "NP certification", "Active license"],
      benefits: ["Comprehensive benefits", "CME allowance", "Flexible schedule"],
      urgent: false
    },
    {
      id: 4,
      title: "ICU Travel Nurse",
      company: "Massachusetts General Hospital",
      location: "Boston, MA",
      type: "Contract",
      salary: "$3,500 - $4,200/week",
      posted: "8 hours ago",
      description: "High-acuity ICU position at one of the nation's top hospitals.",
      requirements: ["BSN preferred", "3+ years ICU experience", "Active RN license"],
      benefits: ["Premium pay", "Housing assistance", "Health insurance"],
      urgent: true
    },
    {
      id: 5,
      title: "Pediatric Nurse",
      company: "Children's Hospital of Philadelphia",
      location: "Philadelphia, PA",
      type: "Full-time",
      salary: "$70,000 - $85,000",
      posted: "1 day ago",
      description: "Make a difference in children's lives. Join our dedicated pediatric team.",
      requirements: ["BSN required", "Pediatric experience preferred", "Active RN license"],
      benefits: ["Childcare assistance", "Health benefits", "Professional development"],
      urgent: false
    }
  ];
  // const [jobs, setJobs] = useState( [
  //     {
  //       id: 1,
  //       title: "Senior Registered Nurse - ICU",
  //       name: "Metro Health Hospital",
  //       location: "New York, NY",
  //       employment_type: "Full-time",
  //       department: "Nursing",
  //       salary_range: "$85,000 - $110,000",
  //       description: "Metro Health Hospital is seeking an experienced Senior Registered Nurse to join our Intensive Care Unit team. As a Senior RN in our ICU, you will be responsible for providing exceptional patient care to critically ill patients, collaborating with interdisciplinary teams, and mentoring junior staff members. This role requires advanced clinical skills, strong leadership abilities, and a commitment to excellence in patient outcomes."
  //     },
  //     {
  //       id: 2,
  //       title: "Medical Laboratory Technician",
  //       name: "Diagnostic Labs Inc.",
  //       location: "Chicago, IL",
  //       employment_type: "Full-time",
  //       department: "Laboratory",
  //       salary_range: "$52,000 - $68,000",
  //       description: "Diagnostic Labs Inc. is seeking a skilled Medical Laboratory Technician to perform complex laboratory tests and procedures. About the Role: This position plays a crucial role in our laboratory operations, conducting diagnostic tests that help physicians make accurate diagnoses. You will work with advanced laboratory equipment, maintain quality control standards, and ensure accurate test results."
  //     },
  //     {
  //       id: 3,
  //       title: "Pharmacist - Clinical",
  //       name: "CareFirst Pharmacy",
  //       location: "Seattle, WA",
  //       employment_type: "Full-time",
  //       department: "Pharmacy",
  //       salary_range: "$120,000 - $145,000",
  //       description: "CareFirst Pharmacy is looking for a Clinical Pharmacist to join our innovative patient care team. Position Overview: As a Clinical Pharmacist, you will work directly with patients and healthcare providers to optimize medication therapy and improve patient outcomes. This role involves medication management, patient counseling, and collaboration with medical teams."
  //     }
  //   ]);
  const [jobs, setJobs] = useState<any[]>(dummyjobs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Fetch jobs from API
  const fetchJobs = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        page: String(reset ? 1 : page),
        limit: "10",
        search: searchTerm || "",
        location: selectedLocation || "",
        type: selectedType || "",
      });

      const res = await fetch(`/api/jobs?${queryParams}`);
      const data = await res.json();

      if (reset) {
        setJobs(data.jobs || []);
      } else {
        setJobs((prev) => [...prev, ...(data.jobs || [])]);
      }

      setHasMore(data.hasMore);
      setPage((prev) => (reset ? 2 : prev + 1));
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchJobs(true);
  }, []);

  // Refetch on filter change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobs(true);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedLocation, selectedType]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Healthcare Jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your next healthcare opportunity. Browse thousands of nursing
              and allied health positions.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs, companies, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Location */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="MN">Minnesota</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                </SelectContent>
              </Select>

              {/* Job Type */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => fetchJobs(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobs.length === 0 && !loading && (
              <p className="text-center text-gray-500">No jobs found.</p>
            )}

            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl text-gray-900">
                          {job.title}
                        </CardTitle>
                        {job.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building className="w-4 h-4 mr-1" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.posted}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                </CardContent>
              </Card>
            ))}

            {loading && (
              <div className="text-center text-gray-500 py-6 flex justify-center items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" /> Loading jobs...
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && !loading && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="px-8"
                onClick={() => fetchJobs()}
              >
                Load More Jobs
              </Button>
            </div>
          )}

          {!hasMore && !loading && jobs.length > 0 && (
            <p className="text-center text-gray-400 mt-8">
            You’ve reached the end of the list.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobFeed;
