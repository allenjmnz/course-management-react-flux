import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import {
  loadCourses,
  deleteCourse,
  loadAuthors
} from '../actions/courseActions';

const CoursesPage = () => {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    if (authorStore.getAuthors().length === 0) loadAuthors();
    return () => {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    };
  }, []);

  const onChange = () => {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  };

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} authors={authors} onClick={deleteCourse} />
    </>
  );
};

export default CoursesPage;
