import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        filterLocation: "",
        filterIndustry: "",
        filterSalary: "",
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setFilterLocation:(state,action) => {
            state.filterLocation = action.payload;
        },
        setFilterIndustry:(state,action) => {
            state.filterIndustry = action.payload;
        },
        setFilterSalary:(state,action) => {
            state.filterSalary = action.payload;
        },
        clearFilters:(state) => {
            state.filterLocation = "";
            state.filterIndustry = "";
            state.filterSalary = "";
            state.searchedQuery = "";
        }
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery,
    setFilterLocation,
    setFilterIndustry,
    setFilterSalary,
    clearFilters
} = jobSlice.actions;
export default jobSlice.reducer;