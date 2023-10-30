import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectSideBar from './components/ProjectSideBar';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter((project) => {
          return project.id !== prevState.selectedProjectId;
        }),
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: new Date().getTime(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  const selectedProject = projectsState.projects.find((project) => {
    return project.id === projectsState.selectedProjectId;
  });

  let content = (
    <SelectedProject onDelete={handleDeleteProject} project={selectedProject} />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onCancelAddProject={handleCancelAddProject}
        onAddProject={handleAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        selectedProjectId={projectsState.selectedProjectId}
        onSelectProject={handleSelectProject}
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
      />
      {content}
    </main>
  );
}

export default App;
