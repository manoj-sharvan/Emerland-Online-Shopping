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
