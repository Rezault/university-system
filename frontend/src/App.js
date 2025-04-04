import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './pages/Layout';
import Home from './pages/Home';
import AllDegrees from './pages/AllDegrees';
import Degree from './pages/Degree';
import Cohort from './pages/Cohort';
import AllCohorts from './pages/AllCohorts';
import AllModules from './pages/AllModules';
import Module from './pages/Module';
import Student from './pages/Student';
import CreateDegree from './pages/CreateDegree';
import CreateCohort from './pages/CreateCohort';
import CreateModule from './pages/CreateModule';
import CreateStudent from './pages/CreateStudent';
import StudentsInModule from './pages/StudentsInModule';

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = { duration: 0.5 };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          } />
          <Route path="degrees" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <AllDegrees />
            </motion.div>
          } />
          <Route path="degree/:shortCode" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Degree />
            </motion.div>
          } />
          <Route path="cohorts" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <AllCohorts />
            </motion.div>
          } />
          <Route path="cohort/:id" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Cohort />
            </motion.div>
          } />
          <Route path="modules" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <AllModules />
            </motion.div>
          } />
          <Route path="module/:shortCode" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Module />
            </motion.div>
          } />
          <Route path="student/:studentId" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Student />
            </motion.div>
          } />
          <Route path="create-degree" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <CreateDegree />
            </motion.div>
          } />
          <Route path="create-cohort" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <CreateCohort />
            </motion.div>
          } />
          <Route path="create-module" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <CreateModule />
            </motion.div>
          } />
          <Route path="create-student" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <CreateStudent />
            </motion.div>
          } />
          <Route path="students-in-module/:shortCode" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <StudentsInModule />
            </motion.div>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
