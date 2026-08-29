import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import Job from './Job'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("applied");
    const [savedJobs, setSavedJobs] = useState([]);
    const {user} = useSelector(store=>store.auth);
    const isResume = Boolean(user?.profile?.resume);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/saved`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (user) {
            fetchSavedJobs();
        }
    }, [user?.profile?.savedJobs]);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills && user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='_blank' rel='noopener noreferrer' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName || "View Resume"}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-10'>
                <div className='flex items-center gap-4 border-b border-gray-200 pb-2 mb-4'>
                    <button 
                        onClick={() => setActiveTab("applied")} 
                        className={`font-bold text-lg pb-1 transition-all ${activeTab === "applied" ? "text-[#7209b7] border-b-2 border-[#7209b7]" : "text-gray-400"}`}
                    >
                        Applied Jobs
                    </button>
                    <button 
                        onClick={() => setActiveTab("saved")} 
                        className={`font-bold text-lg pb-1 transition-all ${activeTab === "saved" ? "text-[#7209b7] border-b-2 border-[#7209b7]" : "text-gray-400"}`}
                    >
                        Saved Bookmarks
                    </button>
                </div>

                {
                    activeTab === "applied" ? (
                        <AppliedJobTable />
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {
                                savedJobs.length <= 0 ? (
                                    <span className='text-gray-500 col-span-2 py-4'>No bookmarked jobs yet.</span>
                                ) : (
                                    savedJobs.map((job) => (
                                        <Job key={job._id} job={job} />
                                    ))
                                )
                            }
                        </div>
                    )
                }
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile