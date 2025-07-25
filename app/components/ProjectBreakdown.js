"use client";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { PieChart } from "./MetricsChart";
import { ProjDeleteBtn } from "./ProjDeleteBtn";

export const ProjectBreakdown = () => {
  const { project, setProject, setProjectPool } = useProjectContext();
  const materialList = project.material;

  const purchaseItemCost = project.purchaseList.map(
    (item) => JSON.parse(item.price) + JSON.parse(item.price)
  );

  const getMaterialCost = () => {
    if (materialList.length > 0) {
      const materialCost = materialList.map(
        (material) => JSON.parse(material.price) + JSON.parse(material.price)
      );
      return materialCost[0];
    } else {
      return 0;
    }
  };

  const getProjectProfit = () => {
    if (project.currentMetrics) {
      const projectProfit =
        project.sale_price -
        purchaseItemCost -
        getMaterialCost() -
        project.currentMetrics[0].budget_money;
      return projectProfit;
    } else {
      return;
    }
  };
  const getTotalCost = () => {
    if (project.currentMetrics) {
      const totalCost =
        purchaseItemCost[0] +
        JSON.parse(project.currentMetrics[0].budget_money);
      return totalCost;
    } else {
      return;
    }
  };

  const {
    setShowDetails,
    setShowUpdateForm,
    setShowBlockers,
    setShowComments,
    setShowBreakdown,
    setShowWindow,
  } = useWindowContext();

  return (
    <div>
      <br />
      <div className="container d-flex justify-content-between align-items-center gap-2 my-3">
        <button
          style={{
            backgroundColor: "aqua",
            height: "50px",
            fontSize: "x-large",
          }}
          className="border rounded w-50 text-center"
        >
          Status: <strong>{project.state}</strong>
        </button>
        <button
          onClick={() => setShowBlockers(true)}
          style={{
            backgroundColor: "orange",
            height: "50px",
            fontSize: "x-large",
          }}
          className="border rounded w-25 text-center"
        >
          Blockers: {project.blockers?.length || 0}
        </button>
        <button
          onClick={() => setShowComments(true)}
          style={{
            backgroundColor: "forestgreen",
            height: "50px",
            fontSize: "x-large",
          }}
          className="border rounded w-25 text-center"
        >
          Comments: {project.comments?.length || 0}
        </button>
      </div>
      <div className="d-flex w-100 p-3">
        <div
          style={{ width: "300px" }}
          className="me-3 d-flex flex-column gap-3"
        >
          <div className="border rounded p-2">
            <p className="mt-0">
              <u>Description</u>
            </p>
            <h3
              style={{
                height: "150px",
                overflowY: "auto",
                overflowX: "hidden",
                whiteSpace: "pre-wrap",
              }}
            >
              {project.description}
            </h3>
          </div>
          <br />
          <div className="border rounded">
            <p className="mt-0">
              <u>Projections</u>
            </p>
            <div
              style={{
                height: "150px",
                overflowY: "auto",
                overflowX: "hidden",
                fontSize: "x-large",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <p>Due: {project.projectedMetrics[0].due_date}</p>
              <p>Budget: ${project.projectedMetrics[0].budget_money}</p>
              <p>Est. Hours: {project.projectedMetrics[0].budget_hours}</p>
            </div>
          </div>
          <br />
          <button
            onClick={() => setShowDetails(true)}
            className="btn btn-primary"
          >
            Details
          </button>
          <ProjDeleteBtn
            projectId={project.id}
            onDelete={() => {
              alert("Project Deleted");
              setShowWindow(false);
              setShowBreakdown(false);
              setProject(null);
              setProjectPool((prevPool) =>
                prevPool.filter((p) => p.id !== project.id)
              );
            }}
          />
        </div>
        <div className="border rounded flex-grow-1 p-3">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <h4>
                  <u>Cost Breakdown</u>
                </h4>
              </div>
              <div className="col-8">
                <h4>
                  <u>Current Metrics</u>
                </h4>
              </div>
            </div>
          </div>
          {project.currentMetrics[0] ? (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <div className="container">
                      <table
                        className="table table-bordered table-sm"
                        style={{ fontSize: "0.8rem", width: "auto" }}
                      >
                        <thead className="table-light">
                          <tr>
                            <th>Category</th>
                            <th className="text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Purchase Items Cost</td>
                            <td className="text-end">
                              ${Number(purchaseItemCost).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>Material Cost</td>
                            <td className="text-end">
                              ${Number(getMaterialCost()).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>Other Spending</td>
                            <td className="text-end">
                              $
                              {Number(
                                project.currentMetrics[0].budget_money
                              ).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-4">
                    <p>
                      Estimated Completion:{" "}
                      {project.currentMetrics[0].expected_date}
                    </p>
                    <p>
                      Current Hours Spent:{" "}
                      {project.currentMetrics[0].budget_hours}
                    </p>
                    <p>Total Spent: ${getTotalCost()}</p>
                  </div>
                  <div className="col-4">
                    <p>Sale Price: ${project.sale_price}</p>
                    <p>
                      Current Profit:{" "}
                      <span className="text-success">
                        ${getProjectProfit().toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-4">
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          margin: "2rem auto",
                        }}
                      >
                        <p>
                          <u>Hours</u>
                        </p>
                        <PieChart
                          used={JSON.parse(
                            project.currentMetrics[0].budget_hours
                          )}
                          budgeted={JSON.parse(
                            project.projectedMetrics[0].budget_hours
                          )}
                          title={"Hours"}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          margin: "2rem auto",
                        }}
                      >
                        <p>
                          <u>Money</u>
                        </p>
                        <PieChart
                          used={getTotalCost()}
                          budgeted={project.projectedMetrics[0].budget_money}
                          title={"Money"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <button
                  id={project.id}
                  onClick={() => setShowUpdateForm(true)}
                  className="btn btn-secondary"
                >
                  Update Project
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p>Current Metrics have not been uploaded.</p>
              <button
                id={project.id}
                onClick={() => setShowUpdateForm(true)}
                className="btn btn-secondary"
              >
                Add Updated Metrics
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
