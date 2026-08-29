import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const SkeletonCard = () => (
    <div className='p-5 rounded-md shadow-lg bg-white border border-gray-100 animate-pulse'>
        <div className='flex items-center justify-between'>
            <div className='h-4 bg-gray-200 rounded w-20'></div>
            <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
        </div>
        <div className='flex items-center gap-2 my-4'>
            <div className='h-12 w-12 bg-gray-200 rounded-full'></div>
            <div className='space-y-2 flex-1'>
                <div className='h-4 bg-gray-200 rounded w-2/3'></div>
                <div className='h-3 bg-gray-200 rounded w-1/3'></div>
            </div>
        </div>
        <div className='space-y-2 my-4'>
            <div className='h-5 bg-gray-200 rounded w-5/6'></div>
            <div className='h-4 bg-gray-200 rounded w-full'></div>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <div className='h-6 bg-gray-200 rounded w-12'></div>
            <div className='h-6 bg-gray-200 rounded w-12'></div>
            <div className='h-6 bg-gray-200 rounded w-12'></div>
        </div>
    </div>
);

const Jobs = () => {
    const { allJobs, searchedQuery, filterLocation, filterIndustry, filterSalary } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (allJobs.length > 0) {
            setIsLoading(false);
        } else {
            // Add a timeout to stop loading if server has no jobs
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [allJobs]);

    useEffect(() => {
        let filtered = [...allJobs];

        if (searchedQuery) {
            const q = searchedQuery.toLowerCase();
            filtered = filtered.filter(job => {
                return job.title?.toLowerCase().includes(q) ||
                       job.description?.toLowerCase().includes(q) ||
                       job.location?.toLowerCase().includes(q) ||
                       job.company?.name?.toLowerCase().includes(q);
            });
        }

        if (filterLocation) {
            filtered = filtered.filter(job => 
                job.location?.toLowerCase() === filterLocation.toLowerCase()
            );
        }

        if (filterIndustry) {
            filtered = filtered.filter(job => 
                job.title?.toLowerCase().includes(filterIndustry.toLowerCase()) ||
                job.description?.toLowerCase().includes(filterIndustry.toLowerCase())
            );
        }

        if (filterSalary) {
            filtered = filtered.filter(job => {
                const salary = job.salary;
                if (filterSalary === "0-3 LPA") {
                    return salary <= 3;
                } else if (filterSalary === "3-6 LPA") {
                    return salary > 3 && salary <= 6;
                } else if (filterSalary === "6-10 LPA") {
                    return salary > 6 && salary <= 10;
                } else if (filterSalary === "10-15 LPA") {
                    return salary > 10 && salary <= 15;
                } else if (filterSalary === "15+ LPA") {
                    return salary > 15;
                }
                return true;
            });
        }

        setFilterJobs(filtered);
    }, [allJobs, searchedQuery, filterLocation, filterIndustry, filterSalary]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-full md:w-[20%]'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {
                            isLoading ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
                                </div>
                            ) : filterJobs.length <= 0 ? (
                                <div className='flex flex-col items-center justify-center h-[50vh] text-center'>
                                    <h2 className='text-xl font-bold text-gray-700 mb-2'>No Jobs Found</h2>
                                    <p className='text-gray-500'>Try adjusting your search filters to find matching opportunities.</p>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs;