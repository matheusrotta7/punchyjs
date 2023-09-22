'use client'

import Dropdown from "../../components/Dropdown"
import { useContext, useEffect, useState } from "react";
import { getAllEmployeesWithManager } from "../../../services/EmployeeService";
import { Check, CheckCircle, CheckCircle2, LoaderIcon, X, XCircle } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { getPunches } from "@/app/services/PunchService";
import PunchAlterationRequest from "../../components/PunchAlterationRequest";
import { getDictionary } from "../../dictionaries";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MonthYearHeader from "../../components/MonthYearHeader";
import PunchCalendar from "../../components/PunchCalendar";
import SubmitButton from "../../components/SubmitButton";
import punchUtils from "@/app/utils/PunchUtils";
import { getReport } from "@/app/services/ReportService";
import download from "downloadjs";
import dateUtils from "@/app/utils/DateUtils";
import Modal from "../../components/Modal";
import PunchCircleTimestamped from "../../components/PunchCircleTimestamped";

export default function myEmployeesScreen({ params: { lang } }) {

    const dict = getDictionary(lang)
    const { user, logOut } = useContext(AuthContext)

    const [employeeList, setEmployeeList] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [pendingPunches, setPendingPunches] = useState([])
    const [managerActionCounter, setManagerActionCounter] = useState(0)

    useEffect(() => {
        fetchEmployees()
    }, [user])

    useEffect(() => {
        if (atLeastOneEmployee(employeeList)) {
            setSelectedEmployee(employeeList[0])
        }
    }, [employeeList])

    const fetchEmployees = () => {
        if (user === null || user === undefined) {
            return;
        }
        getAllEmployeesWithManager(user.id)
            .then(employees => {
                setEmployeeList(employees);
            });
    }

    useEffect(() => {
        if (employeeList === null || employeeList === undefined) {
            return
        }
        var employeeId = selectedEmployee.id
        getPunches(employeeId, null, null, "ALL_PENDING").then(punches => {
            setPendingPunches(punches)
        })
    }, [selectedEmployee, managerActionCounter])


    function renderPendingPunches() {
        if (employeeList === null || employeeList === undefined) {
            return
        }

        var employeeId = selectedEmployee.id
        if (atLeastOnePendingPunch()) {
            console.log(pendingPunches)
            return pendingPunches.map(p =>
                <PunchAlterationRequest
                    key={p.id}
                    punch={p}
                    employeeId={employeeId}
                    managerActionCounter={managerActionCounter}
                    setManagerActionCounter={setManagerActionCounter}
                    dict={dict}
                />
            )
        } else {
            return null
        }
    }

    function atLeastOneEmployee(employeeList) {
        return employeeList != null && employeeList != undefined && employeeList.length > 0
    }

    function atLeastOnePendingPunch() {
        return pendingPunches != null && pendingPunches != undefined && pendingPunches.length > 0
    }



    let date = new Date()

    const [curMonth, setCurMonth] = useState(date.getMonth())
    const [curYear, setCurYear] = useState(date.getFullYear())
    const [punchList, setPunchList] = useState()
    const [selectedDay, setSelectedDay] = useState(date.getDate())
    const [selectedDayPunchList, setSelectedDayPunchList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPunchAlterationOption, setSelectedPunchAlterationOption] = useState("")
    const [alterPunchTimestamp, setAlterPunchTimestamp] = useState("")
    const [toBeDeletedPunch, setToBeDeletedPunch] = useState("")
    const [punchAlterationOptions, setPunchAlterationOptions] = useState(null)

    useEffect(() => {
        console.log("I am inside dict punch alterations use effect")
        console.log("dict")
        console.log(dict)
        if (dict != null && dict != undefined) {
            setPunchAlterationOptions([
                { id: 1, name: dict.punchmirrorscreen.addition, backendName: 'PENDING_ADDITION' },
                { id: 2, name: dict.punchmirrorscreen.deletion, backendName: 'PENDING_DELETION' },
            ])
        }
    }, [dict])

    useEffect(() => {
        if (punchAlterationOptions != null) {
            console.log("punch alterations options isn't null so setting default value")
            setSelectedPunchAlterationOption(punchAlterationOptions[0])
        }
    }, [punchAlterationOptions])


    useEffect(() => {
        setSelectedDayPunchList(punchUtils.extractThisDayPunches(punchList, selectedDay))
    }, [punchList, selectedDay])

    useEffect(() => {
        fetchPunches();
    }, [curMonth, curYear, selectedEmployee])


    function fetchPunches() {
        if (selectedEmployee != null && selectedEmployee != undefined) {
            getPunches(selectedEmployee.id, curMonth, curYear)
                .then(punches => {
                    setPunchList(punches);
                });
        }
    }

    function goBackOneMonth() {
        var auxMonth = curMonth - 1;
        if (auxMonth === -1) {
            setCurYear(curYear - 1)
            setCurMonth(11)
        } else {
            setCurMonth(auxMonth)
        }
    }

    function goForwardOneMonth() {
        var auxMonth = curMonth + 1;
        if (auxMonth === 12) {
            setCurYear(curYear + 1)
            setCurMonth(0)
        } else {
            setCurMonth(auxMonth)
        }
    }

    function generatePunchCirclesTimestamped() {
        if (selectedDayPunchList === null || selectedDayPunchList === undefined) {
            return null
        }

        return selectedDayPunchList.map((punch, i) => <PunchCircleTimestamped key={i} time={simplifyTimestamp(punch.timestamp)} punchStatus={punch.punchStatus} />)
    }

    function simplifyTimestamp(timestamp) {
        var timeString = timestamp.split(" ")[1]
        var timeStringSplit = timeString.split(":")
        var result = timeStringSplit[0] + ":" + timeStringSplit[1]
        return result
    }

    function savePunchAlterationRequestAndCloseModal() {
        //make call to backend to add punch alteration

        if (selectedPunchAlterationOption.backendName === 'PENDING_ADDITION') {
            punch(user.id, completeDateFor(alterPunchTimestamp), 'PENDING_ADDITION').then(alert(dict.punchmirrorscreen.punchadditionsuccess))
        } else if (selectedPunchAlterationOption.backendName === 'PENDING_DELETION') {
            alterPunch(user.id, toBeDeletedPunch.id, 'PENDING_DELETION').then(alert(dict.punchmirrorscreen.punchdeletionsuccess))
        } else {
            alert("An unknown alteration action was selected")
        }

        setIsModalOpen(false)
    }

    function completeDateFor(timeStr) {
        return curYear + '-' + dateUtils.generateStringFromNumber(curMonth + 1, 2) + '-' + dateUtils.generateStringFromNumber(selectedDay, 2) + ' ' + timeStr + ':00';
    }

    function generateMonthlyPunchReport() {
        getReport(selectedEmployee.id, curMonth, curYear).then((response) => {
            var arrayBuffer = response
            var uint8View = new Uint8Array(arrayBuffer);
            download(uint8View, "report.pdf", "application/pdf");
        })
    }


    return (
        <>
            {dict != null && dict != undefined ?
                <div className="p-6 w-9/12">
                    <div>

                        <h1>{dict.welcome}, {user != null ? user.name : null}!</h1>

                        <h2 className="mt-6">{dict.myemployeesscreen.myemployees}: </h2>

                        <div>
                            {atLeastOneEmployee(employeeList) ? <Dropdown options={employeeList} selectedOption={selectedEmployee} setSelectedOption={setSelectedEmployee} /> : <LoaderIcon />}
                        </div>

                        <div className="flex flex-1">
                            <div>
                                <div className="flex mb-3 mt-4">
                                    <button className="rounded-full bg-sky-800 hover:bg-sky-500 mr-1"
                                        onClick={goBackOneMonth}
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <MonthYearHeader
                                        month={curMonth}
                                        year={curYear}
                                        dict={dict}
                                    />
                                    <button className="rounded-full bg-sky-800 hover:bg-sky-500 ml-1"
                                        onClick={goForwardOneMonth}
                                    >
                                        <ChevronRight />
                                    </button>

                                </div>
                                <PunchCalendar
                                    setSelectedDayPunchList={setSelectedDayPunchList}
                                    setSelectedDay={setSelectedDay}
                                    selectedDay={selectedDay}
                                    punchList={punchList}
                                    setPunchList={setPunchList}
                                    curMonth={curMonth}
                                    curYear={curYear}
                                    dict={dict}
                                />
                                <div className="mt-20 w-72">
                                    <SubmitButton width="w-72 h-14" onClickFunction={generateMonthlyPunchReport} text={dict.punchmirrorscreen.generatereport} />
                                </div>

                            </div>

                            <aside className="float-right bg-zinc-950 flex-1 border-l border-zinc-800 mx-5 w-max">
                                <div className="flex text-center justify-center flex-col">
                                    <div className="flex text-center justify-center mt-24 text-xl">
                                        <MonthYearHeader
                                            month={curMonth}
                                            year={curYear}
                                            dict={dict}
                                        />
                                    </div>
                                    <div>
                                        <div className="relative bg-zinc-800 px-5 mt-5 pt-10 pb-5 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto  sm:rounded-full w-40 h-40 border border-zinc-700">
                                            <div className="flex flex-col">
                                                <div className="text-xl">
                                                    {dateUtils.dayOfWeekFor(selectedDay, curMonth, curYear, dict)}
                                                </div>
                                                <div className="text-5xl mt-2">
                                                    {selectedDay}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-4 justify-center">
                                        {generatePunchCirclesTimestamped()}
                                    </div>
                                    <div className="flex flex-col text-sm">
                                        <div className="mt-5">
                                            <span className="float-left p-3">{dict.punchmirrorscreen.workedhours}</span>
                                            <span className="float-right p-3">{dateUtils.calculateWorkedHours(selectedDayPunchList)}</span>
                                        </div>

                                        <div className="cursor-pointer mt-5 float-left bg-zinc-800 p-3 shadow-xl ring-1 ring-gray-900/5 border mx-3 border-zinc-700   sm:rounded-md w-auto h-auto"
                                            onClick={() => { setIsModalOpen(true) }}
                                        >
                                            <span>{dict.punchmirrorscreen.punchalterationrequest}</span>
                                        </div>
                                        <Modal
                                            isModalOpen={isModalOpen}
                                            setIsModalOpen={setIsModalOpen}
                                        >
                                            <div className="flex flex-col items-center">
                                                <span className="text-black text-lg mt-32">{dict.punchmirrorscreen.punchalterationrequest}</span>
                                                <div className="mt-5">
                                                    {punchAlterationOptions != null ?
                                                        <div>
                                                            <span>{dict.punchmirrorscreen.punchalterationtype}</span> <Dropdown options={punchAlterationOptions} selectedOption={selectedPunchAlterationOption} setSelectedOption={setSelectedPunchAlterationOption} />
                                                        </div>
                                                        :
                                                        <></>
                                                    }
                                                </div>

                                                {selectedPunchAlterationOption.backendName === "PENDING_ADDITION" ?

                                                    <div className="mt-3">
                                                        <span className="mr-2">{dict.punchmirrorscreen.additionTime}</span> <input type="time" value={alterPunchTimestamp} onChange={(e) => setAlterPunchTimestamp(e.target.value)} ></input>
                                                    </div> :

                                                    <div className="mt-3">
                                                        {selectedDayPunchList != null && selectedDayPunchList.length > 0 ?
                                                            <div>
                                                                <span>{dict.punchmirrorscreen.whichpunchdeleted} </span> <Dropdown options={selectedDayPunchList != null ? selectedDayPunchList.map((p) => ({ id: p.id, name: p.timestamp })) : null} setSelectedOption={setToBeDeletedPunch} selectedOption={toBeDeletedPunch} />
                                                            </div>
                                                            :
                                                            <span>{dict.punchmirrorscreen.nopunchestodelete}</span>
                                                        }
                                                    </div>

                                                }

                                                <div className="mt-4">
                                                    <SubmitButton
                                                        text={dict.submit}
                                                        onClickFunction={savePunchAlterationRequestAndCloseModal}
                                                    ></SubmitButton>
                                                </div>

                                            </div>
                                        </Modal>


                                    </div>
                                </div>
                            </aside>


                        </div>




                    </div>






                </div>
                :
                <></>
            }


        </>
    )
}