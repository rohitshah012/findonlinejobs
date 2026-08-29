import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const isSaved = user?.profile?.savedJobs?.includes(job?._id);

    const handleSaveJob = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to bookmark jobs.");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/save/${job?._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                let updatedSavedJobs = [...(user.profile.savedJobs || [])];
                if (res.data.isSaved) {
                    updatedSavedJobs.push(job?._id);
                } else {
                    updatedSavedJobs = updatedSavedJobs.filter(id => id !== job?._id);
                }
                const updatedUser = {
                    ...user,
                    profile: {
                        ...user.profile,
                        savedJobs: updatedSavedJobs
                    }
                };
                dispatch(setUser(updatedUser));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button
                    onClick={handleSaveJob}
                    variant="outline"
                    className={`rounded-full ${isSaved ? 'text-purple-700 bg-purple-50 hover:bg-purple-100' : 'text-gray-500'}`}
                    size="icon"
                >
                    <Bookmark className={isSaved ? "fill-purple-700" : ""} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location || "India"}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button
                    onClick={handleSaveJob}
                    className={`text-white ${isSaved ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isSaved ? 'Remove Bookmark' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job