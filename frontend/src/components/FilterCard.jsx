import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterLocation, setFilterIndustry, setFilterSalary, clearFilters } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"]
    },
]

const FilterCard = () => {
    const dispatch = useDispatch();
    const { filterLocation, filterIndustry, filterSalary } = useSelector(store => store.job);

    const handleLocationChange = (value) => {
        dispatch(setFilterLocation(value));
    }

    const handleIndustryChange = (value) => {
        dispatch(setFilterIndustry(value));
    }

    const handleSalaryChange = (value) => {
        dispatch(setFilterSalary(value));
    }

    const handleClear = () => {
        dispatch(clearFilters());
    }

    const hasFilters = filterLocation || filterIndustry || filterSalary;

    return (
        <div className='w-full bg-white p-5 rounded-md shadow-md border border-gray-100'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg text-gray-800'>Filter Jobs</h1>
                {
                    hasFilters && (
                        <Button onClick={handleClear} variant="ghost" className="text-red-500 hover:text-red-700 h-8 px-2 text-xs">
                            Clear All
                        </Button>
                    )
                }
            </div>
            <hr className='mt-2 mb-4' />
            <div className='space-y-6'>
                {/* Location Filter */}
                <div>
                    <h2 className='font-bold text-md text-gray-700 mb-2'>Location</h2>
                    <RadioGroup value={filterLocation} onValueChange={handleLocationChange}>
                        {
                            filterData[0].array.map((item, idx) => {
                                const itemId = `loc-${idx}`;
                                return (
                                    <div key={itemId} className='flex items-center space-x-2 my-1'>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId} className="text-sm font-medium text-gray-600 cursor-pointer">{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </RadioGroup>
                </div>

                {/* Industry Filter */}
                <div>
                    <h2 className='font-bold text-md text-gray-700 mb-2'>Industry</h2>
                    <RadioGroup value={filterIndustry} onValueChange={handleIndustryChange}>
                        {
                            filterData[1].array.map((item, idx) => {
                                const itemId = `ind-${idx}`;
                                return (
                                    <div key={itemId} className='flex items-center space-x-2 my-1'>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId} className="text-sm font-medium text-gray-600 cursor-pointer">{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </RadioGroup>
                </div>

                {/* Salary Filter */}
                <div>
                    <h2 className='font-bold text-md text-gray-700 mb-2'>Salary Range</h2>
                    <RadioGroup value={filterSalary} onValueChange={handleSalaryChange}>
                        {
                            filterData[2].array.map((item, idx) => {
                                const itemId = `sal-${idx}`;
                                return (
                                    <div key={itemId} className='flex items-center space-x-2 my-1'>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId} className="text-sm font-medium text-gray-600 cursor-pointer">{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}

export default FilterCard