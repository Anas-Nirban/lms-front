// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCourses } from "../../Redux/Slices/CourseSlice";
// import HomeLayout from "../../Layouts/HomeLayout";
// import CourseCard from "../../Components/CourseCard";

// function CourseList(){
//     const dispatch = useDispatch();

//     const {courseData} = useSelector((state) => state.course);

//     async function loadCourses(){
//         await dispatch(getAllCourses())
//     }
//     useEffect(() =>{
//         loadCourses();
//     }, [])
//     return(
//         <HomeLayout >
//             <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
//                 <h1 className="text-center text-3xl font-semibold mb-5">
//                     Explore the courses made by
//                     <span className="font-bold text-yellow-500">
//                         Industry experts
//                     </span>
//                 </h1>
//                 <div className="mb-10 flex flex-wrap gap-14">
//                     {courseData?.map((element) => {
//                         return <CourseCard key={element._id} data={element} />
//                     })}
//                 </div>
//             </div>
//         </HomeLayout>
//     )
// }

// export default CourseList;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const instructors = ["Dr. Prachi Raut", "Ms. Amruta Mathur", "Prof. Jane Smith"]; // Manually define the list of instructors

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    const handleInstructorSelect = (e) => {
        setSelectedInstructor(e.target.value);
    };

    const filteredCourses = selectedInstructor
        ? courseData.filter((course) => course.createdBy === selectedInstructor)
        : courseData;

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by{" "}
                    <span className="font-bold text-yellow-500">Industry experts</span>
                </h1>
                <select
                    className="block w-48 px-4 py-2 mb-5 bg-black-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={selectedInstructor}
                    onChange={handleInstructorSelect}
                >
                    <option className="bg-black text-yellow-500" value="">All Instructors</option>
                    {instructors.map((instructor) => (
                        <option className="bg-black text-yellow-500" key={instructor} value={instructor}>
                            {instructor}
                        </option>
                    ))}
                </select>
                <div className="mb-10 flex flex-wrap gap-14">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course._id} data={course} createdBy={course.createdBy} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
