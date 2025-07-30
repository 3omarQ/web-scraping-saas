"use client";
import React from "react";
import CountUp from "react-countup";

interface CountUpWrapperProps {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function CountUpWrapper({
  start = 0,
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: CountUpWrapperProps) {
  return (
    <CountUp
      className="text-2xl font-bold text-primary"
      start={start}
      end={end}
      duration={duration}
      prefix={prefix}
      suffix={suffix}
    />
  );
}

export default CountUpWrapper;
