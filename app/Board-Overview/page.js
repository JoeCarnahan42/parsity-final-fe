"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function BoardOV() {
  const [isLoading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const quotingProjects = projects.filter((proj) => proj.state === "Quoting");
  const processingProjects = projects.filter(
    (proj) => proj.state === "Processing"
  );
  const kickedOffProjects = projects.filter(
    (proj) => proj.state === "Kicked Off"
  );
  const inProdProjects = projects.filter(
    (proj) => proj.state === "In Production"
  );
  const debugProjects = projects.filter((proj) => proj.state === "Debugging");
  const runoffProjects = projects.filter((proj) => proj.state === "Runoff");
  const shippingProjects = projects.filter((proj) => proj.state === "Shipping");
  const installProjects = projects.filter((proj) => proj.state === "Install");

  useEffect(() => {
    axios
      .get("https://parsity-final-be.onrender.com/projects/", {
        withCredentials: true,
      })
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container text-center border border-5 rounded-5 p-3">
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
                  <div
                    className="border border-2 rounded-2 mb-2"
                    key={project.id}
                  >
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
                  <div className="border border-2 rounded-2" key={project.id}>
                    <h3>{project.title}</h3>
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
      </div>
    </>
  );
}
