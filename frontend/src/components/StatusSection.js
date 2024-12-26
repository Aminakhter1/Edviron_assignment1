import React from "react";
import { Link } from "react-router-dom";

const StatusSection = () => {
  return (
    <>
    <hr/>
    <div className="container mt-2">
    
      <div className="row justify-content-center">
        {/* Check Status Button */}
        <div className="col-md-3 mb-2">
          <Link to="/status-check" className="btn btn-primary w-100">
            Check Status
          </Link>
        </div>

        {/* Update Status Button */}
        <div className="col-md-3 mb-2">
          <Link to="/status-update" className="btn btn-secondary w-100">
            Update Status
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default StatusSection;
