"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { useAuth } from "../context/AuthContext";
import { useToggleView } from "../context/ViewContext";

// Components
import { ProjectBtn } from "./ProjectBtn";
import { LogoutButton } from "./LogoutButton";
import { ToggleButton } from "./ToggleButton";
import { Window } from "./Window";

export const BoardOverview = () => {
  const sessionExpired = useAuthCheck();

  const { activeView } = useToggleView();
  const { showWindow, setShowWindow, setShowNewProjForm } = useWindowContext();
  const { projectPool, setProjectPool } = useProjectContext();

  const { user } = useAuth();
  const loggedInUser = user;

  const [isLoading, setLoading] = useState(true);
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
  const debugProjects = projectPool.filter(
    (proj) => proj.state === "Debugging"
  );
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

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          "https://parsity-final-be.onrender.com/projects/",
          {
            withCredentials: true,
          }
        );
        setRawData(response.data);
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
      {isLoading ? (
        <div className="text-center mt-5">
          <h2>Loading Projects...</h2>
        </div>
      ) : (
        <>
          <div className="text-center mt-5">
            <h1>Project Dashboard</h1>
          </div>
          <br />
          <div className="container text-center border border-5 rounded-5 p-3">
            <div className="row">
              <div
                className="d-flex align-items-center justify-content-center border rounded w-25"
                style={{
                  height: "45px",
                  backgroundColor: "aqua",
                  fontSize: "xx-large",
                }}
              >
                <p className="mb-0">Hello, {loggedInUser.first_name}!</p>
              </div>
              <div
                className="d-flex align-items-center justify-content-center border rounded w-25"
                style={{ height: "45px", backgroundColor: "lavender" }}
              >
                <p className="mb-0">Total Blockers: 0</p>
              </div>
              <div
                className="d-flex align-items-center justify-content-center border rounded w-25"
                style={{ height: "45px", backgroundColor: "forestgreen" }}
              >
                <p className="mb-0">Total Comments: 0</p>
              </div>
              <div
                className="d-flex align-items-center justify-content-center w-25"
                style={{ height: "45px" }}
              >
                <ToggleButton />
              </div>
            </div>
            <br />
            <div className="row">
              <div
                className="border border-2 rounded-2 p-2 w-25 d-flex flex-column"
                style={{ height: "250px" }}
              >
                <div //THIS DIV
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
            <div>
              <button
                onClick={() => openNewProjForm()}
                className="btn btn-primary"
              >
                Create a new project
              </button>
              <LogoutButton />
            </div>
          </div>
        </>
      )}
    </>
  );
};
