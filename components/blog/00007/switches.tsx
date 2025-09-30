"use client";
import { useState } from "react";
// const [switchState, changeSwitchState] = useState(false);

export function TextExperiment() {
  return (
    <div className="flex h-20 w-30 -skew-y-[23deg] items-center border-2 border-black dark:border-white">
      <p className="w-full text-center">test</p>
    </div>
  );
}

export function Switch1() {
  return (
    <div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white"></div>
      <div className="flex border-2 border-black dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[24deg] items-center border-2 border-black dark:border-white">
          <p className="w-full text-center">test</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[50deg] border-2 border-black dark:border-white"></div>
      </div>
    </div>
  );
}
export function Switch2() {
  return (
    <div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white"></div>
      <div className="flex border-2 border-black dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-2 border-black dark:border-white">
          <p className="w-full text-center">test</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-2 border-black dark:border-white"></div>
      </div>
    </div>
  );
}
export function Switch3() {
  return (
    <div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white"></div>
      <div className="flex border-y-2 border-r-1 border-l-2 border-black dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-y-2 border-r-1 border-black dark:border-white">
          <p className="w-full text-center">Right Switch</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-x-1 border-y-2 border-black dark:border-white"></div>
      </div>
    </div>
  );
}
export function Switch4() {
  return (
    <div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white"></div>
      <div className="flex border-y-2 border-r-1 border-l-2 border-black dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-y-2 border-r-1 border-black bg-blue-200 dark:border-white dark:bg-slate-900">
          <p className="w-full text-center text-black">Right Switch</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-x-1 border-y-2 border-black bg-blue-200 dark:border-white dark:bg-slate-900"></div>
      </div>
    </div>
  );
}
export function Switch4Flipped() {
  return (
    <div className="flex pt-10">
      <div className="flex border-y-2 border-r-1 border-l-2 border-black dark:border-white">
        <div className="h-20 w-15 translate-y-[-26px] -skew-y-[40.32deg] border-x-1 border-y-2 border-black bg-blue-200 dark:border-white dark:bg-slate-900"></div>
        <div className="flex h-20 w-30 translate-y-[-25.5px] skew-y-[23deg] items-center border-y-2 border-r-1 border-black bg-blue-200 dark:border-white dark:bg-slate-900">
          <p className="w-full text-center text-black">Left Switch</p>
        </div>
      </div>
      <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white"></div>
    </div>
  );
}
export function Switch4Logic() {
  const [switchState, setSwitchState] = useState(false);

  return (
    <div>
      {switchState == true ? (
        <div className="flex pt-10">
          <div
            className="flex border-y-2 border-r-1 border-l-2 border-black dark:border-white"
            onClick={() => setSwitchState(false)}
          >
            <div className="h-20 w-15 translate-y-[-26px] -skew-y-[40.32deg] border-x-1 border-y-2 border-black bg-blue-200 dark:border-white dark:bg-slate-900"></div>
            <div className="flex h-20 w-30 translate-y-[-25.5px] skew-y-[23deg] items-center border-y-2 border-r-1 border-black bg-blue-200 dark:border-white dark:bg-slate-900">
              <p className="w-full text-center text-black">Left Switch</p>
            </div>
          </div>
          <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white">
            <p className="w-full text-center text-black">Right Switch</p>
          </div>
        </div>
      ) : (
        <div className="flex pt-10">
          <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white">
            <p className="w-full text-center text-black">Left Switch</p>
          </div>
          <div
            className="flex border-y-2 border-r-1 border-l-2 border-black dark:border-white"
            onClick={() => setSwitchState(true)}
          >
            <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-y-2 border-r-1 border-black bg-blue-200 dark:border-white dark:bg-slate-900">
              <p className="w-full text-center text-black">Right Switch</p>
            </div>
            <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-x-1 border-y-2 border-black bg-blue-200 dark:border-white dark:bg-slate-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FinalSwitch() {
  return (
    <div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-black dark:border-white">
        <p className="w-full text-center">Right Switch</p>
      </div>
      <div className="flex border-y-2 border-l-2 border-black dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-y-2 border-r-1 border-black dark:border-white">
          <p className="w-full text-center">Left Switc?h</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-x-1 border-y-2 border-black dark:border-white"></div>
      </div>
    </div>
  );
}
