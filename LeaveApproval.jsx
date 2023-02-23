/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';

import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { AiOutlineDown, AiOutlineUp, AiOutlineSearch } from 'react-icons/ai';
import { useStateContext } from '../Context/contextProvider';
import { NavLink } from 'react-router-dom';
import employees from '../fakeApi.json';
import Pagination from './Pagination';
const LeaveApproval = () => {
  const leaveData = JSON.parse(localStorage.getItem('leaveDatas'));
  const { dropDown, setDropDown } = useStateContext();
  const [filteredData, setFilteredData] = useState(leaveData);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(2);

  const [status, setStatus] = useState('Pending');
  const [sortBy, setSortBy] = useState('null');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const departments = [
    ...new Set(employees.employees.map((employee) => employee.department)),
  ];
  departments.unshift('All');

  console.log(selectedDepartment);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredEmployees = leaveData.filter(
    (employee) =>
      (selectedDepartment === 'All' ||
        employee.department === selectedDepartment) &&
      (searchTerm === '' ||
        employee.employeeName.toLowerCase().includes(searchTerm) ||
        employee.employeeId.toString().toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm))
  );

  console.log(filteredEmployees);

  const handleSort = (event, property) => {
    event.preventDefault();
    if (property === sortBy) {
      console.log(property,sortBy);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      console.log(property);
      setSortBy(property);
      setSortOrder('asc');
    }
  };
  filteredEmployees.sort((a, b) => {
    if (!sortBy) {
      return 0; // default sort
    }
    if (sortOrder === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  //Get Current Page
  const indexOfLastPage = currentPage * dataPerPage;
  const indexFirstData = indexOfLastPage - dataPerPage;
  const CurrentData = filteredEmployees.slice(indexFirstData, indexOfLastPage);

  return (
    <div className="">
      <div className="mt-5">
        <form className="w-full max-[650px]:mt-24 px-3">
          <div className="flex">
            <div ref={dropdownRef}>
              <button
                id="dropdown"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 z-10 inline-flex justify-center items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
                value={selectedDepartment}
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedDepartment}
                {isOpen && <AiOutlineDown className="mx-2" />}
                {!isOpen && <AiOutlineUp className="mx-2" />}
              </button>

              <div
                ref={dropdownRef}
                id="dropdown-menu"
                className={` z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700  absolute ${
                  isOpen ? 'block' : 'hidden'
                }`}
              >
                {isOpen &&
                  departments.map((department) => (
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200"
                      key={department}
                    >
                      <li>
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => {
                            setDropDown(false);
                            setIsOpen(false);
                            setSelectedDepartment(department);
                            setIsDataAvailable(filteredData.length > 0);
                          }}
                        >
                          {department}
                        </button>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>

            <div className="relative w-[95%]">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-orange-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-orange-500 outline-none  caret-orange-500"
                placeholder={
                  selectedDepartment !== 'Department'
                    ? ` Search ${selectedDepartment} Department Employee ID, Employee Name...`
                    : 'Search Employee ID, Employee Name...'
                }
                value={searchTerm}
                onChange={handleSearch}
                autoComplete="off"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0  p-2.5 text-sm font-medium text-white bg-orange-500 rounded-r-lg border border-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-600"
              >
                <AiOutlineSearch className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {isDataAvailable && (
        <div className="antialiased font-sans">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="pt-3 md:pt-8 gap-4">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden table-auto border-separate">
                  <div className="table-container max-w-full overflow-x-auto">
                    <table className="min-w-full leading-normal">
                      <thead className=" ">
                        <tr className="">
                          <th
                            scope="col"
                            className="px-5 py-3   bg-gray-100 text-xs font-semibold sm:w-12 text-center sm:text-left text-gray-600 uppercase tracking-wider"
                            onClick={(event) => {
                              handleSort(event, 'employeeId');
                            }}
                          >
                            <div className="flex items-center justify-center">
                              <p>Id</p>
                              <p>
                                {sortBy === 'employeeId' &&
                                  sortOrder === 'asc' && (
                                    <FaSortUp className="inline ml-1 text-gray-400" />
                                  )}
                                {sortBy === 'employeeId' &&
                                  sortOrder === 'desc' && (
                                    <FaSortDown className="inline ml-1 text-gray-400" />
                                  )}
                              </p>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32   bg-gray-100  text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                            onClick={(event) =>
                              handleSort(event, 'employeeName')
                            }
                          >
                            <div className="flex items-center justify-center">
                              <p>Name</p>
                              <p>
                                {' '}
                                {sortBy === 'employeeName' &&
                                  sortOrder === 'asc' && (
                                    <FaSortUp className="inline ml-1 text-gray-400" />
                                  )}
                                {sortBy === 'employeeName' &&
                                  sortOrder === 'desc' && (
                                    <FaSortDown className="inline ml-1 text-gray-400" />
                                  )}
                              </p>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32   bg-gray-100 text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                            onClick={(event) => handleSort(event, 'Department')}
                          >
                            <div className="flex items-center justify-center">
                              <p> Department</p>
                              <p>
                                {sortBy === 'Department' &&
                                  sortOrder === 'asc' && (
                                    <FaSortUp className="inline ml-1 text-gray-400" />
                                  )}
                                {sortBy === 'Department' &&
                                  sortOrder === 'desc' && (
                                    <FaSortDown className="inline ml-1 text-gray-400" />
                                  )}
                              </p>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32   bg-gray-100  text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                            onClick={(event) => handleSort(event, 'LeaveType')}
                          >
                            <div className="flex items-center justify-center">
                              <p>Leave Type</p>
                              <p>
                                {' '}
                                {sortBy === 'LeaveType' &&
                                  sortOrder === 'asc' && (
                                    <FaSortUp className="inline ml-1 text-gray-400" />
                                  )}
                                {sortBy === 'LeaveType' &&
                                  sortOrder === 'desc' && (
                                    <FaSortDown className="inline ml-1 text-gray-400" />
                                  )}
                              </p>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32   bg-gray-100   text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                          >
                            <p className="flex items-center justify-center">
                              Reason
                            </p>
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32   bg-gray-100  text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                            onClick={(event) => handleSort(event, 'LeaveDate')}
                          >
                            <div className="flex items-center justify-center">
                              <p> Leave Date</p>
                              <p>
                                {' '}
                                {sortBy === 'LeaveDate' &&
                                  sortOrder === 'asc' && (
                                    <FaSortUp className="inline ml-1 text-gray-400" />
                                  )}
                                {sortBy === 'LeaveDate' &&
                                  sortOrder === 'desc' && (
                                    <FaSortDown className="inline ml-1 text-gray-400" />
                                  )}
                              </p>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32  bg-gray-100  text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                            onClick={(event) => handleSort(event, 'Status')}
                          >
                            <div className="flex items-center justify-center">
                              <p>status</p>
                              <p>
                                {sortBy === 'Status' && sortOrder === 'asc' && (
                                  <FaSortUp className="inline ml-1 text-gray-400" />
                                )}
                                {sortBy === 'Status' &&
                                  sortOrder === 'desc' && (
                                    <FaSortDown className="inline ml-1 text-gray-400" />
                                  )}
                              </p>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 sm:w-32   bg-gray-100  text-xs font-semibold text-center sm:text-left text-gray-600 uppercase tracking-wider"
                          >
                            <p className="flex items-center justify-center">
                              View
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {CurrentData.length === 0 ? (
                          <tr>
                            <td
                              className="px-5 h-40 py-5 border-b border-gray-200 bg-white max-[640px]:text-sm text-center text-4xl capitalize text-gray-600  shadow-2xl font-sans hover:font-serif"
                              colSpan="8"
                              style={{ textShadow: '3px 4px 5px #ccc' }}
                            >
                              No records found
                            </td>
                          </tr>
                        ) : (
                          CurrentData.map((data, index) => (
                            <tr
                              key={index}
                              className="px-5 py-5 border-b border-gray-200 bg-white text-sm "
                            >
                              <td className="text-sm w-44  text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                {data.employeeId}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                {data.employeeName}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                {data.department}
                              </td>
                              <td className="text-sm text-gray-900 font-light whitespace-nowrap text-center">
                                {data.leaveType}
                              </td>
                              <td className="text-sm text-gray-900 font-light scroll-py-2">
                                <div className="overflow-scroll flex items-center justify-center text-center mx-4 text-slate-900 ">
                                  {data.reason}
                                </div>
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                {data.fromDate} <br /> - <br /> {data.toDate}
                              </td>
                              <td
                                className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center  `}
                              >
                                <span
                                  className={`${
                                    status === 'Pending'
                                      ? 'relative inline-block px-3 py-1 font-semibold text-slate-800 leading-tight'
                                      : ''
                                  } ${
                                    status === 'Active'
                                      ? 'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                      : ''
                                  }
                              ${
                                status === 'Decline'
                                  ? 'absolute inset-0 bg-red-900 opacity-50 rounded-full '
                                  : ''
                              }`}
                                >
                                  <span
                                    className={`${
                                      status === 'Decline'
                                        ? 'absolute inset-0 bg-orange-200 opacity-50 rounded-full'
                                        : ''
                                    } ${
                                      status === 'Approve'
                                        ? 'absolute inset-0 bg-green-200 opacity-50 rounded-full'
                                        : ''
                                    } ${
                                      status === 'Pending'
                                        ? 'absolute inset-0 bg-gray-200 opacity-50 rounded-full '
                                        : ''
                                    }`}
                                  ></span>
                                  <span
                                    aria-hidden
                                    className="relative text-xs"
                                  >
                                    {status}
                                  </span>
                                </span>
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                <NavLink
                                  to={`/Leave Approval/${data.employeeId}`}
                                >
                                  <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none ">
                                    View
                                  </button>
                                </NavLink>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {filteredEmployees.length > 0 && (
            <div>
              {' '}
              <Pagination
                totalData={filteredEmployees.length}
                dataPerPage={dataPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default LeaveApproval;
