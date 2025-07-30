"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { useAuth } from "../context/AuthContext";
import { useToggleView } from "../context/ViewContext";

// BIG TODO - implement Google OAuth
// BIG TODO - implement Google Calendar meeting scheduling

// TODO - figure out a reason/way to display project managers/contacts.

// Components
import { ProjectBtn } from "./ProjectBtn";
import { LogoutButton } from "./LogoutButton";
import { ToggleButton } from "./ToggleButton";
import { Window } from "./Window";

export const BoardOverview = () => {
  const { activeView } = useToggleView();
  const { showWindow, setShowWindow, setShowNewProjForm, setShowArchives } =
    useWindowContext();
  const {
    projectPool,
    setProjectPool,
    setAllBlockers,
    setAllComments,
    setNumOfComments,
    setNumOfBlockers,
    numOfBlockers,
    numOfComments,
  } = useProjectContext();

  const { user, setLoading } = useAuth();

  const [rawData, setRawData] = useState([]);
  const [error, setError] = useState(null);

  const quotingProjects = projectPool.filter(
    (proj) => proj.state === "Quoting"
  );
  const processingProjects = projectPool.filter(
    (proj) => proj.state === "Processing"
  );
  const kickedOffProjects = projectPool.filter(
    (proj) => proj.state === "Kicked Off"
  );
  const inProdProjects = projectPool.filter(
    (proj) => proj.state === "In Production"
  );
  const debugProjects = projectPool.filter((proj) => proj.state === "Debug");
  console.log(projectPool);
  const runoffProjects = projectPool.filter((proj) => proj.state === "Runoff");
  const shippingProjects = projectPool.filter(
    (proj) => proj.state === "Shipping"
  );
  const installProjects = projectPool.filter(
    (proj) => proj.state === "Install"
  );

  const openNewProjForm = () => {
    setShowNewProjForm(true);
    setShowWindow(true);
  };

  const openArchives = () => {
    setShowArchives(true);
    setShowWindow(true);
  };

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const responseOne = await axios.get(
          "https://parsity-final-be.onrender.com/projects/",
          {
            withCredentials: true,
          }
        );

        const responseTwo = await axios.get(
          "https://parsity-final-be.onrender.com/comments/comments&blockers",
          {
            withCredentials: true,
          }
        );
        setRawData(responseOne.data);
        setAllComments(responseTwo.data.comments);
        setAllBlockers(responseTwo.data.blockers);
        setNumOfComments(responseTwo.data.comments.length);
        setNumOfBlockers(responseTwo.data.blockers.length);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (activeView === "Builds") {
      const transformData = rawData.filter((data) => {
        return data.type === "Build";
      });
      setProjectPool(transformData);
    } else {
      const transformData = rawData.filter((data) => {
        return data.type === "Batch";
      });
      setProjectPool(transformData);
    }
  }, [activeView, rawData, setProjectPool]);

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h2>Error Loading Projects</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (showWindow) {
    return <Window />;
  }

  return (
    <>
      <>
        <div className="text-center mt-5">
          <h1>Project Dashboard</h1>
        </div>
        <br />
        <div className="container text-center border border-5 rounded-5 p-3">
          <div className="container row">
            <div
              className="d-flex align-items-center justify-content-center border rounded col-3 me-2"
              style={{
                height: "45px",
                width: "200px",
                backgroundColor: "aqua",
                fontSize: "xx-large",
              }}
            >
              <p className="mb-0">Hello, {user.first_name}!</p>
            </div>
            <div
              className="d-flex align-items-center justify-content-center border rounded col-3 me-2"
              style={{
                height: "45px",
                width: "200px",
                backgroundColor: "lavender",
              }}
            >
              <p className="mb-0">
                Total Blockers: <strong>{numOfBlockers}</strong>
              </p>
            </div>
            <div
              className="d-flex align-items-center justify-content-center border rounded col-3 me-2"
              style={{
                height: "45px",
                width: "200px",
                backgroundColor: "forestgreen",
              }}
            >
              <p className="mb-0">
                Total Comments: <strong>{numOfComments}</strong>
              </p>
            </div>
            <div
              className="d-flex align-items-center justify-content-center w-25"
              style={{ height: "45px" }}
            >
              <ToggleButton />
            </div>
            <div className="d-flex align-items-center justify-content-center col-3">
              <button
                onClick={() => openArchives()}
                style={{ width: "200px" }}
                className="btn btn-success"
              >
                Archives
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {quotingProjects.length > 0 ? (
                  quotingProjects.map((project) => (
                    <div key={project.id}>
                      <div>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects being quoted</p>
                )}
              </div>
              <div>
                <p className="mb-0">Quoting</p>
              </div>
            </div>
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {processingProjects.length > 0 ? (
                  processingProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects being processed</p>
                )}
              </div>
              <div>
                <p className="mb-0">Processing</p>
              </div>
            </div>
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {kickedOffProjects.length > 0 ? (
                  kickedOffProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects kicked off</p>
                )}
              </div>
              <div>
                <p className="mb-0">Kicked-Off</p>
              </div>
            </div>
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {inProdProjects.length > 0 ? (
                  inProdProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects in production</p>
                )}
              </div>
              <div>
                <p className="mb-0">In-Production</p>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {debugProjects.length > 0 ? (
                  debugProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects being debugged</p>
                )}
              </div>
              <div>
                <p className="mb-0">Debugging</p>
              </div>
            </div>
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {runoffProjects.length > 0 ? (
                  runoffProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects being Ran-Off</p>
                )}
              </div>
              <div>
                <p className="mb-0">Runoff</p>
              </div>
            </div>
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {shippingProjects.length > 0 ? (
                  shippingProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects being shipped</p>
                )}
              </div>
              <div>
                <p className="mb-0">Shipping</p>
              </div>
            </div>
            <div
              className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
              style={{ height: "250px" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "100%" }}
                className="flex-grow-1 mb-2"
              >
                {installProjects.length > 0 ? (
                  installProjects.map((project) => (
                    <div key={project.id}>
                      <div key={project.id}>
                        <ProjectBtn project={project} />
                      </div>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No projects being installed</p>
                )}
              </div>
              <div>
                <p className="mb-0">Installation</p>
              </div>
            </div>
          </div>
          <br />
          <div className="container row">
            <div className="col-6">
              <button
                onClick={() => openNewProjForm()}
                className="btn btn-primary w-50"
              >
                Create a new project
              </button>
            </div>
            <div className="col-6">
              <LogoutButton />
            </div>
          </div>
        </div>
      </>
    </>
  );
};
