'use client';

import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import MonthYearHeader from "../../components/MonthYearHeader";
import { useState, useEffect, useContext } from "react";

import PunchCalendar from "../../components/PunchCalendar";
import PunchCircleTimestamped from "@/app/components/PunchCircleTimestamped";

import dateUtils from "../../utils/DateUtils";
import punchUtils from "../../utils/PunchUtils";

import { alterPunch, getPunches, punch } from '../../services/PunchService'
import { AuthContext } from "@/app/contexts/AuthContext";
import Modal from "@/app/components/Modal";
import SubmitButton from "@/app/components/SubmitButton";
import Dropdown from "@/app/components/Dropdown";


export default function punchScreen() {

    const { user, logOut } = useContext(AuthContext)


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

    const punchAlterationOptions = [
        { id: 1, name: 'Addition', backendName: 'PENDING_ADDITION' },
        { id: 2, name: 'Deletion', backendName: 'PENDING_DELETION' },
    ];

    useEffect(() => {
        setSelectedDayPunchList(punchUtils.extractThisDayPunches(punchList, selectedDay))
    }, [punchList, selectedDay])

    useEffect(() => {
        fetchPunches();
    }, [curMonth, curYear, user])


    function fetchPunches() {
        console.log("Inside use effect curmonth: " + curMonth);
        if (user != null && user != undefined) {
            console.log("user.id")
            console.log(user.id)
            getPunches(user.id, curMonth, curYear)
                .then(punches => {
                    console.log("punches")
                    console.log(punches)
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
        console.log(timeStringSplit)
        var result = timeStringSplit[0] + ":" + timeStringSplit[1]
        return result
    }

    function savePunchAlterationRequestAndCloseModal() {
        //make call to backend to add punch alteration
        console.log(user.id)
        console.log(alterPunchTimestamp)
        console.log(selectedPunchAlterationOption)

        var selectedOptionBackendName = punchAlterationOptions.find((option) => option.name === selectedPunchAlterationOption).backendName
        console.log(selectedOptionBackendName)
        if (selectedOptionBackendName === 'PENDING_ADDITION') {
            punch(user.id, completeDateFor(alterPunchTimestamp), 'PENDING_ADDITION')
        } else if (selectedOptionBackendName === 'PENDING_DELETION') {
            console.log("toBeDeletedPunch")
            console.log(toBeDeletedPunch)
            const toBeDeletePunchObj = selectedDayPunchList.find((p) => p.timestamp === toBeDeletedPunch);
            console.log("toBeDeletePunchObj")
            console.log(toBeDeletePunchObj)
            alterPunch(user.id, toBeDeletePunchObj.id, 'PENDING_DELETION')
        } else {
            alert("An unknown alteration action was selected")
        }

        setIsModalOpen(false)
    }

    function completeDateFor(timeStr) {
        return curYear+ '-' + dateUtils.generateStringFromNumber(curMonth+1, 2) + '-' + dateUtils.generateStringFromNumber(selectedDay, 2) + ' ' + timeStr + ':00';
    }

    return (

        <>

            <div className="text-gray-200 p-6">
                <h1 className="mb-3">Welcome, {user != null ? user.name : ""}!</h1>
                <div>
                    <div className="flex mb-3 ">
                        <button className="rounded-full bg-sky-800 hover:bg-sky-500 mr-1"
                            onClick={goBackOneMonth}
                        >
                            <ChevronLeft />
                        </button>
                        <MonthYearHeader
                            month={curMonth}
                            year={curYear}
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
                        punchList={punchList}
                        setPunchList={setPunchList}
                        curMonth={curMonth}
                        curYear={curYear}
                    />
                </div>
            </div>

            <aside className="float-right bg-zinc-950 flex-1 border-l border-zinc-800">
                <div className="flex text-center justify-center flex-col">
                    <div className="flex text-center justify-center mt-24 text-xl">
                        <MonthYearHeader
                            month={curMonth}
                            year={curYear}
                        />
                    </div>
                    <div>
                        <div className="relative bg-zinc-800 px-5 mt-5 pt-10 pb-5 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto  sm:rounded-full w-40 h-40 border border-zinc-700">
                            <div className="flex flex-col">
                                <div className="text-xl">
                                    {dateUtils.dayOfWeekFor(selectedDay, curMonth, curYear)}
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
                            <span className="float-left p-3">Worked hours:</span>
                            <span className="float-right p-3">{dateUtils.calculateWorkedHours(selectedDayPunchList)}</span>
                        </div>

                        <div className="cursor-pointer mt-5 float-left bg-zinc-800 p-3 shadow-xl ring-1 ring-gray-900/5 border mx-3 border-zinc-700   sm:rounded-md w-auto h-auto"
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            <span>Punch alteration request</span>
                        </div>
                        <Modal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-black text-lg mt-32">Punch alteration request</span>
                                <div className="mt-5">
                                    <span>Type: </span> <Dropdown options={punchAlterationOptions} selectedOption={selectedPunchAlterationOption} handleChange={(e) => setSelectedPunchAlterationOption(e.target.value)} />
                                </div>

                                {selectedPunchAlterationOption === "Addition" ? 
                                
                                <div className="mt-3">
                                    <span>Hour:</span> <input type="time" value={alterPunchTimestamp} onChange={(e) => setAlterPunchTimestamp(e.target.value)} ></input>
                                </div> :

                                <div className="mt-3">
                                    <span>Which punch should be deleted? </span> <Dropdown options={selectedDayPunchList != null ? selectedDayPunchList.map((p) => ({id: p.id, name: p.timestamp})) : null} handleChange={(e) => {setToBeDeletedPunch(e.target.value)}} selectedOption={toBeDeletedPunch} />
                                </div>
                                
                                }
                                
                                <div className="mt-3">
                                    <span>Justification: </span> <input type="text" maxLength={100}></input>
                                </div>
                                <div className="mt-4">
                                    <SubmitButton
                                        text="Submit"
                                        onClickFunction={savePunchAlterationRequestAndCloseModal}
                                    ></SubmitButton>
                                </div>

                            </div>
                        </Modal>


                    </div>
                </div>
            </aside>
        </>
    )

}