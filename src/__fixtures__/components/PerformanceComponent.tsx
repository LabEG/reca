/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-key */

import {useStore} from "../../index.js";
import {ToDoAutoStore} from "../stores/ToDoAutoStore.js";
import {ToDoStore} from "../stores/ToDoStore.js";

export const PerformanceComponent = (): JSX.Element => {
    const array = new Array(1000).fill(true);

    // Calculate store
    const beginTimeSt = performance.now();
    const storesSt = array.map(() => useStore(ToDoStore));
    const resultSt = performance.now() - beginTimeSt;

    // Calculate auto-store
    const beginTimeAu = performance.now();
    const storesAu = array.map(() => useStore(ToDoAutoStore));
    const resultAu = performance.now() - beginTimeAu;

    const textSt = storesSt.reduce((previousValue, currentValue) => previousValue + currentValue.currentTodo, "");
    const textAu = storesAu.reduce((previousValue, currentValue) => previousValue + currentValue.currentTodo, "");

    return (
        <div>
            <div className="store">
                Result Time:
                {" "}

                <span className="result-time">
                    {resultSt}
                </span>
            </div>

            <div className="auto-store">
                Result Time:
                {" "}

                <span className="result-time">
                    {resultAu}
                </span>
            </div>

            <div>
                {textSt}

                {textAu}
            </div>
        </div>
    );
};
