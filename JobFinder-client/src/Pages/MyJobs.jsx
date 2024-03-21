import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import styled from "styled-components";
import Swal from "sweetalert2";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";
  const [jobs, setJobs] = useState([]);
  const [apply, setApply] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/myJobs/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText, user]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/all-application/${user?.email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => {
        setApply(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [user]);

  const handleAcceptStatus = (id) => {
    const newStatus = { status: "accepted" };
    updateJobStatus(id, newStatus);
  };

  const handleRejectStatus = (id) => {
    const newStatus = { status: "rejected" };
    updateJobStatus(id, newStatus);
  };

  const updateJobStatus = (id, status) => {
    fetch(`http://localhost:5000/update-application/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update job status");
        }
        return response.json();
      })
      .then((data) => {
        const updatedApplications = apply.map((application) => {
          if (application._id === id) {
            return { ...application, status: status.status };
          }
          return application;
        });
        setApply(updatedApplications);
        Swal.fire({
          icon: 'success',
          title: 'Status Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("Error updating job status:", error);
      });
     
  };

  const handleResumeView = (drive) => {
    if(drive===""){
      const newWindow = window.open(drive, "_blank");
    }
    const newWindow = window.open(`http://localhost:5000/${drive}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    } 
  };

  if (Loading) {
    return <LoadingComTwo />;
  }

  if (error) {
    return <h2 className="">{error}</h2>;
  }

  if (jobs === undefined) {
    return <h2 className="">No job found</h2>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfFirstItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    const filter = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/job/${id}`, {
      method: "DELETE"
    }).then(res => res.json()).then((data) => {
      if (data.acknowledged === true) {
        alert('Job Deleted Successfully!');
        window.location.reload();
      }
    });
  };

  return (
    <div className='container min-h-screen px-4 mx-auto xl:px-24'>
      <div className='my-jobs-container'>
        <h1 className='p-4 text-center'>Jobs Posted</h1>
        <div className='p-2 mb-2 text-center search-box'>
          <input
            type='text'
            name='search'
            id='search'
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full py-2 pl-3 mb-4 border focus:outline-none lg:w-6/12'
          />
          <button className='px-8 py-2 mb-4 font-semibold text-white rounded-sm bg-blue' onClick={handleSearch}>Search</button>
        </div>
        <section className="py-1 bg-blueGray-50">
          <div className="w-full mx-auto mt-5 mb-12 ml-0 xl:mb-0">
            <div className="relative flex flex-col w-full min-w-0 mb-6 ml-0 break-words bg-white rounded shadow-lg">
              <div className="px-4 py-3 mb-0 border-0 rounded-t">
                <div className="flex flex-wrap items-center">
                  <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                    <h3 className="text-base font-semibold text-blueGray-700">All jobs</h3>
                  </div>
                  <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                    <Link to="/post-job">
                      <button className="px-3 py-4 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none" type="button">Post a New Job</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="block w-full max-w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">NO.</th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">TITLE</th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">COMPANY NAME</th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">SALARY</th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">EDIT</th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap text-blueGray-700">{index + 1}</th>
                        <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap ">{job.jobTitle}</td>
                        <td className="p-4 px-6 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap">{job.companyName}</td>
                        <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{`\u20B5${job.minPrice}`} - {`\u20B5${job.maxPrice}`}</td>
                        <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                          <button>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(job._id)}
                            className='px-6 py-2 text-white bg-red-700 rounded-sm'>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-8 text-black">
            {currentPage > 1 && (
              <button onClick={prevPage} className='hover:underline'>Previous</button>
            )}
            {indexOfLastItem < jobs.length && (
              <button onClick={nextPage} className='hover:underline'>Next</button>
            )}
          </div>
        </section>
        <Wrapper>
          <h1>Check out Applications</h1>
          <div className="content-row">
            <StyledTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Job Position</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody>
                {apply.map((application, index) => {
                  let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
                  return (
                    <tr key={application._id}>
                      <td>{i}</td>
                      <td>{application.JobPosition}</td>
                      <td>{application.CompanyName}</td>
                      <td>{application.status}</td>
                      <td className="action-row">
                        <button
                          className="action resume" 
                          onClick={() => handleResumeView(application.resume)}
                        >
                          CV
                        </button>
                        <button
                          className="action accept"
                          onClick={() => handleAcceptStatus(application._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="action reject"
                          onClick={() => handleRejectStatus(application._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    
    h1 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
    }

    .content-row {
        overflow-x: auto;
        margin-top: 1px;
        width: 100%;
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: #fff; /* Table background color */

    thead {
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 400;
        text-transform: capitalize;
    }

    th,
    td {
        text-align: left;
        padding: 12px;
    }

    tbody tr {
        font-size: 15px;
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: all 0.2s linear;
    }

    tbody tr:nth-child(even) {
        background-color: #00000011;
    }

    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 12px;
        color: white;
    }

    .action-row .action {
        font-size: 16px;
        padding: 6px;
        align-items: center;
        justify-content: center;

        font-weight: bold
        

    }

    .action.view {
        color: #22d637;
    }

    .action.edit {
        color: #f1c72f;
    }

    .action.delete {
        color: #f1322f;
    }

    .action.resume {
      background-color: #ef9712;
  }
  .action.accept {
    background-color: #168e24;
}
.action.reject {
    background-color: #f1322f;
}
`;

export default MyJobs;
